import {Button, useColorScheme} from "@mui/joy";
import PhoneInput from "mui-phone-input/joy";

const Demo = () => {
    const {mode, setMode} = useColorScheme();

    const handleThemeChange = () => setMode(mode === "dark" ? "light" : "dark");

    return (
        <div style={{display: "flex", alignItems: "flex-end", gap: 20, margin: 20}}>
            <PhoneInput enableSearch variant="plain"/>
            <PhoneInput enableSearch variant="outlined"/>
            <PhoneInput enableSearch variant="soft"/>
            <PhoneInput enableSearch variant="solid"/>
            <Button onClick={handleThemeChange}>
                Change Theme
            </Button>
        </div>
    );
}

export default Demo;
