import {useCallback, useMemo, useState} from "react";
import {Container, createTheme, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/system";

import {Button, PhoneInput} from "./StyledComponents";

const Demo = () => {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => createTheme({palette: {mode: mode as any}}), [mode]);

    const handleThemeChange = useCallback(() => setMode(mode === "dark" ? "light" : "dark"), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <div style={{display: "flex", alignItems: "flex-end", gap: 20}}>
                    <PhoneInput/>
                </div>
                <Button onClick={handleThemeChange}>
                    Change Theme
                </Button>
            </Container>
        </ThemeProvider>
    )
}

export default Demo;
