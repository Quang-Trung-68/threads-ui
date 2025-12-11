import { PATHS } from "@/configs/paths.js";
import { LAYOUTS } from "@/configs/layouts.js";

import Home from "@/pages/Home";
import Search from "@pages/Search";
import Create from "@components/Create";
import Activity from "@/pages/Activity";
import NotFound from "@pages/NotFound";
import Profile from "@pages/Profile";
import {
  Heart as HeartIcon,
  House as HouseIcon,
  Plus as PlusIcon,
  User as UserIcon,
} from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import PostDetail from "@/pages/PostDetailPage";
import UserProfile from "@/pages/ProfilePage";
import Following from "./pages/Following/Following";
import GhostPosts from "./pages/GhostPosts";
import ForYou from "./pages/ForYou/ForYou";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

export const ROUTES = [
  {
    layout: LAYOUTS.DEFAULT,
    children: [
      {
        path: PATHS.HOME,
        title: "Home",
        element: Home,
        isShowInNav: true,
        icon: HouseIcon,
        isFill: true,
        private: true,
      },
      {
        path: PATHS.POST_DETAIL,
        title: "Post Detail",
        element: PostDetail,
        isShowInNav: false,
        icon: null,
        isFill: null,
        private: true,
      },
      {
        path: PATHS.USER_PROFILE,
        title: "User Profile",
        element: UserProfile,
        isShowInNav: false,
        icon: null,
        isFill: null,
      },
      {
        path: PATHS.FOR_YOU,
        title: "For you",
        element: ForYou,
        isShowInNav: false,
        icon: null,
        isFill: null,
      },
      {
        path: PATHS.FOLLOWING,
        title: "Following page",
        element: Following,
        isShowInNav: false,
        icon: null,
        isFill: null,
      },
      {
        path: PATHS.GHOST_POSTS,
        title: "Ghost posts",
        element: GhostPosts,
        isShowInNav: false,
        icon: null,
        isFill: null,
      },
      {
        path: PATHS.SEARCH,
        title: "Search",
        element: Search,
        isShowInNav: true,
        icon: SearchIcon,
        isFill: false,
      },
      {
        path: null,
        title: "Create",
        element: Create,
        isShowInNav: true,
        icon: PlusIcon,
        isFill: false,
      },
      {
        path: PATHS.ACTIVITY,
        title: "Activity/Notifications",
        element: Activity,
        isShowInNav: true,
        icon: HeartIcon,
        isFill: true,
      },
      {
        path: PATHS.PROFILE,
        title: "Profile",
        element: Profile,
        isShowInNav: true,
        icon: UserIcon,
        isFill: true,
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
      },
    ],
  },
];
