import {Button} from "@material-ui/core";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";

import commonTests from "./common";
import PhoneInput, {locale} from "../src/core";

const theme = createTheme({}, locale("frFR"));
commonTests(PhoneInput, Button, theme, ThemeProvider);
