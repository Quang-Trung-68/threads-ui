import { PATHS } from "@/configs/paths.js";
import { LAYOUTS } from "@/configs/layouts.js";

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Create from "@components/Features/Create";
import Activity from "@/pages/Activity";
import NotFound from "@pages/NoLayout/NotFound";
import {
  Heart as HeartIcon,
  House as HouseIcon,
  Plus as PlusIcon,
  User as UserIcon,
  Search as SearchIcon,
} from "lucide-react";
import PostDetailOverlay from "@/pages/PostDetailOverlay";
import UserProfileOverlay from "@/pages/UserProfileOverlay";
import UserProfile from "@/pages/UserProfile";
import Following from "@/pages/Following";
import GhostPosts from "@/pages/GhostPosts";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword";
import RequireVerifiedEmail from "@/pages/Auth/RequireVerifiedEmail";
import Embed from "./pages/Embed";
import UserSettings from "@/pages/UserSettings";
import Deck from "@/pages/Deck";

// Shared Overlay Routes
const overlayRoutes = [
  {
    path: "/:username/post/:postId",
    title: "Post Detail Overlay",
    element: PostDetailOverlay,
    isShowInNav: false,
    icon: null,
    isFill: null,
    private: false,
  },
  {
    path: "/:username",
    title: "User Profile Overlay",
    element: UserProfileOverlay,
    isShowInNav: false,
    icon: null,
    isFill: null,
    private: false,
  },
];

export const ROUTES = [
  // 1. HOME Base Page + Overlays
  {
    layout: LAYOUTS.HOME,
    basePath: "/", // Base path
    props: { baseComponent: Home }, // Prop passed to Layout
    children: [
      ...overlayRoutes,
    ],
    // Nav info for Home
    navItem: {
      path: PATHS.HOME,
      title: "home",
      isShowInNav: true,
      icon: HouseIcon,
      isFill: true,
    },
  },
  // 2. FOLLOWING Base Page + Overlays
  {
    layout: LAYOUTS.HOME, // Reuse Generic Layout
    basePath: "/following",
    props: { baseComponent: Following },
    children: [
      ...overlayRoutes,
    ],
  },
  // 3. GHOST POSTS Base Page + Overlays
  {
    layout: LAYOUTS.HOME, // Reuse Generic Layout
    basePath: "/ghost-posts",
    props: { baseComponent: GhostPosts },
    children: [
      ...overlayRoutes,
    ],
  },

  {
    layout: LAYOUTS.DEFAULT,
    children: [
      {
        path: PATHS.USER_SETTINGS,
        title: "User Settings",
        element: UserSettings,
        isShowInNav: false,
        icon: null,
        isFill: null,
        private: true,
      },
      {
        path: PATHS.FOLLOWING,
        title: "Following page",
        element: Following,
        isShowInNav: false,
        icon: null,
        isFill: null,
        private: true,
      },
      {
        path: PATHS.GHOST_POSTS,
        title: "Ghost posts",
        element: GhostPosts,
        isShowInNav: false,
        icon: null,
        isFill: null,
        private: true,
      },
      {
        path: PATHS.SEARCH,
        title: "search",
        element: Search,
        isShowInNav: true,
        icon: SearchIcon,
        isFill: false,
        private: true,
      },
      {
        path: null,
        title: "create",
        element: Create,
        isShowInNav: true,
        icon: PlusIcon,
        isFill: false,
        private: true,
      },
      {
        path: PATHS.ACTIVITY,
        title: "notifications",
        element: Activity,
        isShowInNav: true,
        icon: HeartIcon,
        isFill: true,
        private: true,
      },
      {
        path: PATHS.USER_PROFILE,
        title: "profile",
        element: UserProfile,
        isShowInNav: true,
        icon: UserIcon,
        isFill: true,
        private: true,
      },
    ],
  },

  {
    layout: LAYOUTS.AUTH,
    children: [
      {
        path: PATHS.LOGIN,
        title: "Login",
        element: Login,
        isShowInNav: false,
        private: false,
      },
      {
        path: PATHS.REGISTER,
        title: "Register",
        element: Register,
        isShowInNav: false,
        private: false,
      },
      {
        path: PATHS.FORGOT_PASSWORD,
        title: "Forgot password",
        element: ForgotPassword,
        isShowInNav: false,
        private: false,
      },
      {
        path: PATHS.RESET_PASSWORD,
        title: "Reset password",
        element: ResetPassword,
        isShowInNav: false,
        private: false,
      },
      {
        path: PATHS.VERIFY_EMAIL,
        title: "Verify email",
        element: VerifyEmail,
        isShowInNav: false,
        private: false,
      },
      {
        path: PATHS.REQUIRE_VERIFIED_EMAIL,
        title: "Require verified email",
        element: RequireVerifiedEmail,
        isShowInNav: false,
        private: false,
      },
    ],
  },
  {
    layout: LAYOUTS.EMBED,
    children: [
      {
        path: PATHS.EMBED,
        title: "Embed",
        element: Embed,
        isShowInNav: false,
        private: false,
      },
    ],
  },

  {
    layout: LAYOUTS.NO_LAYOUT,
    children: [
      {
        path: PATHS.NOT_FOUND,
        title: "Not Found",
        element: NotFound,
        isShowInNav: false,
        private: false,
      },
    ],
  },
  {
    layout: LAYOUTS.DECK,
    children: [
      {
        path: PATHS.DECK,
        title: "Deck View",
        element: Deck,
        isShowInNav: false,
        private: true,
      },
    ],
  },
];
