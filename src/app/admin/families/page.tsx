'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import {
  Search,
  FamilyRestroom,
  Person,
  ChildCare,
  PhotoAlbum,
} from '@mui/icons-material';
import { adminService, AdminFamily } from '@/services/admin.service';
import { useAuthStore } from '@/store/auth.store';

export default function AdminFamiliesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [families, setFamilies] = useState<AdminFamily[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    loadFamilies();
  }, [user, page, limit, router]);

  const loadFamilies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getAllFamilies(page + 1, limit);
      setFamilies(response.data);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message || 'Không thể tải danh sách families');
    } finally {
      setLoading(false);
    }
  };

  const filteredFamilies = families.filter((f) =>
    f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.owner?.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && families.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <FamilyRestroom fontSize="large" />
          <div>
            <Typography variant="h4" fontWeight="bold">
              Quản Lý Families
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Tổng số: {total} families
            </Typography>
          </div>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm theo tên family hoặc chủ family..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : filteredFamilies.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <FamilyRestroom sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            {searchQuery ? 'Không tìm thấy family nào' : 'Chưa có family nào'}
          </Typography>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredFamilies.map((family) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={family.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => router.push(`/families/${family.id}`)}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar
                        src={family.avatar_url || undefined}
                        sx={{ width: 56, height: 56, bgcolor: '#667eea' }}
                      >
                        <FamilyRestroom />
                      </Avatar>
                      <Box flexGrow={1}>
                        <Typography variant="h6" fontWeight="bold" noWrap>
                          {family.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {new Date(family.created_at).toLocaleDateString('vi-VN')}
                        </Typography>
                      </Box>
                    </Box>

                    {family.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {family.description}
                      </Typography>
                    )}

                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Avatar
                        src={family.owner?.avatar_url || undefined}
                        sx={{ width: 32, height: 32 }}
                      >
                        {family.owner?.display_name?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {family.owner?.display_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Chủ family
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Chip
                        icon={<Person />}
                        label={`${family._count?.members || 0} thành viên`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<ChildCare />}
                        label={`${family._count?.kids || 0} bé yêu`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<PhotoAlbum />}
                        label={`${family._count?.albums || 0} albums`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Paper sx={{ mt: 3 }}>
            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={limit}
              onRowsPerPageChange={(e) => {
                setLimit(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[12, 24, 48]}
              labelRowsPerPage="Số families/trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong tổng ${count}`}
            />
          </Paper>
        </>
      )}
    </Container>
  );
}
