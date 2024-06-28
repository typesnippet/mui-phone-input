import {Button} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import commonTests from "./common";
import PhoneInput, {locale} from "../src";

const theme = createTheme({}, locale("frFR"));
commonTests(PhoneInput, Button, theme, ThemeProvider);
