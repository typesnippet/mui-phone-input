import {useCallback, useMemo, useState} from "react";
import {Button, Container, CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import PhoneInput from "mui-phone-input";

const Demo = () => {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => createTheme({palette: {mode: mode as any}}), [mode]);

    const handleThemeChange = useCallback(() => setMode(mode === "dark" ? "light" : "dark"), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <div style={{display: "flex", alignItems: "flex-end", gap: 20}}>
                    <PhoneInput variant="standard"/>
                    <PhoneInput variant="outlined"/>
                </div>
                <Button onClick={handleThemeChange}>
                    Change Theme
                </Button>
            </Container>
        </ThemeProvider>
    );
}

export default Demo;
