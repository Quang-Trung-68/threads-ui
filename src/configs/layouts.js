import DefaultLayout from "@layouts/DefaultLayout";
import AuthLayout from "@layouts/AuthLayout";
import NoLayout from "@layouts/NoLayout";
import DeckLayout from "@layouts/DeckLayout";
import EmbedLayout from "@layouts/EmbedLayout";
import HomeLayout from "@layouts/HomeLayout";

export const LAYOUTS = {
  DEFAULT: DefaultLayout,
  HOME: HomeLayout,
  DECK: DeckLayout,
  AUTH: AuthLayout,
  EMBED: EmbedLayout,
  NO_LAYOUT: NoLayout,
};
