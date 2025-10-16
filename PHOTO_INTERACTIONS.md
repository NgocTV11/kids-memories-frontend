# Photo Detail Modal - Like, Comment, View Count Feature

## Tóm Tắt

Đã thêm chức năng xem chi tiết ảnh, like, comment và đếm views khi click vào ảnh trong album.

---

## Những Gì Đã Thêm

### 1. PhotoDetailModal Component

**File**: `src/components/photos/PhotoDetailModal.tsx`

**Chức năng**:
- ✅ Hiển thị ảnh full size trong dialog
- ✅ Thông tin ảnh (caption, tags, ngày tạo, album)
- ✅ Nút Like/Unlike với icon trái tim (đổi màu khi liked)
- ✅ Hiển thị số lượt thích, bình luận, xem
- ✅ Danh sách comments
- ✅ Thêm comment mới (Enter hoặc click Send)
- ✅ Tự động tăng view count khi mở modal

**UI Layout**:
```
┌────────────────────────────────────────┬──────────────┐
│                                        │   Album      │
│                                        │   DD/MM/YYYY │
│                                        ├──────────────┤
│         IMAGE PREVIEW                  │   Caption    │
│         (Left Side)                    │   #tags      │
│                                        ├──────────────┤
│                                        │ ❤️ 💬        │
│      [X] Close                         │ 15 likes     │
│                                        │ 3 comments   │
│                                        │ 42 views     │
│                                        ├──────────────┤
│                                        │ Comments:    │
│                                        │ - User 1...  │
│                                        │ - User 2...  │
│                                        ├──────────────┤
│                                        │ [Add comment]│
└────────────────────────────────────────┴──────────────┘
```

### 2. Album Detail Page Update

**File**: `src/app/albums/[id]/page.tsx`

**Changes**:
```typescript
// Added imports
import { PhotoDetailModal } from '@/components/photos/PhotoDetailModal';

// Added state
const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
const [photoModalOpen, setPhotoModalOpen] = useState(false);

// Added handlers
const handlePhotoClick = (photo: Photo) => {
  setSelectedPhoto(photo);
  setPhotoModalOpen(true);
};

const handlePhotoUpdate = (updatedPhoto: Photo) => {
  setPhotos((prevPhotos) =>
    prevPhotos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p))
  );
};

// Updated PhotoGallery
<PhotoGallery photos={photos} onPhotoClick={handlePhotoClick} />

// Added modal
<PhotoDetailModal
  open={photoModalOpen}
  photo={selectedPhoto}
  onClose={() => setPhotoModalOpen(false)}
  onPhotoUpdate={handlePhotoUpdate}
/>
```

---

## Features Chi Tiết

### 1. Like/Unlike ❤️

**Cách hoạt động**:
- Click icon ❤️ để like/unlike
- Icon đổi từ outline → filled khi liked
- Màu đổi sang đỏ khi liked
- Số lượt thích tăng/giảm ngay lập tức
- Update vào danh sách photos (optimistic update)

**UI States**:
```tsx
// Not liked
<FavoriteBorder color="default" />
<Typography>15 lượt thích</Typography>

// Liked
<Favorite color="error" />
<Typography>16 lượt thích</Typography>
```

### 2. Comments 💬

**Cách hoạt động**:
- Hiển thị danh sách comments (scroll nếu nhiều)
- Mỗi comment có: avatar, tên user, nội dung, thời gian (relative)
- Input ở dưới cùng để thêm comment mới
- Enter hoặc click Send để gửi
- Comment mới xuất hiện ngay lập tức ở đầu danh sách
- Số bình luận tăng ngay lập tức

**Comment Item**:
```tsx
<Box>
  <Avatar>U</Avatar>
  <Box>
    <Typography>User Name</Typography>
    <Typography>Comment content...</Typography>
    <Typography>2 phút trước</Typography>
  </Box>
</Box>
```

### 3. View Count 👁️

**Cách hoạt động**:
- Tự động tăng view khi modal được mở
- Gọi `trackView()` function trong useEffect
- Hiển thị số lượt xem ở stats section

**Stats Display**:
```tsx
<Box>
  <Typography><strong>15</strong> lượt thích</Typography>
  <Typography><strong>3</strong> bình luận</Typography>
  <Typography><strong>42</strong> lượt xem</Typography>
</Box>
```

---

## API Integration (TODO)

Hiện tại sử dụng **mock data** và **local state**. Cần implement các API endpoints sau:

### 1. Like/Unlike
```typescript
// photosService.ts
async like(photoId: string): Promise<void> {
  await api.post(`/photos/${photoId}/like`);
}

async unlike(photoId: string): Promise<void> {
  await api.delete(`/photos/${photoId}/like`);
}

async checkIfLiked(photoId: string): Promise<boolean> {
  const response = await api.get(`/photos/${photoId}/like/check`);
  return response.data.isLiked;
}
```

### 2. Comments
```typescript
// photosService.ts
async getComments(photoId: string): Promise<Comment[]> {
  const response = await api.get(`/photos/${photoId}/comments`);
  return response.data;
}

async addComment(photoId: string, content: string): Promise<Comment> {
  const response = await api.post(`/photos/${photoId}/comments`, { content });
  return response.data;
}
```

### 3. View Tracking
```typescript
// photosService.ts
async trackView(photoId: string): Promise<void> {
  await api.post(`/photos/${photoId}/views`);
}
```

---

## Backend API Endpoints (Cần Implement)

### 1. Likes
```
POST   /api/photos/:id/like          # Like a photo
DELETE /api/photos/:id/like          # Unlike a photo
GET    /api/photos/:id/like/check    # Check if user liked
```

