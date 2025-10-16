# Fix: Cannot read properties of undefined (reading 'appTitle')

## Nguyên Nhân
localStorage đang cache version cũ của translations (không có `hero` object).

## Giải Pháp

### Cách 1: Clear localStorage trong Browser Console

1. Mở DevTools (F12)
2. Vào tab **Console**
3. Chạy lệnh:
```javascript
localStorage.removeItem('i18n-storage')
location.reload()
```

### Cách 2: Clear All Site Data

1. Mở DevTools (F12)
2. Vào tab **Application** (hoặc **Storage**)
3. Click **Storage** → **Clear site data**
4. Reload trang (Ctrl + Shift + R)

### Cách 3: Hard Refresh

1. Đóng tất cả tab của localhost:3000
2. Ctrl + Shift + R (hard refresh)
3. Hoặc Ctrl + F5

## Xác Nhận Đã Fix

Sau khi clear, mở Console và chạy:
```javascript
JSON.parse(localStorage.getItem('i18n-storage'))
```

Kết quả phải có structure:
```json
{
  "state": {
    "locale": "vi",
    "auth": {
      "hero": {
        "appTitle": "Kids Memories",
        "tagline": "Lưu giữ những khoảnh khắc quý giá của bé yêu",
        ...
      },
      "login": { ... },
      "register": { ... }
    }
  }
}
```

Nếu có `auth.hero` → ✅ Fixed!
