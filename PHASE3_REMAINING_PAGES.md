# Phase 3: Frontend Admin UI - Remaining Pages

## Đã hoàn thành:
- ✅ Admin Dashboard (`/admin/page.tsx`)
- ✅ Admin Service (`admin.service.ts`)
- ✅ Families Service (`families.service.ts`)

## Còn lại cần tạo:

### 1. Admin Users Management Page
**File**: `src/app/admin/users/page.tsx`

**Features**:
- Hiển thị danh sách users với pagination
- Search users by email/name
- Change user role (admin, family_owner, family_member)
- Delete user
- View user details (kids, albums, photos count)

**UI Components**:
- Table with columns: Avatar, Name, Email, Role, Created Date, Actions
- Filter by role dropdown
- Search input
- Edit role dialog
- Delete confirmation dialog

**Code snippet**:
```typescript
'use client';

import { useState, useEffect } from 'react';
import { adminService, AdminUser } from '@/services/admin.service';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // ... implement CRUD operations
  
  return (
    <Container maxWidth="xl">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Stats</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={user.avatar_url || undefined}>
                        {user.display_name.charAt(0)}
                      </Avatar>
                      <Typography>{user.display_name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'admin' ? 'error' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{dayjs(user.created_at).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      Kids: {user._count?.kids || 0} | 
                      Albums: {user._count?.albums || 0} | 
                      Photos: {user._count?.photos || 0}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditRole(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={(e, p) => setPage(p)} 
          />
        </Box>
      </Paper>
    </Container>
  );
}
```

---

### 2. Admin Families Management Page
**File**: `src/app/admin/families/page.tsx`

**Features**:
- List all families with pagination
- View family members
- View family stats (kids, albums count)
- Search families by name
- View family details modal

**UI**:
- Grid of family cards (similar to albums view)
- Each card shows: Avatar, Name, Owner, Members count, Kids count, Albums count
- Click to view family details with members list

---

### 3. Family Management Page (for regular users)
**File**: `src/app/families/page.tsx`

**Features**:
- List user's families (owned + member of)
- Create new family
- Invite members
- View pending invitations
- Accept/reject invitations
- Leave family

**UI Components**:
- My Families grid
- Create Family button → Modal
- Pending Invitations section
- Family details with members list

---

### 4. Update Navigation to include Admin link
**File**: `src/components/layout/AppNavigation.tsx`

Add admin menu item (only visible for admin users):

```typescript
const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { path: '/kids', label: 'Bé yêu', icon: <ChildCare /> },
  { path: '/albums', label: 'Albums', icon: <PhotoAlbum /> },
  { path: '/photos', label: 'Ảnh', icon: <Photo /> },
  { path: '/milestones', label: 'Milestones', icon: <Celebration /> },
  ...(user?.role === 'admin' ? [
    { path: '/admin', label: 'Admin', icon: <AdminPanelSettings /> }
  ] : []),
  { path: '/families', label: 'Families', icon: <FamilyRestroom /> },
];
```

---

### 5. Update Stats to include Families
**File**: `src/app/dashboard/page.tsx`

Add family stats card to dashboard:

```typescript
{
  title: 'Families',
  value: stats.families || 0,
  icon: <FamilyRestroom />,
  color: '#3f51b5',
  action: () => router.push('/families'),
}
```

---

### 6. Create Family Modal Component
**File**: `src/components/families/CreateFamilyModal.tsx`

**Props**:
- open: boolean
- onClose: () => void
- onSuccess: () => void

**Form fields**:
- Family name (required)
- Description (optional)
- Avatar URL (optional)

---

### 7. Invite Member Dialog
**File**: `src/components/families/InviteMemberDialog.tsx`

**Props**:
- familyId: string
- open: boolean
- onClose: () => void
- onSuccess: () => void

**Features**:
- Search users by email
- Select role (owner, admin, member)
- Send invitation

---

## Quick Start Commands:

### Backend:
```bash
cd kids-memories/source/backend/kids-memories-api
npm run start:dev
```

### Frontend:
```bash
cd kids-memories/source/frontend/kids-memories-web
npm run dev
```

### Create first admin user:
Connect to database và update role:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

---

## Testing Flow:

1. **Create Admin**:
   - Register normal user
   - Update role to 'admin' in database
   - Login again

2. **Test Admin Dashboard**:
   - Navigate to `/admin`
   - Should see stats and recent users
   - Click "Users" card → go to users page (pending)
   - Click "Families" card → go to families page (pending)

3. **Test Family Creation**:
   - Normal user creates family
   - Invites other users
   - Members accept invitations
   - Verify family appears in admin panel

4. **Test Family Sharing** (after Phase 2 implementation):
   - Member creates kid in family
   - Other members see the kid
   - Update kid from different member
   - Verify permissions work correctly

---

## Security Checklist:

- [ ] Admin routes protected with RolesGuard
- [ ] Frontend checks user.role before showing admin menu
- [ ] API returns 403 for non-admin access to admin endpoints
- [ ] Family members can only edit if they have permission
- [ ] Cannot delete family owner
- [ ] Cannot edit other users' resources without family access

---

## Performance Optimization:

- [ ] Add caching for family membership checks
- [ ] Paginate all lists (users, families, kids, albums)
- [ ] Lazy load family member details
- [ ] Use React Query for data fetching
- [ ] Add debounce to search inputs

---

## Next Steps:

1. Complete remaining UI pages (Users, Families management)
2. Implement Phase 2 (update services for family access)
3. Test full flow end-to-end
4. Add comprehensive error handling
5. Add loading states and skeletons
6. Deploy to production
