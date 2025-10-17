import { Locale } from '@/config/i18n.config';

export const adminTranslations = {
  vi: {
    // Page title
    title: 'Quản Trị Hệ Thống',
    subtitle: 'Quản lý người dùng, gia đình và thống kê',
    adminLabel: 'Admin',
    noPermission: 'Bạn không có quyền truy cập trang này. Chỉ Admin mới được phép.',
    accessDenied: 'Bạn không có quyền truy cập trang này',
    loadStatsError: 'Không thể tải thống kê',
    recentUsers: 'Users mới nhất',
    viewAll: 'Xem tất cả',
    registeredAt: 'Đăng ký',
    
    // Navigation
    dashboard: 'Tổng Quan',
    users: 'Người Dùng',
    families: 'Gia Đình',
    statistics: 'Thống Kê',
    settings: 'Cài Đặt',
    
    // Dashboard stats
    stats: {
      totalUsers: 'Tổng Người Dùng',
      activeUsers: 'Người Dùng Hoạt Động',
      totalFamilies: 'Tổng Gia Đình',
      totalKids: 'Tổng Số Bé',
      totalAlbums: 'Tổng Albums',
      totalPhotos: 'Tổng Ảnh',
      totalMilestones: 'Tổng Mốc',
      storageUsed: 'Dung Lượng Đã Dùng',
    },
    
    // Users management
    usersManagement: 'Quản Lý Người Dùng',
    usersList: 'Danh Sách Người Dùng',
    usersCount: 'người dùng',
    searchUsers: 'Tìm người dùng...',
    
    // User table columns
    userTable: {
      name: 'Tên',
      email: 'Email',
      role: 'Vai trò',
      status: 'Trạng thái',
      joinedDate: 'Ngày tham gia',
      lastActive: 'Hoạt động cuối',
      actions: 'Thao tác',
    },
    
    // User roles
    roles: {
      admin: 'Quản trị viên',
      user: 'Người dùng',
      moderator: 'Điều hành viên',
    },
    
    // User status
    status: {
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      suspended: 'Tạm khóa',
      banned: 'Cấm',
    },
    
    // User actions
    viewUser: 'Xem chi tiết',
    editUser: 'Sửa',
    suspendUser: 'Tạm khóa',
    activateUser: 'Kích hoạt',
    deleteUser: 'Xóa',
    
    // Families management
    familiesManagement: 'Quản Lý Gia Đình',
    familiesList: 'Danh Sách Gia Đình',
    familiesCount: 'gia đình',
    searchFamilies: 'Tìm gia đình...',
    
    // Family table columns
    familyTable: {
      name: 'Tên gia đình',
      owner: 'Chủ sở hữu',
      members: 'Thành viên',
      kids: 'Số bé',
      albums: 'Albums',
      createdDate: 'Ngày tạo',
      actions: 'Thao tác',
    },
    
    // Statistics
    statisticsOverview: 'Tổng Quan Thống Kê',
    userGrowth: 'Tăng Trưởng Người Dùng',
    activityMetrics: 'Chỉ Số Hoạt Động',
    storageUsage: 'Sử Dụng Dung Lượng',
    popularFeatures: 'Tính Năng Phổ Biến',
    
    // Time filters
    timeFilter: {
      today: 'Hôm nay',
      week: 'Tuần này',
      month: 'Tháng này',
      year: 'Năm này',
      all: 'Tất cả',
    },
    
    // Charts
    charts: {
      newUsers: 'Người dùng mới',
      activeUsers: 'Người dùng hoạt động',
      photosUploaded: 'Ảnh tải lên',
      milestonesAdded: 'Mốc thêm mới',
      albumsCreated: 'Albums tạo mới',
    },
    
    // Actions
    refresh: 'Làm mới',
    export: 'Xuất dữ liệu',
    filter: 'Lọc',
    search: 'Tìm kiếm',
    
    // Modals
    userDetailsTitle: 'Chi Tiết Người Dùng',
    editUserTitle: 'Chỉnh Sửa Người Dùng',
    suspendUserTitle: 'Tạm Khóa Người Dùng',
    suspendUserConfirm: 'Bạn có chắc chắn muốn tạm khóa người dùng này?',
    deleteUserTitle: 'Xóa Người Dùng',
    deleteUserConfirm: 'Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.',
    
    // Messages
    loadError: 'Không thể tải dữ liệu',
    updateSuccess: 'Cập nhật thành công!',
    updateError: 'Không thể cập nhật',
    deleteSuccess: 'Đã xóa thành công',
    deleteError: 'Không thể xóa',
    suspendSuccess: 'Đã tạm khóa người dùng',
    activateSuccess: 'Đã kích hoạt người dùng',
    
    // Common
    cancel: 'Hủy',
    save: 'Lưu',
    confirm: 'Xác nhận',
    close: 'Đóng',
    loading: 'Đang tải...',
    noData: 'Không có dữ liệu',
    
    // Pagination
    pagination: {
      rowsPerPage: 'Số dòng:',
      displayedRows: '{from}-{to} trong tổng {count}',
    },
  },
  en: {
    // Page title
    title: 'System Administration',
    subtitle: 'Manage users, families and statistics',
    adminLabel: 'Admin',
    noPermission: 'You do not have permission to access this page. Admins only.',
    accessDenied: 'You do not have permission to access this page',
    loadStatsError: 'Failed to load statistics',
    recentUsers: 'Recent Users',
    viewAll: 'View All',
    registeredAt: 'Registered',
    
    // Navigation
    dashboard: 'Dashboard',
    users: 'Users',
    families: 'Families',
    statistics: 'Statistics',
    settings: 'Settings',
    
    // Dashboard stats
    stats: {
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      totalFamilies: 'Total Families',
      totalKids: 'Total Kids',
      totalAlbums: 'Total Albums',
      totalPhotos: 'Total Photos',
      totalMilestones: 'Total Milestones',
      storageUsed: 'Storage Used',
    },
    
    // Users management
    usersManagement: 'Users Management',
    usersList: 'Users List',
    usersCount: 'users',
    searchUsers: 'Search users...',
    
    // User table columns
    userTable: {
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      joinedDate: 'Joined Date',
      lastActive: 'Last Active',
      actions: 'Actions',
    },
    
    // User roles
    roles: {
      admin: 'Admin',
      user: 'User',
      moderator: 'Moderator',
    },
    
    // User status
    status: {
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      banned: 'Banned',
    },
    
    // User actions
    viewUser: 'View details',
    editUser: 'Edit',
    suspendUser: 'Suspend',
    activateUser: 'Activate',
    deleteUser: 'Delete',
    
    // Families management
    familiesManagement: 'Families Management',
    familiesList: 'Families List',
    familiesCount: 'families',
    searchFamilies: 'Search families...',
    
    // Family table columns
    familyTable: {
      name: 'Family name',
      owner: 'Owner',
      members: 'Members',
      kids: 'Kids',
      albums: 'Albums',
      createdDate: 'Created Date',
      actions: 'Actions',
    },
    
    // Statistics
    statisticsOverview: 'Statistics Overview',
    userGrowth: 'User Growth',
    activityMetrics: 'Activity Metrics',
    storageUsage: 'Storage Usage',
    popularFeatures: 'Popular Features',
    
    // Time filters
    timeFilter: {
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
      year: 'This Year',
      all: 'All Time',
    },
    
    // Charts
    charts: {
      newUsers: 'New users',
      activeUsers: 'Active users',
      photosUploaded: 'Photos uploaded',
      milestonesAdded: 'Milestones added',
      albumsCreated: 'Albums created',
    },
    
    // Actions
    refresh: 'Refresh',
    export: 'Export',
    filter: 'Filter',
    search: 'Search',
    
    // Modals
    userDetailsTitle: 'User Details',
    editUserTitle: 'Edit User',
    suspendUserTitle: 'Suspend User',
    suspendUserConfirm: 'Are you sure you want to suspend this user?',
    deleteUserTitle: 'Delete User',
    deleteUserConfirm: 'Are you sure you want to delete this user? This action cannot be undone.',
    
    // Messages
    loadError: 'Failed to load data',
    updateSuccess: 'Updated successfully!',
    updateError: 'Failed to update',
    deleteSuccess: 'Deleted successfully',
    deleteError: 'Failed to delete',
    suspendSuccess: 'User suspended',
    activateSuccess: 'User activated',
    
    // Common
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    loading: 'Loading...',
    noData: 'No data',
    
    // Pagination
    pagination: {
      rowsPerPage: 'Rows per page:',
      displayedRows: '{from}-{to} of {count}',
    },
  },
  ja: {
    // Page title
    title: 'システム管理',
    subtitle: 'ユーザー、家族、統計を管理',
    adminLabel: '管理者',
    noPermission: 'このページにアクセスする権限がありません。管理者のみアクセス可能です。',
    accessDenied: 'このページにアクセスする権限がありません',
    loadStatsError: '統計の読み込みに失敗しました',
    recentUsers: '最新ユーザー',
    viewAll: 'すべて表示',
    registeredAt: '登録日',
    
    // Navigation
    dashboard: 'ダッシュボード',
    users: 'ユーザー',
    families: '家族',
    statistics: '統計',
    settings: '設定',
    
    // Dashboard stats
    stats: {
      totalUsers: '総ユーザー数',
      activeUsers: 'アクティブユーザー',
      totalFamilies: '総家族数',
      totalKids: '総子供数',
      totalAlbums: '総アルバム数',
      totalPhotos: '総写真数',
      totalMilestones: '総マイルストーン数',
      storageUsed: '使用ストレージ',
    },
    
    // Users management
    usersManagement: 'ユーザー管理',
    usersList: 'ユーザーリスト',
    usersCount: '人',
    searchUsers: 'ユーザーを検索...',
    
    // User table columns
    userTable: {
      name: '名前',
      email: 'メール',
      role: '役割',
      status: 'ステータス',
      joinedDate: '参加日',
      lastActive: '最終アクティブ',
      actions: 'アクション',
    },
    
    // User roles
    roles: {
      admin: '管理者',
      user: 'ユーザー',
      moderator: 'モデレーター',
    },
    
    // User status
    status: {
      active: 'アクティブ',
      inactive: '非アクティブ',
      suspended: '一時停止',
      banned: '禁止',
    },
    
    // User actions
    viewUser: '詳細を見る',
    editUser: '編集',
    suspendUser: '一時停止',
    activateUser: 'アクティブ化',
    deleteUser: '削除',
    
    // Families management
    familiesManagement: '家族管理',
    familiesList: '家族リスト',
    familiesCount: '家族',
    searchFamilies: '家族を検索...',
    
    // Family table columns
    familyTable: {
      name: '家族名',
      owner: 'オーナー',
      members: 'メンバー',
      kids: '子供',
      albums: 'アルバム',
      createdDate: '作成日',
      actions: 'アクション',
    },
    
    // Statistics
    statisticsOverview: '統計概要',
    userGrowth: 'ユーザー成長',
    activityMetrics: 'アクティビティ指標',
    storageUsage: 'ストレージ使用量',
    popularFeatures: '人気の機能',
    
    // Time filters
    timeFilter: {
      today: '今日',
      week: '今週',
      month: '今月',
      year: '今年',
      all: 'すべて',
    },
    
    // Charts
    charts: {
      newUsers: '新規ユーザー',
      activeUsers: 'アクティブユーザー',
      photosUploaded: 'アップロード写真',
      milestonesAdded: '追加マイルストーン',
      albumsCreated: '作成アルバム',
    },
    
    // Actions
    refresh: '更新',
    export: 'エクスポート',
    filter: 'フィルター',
    search: '検索',
    
    // Modals
    userDetailsTitle: 'ユーザー詳細',
    editUserTitle: 'ユーザーを編集',
    suspendUserTitle: 'ユーザーを一時停止',
    suspendUserConfirm: 'このユーザーを一時停止してもよろしいですか？',
    deleteUserTitle: 'ユーザーを削除',
    deleteUserConfirm: 'このユーザーを削除してもよろしいですか？この操作は元に戻せません。',
    
    // Messages
    loadError: 'データの読み込みに失敗しました',
    updateSuccess: '正常に更新されました！',
    updateError: '更新に失敗しました',
    deleteSuccess: '正常に削除されました',
    deleteError: '削除に失敗しました',
    suspendSuccess: 'ユーザーが一時停止されました',
    activateSuccess: 'ユーザーがアクティブ化されました',
    
    // Common
    cancel: 'キャンセル',
    save: '保存',
    confirm: '確認',
    close: '閉じる',
    loading: '読み込み中...',
    noData: 'データなし',
    
    // Pagination
    pagination: {
      rowsPerPage: '1ページあたりの行数:',
      displayedRows: '{count}件中 {from}-{to}',
    },
  },
};

export const getAdminTranslation = (locale: Locale) => adminTranslations[locale];
