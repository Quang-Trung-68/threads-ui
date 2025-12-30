import i18n from "@/i18n/config";


export const zodI18nErrorMap = (issue, ctx) => {
  const t = i18n.t.bind(i18n);

  const code = issue.code;
  const type = issue.origin || issue.type;
  const format = issue.format || issue.validation;

  switch (code) {
    case "invalid_type":
      return { message: t("validation:zod.invalid_type") };

    case "too_small":
      if (issue.minimum === 1) {
        return { message: t("validation:zod.required") };
      }
      return {
        message: t(`validation:zod.${type}.min`, {
          count: issue.minimum,
        }),
      };

    case "too_big":
      return {
        message: t(`validation:zod.${type}.max`, {
          count: issue.maximum,
        }),
      };

    case "invalid_string":
    case "invalid_format":
      return {
        message: t(`validation:zod.string.${format}`),
      };

    case "custom": {
      const msg = issue.message ?? "zod.invalid_type";
      if (msg.includes(":")) return { message: i18n.t(msg) };

      // Try root level in validation namespace
      const rootKey = `validation:${msg}`;
      const rootRes = i18n.t(rootKey);
      if (rootRes !== rootKey) return { message: rootRes };

      // Try deep level (original structure)
      const deepKey = `validation:zod.custom.${msg}`;
      const deepRes = i18n.t(deepKey);
      if (deepRes !== deepKey) return { message: deepRes };

      return { message: msg };
    }



    default:
      return {
        message:
          ctx?.defaultError ??
          issue.message ??
          t("validation:zod.invalid_type"),
      };
  }
};







