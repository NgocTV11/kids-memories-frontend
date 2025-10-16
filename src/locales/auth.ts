import { Locale } from '@/config/i18n.config';

export const authTranslations = {
  vi: {
    // Hero Section (Left side)
    hero: {
      appTitle: 'Kids Memories',
      tagline: 'Lưu giữ những khoảnh khắc quý giá của bé yêu',
      
      // Login page features
      albums: 'Albums',
      albumsDesc: 'Tổ chức ảnh đẹp',
      timeline: 'Timeline',
      timelineDesc: 'Dòng thời gian',
      milestones: 'Milestones',
      milestonesDesc: 'Mốc phát triển',
      memories: 'Memories',
      memoriesDesc: 'Kỷ niệm vĩnh cửu',
      
      // Register page steps
      startJourney: 'Bắt đầu hành trình',
      captureMoments: 'Lưu giữ từng khoảnh khắc đáng nhớ',
      
      step1Title: 'Đăng ký tài khoản',
      step1Desc: 'Tạo tài khoản miễn phí chỉ trong 1 phút',
      
      step2Title: 'Tải ảnh lên',
      step2Desc: 'Upload và tổ chức ảnh theo albums',
      
      step3Title: 'Thưởng thức',
      step3Desc: 'Xem lại những kỷ niệm đẹp bất cứ lúc nào',
      
      securityTitle: 'An toàn & Bảo mật',
      securityDesc: 'Dữ liệu được mã hóa và lưu trữ an toàn',
    },
    
    // Login page
    login: {
      title: 'Đăng Nhập',
      subtitle: 'Chào mừng trở lại! Đăng nhập để tiếp tục.',
      emailLabel: 'Email',
      emailPlaceholder: 'Nhập email của bạn',
      passwordLabel: 'Mật khẩu',
      passwordPlaceholder: 'Nhập mật khẩu',
      rememberMe: 'Ghi nhớ đăng nhập',
      forgotPassword: 'Quên mật khẩu?',
      loginButton: 'Đăng Nhập',
      orLoginWith: 'Hoặc đăng nhập với',
      googleLogin: 'Đăng nhập với Google',
      noAccount: 'Chưa có tài khoản?',
      signUp: 'Đăng ký ngay',
      loggingIn: 'Đang đăng nhập...',
    },
    
    // Register page
    register: {
      title: 'Đăng Ký',
      subtitle: 'Tạo tài khoản mới để bắt đầu',
      fullNameLabel: 'Họ và tên',
      fullNamePlaceholder: 'Nhập họ và tên',
      emailLabel: 'Email',
      emailPlaceholder: 'Nhập email',
      passwordLabel: 'Mật khẩu',
      passwordPlaceholder: 'Tạo mật khẩu',
      confirmPasswordLabel: 'Xác nhận mật khẩu',
      confirmPasswordPlaceholder: 'Nhập lại mật khẩu',
      agreeToTerms: 'Tôi đồng ý với',
      termsOfService: 'Điều khoản dịch vụ',
      and: 'và',
      privacyPolicy: 'Chính sách bảo mật',
      registerButton: 'Đăng Ký',
      orRegisterWith: 'Hoặc đăng ký với',
      googleRegister: 'Đăng ký với Google',
      haveAccount: 'Đã có tài khoản?',
      signIn: 'Đăng nhập',
      registering: 'Đang đăng ký...',
    },
    
    // Validation messages
    validation: {
      emailRequired: 'Email là bắt buộc',
      emailInvalid: 'Email không hợp lệ',
      passwordRequired: 'Mật khẩu là bắt buộc',
      passwordMinLength: 'Mật khẩu phải có ít nhất 6 ký tự',
      passwordNotMatch: 'Mật khẩu không khớp',
      fullNameRequired: 'Họ và tên là bắt buộc',
      termsRequired: 'Bạn phải đồng ý với điều khoản',
    },
    
    // Success/Error messages
    loginSuccess: 'Đăng nhập thành công!',
    loginError: 'Email hoặc mật khẩu không đúng',
    registerSuccess: 'Đăng ký thành công! Vui lòng đăng nhập.',
    registerError: 'Không thể đăng ký. Email có thể đã được sử dụng.',
    googleAuthError: 'Không thể đăng nhập với Google',
  },
  en: {
    // Hero Section (Left side)
    hero: {
      appTitle: 'Kids Memories',
      tagline: 'Preserve precious moments of your little ones',
      
      // Login page features
      albums: 'Albums',
      albumsDesc: 'Organize photos beautifully',
      timeline: 'Timeline',
      timelineDesc: 'Timeline view',
      milestones: 'Milestones',
      milestonesDesc: 'Development milestones',
      memories: 'Memories',
      memoriesDesc: 'Forever memories',
      
      // Register page steps
      startJourney: 'Start Your Journey',
      captureMoments: 'Capture every precious moment',
      
      step1Title: 'Create Account',
      step1Desc: 'Free account in just 1 minute',
      
      step2Title: 'Upload Photos',
      step2Desc: 'Upload and organize photos in albums',
      
      step3Title: 'Enjoy',
      step3Desc: 'Relive beautiful memories anytime',
      
      securityTitle: 'Safe & Secure',
      securityDesc: 'Data is encrypted and securely stored',
    },
    
    // Login page
    login: {
      title: 'Login',
      subtitle: 'Welcome back! Login to continue.',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Login',
      orLoginWith: 'Or login with',
      googleLogin: 'Login with Google',
      noAccount: 'Don\'t have an account?',
      signUp: 'Sign up now',
      loggingIn: 'Logging in...',
    },
    
    // Register page
    register: {
      title: 'Register',
      subtitle: 'Create a new account to get started',
      fullNameLabel: 'Full name',
      fullNamePlaceholder: 'Enter full name',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create password',
      confirmPasswordLabel: 'Confirm password',
      confirmPasswordPlaceholder: 'Re-enter password',
      agreeToTerms: 'I agree to the',
      termsOfService: 'Terms of Service',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      registerButton: 'Register',
      orRegisterWith: 'Or register with',
      googleRegister: 'Register with Google',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
      registering: 'Registering...',
    },
    
    // Validation messages
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      passwordNotMatch: 'Passwords do not match',
      fullNameRequired: 'Full name is required',
      termsRequired: 'You must agree to the terms',
    },
    
    // Success/Error messages
    loginSuccess: 'Login successful!',
    loginError: 'Invalid email or password',
    registerSuccess: 'Registration successful! Please login.',
    registerError: 'Unable to register. Email may already be in use.',
    googleAuthError: 'Unable to login with Google',
  },
  ja: {
    // Hero Section (Left side)
    hero: {
      appTitle: 'Kids Memories',
      tagline: 'お子様の大切な瞬間を記録',
      
      // Login page features
      albums: 'アルバム',
      albumsDesc: '美しく写真を整理',
      timeline: 'タイムライン',
      timelineDesc: 'タイムライン表示',
      milestones: 'マイルストーン',
      milestonesDesc: '発達の記録',
      memories: '思い出',
      memoriesDesc: '永遠の思い出',
      
      // Register page steps
      startJourney: '旅を始めましょう',
      captureMoments: '大切な瞬間を記録',
      
      step1Title: 'アカウント作成',
      step1Desc: 'わずか1分で無料アカウント',
      
      step2Title: '写真アップロード',
      step2Desc: 'アルバムで写真を整理',
      
      step3Title: '楽しむ',
      step3Desc: 'いつでも思い出を振り返る',
      
      securityTitle: '安全・セキュア',
      securityDesc: 'データは暗号化され安全に保存',
    },
    
    // Login page
    login: {
      title: 'ログイン',
      subtitle: 'おかえりなさい！続けるにはログインしてください。',
      emailLabel: 'メール',
      emailPlaceholder: 'メールアドレスを入力',
      passwordLabel: 'パスワード',
      passwordPlaceholder: 'パスワードを入力',
      rememberMe: 'ログイン状態を保持',
      forgotPassword: 'パスワードをお忘れですか？',
      loginButton: 'ログイン',
      orLoginWith: 'または以下でログイン',
      googleLogin: 'Googleでログイン',
      noAccount: 'アカウントをお持ちでないですか？',
      signUp: '今すぐ登録',
      loggingIn: 'ログイン中...',
    },
    
    // Register page
    register: {
      title: '登録',
      subtitle: '新しいアカウントを作成して始めましょう',
      fullNameLabel: '氏名',
      fullNamePlaceholder: '氏名を入力',
      emailLabel: 'メール',
      emailPlaceholder: 'メールアドレスを入力',
      passwordLabel: 'パスワード',
      passwordPlaceholder: 'パスワードを作成',
      confirmPasswordLabel: 'パスワード確認',
      confirmPasswordPlaceholder: 'パスワードを再入力',
      agreeToTerms: '同意します',
      termsOfService: '利用規約',
      and: 'と',
      privacyPolicy: 'プライバシーポリシー',
      registerButton: '登録',
      orRegisterWith: 'または以下で登録',
      googleRegister: 'Googleで登録',
      haveAccount: 'すでにアカウントをお持ちですか？',
      signIn: 'サインイン',
      registering: '登録中...',
    },
    
    // Validation messages
    validation: {
      emailRequired: 'メールは必須です',
      emailInvalid: '無効なメール',
      passwordRequired: 'パスワードは必須です',
      passwordMinLength: 'パスワードは6文字以上である必要があります',
      passwordNotMatch: 'パスワードが一致しません',
      fullNameRequired: '氏名は必須です',
      termsRequired: '利用規約に同意する必要があります',
    },
    
    // Success/Error messages
    loginSuccess: 'ログインに成功しました！',
    loginError: 'メールまたはパスワードが無効です',
    registerSuccess: '登録が成功しました！ログインしてください。',
    registerError: '登録できません。メールが既に使用されている可能性があります。',
    googleAuthError: 'Googleでログインできません',
  },
};

export const getAuthTranslation = (locale: Locale) => authTranslations[locale];
