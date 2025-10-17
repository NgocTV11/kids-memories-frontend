'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  MenuItem,
  Menu,
  Fade,
} from '@mui/material';
import {
  PhotoLibrary,
  TrendingUp,
  People,
  Timeline,
  PhotoAlbum,
  Security,
  Check,
  Star,
  Language,
  Menu as MenuIcon,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import { useI18nStore } from '@/store/i18n.store';
import { Locale } from '@/config/i18n.config';

export default function LandingPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { landing: t, locale, setLocale } = useI18nStore();
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const features = [
    {
      icon: <PhotoLibrary sx={{ fontSize: 48, color: 'primary.main' }} />,
      ...t.features.items[0],
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: 'success.main' }} />,
      ...t.features.items[1],
    },
    {
      icon: <People sx={{ fontSize: 48, color: 'secondary.main' }} />,
      ...t.features.items[2],
    },
    {
      icon: <Timeline sx={{ fontSize: 48, color: 'info.main' }} />,
      ...t.features.items[3],
    },
    {
      icon: <PhotoAlbum sx={{ fontSize: 48, color: 'warning.main' }} />,
      ...t.features.items[4],
    },
    {
      icon: <Security sx={{ fontSize: 48, color: 'error.main' }} />,
      ...t.features.items[5],
    },
  ];

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLangAnchor(null);
  };

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    handleLanguageClose();
  };

  const getLanguageName = (lang: Locale) => {
    const names = { vi: 'Tiếng Việt', en: 'English', ja: '日本語' };
    return names[lang];
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Slider functions
  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev + 1) % t.slider.slides.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev - 1 + t.slider.slides.length) % t.slider.slides.length);
  };

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
  };

  // Auto-play slider
  useEffect(() => {
    if (!t.slider?.slides || t.slider.slides.length === 0) {
      return;
    }
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, t.slider?.slides?.length]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header/Navbar */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <PhotoLibrary sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Kids Memories
            </Typography>
          </Box>

          {!isMobile && (
            <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
              <Button color="inherit" sx={{ color: 'text.primary' }} onClick={() => scrollToSection('features')}>{t.nav.features}</Button>
              <Button color="inherit" sx={{ color: 'text.primary' }} onClick={() => scrollToSection('how-it-works')}>{t.nav.howItWorks}</Button>
              <Button color="inherit" sx={{ color: 'text.primary' }} onClick={() => scrollToSection('pricing')}>{t.nav.pricing}</Button>
            </Stack>
          )}

          <IconButton onClick={handleLanguageClick} sx={{ mr: 1 }}>
            <Language />
          </IconButton>
          <Menu
            anchorEl={langAnchor}
            open={Boolean(langAnchor)}
            onClose={handleLanguageClose}
          >
            <MenuItem selected={locale === 'vi'} onClick={() => handleLanguageChange('vi')}>
              🇻🇳 Tiếng Việt
            </MenuItem>
            <MenuItem selected={locale === 'en'} onClick={() => handleLanguageChange('en')}>
              🇺🇸 English
            </MenuItem>
            <MenuItem selected={locale === 'ja'} onClick={() => handleLanguageChange('ja')}>
              🇯🇵 日本語
            </MenuItem>
          </Menu>

          <Button variant="outlined" onClick={() => router.push('/auth/login')} sx={{ mr: 1 }}>
            {t.nav.login}
          </Button>
          <Button variant="contained" onClick={() => router.push('/auth/register')}>
            {t.nav.register}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                {t.hero.title}
                <br />
                {t.hero.subtitle}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
                {t.hero.description}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/auth/register')}
                  sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  {t.hero.cta}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  {t.hero.secondary}
                </Button>
              </Stack>

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                {[
                  { label: t.hero.stats.families, value: '10,000+' },
                  { label: t.hero.stats.photos, value: '1M+' },
                  { label: t.hero.stats.countries, value: '50+' },
                ].map((stat) => (
                  <Box key={stat.label} sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>{stat.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80"
                  alt="Happy family"
                  style={{ width: '100%', display: 'block' }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Slider Section */}
      {t.slider?.slides && t.slider.slides.length > 0 && (
        <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t.slider.title}
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
              {t.slider.subtitle}
            </Typography>

            <Box sx={{ position: 'relative', height: { xs: '400px', md: '500px' } }}>
              {/* Slides */}
              {t.slider.slides.map((slide, index) => (
              <Fade key={index} in={currentSlide === index} timeout={1000}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: currentSlide === index ? 'flex' : 'none',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  {/* Text Content */}
                  <Box sx={{ flex: 1, zIndex: 2 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 'bold',
                        mb: 3,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        color: 'primary.main',
                      }}
                    >
                      {slide.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                      {slide.description}
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => router.push('/auth/register')}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      {t.hero.cta}
                    </Button>
                  </Box>

                  {/* Image */}
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                        height: { xs: '250px', md: '400px' },
                      }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Fade>
            ))}

            {/* Navigation Arrows */}
            <IconButton
              onClick={prevSlide}
              sx={{
                position: 'absolute',
                left: { xs: 0, md: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: 2,
                '&:hover': { bgcolor: 'grey.100' },
                zIndex: 3,
              }}
            >
              <ArrowBackIos sx={{ ml: 1 }} />
            </IconButton>
            <IconButton
              onClick={nextSlide}
              sx={{
                position: 'absolute',
                right: { xs: 0, md: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: 2,
                '&:hover': { bgcolor: 'grey.100' },
                zIndex: 3,
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>

          {/* Dots Indicator */}
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 4 }}>
            {t.slider.slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => goToSlide(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: currentSlide === index ? 'primary.main' : 'grey.400',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: currentSlide === index ? 'primary.dark' : 'grey.500',
                    transform: 'scale(1.2)',
                  },
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>
      )}

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }} id="features">
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          {t.features.title}
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          {t.features.subtitle}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
              }}
            >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Box>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }} id="how-it-works">
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.howItWorks.title}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            {t.howItWorks.subtitle}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {t.howItWorks.steps.map((step, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          {t.testimonials.title}
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          {t.testimonials.subtitle}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {t.testimonials.items.map((testimonial, index) => (
            <Card key={index} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                  ))}
                </Stack>
                <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                  &ldquo;{testimonial.content}&rdquo;
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {testimonial.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Pricing */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }} id="pricing">
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.pricing.title}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            {t.pricing.subtitle}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4, maxWidth: '1200px', mx: 'auto' }}>
            {t.pricing.plans.map((plan, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: plan.popular ? 3 : 0,
                  borderColor: 'primary.main',
                  transform: plan.popular ? 'scale(1.05)' : 'none',
                }}
              >
                {plan.popular && (
                  <Chip
                    label="POPULAR"
                    color="primary"
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                  />
                )}
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {plan.description}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      {plan.price}
                      <Typography component="span" variant="h6" color="text.secondary">
                        {plan.currency}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      /{plan.period}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 3 }} />
                  <Stack spacing={2} sx={{ mb: 3, textAlign: 'left' }}>
                    {plan.features.map((feature, i) => (
                      <Stack direction="row" spacing={1} key={i}>
                        <Check sx={{ color: 'success.main', fontSize: 20 }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    onClick={() => router.push('/auth/register')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.cta.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
            {t.cta.subtitle}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/auth/register')}
            sx={{ bgcolor: 'white', color: 'primary.main', px: 6, '&:hover': { bgcolor: 'grey.100' } }}
          >
            {t.cta.button}
          </Button>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
            {t.cta.note}
          </Typography>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '2fr 1fr 1fr 1fr' }, gap: 4 }}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <PhotoLibrary sx={{ fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Kids Memories
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                {t.footer.tagline}
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" sx={{ color: 'white' }}><Facebook /></IconButton>
                <IconButton size="small" sx={{ color: 'white' }}><Twitter /></IconButton>
                <IconButton size="small" sx={{ color: 'white' }}><Instagram /></IconButton>
                <IconButton size="small" sx={{ color: 'white' }}><LinkedIn /></IconButton>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t.footer.product}
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.features}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.pricing}
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t.footer.company}
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.about}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.blog}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.contact}
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t.footer.support}
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.help}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.privacy}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>
                  {t.footer.terms}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Divider sx={{ my: 4, bgcolor: 'grey.700' }} />
          <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
            {t.footer.copyright}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
