import { Locale } from '@/config/i18n.config';

// Common translations
export const common = {
  vi: {
    // App
    appName: 'Kids Memories',
    appDescription: 'Lưu giữ kỷ niệm gia đình',
    
    // Navigation
    home: 'Trang chủ',
    dashboard: 'Bảng điều khiển',
    families: 'Gia đình',
    kids: 'Trẻ em',
    albums: 'Album',
    photos: 'Ảnh',
    milestones: 'Cột mốc',
    profile: 'Hồ sơ',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
    
    // Actions
    create: 'Tạo mới',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    save: 'Lưu',
    cancel: 'Hủy',
    close: 'Đóng',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    upload: 'Tải lên',
    download: 'Tải xuống',
    share: 'Chia sẻ',
    view: 'Xem',
    back: 'Quay lại',
    next: 'Tiếp',
    confirm: 'Xác nhận',
    
    // Status
    loading: 'Đang tải...',
    success: 'Thành công!',
    error: 'Lỗi!',
    warning: 'Cảnh báo!',
    info: 'Thông tin',
    
    // Auth
    login: 'Đăng nhập',
    register: 'Đăng ký',
    loginWithGoogle: 'Đăng nhập với Google',
    email: 'Email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    forgotPassword: 'Quên mật khẩu?',
    rememberMe: 'Ghi nhớ đăng nhập',
    
    // Messages
    welcomeBack: 'Chào mừng trở lại!',
    noData: 'Không có dữ liệu',
    confirmDelete: 'Bạn có chắc muốn xóa?',
    deleteSuccess: 'Xóa thành công',
    saveSuccess: 'Lưu thành công',
    uploadSuccess: 'Tải lên thành công',
    
    // Language
    language: 'Ngôn ngữ',
    changeLanguage: 'Đổi ngôn ngữ',
  },
  en: {
    // App
    appName: 'Kids Memories',
    appDescription: 'Preserve family memories',
    
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    families: 'Families',
    kids: 'Kids',
    albums: 'Albums',
    photos: 'Photos',
    milestones: 'Milestones',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // Actions
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    search: 'Search',
    filter: 'Filter',
    upload: 'Upload',
    download: 'Download',
    share: 'Share',
    view: 'View',
    back: 'Back',
    next: 'Next',
    confirm: 'Confirm',
    
    // Status
    loading: 'Loading...',
    success: 'Success!',
    error: 'Error!',
    warning: 'Warning!',
    info: 'Information',
    
    // Auth
    login: 'Login',
    register: 'Register',
    loginWithGoogle: 'Login with Google',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember me',
    
    // Messages
    welcomeBack: 'Welcome back!',
    noData: 'No data',
    confirmDelete: 'Are you sure you want to delete?',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    uploadSuccess: 'Uploaded successfully',
    
    // Language
    language: 'Language',
    changeLanguage: 'Change Language',
  },
  ja: {
    // App
    appName: 'Kids Memories',
    appDescription: '家族の思い出を保存',
    
    // Navigation
    home: 'ホーム',
    dashboard: 'ダッシュボード',
    families: '家族',
    kids: '子供',
    albums: 'アルバム',
    photos: '写真',
    milestones: 'マイルストーン',
    profile: 'プロフィール',
    settings: '設定',
    logout: 'ログアウト',
    
    // Actions
    create: '作成',
    edit: '編集',
    delete: '削除',
    save: '保存',
    cancel: 'キャンセル',
    close: '閉じる',
    search: '検索',
    filter: 'フィルター',
    upload: 'アップロード',
    download: 'ダウンロード',
    share: '共有',
    view: '表示',
    back: '戻る',
    next: '次へ',
    confirm: '確認',
    
    // Status
    loading: '読み込み中...',
    success: '成功！',
    error: 'エラー！',
    warning: '警告！',
    info: '情報',
    
    // Auth
    login: 'ログイン',
    register: '登録',
    loginWithGoogle: 'Googleでログイン',
    email: 'メール',
    password: 'パスワード',
    confirmPassword: 'パスワード確認',
    forgotPassword: 'パスワードを忘れた？',
    rememberMe: 'ログイン状態を保持',
    
    // Messages
    welcomeBack: 'おかえりなさい！',
    noData: 'データがありません',
    confirmDelete: '本当に削除しますか？',
    deleteSuccess: '削除しました',
    saveSuccess: '保存しました',
    uploadSuccess: 'アップロードしました',
    
    // Language
    language: '言語',
    changeLanguage: '言語を変更',
  },
};

// Get translation function
export function getTranslation(locale: Locale) {
  return common[locale];
}
