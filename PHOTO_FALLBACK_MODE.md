# Photo Interactions - Fallback Mode (API Not Ready)

## 🎯 Vấn Đề

Backend chưa có các endpoints:
- ❌ `GET /photos/:id/like/check` → 404
- ❌ `GET /photos/:id/comments` → 404  
- ❌ `POST /photos/:id/comments` → 404
- ❌ `POST /photos/:id/views` → 404

Dẫn đến console errors liên tục và app bị broken.

---

## ✅ Giải Pháp: Graceful Degradation

Thêm **fallback logic** để app vẫn hoạt động (demo mode) khi API chưa sẵn sàng.

---

## 🔧 Changes Made

### 1. Load Photo Details - Try/Catch Individual APIs

**Before**:
```typescript
const loadPhotoDetails = async () => {
  try {
    const liked = await photosService.checkIfLiked(photo.id); // Fail → crash
    const comments = await photosService.getComments(photo.id); // Fail → crash
  } catch (error) {
    console.error('Error loading photo details:', error);
  }
};
```

**After**:
```typescript
const loadPhotoDetails = async () => {
  // Always load initial data from photo object
  setLikesCount(photo.likes_count || 0);
  setCommentsCount(photo.comments_count || 0);
  setViewCount(photo.view_count || 0);
  
  // Try checkIfLiked - fallback to false
  try {
    const liked = await photosService.checkIfLiked(photo.id);
    setIsLiked(liked);
  } catch (error) {
    console.warn('Like check API not available yet, defaulting to false');
    setIsLiked(false); // Fallback
  }
  
  // Try getComments - fallback to empty array
  try {
    const comments = await photosService.getComments(photo.id);
    setComments(comments);
  } catch (error) {
    console.warn('Comments API not available yet, showing empty list');
    setComments([]); // Fallback
  }
};
```

**Result**: 
- ✅ Modal vẫn mở được
- ✅ Hiển thị stats từ photo object
- ✅ Không crash app

---

### 2. Track View - Silent Fail

**Before**:
```typescript
try {
  await photosService.trackView(photo.id);
} catch (error) {
  console.error('Error tracking view:', error); // Loud error
}
```

**After**:
```typescript
try {
  await photosService.trackView(photo.id);
} catch (error) {
  console.warn('View tracking API not available yet'); // Quiet warning
}
```

**Result**: 
- ✅ Không show error khi API 404
- ✅ View count vẫn hiển thị (từ DB)
- ⚠️ Không track view mới (chờ API)

---

### 3. Like/Unlike - Optimistic Update (Keep Local State)

**Before**:
```typescript
try {
  await photosService.like(photo.id);
  setIsLiked(true); // After API success
} catch (error) {
  console.error('Error toggling like:', error);
  setIsLiked(!isLiked); // Revert
}
```

**After**:
```typescript
// Optimistic update FIRST
setIsLiked(true);
setLikesCount(prev => prev + 1);

try {
  await photosService.like(photo.id);
} catch (error) {
  console.warn('Like API not available yet, showing local state only');
  // KEEP optimistic update for demo (don't revert)
}
```

**Result**: 
- ✅ UI responsive ngay lập tức
- ✅ User thấy like work (local state)
- ⚠️ Reload → like mất (chưa lưu DB)

---

### 4. Add Comment - Mock Fallback

**Before**:
```typescript
try {
  const comment = await photosService.addComment(photo.id, newComment);
  setComments([comment, ...comments]);
} catch (error) {
  alert('Không thể thêm bình luận'); // Hard fail
}
```

**After**:
```typescript
try {
  // Try real API first
  const comment = await photosService.addComment(photo.id, newComment);
  setComments([comment, ...comments]);
} catch (apiError) {
  // API not ready → Use mock comment
  console.warn('Comments API not available yet, showing mock comment');
  
  const mockComment = {
    id: `mock-${Date.now()}`,
    photo_id: photo.id,
    user_id: 'current-user',
    content: newComment,
    created_at: new Date().toISOString(),
    user: {
      id: 'current-user',
      display_name: 'Bạn (Demo)',
      avatar_url: null,
    },
  };
  
  setComments([mockComment, ...comments]);
  alert('⚠️ API chưa sẵn sàng. Comment này chỉ hiển thị local.');
}
```