### 2. Comments
```
GET    /api/photos/:id/comments      # Get all comments
POST   /api/photos/:id/comments      # Add new comment
DELETE /api/comments/:id             # Delete comment
```

### 3. Views
```
POST   /api/photos/:id/views         # Track view (increment counter)
```

### Database Schema Updates

**photos table** (already exists):
```sql
likes_count    INTEGER DEFAULT 0
comments_count INTEGER DEFAULT 0
view_count     INTEGER DEFAULT 0
```

**New tables**:
```sql
-- photo_likes
CREATE TABLE photo_likes (
  id UUID PRIMARY KEY,
  photo_id UUID REFERENCES photos(id),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(photo_id, user_id)
);

-- photo_comments
CREATE TABLE photo_comments (
  id UUID PRIMARY KEY,
  photo_id UUID REFERENCES photos(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- photo_views (optional - for tracking unique views)
CREATE TABLE photo_views (
  id UUID PRIMARY KEY,
  photo_id UUID REFERENCES photos(id),
  user_id UUID REFERENCES users(id),
  viewed_at TIMESTAMP DEFAULT NOW()
);
```

---

## User Flow

### Xem Ảnh và Tương Tác

1. **User vào trang album**: `/albums/[id]`
   - Thấy grid ảnh với stats overlay (likes, comments, views)

2. **Click vào ảnh**:
   - Modal mở với ảnh full size
   - View count tăng +1 tự động
   - Hiển thị thông tin chi tiết (caption, tags, date)

3. **Like ảnh**:
   - Click icon ❤️
   - Icon đổi màu đỏ, fill
   - Số likes tăng +1
   - Click lại để unlike

4. **Xem comments**:
   - Scroll danh sách comments
   - Thấy user name, avatar, content, time

5. **Thêm comment**:
   - Gõ text vào input ở dưới
   - Enter hoặc click Send
   - Comment xuất hiện ngay lập tức
   - Số comments tăng +1

6. **Đóng modal**:
   - Click X hoặc click outside
   - Stats đã update vẫn hiển thị trong grid

---

## Responsive Design

### Desktop (>= 1024px)
```
Modal: 90vh height, max-width lg
├── Left (flex: 1): Image preview (black background)
└── Right (400px): Details sidebar
    ├── Header (photo info)
    ├── Actions (like, comment buttons)
    ├── Stats (counts)
    ├── Comments list (scrollable)
    └── Comment input
```

### Mobile (< 768px) - TODO
Cần responsive layout cho mobile:
- Full width image
- Details section ở dưới (scrollable)
- Stack layout thay vì side-by-side

---

## Styling Highlights

### Image Preview
```tsx
<Box sx={{ 
  flex: 1, 
  bgcolor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}}>
  <img style={{ 
    maxWidth: '100%', 
    maxHeight: '100%', 
    objectFit: 'contain' 
  }} />
</Box>
```

### Like Button Animation
```tsx
<IconButton color={isLiked ? 'error' : 'default'}>
  {isLiked ? <Favorite /> : <FavoriteBorder />}
</IconButton>
```

### Comment Time (Relative)
```tsx
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

// Display
{dayjs(comment.created_at).fromNow()} // "2 phút trước"
```

---

## Testing Checklist

### Functional Testing
- [ ] Click ảnh → Modal mở
- [ ] Click X → Modal đóng
- [ ] Click Like → Icon đổi màu, số tăng
- [ ] Click Unlike → Icon về default, số giảm
- [ ] Gõ comment + Enter → Comment xuất hiện
- [ ] Gõ comment + Click Send → Comment xuất hiện
- [ ] View count tăng khi mở modal
- [ ] Stats update trong grid sau khi đóng modal

### Edge Cases
- [ ] Comment rỗng → Không gửi được
- [ ] Comment dài → Scroll trong input
- [ ] Nhiều comments → Scroll danh sách
- [ ] Không có comments → Hiển thị "Chưa có bình luận"
- [ ] Không có caption/tags → Không hiển thị phần đó

### UI/UX
- [ ] Modal animation smooth
- [ ] Image load progressive
- [ ] Button states rõ ràng (hover, active, disabled)
- [ ] Loading states (submitting comment)
- [ ] Error handling (API fails)

---

## Next Steps

### Phase 1: Backend API (Priority: HIGH)
1. Implement like/unlike endpoints
2. Implement comments CRUD
3. Implement view tracking
4. Add database migrations

### Phase 2: Frontend Integration (Priority: HIGH)
1. Replace mock data với real API calls
2. Add error handling
3. Add loading states
4. Add optimistic updates

### Phase 3: Features (Priority: MEDIUM)
1. Delete own comments
2. Edit own comments
3. Reply to comments (nested)
4. Tag users in comments (@mention)
5. Reactions (not just like - love, laugh, etc)

### Phase 4: Optimization (Priority: LOW)
1. Lazy load comments (pagination)
2. Image lazy loading
3. Cache API responses
4. Debounce view tracking
5. Mobile responsive layout

---

## Summary

✅ **Đã hoàn thành**:
- PhotoDetailModal component với UI đầy đủ
- Like/Unlike functionality (frontend)
- Comments display và add new (frontend)
- View count tracking (frontend)
- Integration vào album detail page

⏳ **Cần làm tiếp**:
- Backend API endpoints cho like/unlike
- Backend API endpoints cho comments
- Backend API endpoints cho view tracking
- Database schema updates
- Error handling và loading states
- Mobile responsive layout

🎯 **Kết quả**:
User giờ có thể:
- Click vào ảnh để xem chi tiết
- Like/unlike ảnh
- Xem và thêm comments
- Thấy số lượt xem tăng

**Note**: Hiện tại dùng mock data, cần backend API để hoạt động hoàn chỉnh.

---

*Cập nhật: Photo interactions feature - October 2025*
