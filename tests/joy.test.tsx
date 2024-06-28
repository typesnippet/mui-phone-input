import {Button} from "@mui/joy";
import {createTheme} from "@mui/system";
import {ThemeProvider} from "@mui/joy/styles";

import commonTests from "./common";
import PhoneInput, {locale} from "../src/joy";

const theme = createTheme({}, locale("frFR"));
commonTests(PhoneInput, Button, theme, ThemeProvider);
