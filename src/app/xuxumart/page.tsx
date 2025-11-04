'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Dialog,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LocationOn,
  Close,
  NavigateNext,
  NavigateBefore,
  CardGiftcard,
  Storefront,
  Schedule,
} from '@mui/icons-material';
import Image from 'next/image';

// Product images mapping
const productImages = [
  'ba chỉ có da từ 1150 hạ xuống 890 yên.jpg',
  'móng giò 350 xuống 195 yên.jpg',
  'vịt không đầu 1190 xuống 950 yên.jpg',
  'trứng gà lộn 10 quả từ 850 xuống 790 yên.jpg',
  'giò lụa 980 xuống 890 yên.jpg',
  'bắp cải 198 xuống 99 yên.jpg',
  'quýt úc.jpg',
  'dứa quả từ 398 xuống 199.jpg',
  'chè sầu- chè dừa 450 giảm còn 299 yên.jpg',
  'chè khoai môn 450 xuống 299 yên.jpg',
  'Fami lốc 6 hộp 350 yên freee.jpg',
  'hình bên ngoài quán.jpg',
  'bên trong cửa hàng.jpg',
  'thịt các loại.jpg',
  'sản phẩm.jpg',
  'sản phẩm 2.jpg',
  'gia vị.jpg',
  'gia vị 2.jpg',
  'gia vị 3.jpg',
  'gia vị 5.jpg',
  'bún .jpg',
  'mỳ tôm các loại.jpg',
  'bánh kẹo 0.jpg',
  'bánh kẹo01.jpg',
  'bánh kẹo02.jpg',
  'bánh kẹo 05.jpg',
  'bánh kẹo 6.jpg',
  'bánh kẹo 7.jpg',
  'đồ ăn vặt 3.jpg',
];

const hotDeals = [
  { name: 'Ba Chỉ Có Da', price: '¥890', image: 0 },
  { name: 'Móng Giò', price: '¥195', image: 1 },
  { name: 'Vịt Không Đầu', price: '¥950', image: 2 },
  { name: 'Trứng Gà Lộn', price: '¥790/10 quả', image: 3 },
  { name: 'Giò Lụa', price: '¥890', image: 4 },
  { name: 'Bắp Cải', price: '¥99/quả', image: 5 },
  { name: 'Quýt Úc', price: '¥199/túi', image: 6 },
  { name: 'Dứa', price: '¥199/quả', image: 7 },
];

const desserts = [
  { name: 'Chè Sầu Riêng', price: '¥299', image: 8 },
  { name: 'Chè Dừa', price: '¥299', image: 8 },
  { name: 'Chè Khoai Môn', price: '¥299', image: 9 },
  { name: 'Combo Chè', price: '¥199-299', image: 8 },
];

const categories = [
  { name: 'Thực Phẩm Tươi Sống', icon: '🥩', count: '100+' },
  { name: 'Rau Củ Quả', icon: '🥬', count: '50+' },
  { name: 'Đồ Khô', icon: '🍜', count: '200+' },
  { name: 'Gia Vị', icon: '🧂', count: '80+' },
  { name: 'Bánh Kẹo', icon: '🍪', count: '150+' },
  { name: 'Đồ Uống', icon: '🧃', count: '100+' },
];

