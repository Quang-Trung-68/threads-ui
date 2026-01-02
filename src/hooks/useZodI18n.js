import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useZodI18n = (trigger, errors) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        // Only trigger validation if there are existing errors
        // to prevent showing errors on initial load or empty form
        if (Object.keys(errors).length > 0) {
            trigger();
        }
    }, [i18n.language, trigger]);
};
