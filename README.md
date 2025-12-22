# Threads Clone

## 🔗 Demo

**Link Vercel:**

## ✅ Tính năng đã hoàn thành

### 1. Xây dựng trang Register (`/register`)

- ✅ Form đăng ký với 4 trường: First Name, Last Name, Email, Password, Confirm Password
- ✅ Validation sử dụng `react-hook-form` + `zod`
- ✅ Schema validation tại `/src/schemas/registerSchema.js`:
  - Email đúng định dạng
  - Password tối thiểu 8 ký tự
  - Password confirmation phải khớp
  - Tất cả field bắt buộc
- ✅ Hiển thị lỗi validation dưới mỗi input
- ✅ Button submit với loading state khi đang gửi request
- ✅ RTK Query mutation `useRegisterMutation` tại `/src/services/auth.js`
- ✅ Endpoint: `POST /auth/register`
- ✅ Toast notification khi thành công/lỗi
- ✅ Redirect về `/` khi đăng ký thành công
- ✅ Link "Already have an account? Log in" dẫn đến `/login`
- ✅ Toggle hiển thị/ẩn password

### 2. Xây dựng trang Login (`/login`)

- ✅ Form login với 2 trường: Email và Password
- ✅ Schema validation `loginSchema` sử dụng `zod`
- ✅ Integration với API endpoint `POST /auth/login`
- ✅ Lưu access_token và refresh_token vào Cookie
- ✅ Redirect về `/` sau khi login thành công
- ✅ Toast notification cho thành công/lỗi
- ✅ Toggle hiển thị/ẩn password
- ✅ Link "Forgot password?" và "Sign up"

### 3. Trang Home (`/`)

- ✅ Protected route - yêu cầu đăng nhập
- ✅ Hiển thị feed với posts từ API
- ✅ Input tạo post mới với avatar và placeholder động
- ✅ Tích hợp `useAuth` hook để lấy thông tin user

### 4. Authentication Flow

- ✅ `ProtectedRoute` component bảo vệ các route private
- ✅ Hook `useAuth` sử dụng RTK Query `useGetCurrentUserQuery`
- ✅ API endpoint `GET /auth/me` để lấy thông tin user hiện tại
- ✅ Lưu user info vào Cookie
- ✅ Loading state trong khi fetch user data
- ✅ Auto redirect về `/login` nếu chưa authenticated

### 5. UI/UX

- ✅ AuthLayout với decorative Threads logos
- ✅ Responsive design
- ✅ Smooth transitions và hover effects
- ✅ Toast notifications với `react-toastify`
- ✅ Loading spinners
- ✅ Error handling toàn diện

## 🛠️ Tech Stack

- **React 19** + **Vite**
- **React Router v7** - Routing
- **Redux Toolkit + RTK Query** - State management & API calls
- **React Hook Form + Zod** - Form validation
- **Tailwind CSS v4** - Styling
- **Axios** - HTTP client
- **js-cookie** - Cookie management
- **react-toastify** - Notifications
- **shadcn/ui** - UI components

## 📁 Cấu trúc File chính

```
src/
├── pages/
│   └── Auth/
│       ├── Login.jsx          # Trang đăng nhập
│       └── Register.jsx       # Trang đăng ký
├── schemas/
│   ├── loginSchema.js         # Validation schema cho login
│   └── registerSchema.js      # Validation schema cho register
├── services/
│   ├── auth.js               # RTK Query API endpoints
│   └── baseQuery.js          # Custom base query với axios
├── hooks/
│   └── useAuth.js            # Hook lấy thông tin user
├── components/
│   └── auth/
│       └── ProtectedRoute.jsx # HOC bảo vệ private routes
└── utils/
    └── httpRequest.js        # Axios instance với interceptors
```

## 🔑 API Integration

**Base URL:** `https://api01.f8team.dev/api`

| Endpoint         | Method | Mô tả                       |
| ---------------- | ------ | --------------------------- |
| `/auth/register` | POST   | Đăng ký tài khoản mới       |
| `/auth/login`    | POST   | Đăng nhập                   |
| `/auth/me`       | GET    | Lấy thông tin user hiện tại |

## 🚀 Cách chạy project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Notes

- Sử dụng Cookie để lưu trữ tokens (access_token, refresh_token)
- Axios interceptor tự động thêm Bearer token vào headers
- Protected routes tự động redirect về `/login` nếu chưa authenticated
- Form validation real-time với error messages rõ ràng
