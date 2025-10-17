import { Locale } from '@/config/i18n.config';

export const albumsTranslations = {
  vi: {
    // Page title
    title: 'Albums Ảnh',
    subtitle: 'Quản lý và chia sẻ kỷ niệm của gia đình',
    
    // List view
    myAlbums: 'Albums Của Tôi',
    albumsCount: 'albums',
    noAlbums: 'Chưa có album nào',
    noAlbumsForKid: 'Bé này chưa có album nào',
    noAlbumsDesc: 'Tạo album đầu tiên để lưu trữ những khoảnh khắc đáng nhớ',
    createFirstAlbum: 'Tạo album đầu tiên',
    
    // Buttons
    createAlbum: 'Tạo Album',
    viewAlbum: 'Xem Album',
    edit: 'Sửa',
    delete: 'Xóa',
    share: 'Chia Sẻ',
    
    // Filters
    filterByKid: 'Lọc theo bé',
    all: 'Tất cả',
    allAlbums: 'Tất cả albums',
    allKids: 'Tất cả bé',
    privacyFilter: 'Quyền riêng tư',
    allPrivacy: 'Tất cả',
    
    // Privacy levels
    privacy: {
      private: 'Riêng tư',
      family: 'Gia đình',
      public: 'Công khai',
    },
    private: 'Riêng tư',
    
    // Album card
    photos: 'ảnh',
    createdOn: 'Tạo ngày',
    lastUpdated: 'Cập nhật',
    sharedWith: 'Chia sẻ với',
    people: 'người',
    
    // Modal titles
    createAlbumTitle: 'Tạo Album Mới',
    editAlbumTitle: 'Chỉnh Sửa Album',
    deleteAlbumTitle: 'Xóa Album',
    deleteAlbumConfirm: 'Bạn có chắc chắn muốn xóa album này? Tất cả ảnh trong album cũng sẽ bị xóa.',
    shareAlbumTitle: 'Chia Sẻ Album',
    
    // Form fields
    form: {
      name: 'Tên album',
      namePlaceholder: 'Nhập tên album',
      nameRequired: 'Tên album là bắt buộc',
      description: 'Mô tả',
      descriptionPlaceholder: 'Mô tả về album...',
      selectKid: 'Chọn bé (tùy chọn)',
      selectKidPlaceholder: 'Chọn bé cho album',
      noKid: 'Không chọn',
      privacy: 'Mức độ riêng tư',
      privacyOptions: {
        private: '🔒 Riêng tư (chỉ mình tôi)',
        family: '👨‍👩‍👧‍👦 Gia đình',
        public: '🌍 Công khai',
      },
      coverPhoto: 'Ảnh bìa',
      uploadCover: 'Tải ảnh bìa',
      saving: 'Đang lưu...',
      creating: 'Tạo',
      updating: 'Cập nhật',
    },
    
    // Share dialog
    shareWith: 'Chia sẻ với',
    familyMembers: 'Thành viên gia đình',
    shareLink: 'Hoặc chia sẻ link',
    copyLink: 'Sao chép link',
    linkCopied: 'Đã sao chép link!',
    
    // Actions
    cancel: 'Hủy',
    save: 'Lưu',
    confirm: 'Xác nhận',
    close: 'Đóng',
    
    // Messages
    loadError: 'Không thể tải danh sách albums',
    createSuccess: 'Tạo album thành công!',
    createError: 'Không thể tạo album',
    updateSuccess: 'Cập nhật album thành công!',
    updateError: 'Không thể cập nhật album',
    deleteSuccess: 'Đã xóa album',
    deleteError: 'Không thể xóa album',
    shareSuccess: 'Đã chia sẻ album',
    shareError: 'Không thể chia sẻ album',
  },
  en: {
    // Page title
    title: 'Photo Albums',
    subtitle: 'Manage and share family memories',
    
    // List view
    myAlbums: 'My Albums',
    albumsCount: 'albums',
    noAlbums: 'No albums yet',
    noAlbumsForKid: 'No albums for this kid yet',
    noAlbumsDesc: 'Create your first album to store memorable moments',
    createFirstAlbum: 'Create first album',
    
    // Buttons
    createAlbum: 'Create Album',
    viewAlbum: 'View Album',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    
    // Filters
    filterByKid: 'Filter by kid',
    all: 'All',
    allAlbums: 'All albums',
    allKids: 'All kids',
    privacyFilter: 'Privacy',
    allPrivacy: 'All',
    
    // Privacy levels
    privacy: {
      private: 'Private',
      family: 'Family',
      public: 'Public',
    },
    private: 'Private',
    
    // Album card
    photos: 'photos',
    createdOn: 'Created',
    lastUpdated: 'Updated',
    sharedWith: 'Shared with',
    people: 'people',
    
    // Modal titles
    createAlbumTitle: 'Create New Album',
    editAlbumTitle: 'Edit Album',
    deleteAlbumTitle: 'Delete Album',
    deleteAlbumConfirm: 'Are you sure you want to delete this album? All photos in the album will also be deleted.',
    shareAlbumTitle: 'Share Album',
    
    // Form fields
    form: {
      name: 'Album name',
      namePlaceholder: 'Enter album name',
      nameRequired: 'Album name is required',
      description: 'Description',
      descriptionPlaceholder: 'Description about the album...',
      selectKid: 'Select kid (optional)',
      selectKidPlaceholder: 'Select kid for album',
      noKid: 'None',
      privacy: 'Privacy level',
      privacyOptions: {
        private: '🔒 Private (only me)',
        family: '👨‍👩‍👧‍👦 Family',
        public: '🌍 Public',
      },
      coverPhoto: 'Cover photo',
      uploadCover: 'Upload cover',
      saving: 'Saving...',
      creating: 'Create',
      updating: 'Update',
    },
    
    // Share dialog
    shareWith: 'Share with',
    familyMembers: 'Family members',
    shareLink: 'Or share link',
    copyLink: 'Copy link',
    linkCopied: 'Link copied!',
    
    // Actions
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    
    // Messages
    loadError: 'Failed to load albums list',
    createSuccess: 'Album created successfully!',
    createError: 'Failed to create album',
    updateSuccess: 'Album updated successfully!',
    updateError: 'Failed to update album',
    deleteSuccess: 'Album deleted',
    deleteError: 'Failed to delete album',
    shareSuccess: 'Album shared',
    shareError: 'Failed to share album',
  },
  ja: {
    // Page title
    title: 'フォトアルバム',
    subtitle: '家族の思い出を管理・共有',
    
    // List view
    myAlbums: '私のアルバム',
    albumsCount: 'アルバム',
    noAlbums: 'まだアルバムがありません',
    noAlbumsForKid: 'この子供のアルバムはまだありません',
    noAlbumsDesc: '最初のアルバムを作成して、思い出に残る瞬間を保存しましょう',
    createFirstAlbum: '最初のアルバムを作成',
    
    // Buttons
    createAlbum: 'アルバム作成',
    viewAlbum: 'アルバムを見る',
    edit: '編集',
    delete: '削除',
    share: '共有',
    
    // Filters
    filterByKid: '子供で絞り込み',
    all: 'すべて',
    allAlbums: 'すべてのアルバム',
    allKids: 'すべての子供',
    privacyFilter: 'プライバシー',
    allPrivacy: 'すべて',
    
    // Privacy levels
    privacy: {
      private: 'プライベート',
      family: '家族',
      public: '公開',
    },
    private: 'プライベート',
    
    // Album card
    photos: '枚',
    createdOn: '作成日',
    lastUpdated: '更新日',
    sharedWith: '共有相手',
    people: '人',
    
    // Modal titles
    createAlbumTitle: '新しいアルバムを作成',
    editAlbumTitle: 'アルバムを編集',
    deleteAlbumTitle: 'アルバムを削除',
    deleteAlbumConfirm: 'このアルバムを削除してもよろしいですか？アルバム内のすべての写真も削除されます。',
    shareAlbumTitle: 'アルバムを共有',
    
    // Form fields
    form: {
      name: 'アルバム名',
      namePlaceholder: 'アルバム名を入力',
      nameRequired: 'アルバム名は必須です',
      description: '説明',
      descriptionPlaceholder: 'アルバムの説明...',
      selectKid: '子供を選択 (オプション)',
      selectKidPlaceholder: 'アルバムの子供を選択',
      noKid: '選択しない',
      privacy: 'プライバシーレベル',
      privacyOptions: {
        private: '🔒 プライベート (自分のみ)',
        family: '👨‍👩‍👧‍👦 家族',
        public: '🌍 公開',
      },
      coverPhoto: 'カバー写真',
      uploadCover: 'カバーをアップロード',
      saving: '保存中...',
      creating: '作成',
      updating: '更新',
    },
    
    // Share dialog
    shareWith: '共有相手',
    familyMembers: '家族メンバー',
    shareLink: 'またはリンクを共有',
    copyLink: 'リンクをコピー',
    linkCopied: 'リンクがコピーされました！',
    
    // Actions
    cancel: 'キャンセル',
    save: '保存',
    confirm: '確認',
    close: '閉じる',
    
    // Messages
    loadError: 'アルバムリストの読み込みに失敗しました',
    createSuccess: 'アルバムが正常に作成されました！',
    createError: 'アルバムの作成に失敗しました',
    updateSuccess: 'アルバムが正常に更新されました！',
    updateError: 'アルバムの更新に失敗しました',
    deleteSuccess: 'アルバムが削除されました',
    deleteError: 'アルバムの削除に失敗しました',
    shareSuccess: 'アルバムが共有されました',
    shareError: 'アルバムの共有に失敗しました',
  },
};

export const getAlbumsTranslation = (locale: Locale) => albumsTranslations[locale];
