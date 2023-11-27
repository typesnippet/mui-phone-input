import {Button, Input} from "@mui/joy";
import {useColorScheme} from "@mui/joy/styles";

const Demo = () => {
	const {mode, setMode} = useColorScheme();

	const handleThemeChange = () => setMode(mode === "dark" ? "light" : "dark");

	return (
		<div style={{display: "flex", alignItems: "flex-end", gap: 20, margin: 20}}>
			<Input startDecorator={<span>🇺🇸</span>}/>
			<Button onClick={handleThemeChange}>
				Change Theme
			</Button>
		</div>
	);
}

export default Demo;
