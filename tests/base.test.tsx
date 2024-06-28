import {Button} from "@mui/base";
import {ThemeProvider} from "@mui/system";

import commonTests from "./common";
import PhoneInput from "../src/base";

commonTests(PhoneInput, Button, null, ThemeProvider);
