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
  '573057028_3351158115041623_4757360571918735491_n.jpg',
  '573064061_3351158788374889_8638306234797834028_n.jpg',
  '573523313_3351158098374958_4271109276227271218_n.jpg',
  '573630272_3351157758374992_4320315322111282645_n.jpg',
  '574234242_3351159008374867_3359187776635182227_n.jpg',
  '574273289_3351159178374850_3224986654074211920_n.jpg',
  '574276440_3351159308374837_4766897448492775405_n.jpg',
  '574291494_3351158061708295_1566240211981232985_n.jpg',
  '574291507_3351158731708228_1309072286612504923_n.jpg',
  '574342344_3351159485041486_1250576433117600947_n.jpg',
  '574345839_3351159321708169_2645469863535005317_n.jpg',
  '574450966_3351159015041533_7232852369075813288_n.jpg',
  '574486126_3351157945041640_7698102914661224923_n.jpg',
  '574497306_3351159628374805_5366871168783228684_n.jpg',
  '574570819_3351158785041556_944187715543707765_n.jpg',
  '574570825_3351158528374915_5906691708267235994_n.jpg',
  '574571864_3351158618374906_2892032974951330317_n.jpg',
  '574573578_3351157898374978_7884963762776547491_n.jpg',
  '574848857_3351159351708166_5186347484902614287_n.jpg',
  '574857111_3351159748374793_7894036739851136437_n.jpg',
  '574877703_3351158735041561_7967120108760969314_n.jpg',
  '575084827_3351159208374847_77145848479138170_n.jpg',
  '575120580_3351159265041508_389107606259318729_n.jpg',
  '575174760_3351159608374807_1677727373772475975_n.jpg',
  '575177369_3351158675041567_2313194535708942373_n.jpg',
  '576375581_3351158071708294_1279803549433448649_n.jpg',
  '576757174_3351159251708176_6080699184736758684_n.jpg',
  '577398017_3351159765041458_8202839928528456283_n.jpg',
  '577538565_3351158481708253_5190205273820757896_n.jpg',
];

const hotDeals = [
  { name: 'Ba Chỉ', price: '¥320/100g', image: 0 },
  { name: 'Móng Giò', price: '¥258/100g', image: 1 },
  { name: 'Vịt Quay', price: '¥248/100g', image: 2 },
  { name: 'Gà Luộc', price: '¥178/100g', image: 3 },
  { name: 'Giò Lụa', price: '¥298/100g', image: 4 },
  { name: 'Chuối', price: '¥198/kg', image: 5 },
  { name: 'Quýt', price: '¥258/kg', image: 6 },
  { name: 'Dứa', price: '¥298/kg', image: 7 },
  { name: 'Bắp Cải', price: '¥88/kg', image: 8 },
];

const desserts = [
  { name: 'Chè Thập Cẩm', price: '¥200', image: 9 },
  { name: 'Chè Dừa', price: '¥200', image: 10 },
  { name: 'Chè Sầu Riêng', price: '¥250', image: 11 },
  { name: 'Chè Khoai Môn', price: '¥200', image: 12 },
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
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #DA291C 0%, #FF6B6B 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>🇻🇳</Typography>
              <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>🇯🇵</Typography>
            </Box>

            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              XUXU MART
            </Typography>
            
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 1 }}>
              CHI NHÁNH 6 - KASAI
            </Typography>

            <Chip
              icon={<Storefront />}
              label="KHAI TRƯƠNG"
              sx={{
                bgcolor: 'white',
                color: '#DA291C',
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.2rem' },
                px: 2,
                py: 3,
                mb: 3,
              }}
            />

            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mb: 1 }}>
              📅 Thứ Bảy, 09/11/2025
            </Typography>
            <Typography variant={isMobile ? 'body1' : 'h6'}>
              ⏰ 9:00 Sáng
            </Typography>
          </Box>

          {/* Countdown Timer */}
          <Paper
            elevation={6}
            sx={{
              maxWidth: 600,
              mx: 'auto',
              p: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Schedule sx={{ mr: 1, color: '#DA291C' }} />
              <Typography variant="h6" sx={{ color: '#DA291C', fontWeight: 'bold' }}>
                Đếm Ngược Khai Trương
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
              {[
                { label: 'Ngày', value: timeLeft.days },
                { label: 'Giờ', value: timeLeft.hours },
                { label: 'Phút', value: timeLeft.minutes },
                { label: 'Giây', value: timeLeft.seconds },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    bgcolor: '#DA291C',
                    color: 'white',
                    borderRadius: 2,
                    p: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {String(item.value).padStart(2, '0')}
                  </Typography>
                  <Typography variant="caption">{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
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
                1 Chome-1-6 Kasai, Edogawa City, Tokyo 134-0083, Japan
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Gần ga Kasai, dễ dàng di chuyển bằng tàu điện
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<LocationOn />}
                href="https://maps.app.goo.gl/4FpCuQXDBJwG8JXW8"
                target="_blank"
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8266057876797!2d139.8595!3d35.6644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188906d9e0d8db%3A0x3c0c0c0c0c0c0c0!2s1%20Chome-1-6%20Kasai%2C%20Edogawa%20City%2C%20Tokyo%20134-0083%2C%20Japan!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus"
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

      {/* Footer */}
      <Box sx={{ bgcolor: '#DA291C', color: 'white', py: 4, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            XUXU MART - CHI NHÁNH 6
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Siêu thị thực phẩm Việt Nam uy tín tại Nhật Bản
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © 2025 Xuxu Mart. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Image Modal */}
      <Dialog
        open={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedImage !== null && (
          <Box sx={{ position: 'relative', bgcolor: '#000' }}>
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'rgba(255,255,255,0.9)',
                zIndex: 1,
                '&:hover': { bgcolor: 'white' },
              }}
            >
              <Close />
            </IconButton>
            <Box sx={{ position: 'relative', paddingTop: '100%' }}>
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
  );
}
