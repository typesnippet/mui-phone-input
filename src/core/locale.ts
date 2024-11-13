import * as locale from "@material-ui/core/locale";
import * as phoneLocale from "react-phone-hooks/locale";

type Locale = keyof typeof locale;

export default (lang: Locale) => ({
    props: {
        ...locale[lang].props,
        MuiPhoneInput: {
            ...(phoneLocale as any)[lang],
            locale: lang,
        },
    }
})
