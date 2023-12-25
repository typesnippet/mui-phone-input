import {useCallback, useMemo, useState} from "react";
import {Container, createTheme, CssBaseline} from "@mui/material";
import {Button as ButtonBase, Input as InputBase} from "@mui/base";
import {styled, ThemeProvider} from "@mui/system";

// import PhoneInput from "mui-phone-input";

const Button = styled(ButtonBase)``;

const Input = styled(InputBase)``;

const Demo = () => {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => createTheme({palette: {mode: mode as any}}), [mode]);

    const handleThemeChange = useCallback(() => setMode(mode === "dark" ? "light" : "dark"), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <div style={{display: "flex", alignItems: "flex-end", gap: 20}}>
                    {/*<PhoneInput variant="standard"/>*/}
                    {/*<PhoneInput variant="outlined"/>*/}
                    <Input
                        type="text"
                        endAdornment={<span>+</span>}
                    />
                </div>
                <Button onClick={handleThemeChange}>
                    Change Theme
                </Button>
            </Container>
        </ThemeProvider>
    );
}

export default Demo;
