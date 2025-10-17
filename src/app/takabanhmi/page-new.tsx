'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
  Stack,
  IconButton,
  Fade,
  Zoom,
} from '@mui/material';
import {
  RestaurantMenu,
  LocalPhone,
  LocationOn,
  Star,
  Instagram,
  Facebook,
  Twitter,
  DirectionsBike,
  ArrowForward,
  ArrowBack,
  CheckCircle,
} from '@mui/icons-material';
import { useI18nStore } from '@/store/i18n.store';
import { Locale } from '@/config/i18n.config';

export default function TakaBanhmiPage() {
  const theme = useTheme();
  const { takabanhmi: t, locale, setLocale } = useI18nStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Set default language to Japanese for Taka Banh mi page
  useEffect(() => {
    if (locale !== 'ja') {
      setLocale('ja');
    }
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (!t?.slider?.slides) return;
    
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % t.slider.slides.length);
        setFadeIn(true);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [t]);

  if (!t) {
    return <Box>Loading...</Box>;
  }

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  const nextSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % t.slider.slides.length);
      setFadeIn(true);
    }, 300);
  };

  const prevSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + t.slider.slides.length) % t.slider.slides.length);
      setFadeIn(true);
    }, 300);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Language Switcher - Fixed Top Right */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        <Stack direction="row" spacing={1} sx={{ bgcolor: 'white', borderRadius: 2, p: 0.5, boxShadow: 3 }}>
          <Button
            variant={locale === 'vi' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleLanguageChange('vi')}
            sx={{ minWidth: 60 }}
          >
            🇻🇳 VI
          </Button>
          <Button
            variant={locale === 'en' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleLanguageChange('en')}
            sx={{ minWidth: 60 }}
          >
            🇺🇸 EN
          </Button>
          <Button
            variant={locale === 'ja' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleLanguageChange('ja')}
            sx={{ minWidth: 60 }}
          >
            🇯🇵 JA
          </Button>
        </Stack>
      </Box>

      {/* Hero Slider Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '90vh' },
          overflow: 'hidden',
        }}
      >
        {/* Slider Image */}
        <Fade in={fadeIn} timeout={1000}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${t.slider.slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'all 0.5s ease-in-out',
            }}
          />
        </Fade>

        {/* Slider Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            zIndex: 2,
          }}
        >
          <Fade in={fadeIn} timeout={1500}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {t.slider.slides[currentSlide].title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1.2rem', md: '2rem' },
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {t.slider.slides[currentSlide].subtitle}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: '#FF6B6B',
                    color: 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    '&:hover': { bgcolor: '#E55555', transform: 'scale(1.05)' },
                    transition: 'all 0.3s',
                  }}
                >
                  {t.hero.ctaPrimary}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  {t.hero.ctaSecondary}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>

        {/* Slider Navigation */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'white' },
            zIndex: 3,
          }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'white' },
            zIndex: 3,
          }}
        >
          <ArrowForward />
        </IconButton>

        {/* Slider Dots */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
          }}
        >
          {t.slider.slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setFadeIn(true);
                }, 300);
              }}
              sx={{
                width: currentSlide === index ? 40 : 12,
                height: 12,
                borderRadius: 6,
                bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': { bgcolor: 'white' },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Features Section with Icons */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          {t.features.title}
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          {t.features.subtitle}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {t.features.items.map((item, index) => (
            <Zoom in={true} timeout={500 + index * 200} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {item.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          ))}
        </Box>
      </Container>

      {/* Menu Section with Real Images */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.menu.title}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            {t.menu.subtitle}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 4,
            }}
          >
            {t.menu.items.map((item, index) => (
              <Zoom in={true} timeout={700 + index * 200} key={index}>
                <Card
                  sx={{
                    position: 'relative',
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 8,
                    },
                    border: item.popular ? '3px solid #FF6B6B' : 'none',
                  }}
                >
                  {item.popular && (
                    <Chip
                      label={t.menu.popularTag}
                      color="error"
                      icon={<Star />}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1,
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.05)' },
                          '100%': { transform: 'scale(1)' },
                        },
                      }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.nameJa}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                      {item.description}
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                      {t.menu.currency}{item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<RestaurantMenu />}
              sx={{
                bgcolor: '#FF6B6B',
                color: 'white',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#E55555' },
              }}
            >
              {t.menu.viewAllMenu}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About/Story Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          {t.about.title}
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          {t.about.subtitle}
        </Typography>

        <Card sx={{ p: 4, boxShadow: 4 }}>
          <Typography variant="body1" sx={{ lineHeight: 2, fontSize: '1.1rem', mb: 3 }}>
            {t.about.content}
          </Typography>
          <Typography variant="h5" sx={{ fontStyle: 'italic', color: '#FF6B6B', textAlign: 'right' }}>
            {t.story.signature}
          </Typography>
        </Card>
      </Container>

      {/* Order & Access Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.orderAccess.title}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            {t.orderAccess.subtitle}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 4,
            }}
          >
            {/* Online Order */}
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {t.orderAccess.onlineOrder.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {t.orderAccess.onlineOrder.subtitle}
                </Typography>

                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ bgcolor: '#06C167', '&:hover': { bgcolor: '#05A857' } }}
                    startIcon={<DirectionsBike />}
                  >
                    {t.orderAccess.onlineOrder.uberEats}
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ bgcolor: '#FF6B6B', '&:hover': { bgcolor: '#E55555' } }}
                    startIcon={<RestaurantMenu />}
                  >
                    {t.orderAccess.onlineOrder.demaecan}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<LocalPhone />}
                    href="tel:090-3370-8501"
                  >
                    {t.orderAccess.onlineOrder.phone}
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Store Info */}
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  {t.orderAccess.storeInfo.title}
                </Typography>

                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <LocationOn color="error" />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t.orderAccess.storeInfo.address}
                      </Typography>
                    </Stack>
                    <Typography variant="body1">{t.orderAccess.storeInfo.addressDetail}</Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <CheckCircle color="success" />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t.orderAccess.storeInfo.hours}
                      </Typography>
                    </Stack>
                    <Typography variant="body1">{t.orderAccess.storeInfo.hoursDetail}</Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <LocalPhone color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t.orderAccess.storeInfo.phone}
                      </Typography>
                    </Stack>
                    <Typography variant="body1">{t.orderAccess.storeInfo.phoneDetail}</Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ bgcolor: '#4285F4', '&:hover': { bgcolor: '#3367D6' }, mt: 2 }}
                    startIcon={<LocationOn />}
                    onClick={() =>
                      window.open(
                        'https://www.google.com/maps/place/Taka+Banh+mi',
                        '_blank'
                      )
                    }
                  >
                    {t.orderAccess.storeInfo.viewMap}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#2C3E50', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Taka Banh mi
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              {t.footer.description}
            </Typography>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              {t.footer.followUs}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <IconButton
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                href="https://www.instagram.com/takabanhmi/"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                href="https://facebook.com/"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                href="https://x.com/takabanhmi"
                target="_blank"
              >
                <Twitter />
              </IconButton>
            </Stack>

            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {t.footer.copyright}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
