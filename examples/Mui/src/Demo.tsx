import {useCallback, useMemo, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Button, Container, CssBaseline, InputAdornment, TextField} from "@mui/material";

const Demo = () => {
	const [mode, setMode] = useState("dark");

	const theme = useMemo(() => createTheme({palette: {mode: mode as any}}), [mode]);

	const handleThemeChange = useCallback(() => setMode(mode === "dark" ? "light" : "dark"), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Container>
				<div style={{display: "flex", alignItems: "flex-end", gap: 20}}>
					<TextField
						variant="filled"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									🇺🇸
								</InputAdornment>
							)
						}}
					/>
					<TextField
						variant="standard"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									🇺🇸
								</InputAdornment>
							)
						}}
					/>
					<TextField
						variant="outlined"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									🇺🇸
								</InputAdornment>
							)
						}}
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
