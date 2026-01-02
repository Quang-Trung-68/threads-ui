# Threads Clone

## 📖 1. Project Overview
This project is a mid-level clone of the popular social media application **Threads**, built to replicate its core functionality and user interface. It demonstrates a modern full-stack approach using the latest React ecosystem.

**Purpose:**
-   **Education:** To deeply understand advanced React patterns, state management, and modern CSS techniques.
-   **Portfolio:** To showcase proficiency in building complex, interactive web applications.

## 📸 2. Demo / Preview

-   **Demo Link:** [threads-ui-eta.vercel.app](https://threads-ui-eta.vercel.app)
-   **Test Account:**
    -   Email: `trungdang.dqt@gmail.com`
    -   Password: `12345678`

![App Screenshot](https://via.placeholder.com/800x400?text=App+Screenshot+Placeholder)

## ✨ 3. Features
-   **Authentication:** specialized Login & Register flows with Form Validation (Zod) and JWT handling.
-   **Social Feed:** Infinite scrolling feed with posts, replies, and dynamic interactions.
-   **User System:** User profiles, follow/unfollow mechanisms, and suggested users.
-   **Interactions:** Like, Reply, Repost, and Quote functionality with optimistic UI updates.
-   **Media Support:** Image uploads and responsive media grids.
-   **Search & Discovery:** Search functionality to find users and content.
-   **Theme & Localization:** Dark/Light mode support and Internationalization (English/Vietnamese).
-   **Responsive Design:** Fully adaptive UI mimicking the native mobile app experience on all devices.

## 🛠️ 4. Tech Stack

### Frontend
-   **Framework:** React 19, Vite
-   **Routing:** React Router v7
-   **Styling:** Tailwind CSS v4, Radix UI (Headless UI), Class Variance Authority (CVA), Lucide React (Icons)
-   **Animations:** Framer Motion

### State Management & Data Fetching
-   **Redux Toolkit** (Global State)
-   **RTK Query** (Data Fetching & Caching)
-   **Axios** (HTTP Client with Interceptors)

### Utilities
-   **Forms:** React Hook Form + Zod (Validation)
-   **I18n:** i18next + react-i18next
-   **Date/Time:** Day.js
-   **Helpers:** Lodash, clsx, tailwind-merge

## 📂 5. Folder Structure
```bash
src/
├── components/      # Reusable UI components & feature-specific widgets
│   ├── Common/      # Shared components (Modals, UI primitives)
│   ├── Features/    # Business logic components (Auth, Post, User)
│   └── Layouts/     # Page layouts (MainLayout, AuthLayout)
├── configs/         # App constants and configuration (Paths, Environment)
├── hooks/           # Custom React hooks (useAuth, useDebounce)
├── locales/         # i18n translation JSON files (en, vi)
├── pages/           # Route components (Home, Search, Profile, Login)
├── schemas/         # Zod validation schemas
├── services/        # API endpoints definitions (RTK Query / Axios)
├── store/           # Redux store configuration
└── utils/           # Helper functions and formatters
```

## 🚀 6. Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Quang-Trung-68/threads-ui.git
    cd threads-ui
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🔑 7. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
VITE_API_URL=https://api01.f8team.dev/api
```

## 📱 8. Key Screens / Pages
-   **Login / Register:** Secure authentication screens.
-   **Home Feed:** The main timeline with posts.
-   **Post Detail:** Navigation to view single post threads and replies.
-   **Search:** User discovery interface.
-   **User Profile:** Personal profile page with user's threads, replies, and reposts.
-   **Activity:** Notification center (Likes, Replies, Mentions).
-   **User Settings:** Account configuration and preferences.

## 💡 9. What I Learned
-   Implementing **Authentication flows** using RTK Query and managing JWT tokens securely in Cookies.
-   Building complex **Forms** with robust validation using React Hook Form and Zod.
-   Structuring a large-scale React application for **scalability and maintainability**.
-   Handling **Global State** effectively with Redux Toolkit.
-   Implementing **Dark Mode** and **Multi-language** support from scratch.
-   Optimizing performance with **Infinite Scroll** and lazy loading.

## 🔮 10. Future Improvements
-   [ ] Real-time notifications using WebSockets (Socket.io).
-   [ ] Direct Messaging (DM) feature.
-   [ ] Advanced media editing before upload.
-   [ ] Improved accessibility (a11y) across components.
-   [ ] Unit and Integration Tests (Vitest, React Testing Library).

## 📬 11. License & Contact
Distributed under the MIT License. See `LICENSE` for more information.

**Contact:**
-   **Name:** [Dang Quang Trung]
-   **Email:** [trungdang.dqt@gmail.com]
-   **GitHub:** [github.com/Quang-Trung-68]
