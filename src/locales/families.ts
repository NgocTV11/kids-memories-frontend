import { Locale } from '@/config/i18n.config';

export const familiesTranslations = {
  vi: {
    // Page title
    title: 'Quản Lý Gia Đình',
    subtitle: 'Quản lý gia đình và thành viên',
    
    // List view
    myFamilies: 'Gia Đình Của Tôi',
    familiesCount: 'gia đình',
    noFamilies: 'Chưa có gia đình nào',
    noFamiliesDesc: 'Tạo gia đình đầu tiên để bắt đầu chia sẻ kỷ niệm',
    
    // Buttons
    createFamily: 'Tạo Gia Đình',
    viewFamily: 'Xem Chi Tiết',
    edit: 'Sửa',
    delete: 'Xóa',
    addMember: 'Thêm Thành Viên',
    leave: 'Rời Gia Đình',
    
    // Family card
    members: 'thành viên',
    kids: 'bé yêu',
    role: 'Vai trò',
    createdBy: 'Tạo bởi',
    createdOn: 'Tạo ngày',
    
    // Roles
    roles: {
      owner: 'Chủ sở hữu',
      admin: 'Quản trị viên',
      member: 'Thành viên',
      viewer: 'Người xem',
    },
    
    // Family detail
    familyInfo: 'Thông Tin Gia Đình',
    familyMembers: 'Thành Viên',
    membersList: 'Danh sách thành viên',
    inviteMembers: 'Mời Thành Viên',
    
    // Member card
    you: 'Bạn',
    removeMember: 'Xóa thành viên',
    changeRole: 'Đổi vai trò',
    
    // Modal titles
    createFamilyTitle: 'Tạo Gia Đình Mới',
    editFamilyTitle: 'Chỉnh Sửa Gia Đình',
    deleteFamilyTitle: 'Xóa Gia Đình',
    deleteFamilyConfirm: 'Bạn có chắc chắn muốn xóa gia đình này? Tất cả dữ liệu liên quan sẽ bị xóa.',
    leaveFamilyTitle: 'Rời Gia Đình',
    leaveFamilyConfirm: 'Bạn có chắc chắn muốn rời khỏi gia đình này?',
    addMemberTitle: 'Thêm Thành Viên',
    inviteMemberTitle: 'Mời Thành Viên',
    
    // Form fields
    form: {
      name: 'Tên gia đình',
      namePlaceholder: 'Nhập tên gia đình',
      description: 'Mô tả',
      descriptionPlaceholder: 'Mô tả về gia đình...',
      memberEmail: 'Email thành viên',
      memberEmailPlaceholder: 'Nhập email để mời',
      memberRole: 'Vai trò',
      selectRole: 'Chọn vai trò',
    },
    
    // Invite
    inviteLink: 'Link mời',
    copyLink: 'Sao chép link',
    linkCopied: 'Đã sao chép link!',
    sendInvite: 'Gửi lời mời',
    inviteSent: 'Đã gửi lời mời',
    
    // Actions
    cancel: 'Hủy',
    save: 'Lưu',
    confirm: 'Xác nhận',
    close: 'Đóng',
    invite: 'Mời',
    
    // Messages
    loadError: 'Không thể tải danh sách gia đình',
    createSuccess: 'Tạo gia đình thành công!',
    createError: 'Không thể tạo gia đình',
    updateSuccess: 'Cập nhật gia đình thành công!',
    updateError: 'Không thể cập nhật gia đình',
    deleteSuccess: 'Đã xóa gia đình',
    deleteError: 'Không thể xóa gia đình',
    leaveSuccess: 'Đã rời gia đình',
    leaveError: 'Không thể rời gia đình',
    addMemberSuccess: 'Đã thêm thành viên',
    addMemberError: 'Không thể thêm thành viên',
    removeMemberSuccess: 'Đã xóa thành viên',
    removeMemberError: 'Không thể xóa thành viên',
    
    // Detail page
    detail: {
      familyNotFound: 'Gia đình không tồn tại',
      loadFamilyError: 'Không thể tải thông tin gia đình',
      enterFamilyName: 'Vui lòng nhập tên gia đình',
      removeMemberConfirm: 'Bạn có chắc muốn xóa {name} khỏi gia đình?',
      leaveFamilyConfirmMsg: 'Bạn có chắc muốn rời khỏi gia đình này?',
      deleteFamilyConfirmMsg: 'Bạn có chắc muốn xóa gia đình "{name}"? Hành động này không thể hoàn tác.',
      noMembers: 'Chưa có thành viên',
      noKids: 'Chưa có bé',
    },
    
    // Invite member modal
    inviteModal: {
      title: 'Mời Thành Viên Vào Gia Đình',
      searchLabel: 'Tìm theo tên hoặc email',
      searchPlaceholder: 'Nhập ít nhất 2 ký tự để tìm kiếm',
      searching: 'Đang tìm kiếm...',
      noResults: 'Không tìm thấy người dùng',
      selectUser: 'Chọn một người dùng để mời',
      changeUser: 'Thay đổi',
      roleLabel: 'Vai trò',
      roleAdmin: 'Quản trị viên',
      roleMember: 'Thành viên',
      relationshipLabel: 'Mối quan hệ',
      relationshipPlaceholder: 'VD: Bố, Mẹ, Ông, Bà...',
      inviteButton: 'Mời',
      cancel: 'Hủy',
      inviting: 'Đang mời...',
      inviteError: 'Không thể mời thành viên',
    },
  },
  en: {
    // Page title
    title: 'Family Management',
    subtitle: 'Manage families and members',
    
    // List view
    myFamilies: 'My Families',
    familiesCount: 'families',
    noFamilies: 'No families yet',
    noFamiliesDesc: 'Create your first family to start sharing memories',
    
    // Buttons
    createFamily: 'Create Family',
    viewFamily: 'View Details',
    edit: 'Edit',
    delete: 'Delete',
    addMember: 'Add Member',
    leave: 'Leave Family',
    
    // Family card
    members: 'members',
    kids: 'kids',
    role: 'Role',
    createdBy: 'Created by',
    createdOn: 'Created on',
    
    // Roles
    roles: {
      owner: 'Owner',
      admin: 'Admin',
      member: 'Member',
      viewer: 'Viewer',
    },
    
    // Family detail
    familyInfo: 'Family Information',
    familyMembers: 'Members',
    membersList: 'Members list',
    inviteMembers: 'Invite Members',
    
    // Member card
    you: 'You',
    removeMember: 'Remove member',
    changeRole: 'Change role',
    
    // Modal titles
    createFamilyTitle: 'Create New Family',
    editFamilyTitle: 'Edit Family',
    deleteFamilyTitle: 'Delete Family',
    deleteFamilyConfirm: 'Are you sure you want to delete this family? All related data will be deleted.',
    leaveFamilyTitle: 'Leave Family',
    leaveFamilyConfirm: 'Are you sure you want to leave this family?',
    addMemberTitle: 'Add Member',
    inviteMemberTitle: 'Invite Member',
    
    // Form fields
    form: {
      name: 'Family name',
      namePlaceholder: 'Enter family name',
      description: 'Description',
      descriptionPlaceholder: 'Description about the family...',
      memberEmail: 'Member email',
      memberEmailPlaceholder: 'Enter email to invite',
      memberRole: 'Role',
      selectRole: 'Select role',
    },
    
    // Invite
    inviteLink: 'Invite link',
    copyLink: 'Copy link',
    linkCopied: 'Link copied!',
    sendInvite: 'Send invite',
    inviteSent: 'Invite sent',
    
    // Actions
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    invite: 'Invite',
    
    // Messages
    loadError: 'Failed to load families list',
    createSuccess: 'Family created successfully!',
    createError: 'Failed to create family',
    updateSuccess: 'Family updated successfully!',
    updateError: 'Failed to update family',
    deleteSuccess: 'Family deleted',
    deleteError: 'Failed to delete family',
    leaveSuccess: 'Left family',
    leaveError: 'Failed to leave family',
    addMemberSuccess: 'Member added',
    addMemberError: 'Failed to add member',
    removeMemberSuccess: 'Member removed',
    removeMemberError: 'Failed to remove member',
    
    // Detail page
    detail: {
      familyNotFound: 'Family not found',
      loadFamilyError: 'Failed to load family information',
      enterFamilyName: 'Please enter family name',
      removeMemberConfirm: 'Are you sure you want to remove {name} from the family?',
      leaveFamilyConfirmMsg: 'Are you sure you want to leave this family?',
      deleteFamilyConfirmMsg: 'Are you sure you want to delete family "{name}"? This action cannot be undone.',
      noMembers: 'No members yet',
      noKids: 'No kids yet',
    },
    
    // Invite member modal
    inviteModal: {
      title: 'Invite Member to Family',
      searchLabel: 'Search by name or email',
      searchPlaceholder: 'Enter at least 2 characters to search',
      searching: 'Searching...',
      noResults: 'No users found',
      selectUser: 'Select a user to invite',
      changeUser: 'Change',
      roleLabel: 'Role',
      roleAdmin: 'Admin',
      roleMember: 'Member',
      relationshipLabel: 'Relationship',
      relationshipPlaceholder: 'E.g., Father, Mother, Grandpa, Grandma...',
      inviteButton: 'Invite',
      cancel: 'Cancel',
      inviting: 'Inviting...',
      inviteError: 'Failed to invite member',
    },
  },
  ja: {
    // Page title
    title: '家族管理',
    subtitle: '家族とメンバーを管理',
    
    // List view
    myFamilies: '私の家族',
    familiesCount: '家族',
    noFamilies: 'まだ家族がいません',
    noFamiliesDesc: '最初の家族を作成して、思い出を共有しましょう',
    
    // Buttons
    createFamily: '家族を作成',
    viewFamily: '詳細を見る',
    edit: '編集',
    delete: '削除',
    addMember: 'メンバーを追加',
    leave: '家族を離れる',
    
    // Family card
    members: 'メンバー',
    kids: '子供',
    role: '役割',
    createdBy: '作成者',
    createdOn: '作成日',
    
    // Roles
    roles: {
      owner: 'オーナー',
      admin: '管理者',
      member: 'メンバー',
      viewer: '閲覧者',
    },
    
    // Family detail
    familyInfo: '家族情報',
    familyMembers: 'メンバー',
    membersList: 'メンバーリスト',
    inviteMembers: 'メンバーを招待',
    
    // Member card
    you: 'あなた',
    removeMember: 'メンバーを削除',
    changeRole: '役割を変更',
    
    // Modal titles
    createFamilyTitle: '新しい家族を作成',
    editFamilyTitle: '家族を編集',
    deleteFamilyTitle: '家族を削除',
    deleteFamilyConfirm: 'この家族を削除してもよろしいですか？関連するすべてのデータが削除されます。',
    leaveFamilyTitle: '家族を離れる',
    leaveFamilyConfirm: 'この家族を離れてもよろしいですか？',
    addMemberTitle: 'メンバーを追加',
    inviteMemberTitle: 'メンバーを招待',
    
    // Form fields
    form: {
      name: '家族名',
      namePlaceholder: '家族名を入力',
      description: '説明',
      descriptionPlaceholder: '家族の説明...',
      memberEmail: 'メンバーのメール',
      memberEmailPlaceholder: '招待するメールを入力',
      memberRole: '役割',
      selectRole: '役割を選択',
    },
    
    // Invite
    inviteLink: '招待リンク',
    copyLink: 'リンクをコピー',
    linkCopied: 'リンクがコピーされました！',
    sendInvite: '招待を送信',
    inviteSent: '招待が送信されました',
    
    // Actions
    cancel: 'キャンセル',
    save: '保存',
    confirm: '確認',
    close: '閉じる',
    invite: '招待',
    
    // Messages
    loadError: '家族リストの読み込みに失敗しました',
    createSuccess: '家族が正常に作成されました！',
    createError: '家族の作成に失敗しました',
    updateSuccess: '家族が正常に更新されました！',
    updateError: '家族の更新に失敗しました',
    deleteSuccess: '家族が削除されました',
    deleteError: '家族の削除に失敗しました',
    leaveSuccess: '家族を離れました',
    leaveError: '家族を離れることができませんでした',
    addMemberSuccess: 'メンバーが追加されました',
    addMemberError: 'メンバーの追加に失敗しました',
    removeMemberSuccess: 'メンバーが削除されました',
    removeMemberError: 'メンバーの削除に失敗しました',
    
    // Detail page
    detail: {
      familyNotFound: '家族が見つかりません',
      loadFamilyError: '家族情報の読み込みに失敗しました',
      enterFamilyName: '家族名を入力してください',
      removeMemberConfirm: '{name}を家族から削除してもよろしいですか？',
      leaveFamilyConfirmMsg: 'この家族を離れてもよろしいですか？',
      deleteFamilyConfirmMsg: '家族「{name}」を削除してもよろしいですか？この操作は元に戻せません。',
      noMembers: 'メンバーがまだいません',
      noKids: '子供がまだいません',
    },
    
    // Invite member modal
    inviteModal: {
      title: '家族にメンバーを招待',
      searchLabel: '名前またはメールで検索',
      searchPlaceholder: '検索するには2文字以上入力してください',
      searching: '検索中...',
      noResults: 'ユーザーが見つかりません',
      selectUser: '招待するユーザーを選択',
      changeUser: '変更',
      roleLabel: '役割',
      roleAdmin: '管理者',
      roleMember: 'メンバー',
      relationshipLabel: '関係',
      relationshipPlaceholder: '例：父、母、祖父、祖母...',
      inviteButton: '招待',
      cancel: 'キャンセル',
      inviting: '招待中...',
      inviteError: 'メンバーの招待に失敗しました',
    },
  },
};

export const getFamiliesTranslation = (locale: Locale) => familiesTranslations[locale];
