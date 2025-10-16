import { Locale } from '@/config/i18n.config';

export const kidsTranslations = {
  vi: {
    // Page title
    title: 'Quản Lý Bé',
    subtitle: 'Quản lý thông tin và theo dõi sự phát triển của các bé',
    
    // List view
    myKids: 'Bé Của Tôi',
    kidsCount: 'bé',
    noKids: 'Chưa có bé nào',
    noKidsDesc: 'Thêm bé đầu tiên để bắt đầu ghi lại những khoảnh khắc đáng nhớ',
    
    // Buttons
    addKid: 'Thêm Bé',
    viewDetails: 'Xem Chi Tiết',
    edit: 'Sửa',
    delete: 'Xóa',
    
    // Kid card
    age: 'tuổi',
    years: 'năm',
    months: 'tháng',
    daysOld: 'ngày tuổi',
    birthday: 'Sinh nhật',
    gender: {
      label: 'Giới tính',
      male: 'Nam',
      female: 'Nữ',
      other: 'Khác',
    },
    
    // Growth info
    height: 'Chiều cao',
    weight: 'Cân nặng',
    cm: 'cm',
    kg: 'kg',
    bloodType: 'Nhóm máu',
    
    // Modal titles
    addKidTitle: 'Thêm Bé Mới',
    editKidTitle: 'Chỉnh Sửa Thông Tin Bé',
    deleteKidTitle: 'Xóa Bé',
    deleteKidConfirm: 'Bạn có chắc chắn muốn xóa bé này? Hành động này không thể hoàn tác.',
    
    // Form fields
    form: {
      name: 'Tên bé',
      namePlaceholder: 'Nhập tên bé',
      dateOfBirth: 'Ngày sinh',
      genderLabel: 'Giới tính',
      heightLabel: 'Chiều cao (cm)',
      weightLabel: 'Cân nặng (kg)',
      bloodTypeLabel: 'Nhóm máu',
      bloodTypePlaceholder: 'VD: A+, O-',
      notesLabel: 'Ghi chú',
      notesPlaceholder: 'Thông tin thêm về bé...',
      avatarLabel: 'Ảnh đại diện',
      uploadAvatar: 'Tải ảnh lên',
    },
    
    // Actions
    cancel: 'Hủy',
    save: 'Lưu',
    confirm: 'Xác nhận',
    
    // Messages
    loadError: 'Không thể tải danh sách bé',
    addSuccess: 'Thêm bé thành công!',
    addError: 'Không thể thêm bé',
    updateSuccess: 'Cập nhật thông tin thành công!',
    updateError: 'Không thể cập nhật thông tin',
    deleteSuccess: 'Đã xóa bé',
    deleteError: 'Không thể xóa bé',
  },
  en: {
    // Page title
    title: 'Kids Management',
    subtitle: 'Manage information and track development of kids',
    
    // List view
    myKids: 'My Kids',
    kidsCount: 'kids',
    noKids: 'No kids yet',
    noKidsDesc: 'Add your first kid to start recording memorable moments',
    
    // Buttons
    addKid: 'Add Kid',
    viewDetails: 'View Details',
    edit: 'Edit',
    delete: 'Delete',
    
    // Kid card
    age: 'age',
    years: 'years',
    months: 'months',
    daysOld: 'days old',
    birthday: 'Birthday',
    gender: {
      label: 'Gender',
      male: 'Male',
      female: 'Female',
      other: 'Other',
    },
    
    // Growth info
    height: 'Height',
    weight: 'Weight',
    cm: 'cm',
    kg: 'kg',
    bloodType: 'Blood Type',
    
    // Modal titles
    addKidTitle: 'Add New Kid',
    editKidTitle: 'Edit Kid Information',
    deleteKidTitle: 'Delete Kid',
    deleteKidConfirm: 'Are you sure you want to delete this kid? This action cannot be undone.',
    
    // Form fields
    form: {
      name: 'Kid\'s name',
      namePlaceholder: 'Enter kid\'s name',
      dateOfBirth: 'Date of birth',
      genderLabel: 'Gender',
      heightLabel: 'Height (cm)',
      weightLabel: 'Weight (kg)',
      bloodTypeLabel: 'Blood Type',
      bloodTypePlaceholder: 'e.g., A+, O-',
      notesLabel: 'Notes',
      notesPlaceholder: 'Additional information about the kid...',
      avatarLabel: 'Avatar',
      uploadAvatar: 'Upload image',
    },
    
    // Actions
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    
    // Messages
    loadError: 'Failed to load kids list',
    addSuccess: 'Kid added successfully!',
    addError: 'Failed to add kid',
    updateSuccess: 'Information updated successfully!',
    updateError: 'Failed to update information',
    deleteSuccess: 'Kid deleted',
    deleteError: 'Failed to delete kid',
  },
  ja: {
    // Page title
    title: '子供管理',
    subtitle: '子供の情報を管理し、成長を追跡します',
    
    // List view
    myKids: '私の子供',
    kidsCount: '人',
    noKids: 'まだ子供がいません',
    noKidsDesc: '最初の子供を追加して、思い出に残る瞬間を記録しましょう',
    
    // Buttons
    addKid: '子供を追加',
    viewDetails: '詳細を見る',
    edit: '編集',
    delete: '削除',
    
    // Kid card
    age: '歳',
    years: '年',
    months: 'ヶ月',
    daysOld: '日齢',
    birthday: '誕生日',
    gender: {
      label: '性別',
      male: '男性',
      female: '女性',
      other: 'その他',
    },
    
    // Growth info
    height: '身長',
    weight: '体重',
    cm: 'cm',
    kg: 'kg',
    bloodType: '血液型',
    
    // Modal titles
    addKidTitle: '新しい子供を追加',
    editKidTitle: '子供の情報を編集',
    deleteKidTitle: '子供を削除',
    deleteKidConfirm: 'この子供を削除してもよろしいですか？この操作は元に戻せません。',
    
    // Form fields
    form: {
      name: '子供の名前',
      namePlaceholder: '子供の名前を入力',
      dateOfBirth: '生年月日',
      genderLabel: '性別',
      heightLabel: '身長 (cm)',
      weightLabel: '体重 (kg)',
      bloodTypeLabel: '血液型',
      bloodTypePlaceholder: '例: A+, O-',
      notesLabel: 'メモ',
      notesPlaceholder: '子供に関する追加情報...',
      avatarLabel: 'アバター',
      uploadAvatar: '画像をアップロード',
    },
    
    // Actions
    cancel: 'キャンセル',
    save: '保存',
    confirm: '確認',
    
    // Messages
    loadError: '子供リストの読み込みに失敗しました',
    addSuccess: '子供が正常に追加されました！',
    addError: '子供の追加に失敗しました',
    updateSuccess: '情報が正常に更新されました！',
    updateError: '情報の更新に失敗しました',
    deleteSuccess: '子供が削除されました',
    deleteError: '子供の削除に失敗しました',
  },
};

export const getKidsTranslation = (locale: Locale) => kidsTranslations[locale];
