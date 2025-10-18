'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useI18nStore } from '@/store/i18n.store';
import { videosService, Video } from '@/services/videos.service';
import { albumsService, Album } from '@/services/albums.service';
import { kidsService, Kid } from '@/services/kids.service';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add,
  VideoLibrary,
  CloudUpload,
  FilterList,
} from '@mui/icons-material';
import { VideoUpload } from '@/components/videos';
import { VideoGallery } from '@/components/videos';

export default function VideosPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { photos: photosT } = useI18nStore(); // Reuse photos translations
  
  const [videos, setVideos] = useState<Video[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [selectedKidId, setSelectedKidId] = useState<string>('all');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (albums.length > 0 && kids.length > 0) {
      loadVideos();
    }
  }, [selectedAlbumId, selectedKidId]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [albumsData, kidsData] = await Promise.all([
        albumsService.getAll(),
        kidsService.getAll(),
      ]);
      
      setAlbums(Array.isArray(albumsData) ? albumsData : (albumsData as any).data || []);
      setKids(Array.isArray(kidsData) ? kidsData : (kidsData as any).data || []);
      
      // Load all videos initially
      await loadAllVideos();
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadAllVideos = async () => {
    try {
      // Since backend doesn't have getAll, we'll load by kids and combine
      const kidsData = await kidsService.getAll();
      const kidsArray = Array.isArray(kidsData) ? kidsData : (kidsData as any).data || [];
      const allVideos: Video[] = [];
      
      for (const kid of kidsArray) {
        try {
          const kidVideos = await videosService.getByKid(kid.id);
          allVideos.push(...kidVideos);
        } catch (err) {
          console.error(`Error loading videos for kid ${kid.id}:`, err);
        }
      }
      
      setVideos(allVideos);
    } catch (err) {
      console.error('Error loading all videos:', err);
    }
  };

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let videosData: Video[] = [];
      
      if (selectedKidId !== 'all') {
        // Load videos for specific kid
        videosData = await videosService.getByKid(selectedKidId);
      } else if (selectedAlbumId !== 'all') {
        // Load videos for specific album
        videosData = await videosService.getByAlbum(selectedAlbumId);
      } else {
        // Load all videos
        await loadAllVideos();
        return;
      }
      
      // Filter by album if needed
      if (selectedAlbumId !== 'all' && selectedKidId !== 'all') {
        videosData = videosData.filter(v => v.album_id === selectedAlbumId);
      }
      
      setVideos(videosData);
    } catch (err: any) {
      console.error('Error loading videos:', err);
      setError(err.response?.data?.message || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setOpenUpload(false);
    loadVideos();
  };

  const handleVideoDelete = (videoId: string) => {
    setVideos(prev => prev.filter(v => v.id !== videoId));
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VideoLibrary sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Videos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {videos.length} video{videos.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={() => setOpenUpload(true)}
            size={isMobile ? 'medium' : 'large'}
          >
            Upload Video
          </Button>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <FilterList />
            <Typography variant="h6">Filters</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel>Kid</InputLabel>
              <Select
                value={selectedKidId}
                label="Kid"
                onChange={(e) => setSelectedKidId(e.target.value)}
              >
                <MenuItem value="all">All Kids</MenuItem>
                {kids.map((kid) => (
                  <MenuItem key={kid.id} value={kid.id}>
                    {kid.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel>Album</InputLabel>
              <Select
                value={selectedAlbumId}
                label="Album"
                onChange={(e) => setSelectedAlbumId(e.target.value)}
              >
                <MenuItem value="all">All Albums</MenuItem>
                {albums.map((album) => (
                  <MenuItem key={album.id} value={album.id}>
                    {album.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {(selectedKidId !== 'all' || selectedAlbumId !== 'all') && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedKidId('all');
                  setSelectedAlbumId('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </Paper>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Videos Gallery */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : videos.length === 0 ? (
          <Paper
            sx={{
              textAlign: 'center',
              py: 8,
              px: 2,
            }}
          >
            <VideoLibrary sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Videos Yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload your first video to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={() => setOpenUpload(true)}
            >
              Upload Video
            </Button>
          </Paper>
        ) : (
          <VideoGallery
            videos={videos}
            onDelete={handleVideoDelete}
            onRefresh={loadVideos}
          />
        )}

        {/* Upload Dialog */}
        <VideoUpload
          open={openUpload}
          albums={albums}
          kids={kids}
          onClose={() => setOpenUpload(false)}
          onSuccess={handleUploadSuccess}
        />

        {/* Floating Action Button (Mobile) */}
        {isMobile && (
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={() => setOpenUpload(true)}
          >
            <Add />
          </Fab>
        )}
      </Container>
    </ProtectedRoute>
  );
}
