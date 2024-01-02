import {Button, useColorScheme} from "@mui/joy";
import PhoneInput from "mui-phone-input/joy";

const Demo = () => {
    const {mode, setMode} = useColorScheme();

    const handleThemeChange = () => setMode(mode === "dark" ? "light" : "dark");

    return (
        <div style={{display: "flex", alignItems: "flex-end", gap: 20, margin: 20}}>
            <PhoneInput variant="plain"/>
            <PhoneInput variant="outlined"/>
            <PhoneInput variant="soft"/>
            <PhoneInput variant="solid"/>
            <Button onClick={handleThemeChange}>
                Change Theme
            </Button>
        </div>
    );
}

export default Demo;
