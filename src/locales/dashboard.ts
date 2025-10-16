import { Locale } from '@/config/i18n.config';

export const dashboardTranslations = {
  vi: {
    // Page title
    title: 'Bảng Điều Khiển',
    welcomeBack: 'Chào mừng trở lại',
    
    // Stats cards
    stats: {
      kids: 'Bé',
      albums: 'Album',
      photos: 'Ảnh',
      milestones: 'Mốc Phát Triển',
      families: 'Gia Đình',
    },
    
    // Quick actions
    quickActions: 'Thao Tác Nhanh',
    addKid: 'Thêm Bé',
    createAlbum: 'Tạo Album',
    uploadPhotos: 'Tải Ảnh Lên',
    addMilestone: 'Thêm Mốc',
    
    // Recent sections
    recentKids: 'Bé Gần Đây',
    recentMilestones: 'Mốc Phát Triển Gần Đây',
    upcomingBirthdays: 'Sinh Nhật Sắp Tới',
    
    // Cards
    viewDetails: 'Xem Chi Tiết',
    viewAll: 'Xem Tất Cả',
    age: 'tuổi',
    years: 'năm',
    months: 'tháng',
    daysOld: 'ngày tuổi',
    turnsAge: 'sẽ',
    
    // Empty states
    noKids: 'Chưa có bé nào',
    noKidsDesc: 'Bắt đầu bằng cách thêm bé đầu tiên!',
    noMilestones: 'Chưa có mốc phát triển',
    noMilestonesDesc: 'Ghi lại những khoảnh khắc đặc biệt của bé',
    noBirthdays: 'Không có sinh nhật sắp tới',
    
    // Buttons
    getStarted: 'Bắt Đầu',
    close: 'Đóng',
  },
  en: {
    // Page title
    title: 'Dashboard',
    welcomeBack: 'Welcome back',
    
    // Stats cards
    stats: {
      kids: 'Kids',
      albums: 'Albums',
      photos: 'Photos',
      milestones: 'Milestones',
      families: 'Families',
    },
    
    // Quick actions
    quickActions: 'Quick Actions',
    addKid: 'Add Kid',
    createAlbum: 'Create Album',
    uploadPhotos: 'Upload Photos',
    addMilestone: 'Add Milestone',
    
    // Recent sections
    recentKids: 'Recent Kids',
    recentMilestones: 'Recent Milestones',
    upcomingBirthdays: 'Upcoming Birthdays',
    
    // Cards
    viewDetails: 'View Details',
    viewAll: 'View All',
    age: 'age',
    years: 'years',
    months: 'months',
    daysOld: 'days old',
    turnsAge: 'turns',
    
    // Empty states
    noKids: 'No kids yet',
    noKidsDesc: 'Start by adding your first kid!',
    noMilestones: 'No milestones yet',
    noMilestonesDesc: 'Record your kid\'s special moments',
    noBirthdays: 'No upcoming birthdays',
    
    // Buttons
    getStarted: 'Get Started',
    close: 'Close',
  },
  ja: {
    // Page title
    title: 'ダッシュボード',
    welcomeBack: 'おかえりなさい',
    
    // Stats cards
    stats: {
      kids: '子供',
      albums: 'アルバム',
      photos: '写真',
      milestones: 'マイルストーン',
      families: '家族',
    },
    
    // Quick actions
    quickActions: 'クイックアクション',
    addKid: '子供を追加',
    createAlbum: 'アルバム作成',
    uploadPhotos: '写真アップロード',
    addMilestone: 'マイルストーン追加',
    
    // Recent sections
    recentKids: '最近の子供',
    recentMilestones: '最近のマイルストーン',
    upcomingBirthdays: '今後の誕生日',
    
    // Cards
    viewDetails: '詳細を見る',
    viewAll: 'すべて見る',
    age: '歳',
    years: '年',
    months: 'ヶ月',
    daysOld: '日齢',
    turnsAge: 'になる',
    
    // Empty states
    noKids: 'まだ子供がいません',
    noKidsDesc: '最初の子供を追加してください！',
    noMilestones: 'まだマイルストーンがありません',
    noMilestonesDesc: '特別な瞬間を記録しましょう',
    noBirthdays: '今後の誕生日はありません',
    
    // Buttons
    getStarted: '始める',
    close: '閉じる',
  },
};

export const getDashboardTranslation = (locale: Locale) => dashboardTranslations[locale];