export default function XuxuMartPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2025-11-09T09:00:00+09:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevImage = () => {
    setCurrentGalleryIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentGalleryIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        {/* Hero Section - Full Screen */}
        <Box
          sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #DA291C 0%, #FF6B6B 50%, #FFB6C1 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          py: 4,
        }}
      >
        {/* Animated Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 20s ease-in-out infinite',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Flags */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
              <Typography 
                sx={{ 
                  fontSize: { xs: '4rem', md: '6rem' },
                  animation: 'bounce 2s ease-in-out infinite',
                }}
              >
                🇻🇳
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: { xs: '4rem', md: '6rem' },
                  animation: 'bounce 2s ease-in-out infinite',
                  animationDelay: '0.2s',
                }}
              >
                🇯🇵
              </Typography>
            </Box>

            {/* Store Name */}
            <Typography
              variant={isMobile ? 'h2' : 'h1'}
              sx={{ 
                fontWeight: 900, 
                mb: 2, 
                textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                letterSpacing: { xs: '0.1em', md: '0.15em' },
              }}
            >
              XUXU MART
            </Typography>
            
            {/* Branch Info */}
            <Typography 
              variant={isMobile ? 'h5' : 'h4'} 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              CHI NHÁNH 6 - KASAI
            </Typography>

            {/* Grand Opening Badge */}
            <Chip
              icon={<Storefront sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />}
              label="KHAI TRƯƠNG"
              sx={{
                bgcolor: 'white',
                color: '#DA291C',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                px: { xs: 2, md: 4 },
                py: { xs: 3, md: 4 },
                mb: 4,
                '& .MuiChip-icon': {
                  fontSize: { xs: '1.5rem', md: '2rem' },
                },
              }}
            />

            {/* Date & Time */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant={isMobile ? 'h6' : 'h5'} 
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                📅 Thứ Bảy, 09/11/2025
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h5'}
                sx={{ 
                  fontWeight: 500,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                ⏰ 9:00 Sáng (JST)
              </Typography>
            </Box>

            {/* Countdown Timer */}
            <Paper
              elevation={10}
              sx={{
                maxWidth: { xs: '100%', sm: 600 },
                mx: 'auto',
                p: { xs: 3, md: 4 },
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '3px solid rgba(255,255,255,0.5)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Schedule sx={{ mr: 1.5, color: '#DA291C', fontSize: { xs: '1.5rem', md: '2rem' } }} />
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{ color: '#DA291C', fontWeight: 'bold' }}
                >
                  Đếm Ngược Khai Trương
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                {[
                  { label: 'Ngày', value: timeLeft.days },
                  { label: 'Giờ', value: timeLeft.hours },
                  { label: 'Phút', value: timeLeft.minutes },
                  { label: 'Giây', value: timeLeft.seconds },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      background: 'linear-gradient(135deg, #DA291C 0%, #B71C1C 100%)',
                      color: 'white',
                      borderRadius: 3,
                      p: { xs: 1.5, md: 2.5 },
                      textAlign: 'center',
                      boxShadow: '0 4px 15px rgba(218, 41, 28, 0.4)',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Typography 
                      variant={isMobile ? 'h4' : 'h2'}
                      sx={{ 
                        fontWeight: 'bold', 
                        mb: 0.5,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </Typography>
                    <Typography 
                      variant={isMobile ? 'caption' : 'body2'}
                      sx={{ 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Scroll Down Indicator */}
            <Box 
              sx={{ 
                mt: 6,
                animation: 'bounce 2s ease-in-out infinite',
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                  fontWeight: 500,
                }}
              >
                ↓ Khám phá thêm ↓
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Gift Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 4 },
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <CardGiftcard sx={{ fontSize: 60, color: '#DA291C', mb: 2 }} />
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', mb: 2, color: '#DA291C' }}>
            🎁 QUÀ TẶNG KHAI TRƯƠNG
          </Typography>
          <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: '#8B4513' }}>
            Tặng 1 Lốc Fami cho 100 khách hàng đầu tiên!
          </Typography>
        </Paper>
      </Container>

      {/* Hot Deals */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#DA291C' }}
        >
          🔥 GIÁ SỐC KHAI TRƯƠNG
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          {hotDeals.map((item, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => setSelectedImage(item.image)}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '100%',
                  bgcolor: '#f0f0f0',
                }}
              >
                <Image
                  src={`/xuxumart/${productImages[item.image]}`}
                  alt={item.name}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {item.name}
                </Typography>
                <Chip
                  label={item.price}
                  color="error"
                  sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Desserts Section */}
      <Box sx={{ bgcolor: '#FFF8DC', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#DA291C' }}
          >
            🍮 CHÈ VIỆT NAM
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {desserts.map((item, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => setSelectedImage(item.image)}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '100%',
                    bgcolor: '#f0f0f0',
                  }}
                >
                  <Image
                    src={`/xuxumart/${productImages[item.image]}`}
                    alt={item.name}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.price}
                    color="error"
                    sx={{ fontWeight: 'bold' }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#DA291C' }}
        >
          📦 DANH MỤC SẢN PHẨM
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {categories.map((cat, index) => (
            <Card
              key={index}
              sx={{
                textAlign: 'center',
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                  bgcolor: '#FFF8DC',
                },
              }}
            >
              <Typography sx={{ fontSize: '3rem', mb: 1 }}>{cat.icon}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {cat.name}
              </Typography>
              <Chip label={`${cat.count} sản phẩm`} color="primary" size="small" />
            </Card>
          ))}
        </Box>
      </Container>

      {/* Gallery Section */}
      <Box sx={{ bgcolor: '#f0f0f0', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#DA291C' }}
          >
            📸 HÌNH ẢNH SẢN PHẨM
          </Typography>
          
          <Paper elevation={4} sx={{ p: 2, mb: 4, borderRadius: 3 }}>
            <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: '#000', borderRadius: 2, overflow: 'hidden' }}>
              <Image
                src={`/xuxumart/${productImages[currentGalleryIndex]}`}
                alt={`Gallery ${currentGalleryIndex + 1}`}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'white' },
                }}
              >
                <NavigateBefore />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'white' },
                }}
              >
                <NavigateNext />
              </IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">
                  {currentGalleryIndex + 1} / {productImages.length}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(4, 1fr)', sm: 'repeat(6, 1fr)', md: 'repeat(8, 1fr)' },
              gap: 1,
            }}
          >
            {productImages.map((img, index) => (
              <Box
                key={index}
                onClick={() => setCurrentGalleryIndex(index)}
                sx={{
                  position: 'relative',
                  paddingTop: '100%',
                  cursor: 'pointer',
                  borderRadius: 1,
                  overflow: 'hidden',
                  border: currentGalleryIndex === index ? '3px solid #DA291C' : '3px solid transparent',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: 3,
                  },
                }}
              >
                <Image
                  src={`/xuxumart/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 600px) 33vw, (max-width: 900px) 16vw, 12vw"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Location Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#DA291C' }}
        >
          📍 ĐỊA CHỈ
        </Typography>
        <Paper elevation={4} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
            }}
          >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Xuxu Mart - Chi nhánh 6
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, color: '#DA291C' }} />
                〒134-0083 東京都江戸川区中葛西３丁目１５−16
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
                3 Chome-15-16 Nakakazai, Edogawa City, Tokyo 134-0083
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Gần ga Kasai, dễ dàng di chuyển bằng tàu điện
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<LocationOn />}
                href="https://www.google.com/maps/place/%E3%80%92134-0083+%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B1%9F%E6%88%B8%E5%B7%9D%E5%8C%BA%E4%B8%AD%E8%91%9B%E8%A5%BF%EF%BC%93%E4%B8%81%E7%9B%AE%EF%BC%91%EF%BC%95%E2%88%92%EF%BC%91%EF%BC%96"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: '#DA291C',
                  '&:hover': { bgcolor: '#B71C1C' },
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Xem Bản Đồ
              </Button>
            </Box>
            <Box
              sx={{
                position: 'relative',
                paddingTop: '75%',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.5287766629845!2d139.8669563746692!3d35.66397987259276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601887ee0dec35a7%3A0x3275ca173f5825cc!2z44CSMTM0LTAwODMg5p2x5Lqs6YO95rGf5oi45bed5Yy65Lit6JGb6KW_77yT5LiB55uu77yR77yV4oiS77yR77yW!5e0!3m2!1sja!2sjp!4v1762242401387!5m2!1sja!2sjp"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Important Notice */}
      <Box sx={{ bgcolor: '#FFE4E1', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              borderLeft: '6px solid #DA291C',
              bgcolor: 'white',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#DA291C' }}>
              ⚠️ LƯU Ý QUAN TRỌNG
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              🚫 <strong>Không nhận hoa khai trương</strong>
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Image Modal */}
      <Dialog
        open={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        maxWidth={false}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.95)',
            m: 0,
            maxHeight: '100vh',
            overflow: 'hidden',
          }
        }}
      >
        {selectedImage !== null && (
          <Box 
            sx={{ 
              position: 'relative', 
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'rgba(255,255,255,0.9)',
                zIndex: 2,
                '&:hover': { bgcolor: 'white' },
              }}
            >
              <Close />
            </IconButton>
            <Box 
              sx={{ 
                position: 'relative',
                width: '90%',
                height: '90%',
              }}
            >
              <Image
                src={`/xuxumart/${productImages[selectedImage]}`}
                alt="Product detail"
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>
        )}
      </Dialog>

      {/* Grand Opening Badge */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 1000,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            bgcolor: '#FFD700',
            color: '#DA291C',
            px: 3,
            py: 2,
            borderRadius: 3,
            textAlign: 'center',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' },
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            🎊 KHAI TRƯƠNG
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            09/11/2025
          </Typography>
        </Paper>
      </Box>
    </Box>
    </>
  );
}
