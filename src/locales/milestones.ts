import { Locale } from '@/config/i18n.config';

export const milestonesTranslations = {
  vi: {
    // Page title
    title: 'Mốc Phát Triển',
    subtitle: 'Ghi lại những khoảnh khắc đặc biệt của bé',
    
    // List view
    allMilestones: 'Tất Cả Mốc',
    milestonesCount: 'mốc',
    noMilestones: 'Chưa có mốc phát triển',
    noMilestonesForKid: 'Bé này chưa có mốc phát triển nào',
    noMilestonesDesc: 'Thêm mốc đầu tiên để ghi lại khoảnh khắc đặc biệt',
    addFirstMilestone: 'Thêm mốc đầu tiên',
    total: 'Tổng số',
    
    // Filters
    filterByKid: 'Lọc theo bé',
    filterByCategory: 'Lọc theo danh mục',
    allKids: 'Tất cả bé',
    allCategories: 'Tất cả',
    
    // Categories
    categories: {
      first_time: 'Lần đầu',
      physical: 'Thể chất',
      cognitive: 'Nhận thức',
      social: 'Xã hội',
      emotional: 'Cảm xúc',
      language: 'Ngôn ngữ',
      other: 'Khác',
    },
    
    // Buttons
    addMilestone: 'Thêm Mốc',
    edit: 'Sửa',
    delete: 'Xóa',
    viewDetails: 'Xem Chi Tiết',
    
    // Milestone card
    achievedOn: 'Đạt được ngày',
    age: 'Tuổi',
    years: 'năm',
    months: 'tháng',
    days: 'ngày',
    category: 'Danh mục',
    
    // Timeline view
    timeline: 'Dòng Thời Gian',
    listView: 'Dạng Danh Sách',
    gridView: 'Dạng Lưới',
    
    // Modal titles
    addMilestoneTitle: 'Thêm Mốc Phát Triển',
    editMilestoneTitle: 'Chỉnh Sửa Mốc',
    deleteMilestoneTitle: 'Xóa Mốc',
    deleteMilestoneConfirm: 'Bạn có chắc chắn muốn xóa mốc phát triển này?',
    deleteConfirm: 'Bạn có chắc muốn xóa milestone này?',
    
    // Form fields
    form: {
      title: 'Tiêu đề',
      titlePlaceholder: 'VD: Nói được từ đầu tiên',
      titleRequired: 'Tiêu đề là bắt buộc',
      description: 'Mô tả',
      descriptionPlaceholder: 'Mô tả chi tiết về mốc...',
      selectKid: 'Chọn bé',
      selectKidPlaceholder: 'Chọn bé',
      selectKidRequired: 'Vui lòng chọn bé',
      achievedDate: 'Ngày đạt được',
      dateRequired: 'Ngày milestone là bắt buộc',
      category: 'Danh mục',
      selectCategory: 'Chọn danh mục',
      photos: 'Ảnh',
      uploadPhotos: 'Tải ảnh lên',
      selectPhotos: 'Chọn ảnh',
      photosSelected: 'ảnh đã chọn',
      showPhotoPicker: 'Chọn ảnh từ thư viện',
      hidePhotoPicker: 'Ẩn danh sách ảnh',
      loadingPhotos: 'Đang tải ảnh...',
      noPhotosAvailable: 'Chưa có ảnh nào',
      notes: 'Ghi chú',
      notesPlaceholder: 'Ghi chú thêm...',
      saving: 'Đang lưu...',
      creating: 'Tạo',
      updating: 'Cập nhật',
    },
    
    // Categories for form
    categoryOptions: {
      first_word: 'Lần đầu nói',
      first_step: 'Lần đầu đi',
      birthday: 'Sinh nhật',
      health: 'Sức khỏe',
      education: 'Giáo dục',
      other: 'Khác',
    },
    
    // Common milestones suggestions
    suggestions: {
      physical: [
        'Lần đầu lật người',
        'Lần đầu ngồi',
        'Lần đầu bò',
        'Bước đi đầu tiên',
        'Lần đầu nhảy',
      ],
      language: [
        'Nói được từ đầu tiên',
        'Nói được câu đầu tiên',
        'Gọi ba/mẹ lần đầu',
        'Hát được bài hát đầu tiên',
      ],
      social: [
        'Cười lần đầu tiên',
        'Vẫy tay chào',
        'Chơi với bạn',
        'Chia sẻ đồ chơi',
      ],
    },
    
    // Actions
    cancel: 'Hủy',
    save: 'Lưu',
    confirm: 'Xác nhận',
    close: 'Đóng',
    
    // Messages
    loadError: 'Không thể tải danh sách mốc',
    createSuccess: 'Thêm mốc thành công!',
    createError: 'Không thể thêm mốc',
    updateSuccess: 'Cập nhật mốc thành công!',
    updateError: 'Không thể cập nhật mốc',
    deleteSuccess: 'Đã xóa mốc',
    deleteError: 'Không thể xóa mốc',
    
    // Milestone modal
    milestoneModal: {
      titleLabel: 'Tiêu đề',
      titlePlaceholder: 'Nhập tiêu đề mốc',
      descriptionLabel: 'Mô tả',
      descriptionPlaceholder: 'Mô tả chi tiết về mốc này...',
      dateLabel: 'Ngày milestone',
      categoryLabel: 'Danh mục',
      kidLabel: 'Chọn bé',
      selectKid: 'Chọn một bé',
      photosLabel: 'Ảnh đính kèm',
      photosCount: '{count} ảnh',
      selectPhotos: 'Chọn ảnh',
      hidePhotos: 'Ẩn ảnh',
      noPhotos: 'Chưa có ảnh cho bé này',
      uploadFirst: 'Tải ảnh lên trước',
      loading: 'Đang tải...',
      addButton: 'Thêm Mốc',
      updateButton: 'Cập Nhật',
      cancel: 'Hủy',
      saving: 'Đang lưu...',
    },
    
    // Timeline
    photosCount: '{count} ảnh',
  },
  en: {
    // Page title
    title: 'Milestones',
    subtitle: 'Record special moments of your kid',
    
    // List view
    allMilestones: 'All Milestones',
    milestonesCount: 'milestones',
    noMilestones: 'No milestones yet',
    noMilestonesForKid: 'No milestones for this kid yet',
    noMilestonesDesc: 'Add your first milestone to record special moments',
    addFirstMilestone: 'Add first milestone',
    total: 'Total',
    
    // Filters
    filterByKid: 'Filter by kid',
    filterByCategory: 'Filter by category',
    allKids: 'All kids',
    allCategories: 'All',
    
    // Categories
    categories: {
      first_time: 'First Time',
      physical: 'Physical',
      cognitive: 'Cognitive',
      social: 'Social',
      emotional: 'Emotional',
      language: 'Language',
      other: 'Other',
    },
    
    // Buttons
    addMilestone: 'Add Milestone',
    edit: 'Edit',
    delete: 'Delete',
    viewDetails: 'View Details',
    
    // Milestone card
    achievedOn: 'Achieved on',
    age: 'Age',
    years: 'years',
    months: 'months',
    days: 'days',
    category: 'Category',
    
    // Timeline view
    timeline: 'Timeline',
    listView: 'List View',
    gridView: 'Grid View',
    
    // Modal titles
    addMilestoneTitle: 'Add Milestone',
    editMilestoneTitle: 'Edit Milestone',
    deleteMilestoneTitle: 'Delete Milestone',
    deleteMilestoneConfirm: 'Are you sure you want to delete this milestone?',
    deleteConfirm: 'Are you sure you want to delete this milestone?',
    
    // Form fields
    form: {
      title: 'Title',
      titlePlaceholder: 'e.g., First word',
      titleRequired: 'Title is required',
      description: 'Description',
      descriptionPlaceholder: 'Detailed description of the milestone...',
      selectKid: 'Select kid',
      selectKidPlaceholder: 'Select kid',
      selectKidRequired: 'Please select a kid',
      achievedDate: 'Achieved date',
      dateRequired: 'Date is required',
      category: 'Category',
      selectCategory: 'Select category',
      photos: 'Photos',
      uploadPhotos: 'Upload photos',
      selectPhotos: 'Select photos',
      photosSelected: 'photos selected',
      showPhotoPicker: 'Choose from library',
      hidePhotoPicker: 'Hide photo list',
      loadingPhotos: 'Loading photos...',
      noPhotosAvailable: 'No photos available',
      notes: 'Notes',
      notesPlaceholder: 'Additional notes...',
      saving: 'Saving...',
      creating: 'Create',
      updating: 'Update',
    },
    
    // Categories for form
    categoryOptions: {
      first_word: 'First Word',
      first_step: 'First Step',
      birthday: 'Birthday',
      health: 'Health',
      education: 'Education',
      other: 'Other',
    },
    
    // Common milestones suggestions
    suggestions: {
      physical: [
        'First roll over',
        'First time sitting',
        'First crawl',
        'First steps',
        'First jump',
      ],
      language: [
        'First word',
        'First sentence',
        'Called mama/dada first time',
        'First song',
      ],
      social: [
        'First smile',
        'Wave goodbye',
        'Play with friend',
        'Share toys',
      ],
    },
    
    // Actions
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    
    // Messages
    loadError: 'Failed to load milestones list',
    createSuccess: 'Milestone added successfully!',
    createError: 'Failed to add milestone',
    updateSuccess: 'Milestone updated successfully!',
    updateError: 'Failed to update milestone',
    deleteSuccess: 'Milestone deleted',
    deleteError: 'Failed to delete milestone',
    
    // Milestone modal
    milestoneModal: {
      titleLabel: 'Title',
      titlePlaceholder: 'Enter milestone title',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Describe this milestone in detail...',
      dateLabel: 'Milestone Date',
      categoryLabel: 'Category',
      kidLabel: 'Select Kid',
      selectKid: 'Select a kid',
      photosLabel: 'Attached Photos',
      photosCount: '{count} photos',
      selectPhotos: 'Select Photos',
      hidePhotos: 'Hide Photos',
      noPhotos: 'No photos for this kid yet',
      uploadFirst: 'Upload photos first',
      loading: 'Loading...',
      addButton: 'Add Milestone',
      updateButton: 'Update',
      cancel: 'Cancel',
      saving: 'Saving...',
    },
    
    // Timeline
    photosCount: '{count} photos',
  },
  ja: {
    // Page title
    title: 'マイルストーン',
    subtitle: '子供の特別な瞬間を記録',
    
    // List view
    allMilestones: 'すべてのマイルストーン',
    milestonesCount: '件',
    noMilestones: 'まだマイルストーンがありません',
    noMilestonesForKid: 'この子供のマイルストーンはまだありません',
    noMilestonesDesc: '最初のマイルストーンを追加して、特別な瞬間を記録しましょう',
    addFirstMilestone: '最初のマイルストーンを追加',
    total: '合計',
    
    // Filters
    filterByKid: '子供で絞り込み',
    filterByCategory: 'カテゴリで絞り込み',
    allKids: 'すべての子供',
    allCategories: 'すべて',
    
    // Categories
    categories: {
      first_time: '初めて',
      physical: '身体的',
      cognitive: '認知的',
      social: '社会的',
      emotional: '感情的',
      language: '言語',
      other: 'その他',
    },
    
    // Buttons
    addMilestone: 'マイルストーンを追加',
    edit: '編集',
    delete: '削除',
    viewDetails: '詳細を見る',
    
    // Milestone card
    achievedOn: '達成日',
    age: '年齢',
    years: '歳',
    months: 'ヶ月',
    days: '日',
    category: 'カテゴリ',
    
    // Timeline view
    timeline: 'タイムライン',
    listView: 'リスト表示',
    gridView: 'グリッド表示',
    
    // Modal titles
    addMilestoneTitle: 'マイルストーンを追加',
    editMilestoneTitle: 'マイルストーンを編集',
    deleteMilestoneTitle: 'マイルストーンを削除',
    deleteMilestoneConfirm: 'このマイルストーンを削除してもよろしいですか？',
    deleteConfirm: 'このマイルストーンを削除してもよろしいですか？',
    
    // Form fields
    form: {
      title: 'タイトル',
      titlePlaceholder: '例: 初めての言葉',
      titleRequired: 'タイトルは必須です',
      description: '説明',
      descriptionPlaceholder: 'マイルストーンの詳細な説明...',
      selectKid: '子供を選択',
      selectKidPlaceholder: '子供を選択',
      selectKidRequired: '子供を選択してください',
      achievedDate: '達成日',
      dateRequired: '日付は必須です',
      category: 'カテゴリ',
      selectCategory: 'カテゴリを選択',
      photos: '写真',
      uploadPhotos: '写真をアップロード',
      selectPhotos: '写真を選択',
      photosSelected: '枚選択済み',
      showPhotoPicker: 'ライブラリから選択',
      hidePhotoPicker: '写真リストを非表示',
      loadingPhotos: '写真を読み込み中...',
      noPhotosAvailable: '利用可能な写真がありません',
      notes: 'メモ',
      notesPlaceholder: '追加のメモ...',
      saving: '保存中...',
      creating: '作成',
      updating: '更新',
    },
    
    // Categories for form
    categoryOptions: {
      first_word: '初めての言葉',
      first_step: '初めての一歩',
      birthday: '誕生日',
      health: '健康',
      education: '教育',
      other: 'その他',
    },
    
    // Common milestones suggestions
    suggestions: {
      physical: [
        '初めての寝返り',
        '初めてのお座り',
        '初めてのハイハイ',
        '初めての一歩',
        '初めてのジャンプ',
      ],
      language: [
        '初めての言葉',
        '初めての文',
        'ママ/パパと呼んだ',
        '初めての歌',
      ],
      social: [
        '初めての笑顔',
        'バイバイの手振り',
        '友達と遊ぶ',
        'おもちゃを共有',
      ],
    },
    
    // Actions
    cancel: 'キャンセル',
    save: '保存',
    confirm: '確認',
    close: '閉じる',
    
    // Messages
    loadError: 'マイルストーンリストの読み込みに失敗しました',
    createSuccess: 'マイルストーンが正常に追加されました！',
    createError: 'マイルストーンの追加に失敗しました',
    updateSuccess: 'マイルストーンが正常に更新されました！',
    updateError: 'マイルストーンの更新に失敗しました',
    deleteSuccess: 'マイルストーンが削除されました',
    deleteError: 'マイルストーンの削除に失敗しました',
    
    // Milestone modal
    milestoneModal: {
      titleLabel: 'タイトル',
      titlePlaceholder: 'マイルストーンのタイトルを入力',
      descriptionLabel: '説明',
      descriptionPlaceholder: 'このマイルストーンの詳細を記述...',
      dateLabel: 'マイルストーン日付',
      categoryLabel: 'カテゴリー',
      kidLabel: '子供を選択',
      selectKid: '子供を選択してください',
      photosLabel: '添付写真',
      photosCount: '{count}枚の写真',
      selectPhotos: '写真を選択',
      hidePhotos: '写真を非表示',
      noPhotos: 'この子供の写真がまだありません',
      uploadFirst: '先に写真をアップロード',
      loading: '読み込み中...',
      addButton: 'マイルストーンを追加',
      updateButton: '更新',
      cancel: 'キャンセル',
      saving: '保存中...',
    },
    
    // Timeline
    photosCount: '{count}枚の写真',
  },
};

export const getMilestonesTranslation = (locale: Locale) => milestonesTranslations[locale];
