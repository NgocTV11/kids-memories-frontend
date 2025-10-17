import { Locale } from '@/config/i18n.config';

// Profile page translations
export const profile = {
  vi: {
    // Header
    title: 'Thông Tin Cá Nhân',
    subtitle: 'Quản lý thông tin tài khoản của bạn',
    
    // Sections
    avatarSection: 'Ảnh đại diện',
    accountInfo: 'Thông Tin Tài Khoản',
    securitySettings: 'Bảo mật',
    
    // Form labels
    displayName: 'Tên hiển thị',
    email: 'Email',
    emailHelper: 'Email không thể thay đổi',
    language: 'Ngôn ngữ',
    languageHelper: 'Chọn ngôn ngữ hiển thị',
    role: 'Vai trò',
    joinedDate: 'Ngày tham gia',
    
    // Avatar
    changeAvatar: 'Đổi ảnh đại diện',
    uploadAvatar: 'Tải ảnh lên',
    avatarError: 'Vui lòng chọn file ảnh',
    avatarSizeError: 'Kích thước ảnh tối đa 5MB',
    
    // Actions
    editProfile: 'Chỉnh sửa',
    saveChanges: 'Lưu',
    cancel: 'Hủy',
    saving: 'Đang lưu...',
    
    // Password
    changePassword: 'Đổi mật khẩu',
    changePasswordBtn: 'Đổi mật khẩu',
    currentPassword: 'Mật khẩu hiện tại',
    newPassword: 'Mật khẩu mới',
    confirmNewPassword: 'Xác nhận mật khẩu mới',
    
    // Password validation
    passwordRequired: 'Vui lòng nhập mật khẩu hiện tại',
    newPasswordRequired: 'Vui lòng nhập mật khẩu mới',
    passwordMinLength: 'Mật khẩu tối thiểu 6 ký tự',
    confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu mới',
    passwordMismatch: 'Mật khẩu xác nhận không khớp',
    
    // Languages
    vietnamese: 'Tiếng Việt',
    english: 'English',
    japanese: '日本語',
    
    // Success/Error messages
    updateSuccess: 'Cập nhật thông tin thành công!',
    updateError: 'Không thể cập nhật thông tin',
    passwordChangeSuccess: 'Đổi mật khẩu thành công!',
    passwordChangeError: 'Không thể đổi mật khẩu',
  },
  en: {
    // Header
    title: 'Profile',
    subtitle: 'Manage your account information',
    
    // Sections
    avatarSection: 'Profile Picture',
    accountInfo: 'Account Information',
    securitySettings: 'Security',
    
    // Form labels
    displayName: 'Display Name',
    email: 'Email',
    emailHelper: 'Email cannot be changed',
    language: 'Language',
    languageHelper: 'Select display language',
    role: 'Role',
    joinedDate: 'Joined Date',
    
    // Avatar
    changeAvatar: 'Change Avatar',
    uploadAvatar: 'Upload Image',
    avatarError: 'Please select an image file',
    avatarSizeError: 'Maximum image size is 5MB',
    
    // Actions
    editProfile: 'Edit',
    saveChanges: 'Save',
    cancel: 'Cancel',
    saving: 'Saving...',
    
    // Password
    changePassword: 'Change Password',
    changePasswordBtn: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    
    // Password validation
    passwordRequired: 'Please enter current password',
    newPasswordRequired: 'Please enter new password',
    passwordMinLength: 'Password must be at least 6 characters',
    confirmPasswordRequired: 'Please confirm new password',
    passwordMismatch: 'Password confirmation does not match',
    
    // Languages
    vietnamese: 'Vietnamese',
    english: 'English',
    japanese: 'Japanese',
    
    // Success/Error messages
    updateSuccess: 'Profile updated successfully!',
    updateError: 'Failed to update profile',
    passwordChangeSuccess: 'Password changed successfully!',
    passwordChangeError: 'Failed to change password',
  },
  ja: {
    // Header
    title: 'プロフィール',
    subtitle: 'アカウント情報を管理',
    
    // Sections
    avatarSection: 'プロフィール画像',
    accountInfo: 'アカウント情報',
    securitySettings: 'セキュリティ',
    
    // Form labels
    displayName: '表示名',
    email: 'メール',
    emailHelper: 'メールアドレスは変更できません',
    language: '言語',
    languageHelper: '表示言語を選択',
    role: '役割',
    joinedDate: '参加日',
    
    // Avatar
    changeAvatar: 'アバター変更',
    uploadAvatar: '画像をアップロード',
    avatarError: '画像ファイルを選択してください',
    avatarSizeError: '画像サイズは最大5MBです',
    
    // Actions
    editProfile: '編集',
    saveChanges: '保存',
    cancel: 'キャンセル',
    saving: '保存中...',
    
    // Password
    changePassword: 'パスワード変更',
    changePasswordBtn: 'パスワード変更',
    currentPassword: '現在のパスワード',
    newPassword: '新しいパスワード',
    confirmNewPassword: '新しいパスワード（確認）',
    
    // Password validation
    passwordRequired: '現在のパスワードを入力してください',
    newPasswordRequired: '新しいパスワードを入力してください',
    passwordMinLength: 'パスワードは6文字以上必要です',
    confirmPasswordRequired: '新しいパスワードを確認してください',
    passwordMismatch: 'パスワードが一致しません',
    
    // Languages
    vietnamese: 'ベトナム語',
    english: '英語',
    japanese: '日本語',
    
    // Success/Error messages
    updateSuccess: 'プロフィールを更新しました！',
    updateError: 'プロフィールの更新に失敗しました',
    passwordChangeSuccess: 'パスワードを変更しました！',
    passwordChangeError: 'パスワードの変更に失敗しました',
  },
};

// Get translation function
export function getProfileTranslation(locale: Locale) {
  return profile[locale];
}
