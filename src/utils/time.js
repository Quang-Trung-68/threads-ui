import dayjs from "@/lib/dayjs";
import i18next from "i18next";
import "dayjs/locale/vi";

export function formatFullTime(dateString) {
  const date = dayjs(dateString);

  const currentLang = i18next.language;
  const locale = currentLang?.startsWith("vi") ? "vi" : "en";

  return date
    .locale(locale)
    .format(
      locale === "vi" ? "dddd, DD/MM/YYYY HH:mm" : "dddd, MMM D, YYYY HH:mm",
    );
}
