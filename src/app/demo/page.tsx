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
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Fade,
  Zoom,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  PhotoCamera,
  Upload,
  EditNote,
  Timeline,
  Share,
  CheckCircle,
  PlayCircle,
  PhotoLibrary,
  People,
  AutoAwesome,
  CloudUpload,
  Image as ImageIcon,
  VideoLibrary,
} from '@mui/icons-material';
import { useI18nStore } from '@/store/i18n.store';
import ScrollToTop from '@/components/ScrollToTop';

export default function DemoPage() {
  const router = useRouter();
  const { locale } = useI18nStore();
  const [activeStep, setActiveStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [videoSlide, setVideoSlide] = useState(0);

  const videoSlides = [
    {
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
      title: locale === 'ja' ? '写真をアップロード' : locale === 'vi' ? 'Tải ảnh lên' : 'Upload Photos',
      description: locale === 'ja' 
        ? 'ドラッグ&ドロップで簡単にお子様の写真をアップロード'
        : locale === 'vi'
        ? 'Kéo thả để tải ảnh của bé lên một cách dễ dàng'
        : 'Drag & drop to easily upload your kids\' photos',
    },
    {
      image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80',
      title: locale === 'ja' ? 'マイルストーンを記録' : locale === 'vi' ? 'Ghi lại mốc phát triển' : 'Record Milestones',
      description: locale === 'ja'
        ? '初めての笑顔、初めての言葉、特別な瞬間を永遠に保存'
        : locale === 'vi'
        ? 'Nụ cười đầu tiên, từ đầu tiên, khoảnh khắc đặc biệt mãi mãi'
        : 'First smile, first word, special moments preserved forever',
    },
    {
      image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&q=80',
      title: locale === 'ja' ? '成長チャートを作成' : locale === 'vi' ? 'Tạo biểu đồ tăng trưởng' : 'Create Growth Charts',
      description: locale === 'ja'
        ? '身長、体重、発達を美しいグラフで視覚化'
        : locale === 'vi'
        ? 'Trực quan hóa chiều cao, cân nặng, phát triển bằng biểu đồ đẹp'
        : 'Visualize height, weight, development with beautiful charts',
    },
    {
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80',
      title: locale === 'ja' ? '家族と共有' : locale === 'vi' ? 'Chia sẻ với gia đình' : 'Share with Family',
      description: locale === 'ja'
        ? 'おじいちゃん、おばあちゃんと安全に思い出を共有'
        : locale === 'vi'
        ? 'Chia sẻ kỷ niệm an toàn với ông bà'
        : 'Safely share memories with grandparents',
    },
    {
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80',
      title: locale === 'ja' ? '美しいアルバム' : locale === 'vi' ? 'Album đẹp mắt' : 'Beautiful Albums',
      description: locale === 'ja'
        ? 'AI搭載の自動整理で美しいデジタルアルバムを作成'
        : locale === 'vi'
        ? 'Tạo album kỹ thuật số đẹp với AI tự động sắp xếp'
        : 'Create stunning digital albums with AI auto-organization',
    },
  ];

  // Auto-play video slides
  useEffect(() => {
    const timer = setInterval(() => {
      setVideoSlide((prev) => (prev + 1) % videoSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [videoSlides.length]);

  const demoSteps = [
    {
      label: locale === 'ja' ? '写真をアップロード' : locale === 'vi' ? 'Tải ảnh lên' : 'Upload Photos',
      description: locale === 'ja' 
        ? 'お子様の写真を簡単にアップロード。ドラッグ&ドロップまたはクリックして選択。' 
        : locale === 'vi'
        ? 'Tải ảnh của bé lên dễ dàng. Kéo thả hoặc click để chọn.'
        : 'Easily upload your kids\' photos. Drag & drop or click to select.',
      icon: <CloudUpload sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
    },
    {
      label: locale === 'ja' ? 'マイルストーンを追加' : locale === 'vi' ? 'Thêm mốc phát triển' : 'Add Milestones',
      description: locale === 'ja'
        ? '初めての笑顔、初めての言葉、初めての歩行など、特別な瞬間を記録。'
        : locale === 'vi'
        ? 'Ghi lại những khoảnh khắc đặc biệt: nụ cười đầu tiên, từ đầu tiên, bước đi đầu tiên.'
        : 'Record special moments: first smile, first word, first steps.',
      icon: <Timeline sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80',
    },
    {
      label: locale === 'ja' ? '成長を追跡' : locale === 'vi' ? 'Theo dõi tăng trưởng' : 'Track Growth',
      description: locale === 'ja'
        ? '身長、体重、発達の節目を美しいチャートとタイムラインで視覚化。'
        : locale === 'vi'
        ? 'Theo dõi chiều cao, cân nặng, và các mốc phát triển bằng biểu đồ đẹp mắt.'
        : 'Monitor height, weight, and developmental milestones with beautiful charts.',
      icon: <AutoAwesome sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
    },
    {
      label: locale === 'ja' ? '家族と共有' : locale === 'vi' ? 'Chia sẻ với gia đình' : 'Share with Family',
      description: locale === 'ja'
        ? 'おじいちゃん、おばあちゃん、家族と安全に思い出を共有。'
        : locale === 'vi'
        ? 'Chia sẻ kỷ niệm an toàn với ông bà, gia đình.'
        : 'Safely share memories with grandparents and family.',
      icon: <People sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80',
    },
    {
      label: locale === 'ja' ? '美しいアルバムを作成' : locale === 'vi' ? 'Tạo album đẹp' : 'Create Beautiful Albums',
      description: locale === 'ja'
        ? 'AI搭載の自動整理で、美しいデジタルアルバムを作成。'
        : locale === 'vi'
        ? 'Tạo album kỹ thuật số đẹp với AI tự động sắp xếp.'
        : 'Create stunning digital albums with AI-powered auto-organization.',
      icon: <PhotoLibrary sx={{ fontSize: 48 }} />,
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
    },
  ];

  const features = [
    {
      title: locale === 'ja' ? '無制限ストレージ' : locale === 'vi' ? 'Lưu trữ không giới hạn' : 'Unlimited Storage',
      description: locale === 'ja' 
        ? 'すべての思い出を保存できる無制限のクラウドストレージ。'
        : locale === 'vi'
        ? 'Lưu trữ đám mây không giới hạn cho mọi kỷ niệm.'
        : 'Unlimited cloud storage for all your memories.',
      icon: <CloudUpload />,
      color: '#667eea',
    },
    {
      title: locale === 'ja' ? 'AIスマート整理' : locale === 'vi' ? 'Sắp xếp AI thông minh' : 'AI Smart Organization',
      description: locale === 'ja'
        ? 'AIが自動的に写真を日付、イベント、人物で整理。'
        : locale === 'vi'
        ? 'AI tự động sắp xếp ảnh theo ngày, sự kiện, người.'
        : 'AI automatically organizes photos by date, event, and people.',
      icon: <AutoAwesome />,
      color: '#f093fb',
    },
    {
      title: locale === 'ja' ? 'プライバシー保護' : locale === 'vi' ? 'Bảo mật riêng tư' : 'Privacy Protected',
      description: locale === 'ja'
        ? 'エンドツーエンド暗号化で大切な思い出を守ります。'
        : locale === 'vi'
        ? 'Mã hóa đầu cuối bảo vệ kỷ niệm quý giá.'
        : 'End-to-end encryption keeps your precious memories safe.',
      icon: <CheckCircle />,
      color: '#4facfe',
    },
    {
      title: locale === 'ja' ? '簡単共有' : locale === 'vi' ? 'Chia sẻ dễ dàng' : 'Easy Sharing',
      description: locale === 'ja'
        ? 'ワンクリックで家族や友人と共有。'
        : locale === 'vi'
        ? 'Chia sẻ với gia đình, bạn bè chỉ một cú click.'
        : 'Share with family and friends with just one click.',
      icon: <Share />,
      color: '#43e97b',
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, demoSteps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => router.push('/')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 'bold' }}>
            Kids Memories - {locale === 'ja' ? 'デモ' : locale === 'vi' ? 'Demo' : 'Demo'}
          </Typography>
          <Button variant="contained" onClick={() => router.push('/auth/register')}>
            {locale === 'ja' ? '今すぐ始める' : locale === 'vi' ? 'Bắt đầu ngay' : 'Get Started'}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box>
              <PlayCircle sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {locale === 'ja' ? 'Kids Memories の使い方' : locale === 'vi' ? 'Cách sử dụng Kids Memories' : 'How Kids Memories Works'}
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                {locale === 'ja' 
                  ? 'お子様の成長を記録し、共有し、永遠に保存' 
                  : locale === 'vi'
                  ? 'Ghi lại, chia sẻ và lưu giữ mãi mãi sự phát triển của bé'
                  : 'Capture, Share, and Preserve Your Kids\' Growth Forever'}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Chip icon={<CheckCircle />} label={locale === 'ja' ? '無料トライアル' : locale === 'vi' ? 'Dùng thử miễn phí' : 'Free Trial'} sx={{ bgcolor: 'white', color: 'primary.main' }} />
                <Chip icon={<CheckCircle />} label={locale === 'ja' ? 'クレジットカード不要' : locale === 'vi' ? 'Không cần thẻ' : 'No Credit Card'} sx={{ bgcolor: 'white', color: 'primary.main' }} />
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Interactive Demo Steps */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          {locale === 'ja' ? 'ステップバイステップガイド' : locale === 'vi' ? 'Hướng dẫn từng bước' : 'Step-by-Step Guide'}
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          {locale === 'ja' 
            ? '5つの簡単なステップで思い出を整理' 
            : locale === 'vi'
            ? 'Sắp xếp kỷ niệm trong 5 bước đơn giản'
            : 'Organize your memories in 5 simple steps'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {demoSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Avatar sx={{ bgcolor: activeStep >= index ? 'primary.main' : 'grey.300', width: 40, height: 40 }}>
                        {index + 1}
                      </Avatar>
                    )}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ mb: 2 }}>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={index === demoSteps.length - 1}
                      >
                        {index === demoSteps.length - 1 
                          ? (locale === 'ja' ? '完了' : locale === 'vi' ? 'Hoàn thành' : 'Finish')
                          : (locale === 'ja' ? '次へ' : locale === 'vi' ? 'Tiếp theo' : 'Next')}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {locale === 'ja' ? '戻る' : locale === 'vi' ? 'Quay lại' : 'Back'}
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === demoSteps.length && (
              <Paper square elevation={0} sx={{ p: 3, mt: 2 }}>
                <Typography sx={{ mb: 2 }}>
                  {locale === 'ja' 
                    ? 'すべてのステップが完了しました！' 
                    : locale === 'vi'
                    ? 'Đã hoàn thành tất cả các bước!'
                    : 'All steps completed!'}
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  {locale === 'ja' ? 'リセット' : locale === 'vi' ? 'Làm lại' : 'Reset'}
                </Button>
                <Button variant="contained" onClick={() => router.push('/auth/register')}>
                  {locale === 'ja' ? '今すぐ始める' : locale === 'vi' ? 'Bắt đầu ngay' : 'Get Started'}
                </Button>
              </Paper>
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Zoom in key={activeStep} timeout={500}>
              <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Box
                  sx={{
                    height: 400,
                    backgroundImage: `url(${demoSteps[activeStep]?.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      p: 3,
                      color: 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {demoSteps[activeStep]?.icon}
                      <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold' }}>
                        {demoSteps[activeStep]?.label}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {demoSteps[activeStep]?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Box>
        </Box>
      </Container>

      {/* Features Grid */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            {locale === 'ja' ? '主な機能' : locale === 'vi' ? 'Tính năng chính' : 'Key Features'}
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            {locale === 'ja' 
              ? 'お子様の思い出をより良く管理するためのすべて' 
              : locale === 'vi'
              ? 'Mọi thứ để quản lý kỷ niệm của bé tốt hơn'
              : 'Everything to manage your kids\' memories better'}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {features.map((feature, index) => (
              <Zoom in timeout={500 + index * 100} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Zoom>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Video Demo Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          {locale === 'ja' ? 'デモビデオ' : locale === 'vi' ? 'Video Demo' : 'Video Demo'}
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
          {locale === 'ja' 
            ? '実際の動作をご覧ください' 
            : locale === 'vi'
            ? 'Xem cách hoạt động thực tế'
            : 'Watch how it works in action'}
        </Typography>

        <Card sx={{ overflow: 'hidden', borderRadius: 4, boxShadow: 8 }}>
          <Box
            sx={{
              position: 'relative',
              paddingTop: '56.25%', // 16:9 aspect ratio
              bgcolor: 'black',
            }}
          >
            <Fade in key={videoSlide} timeout={800}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${videoSlides[videoSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    p: 4,
                    color: 'white',
                  }}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {videoSlides[videoSlide].title}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      {videoSlides[videoSlide].description}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Fade>

            {/* Navigation Dots */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                display: 'flex',
                gap: 1,
                zIndex: 10,
              }}
            >
              {videoSlides.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setVideoSlide(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: videoSlide === index ? 'white' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Play Icon Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
              }}
            >
              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  width: 80,
                  height: 80,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <PlayCircle sx={{ fontSize: 60, color: 'white' }} />
              </IconButton>
            </Box>
          </Box>
        </Card>

        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<VideoLibrary />}
            onClick={() => setVideoSlide((prev) => (prev - 1 + videoSlides.length) % videoSlides.length)}
          >
            {locale === 'ja' ? '前へ' : locale === 'vi' ? 'Trước' : 'Previous'}
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push('/auth/register')}
            sx={{ px: 4 }}
          >
            {locale === 'ja' ? '今すぐ始める' : locale === 'vi' ? 'Bắt đầu ngay' : 'Start Free Trial'}
          </Button>
          <Button
            variant="outlined"
            endIcon={<VideoLibrary />}
            onClick={() => setVideoSlide((prev) => (prev + 1) % videoSlides.length)}
          >
            {locale === 'ja' ? '次へ' : locale === 'vi' ? 'Tiếp theo' : 'Next'}
          </Button>
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {locale === 'ja' ? '今すぐ始めましょう' : locale === 'vi' ? 'Bắt đầu ngay hôm nay' : 'Start Today'}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {locale === 'ja' 
                ? 'お子様の貴重な思い出を保存し、整理し、共有しましょう' 
                : locale === 'vi'
                ? 'Lưu giữ, sắp xếp và chia sẻ những kỷ niệm quý giá của bé'
                : 'Preserve, organize, and share your kids\' precious memories'}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/auth/register')}
                sx={{ bgcolor: 'white', color: 'primary.main', px: 4, '&:hover': { bgcolor: 'grey.100' } }}
              >
                {locale === 'ja' ? '無料で始める' : locale === 'vi' ? 'Bắt đầu miễn phí' : 'Start Free Trial'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/')}
                sx={{ borderColor: 'white', color: 'white', px: 4 }}
              >
                {locale === 'ja' ? 'ホームに戻る' : locale === 'vi' ? 'Về trang chủ' : 'Back to Home'}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </Box>
  );
}