**Result**: 
- ✅ User vẫn có thể comment (demo mode)
- ✅ Comment hiển thị ngay
- ⚠️ Comment chỉ local (reload → mất)
- ⚠️ Alert warning user về demo mode

---

## 🎭 Demo Mode Behavior

### When API Not Ready:

#### Like/Unlike:
- ✅ Click tim → Icon đổi màu ngay
- ✅ Số likes tăng/giảm ngay
- ⚠️ **Reload → Về lại trạng thái cũ** (chưa lưu DB)
- 💡 User experience: "Mượt mà nhưng không persist"

#### Comments:
- ✅ Gõ comment → Comment xuất hiện
- ✅ Hiển thị "Bạn (Demo)" làm tên
- ⚠️ **Alert warning**: "API chưa sẵn sàng"
- ⚠️ **Reload → Comment mất** (chưa lưu DB)
- 💡 User experience: "Hoạt động nhưng biết là demo"

#### View Count:
- ✅ Hiển thị view count từ DB
- ⚠️ **Không tăng view** (API chưa có)
- 💡 User experience: "Thấy số nhưng không track mới"

#### Load Comments:
- ✅ Modal mở được
- ✅ Hiển thị "Chưa có bình luận"
- 💡 User experience: "Không lỗi, chỉ trống"

---

## 🔄 Transition to Full API

Khi backend sẵn sàng:

1. **Implement endpoints** (xem `PHOTO_API_REQUIREMENTS.md`)
2. **No frontend changes needed!**
3. **Restart frontend**
4. **Test**:
   - Like → Reload → Vẫn còn ✅
   - Comment → Reload → Vẫn còn ✅
   - View → Tăng mỗi lần xem ✅

---

## 📊 Error Handling Comparison

### Before (Broken):
```
Console:
❌ Error loading photo details: AxiosError
❌ Error submitting comment: AxiosError
❌ Error tracking view: AxiosError

UI:
- Modal không mở được
- Alert lỗi liên tục
- User confused
```

### After (Graceful):
```
Console:
⚠️ Like check API not available yet, defaulting to false
⚠️ Comments API not available yet, showing empty list
⚠️ View tracking API not available yet

UI:
- Modal mở bình thường ✅
- Có thể like/comment (local) ✅
- Alert 1 lần khi comment (warning) ⚠️
- User understands demo mode
```

---

## 🎯 Current State

### ✅ Works (Demo Mode):
- Modal opens
- Shows photo stats
- Like/Unlike (local state)
- Add comments (mock data)
- View count display (from DB)

### ⚠️ Limitations (Until API Ready):
- Likes don't persist (reload → lost)
- Comments don't persist (reload → lost)
- Views don't increment
- Can't load existing comments from DB

### 🚀 When API Ready:
- All limitations removed
- Full persistence
- Real-time updates
- No frontend changes needed

---

## 📝 Console Messages

**Current (Clean)**:
```
⚠️ Like check API not available yet, defaulting to false
⚠️ Comments API not available yet, showing empty list
⚠️ View tracking API not available yet
⚠️ Like API not available yet, showing local state only
⚠️ Comments API not available yet, showing mock comment
```

**After API Ready (Silent)**:
```
(No warnings - all APIs work)
```

---

## 🔧 Developer Notes

### To Switch Back to Strict Mode:

Nếu muốn revert về strict mode (crash khi API fail):

1. **Remove try/catch fallbacks**
2. **Remove mock comments**
3. **Revert optimistic updates** to after API success

### To Test API Integration:

1. Run backend: `npm run start:dev`
2. Implement endpoints (see `PHOTO_API_REQUIREMENTS.md`)
3. Test in browser
4. Check console - warnings should disappear

---

## ✅ Summary

**Vấn đề**: API 404 → App crash
**Giải pháp**: Graceful degradation với fallbacks
**Kết quả**: 
- ✅ App không crash
- ✅ UI vẫn responsive
- ✅ User có thể demo features
- ⚠️ Data không persist (chờ API)
- 🚀 Sẵn sàng chuyển sang full API

**Backend Task**: Implement 4 endpoints → Frontend hoạt động 100%

---

*Cập nhật: Photo Interactions Fallback Mode - October 2025*
