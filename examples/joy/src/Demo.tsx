import {Button} from "@mui/joy";
import {useColorScheme} from "@mui/joy/styles";

import CustomInput from "./CustomInput";

const Demo = () => {
    const {mode, setMode} = useColorScheme();

    const handleThemeChange = () => setMode(mode === "dark" ? "light" : "dark");

    return (
        <div style={{display: "flex", alignItems: "flex-end", gap: 20, margin: 20}}>
            <CustomInput variant="plain"/>
            <CustomInput variant="outlined"/>
            <CustomInput variant="soft"/>
            <CustomInput variant="solid"/>
            <Button onClick={handleThemeChange}>
                Change Theme
            </Button>
        </div>
    );
}

export default Demo;
