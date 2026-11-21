import {useCallback, useMemo, useState} from "react";
import copy from "copy-to-clipboard";
import {useForm} from "react-hook-form";
import PhoneInput, {locale} from "mui-phone-input";
import CheckIcon from "@mui/icons-material/Check";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {checkValidity, parsePhoneNumber} from "react-phone-hooks";
import {
    Alert,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    Divider,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";

const languages = [
    {name: "Amharic", key: "amET"},
    {name: "Arabic (Egypt)", key: "arEG"},
    {name: "Arabic (Saudi Arabia)", key: "arSA"},
    {name: "Arabic (Sudan)", key: "arSD"},
    {name: "Armenian", key: "hyAM"},
    {name: "Azerbaijani", key: "azAZ"},
    {name: "Bangla", key: "bnBD"},
    {name: "Bulgarian", key: "bgBG"},
    {name: "Catalan", key: "caES"},
    {name: "Chinese (Hong Kong)", key: "zhHK"},
    {name: "Chinese (Simplified)", key: "zhCN"},
    {name: "Chinese (Taiwan)", key: "zhTW"},
    {name: "Croatian", key: "hrHR"},
    {name: "Czech", key: "csCZ"},
    {name: "Danish", key: "daDK"},
    {name: "Dutch", key: "nlNL"},
    {name: "English", key: "enUS"},
    {name: "Estonian", key: "etEE"},
    {name: "Finnish", key: "fiFI"},
    {name: "French", key: "frFR"},
    {name: "German", key: "deDE"},
    {name: "Greek", key: "elGR"},
    {name: "Hebrew", key: "heIL"},
    {name: "Hindi", key: "hiIN"},
    {name: "Hungarian", key: "huHU"},
    {name: "Icelandic", key: "isIS"},
    {name: "Indonesian", key: "idID"},
    {name: "Italian", key: "itIT"},
    {name: "Japanese", key: "jaJP"},
    {name: "Khmer", key: "khKH"},
    {name: "Kazakh", key: "kkKZ"},
    {name: "Korean", key: "koKR"},
    {name: "Kurdish (Central)", key: "kuCKB"},
    {name: "Macedonian", key: "mkMK"},
    {name: "Myanmar", key: "myMY"},
    {name: "Malay", key: "msMS"},
    {name: "Nepali", key: "neNP"},
    {name: "Norwegian (bokmål)", key: "nbNO"},
    {name: "Norwegian (nynorsk)", key: "nnNO"},
    {name: "Pashto (Afghanistan)", key: "psAF"},
    {name: "Persian", key: "faIR"},
    {name: "Polish", key: "plPL"},
    {name: "Portuguese", key: "ptPT"},
    {name: "Portuguese (Brazil)", key: "ptBR"},
    {name: "Romanian", key: "roRO"},
    {name: "Russian", key: "ruRU"},
    {name: "Serbian", key: "srRS"},
    {name: "Sinhalese", key: "siLK"},
    {name: "Slovak", key: "skSK"},
    {name: "Spanish", key: "esES"},
    {name: "Swedish", key: "svSE"},
    {name: "Thai", key: "thTH"},
    {name: "Turkish", key: "trTR"},
    {name: "Tagalog", key: "tlTL"},
    {name: "Ukrainian", key: "ukUA"},
    {name: "Urdu (Pakistan)", key: "urPK"},
    {name: "Vietnamese", key: "viVN"}
]

const MuiIconButton = ({mode, children, ...props}: any) => (
    <IconButton
        color="primary"
        disableTouchRipple
        sx={{
            padding: "6px",
            borderRadius: "12px",
            background: mode === "dark" ? "rgba(29, 33, 38, 0.2)" : "rgba(232, 235, 237, 0.1)",
            border: `1px solid ${mode === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.14)"}`,
            "&:hover": {
                borderColor: "primary.main"
            },
        }}
        {...props}
    >
        {children}
    </IconButton>
)

const MuiSelect = ({mode, options, ...props}: any) => (
    <Select
        autoWidth
        size="small"
        variant="standard"
        sx={{
            padding: 0,
            "& svg": {display: "none"},
            "& .MuiSelect-select": {padding: "0 !important"},
        }}
        {...props}
    >
        {options.map(({name, key}: any) => (
            <MenuItem key={key} value={key}>{name}</MenuItem>
        ))}
    </Select>
)

const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const Demo = () => {
    const {register, handleSubmit} = useForm();
    const [value, setValue] = useState<any>(null);
    const [lang, setLang] = useState<any>("enUS");
    const [mode, setMode] = useState<string>(defaultMode);
    const [show, setShow] = useState<boolean>(true);
    const [arrow, setArrow] = useState<boolean>(false);
    const [useSvg, setUseSvg] = useState(false);
    const [strict, setStrict] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [preview, setPreview] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<boolean>(true);
    const [distinct, setDistinct] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [parentheses, setParentheses] = useState(true);
    const [defaultCountry, setDefaultCountry] = useState(true);
    const [variant, setVariant] = useState<any>("outlined");
    const [searchVariant, setSearchVariant] = useState<any>("standard");

    const phoneProps = register("phone", {
        validate: (value: any) => checkValidity(parsePhoneNumber(value)),
        value,
    })

    const onChange = useCallback((value: any) => {
        setPreview(false);
        setValue(value);
    }, [])

    const error = useMemo(() => value?.valid && !value.valid(strict), [value, strict]);

    const theme = useMemo(() => {
        if (lang === "enUS") return createTheme({palette: {mode: mode as any}});
        return createTheme({palette: {mode: mode as any}}, locale(lang));
    }, [mode, lang]);

    const changeTheme = useCallback(() => setMode(mode === "dark" ? "light" : "dark"), [mode]);

    const code = useMemo(() => {
        let code = "<PhoneInput\n";
        if (useSvg) code += "    useSVG\n";
        if (distinct) code += "    distinct\n";
        if (disabled) code += "    disabled\n";
        if (arrow) code += "    enableArrow\n";
        if (search && dropdown) code += "    enableSearch\n";
        if (!dropdown) code += "    disableDropdown\n";
        if (!parentheses) code += "    disableParentheses\n";
        if (!defaultCountry) code += "    disableDefaultCountry\n";
        if (code === "<PhoneInput\n") code = "<PhoneInput />";
        else code += "/>";
        return code;
    }, [distinct, disabled, useSvg, arrow, search, dropdown, parentheses, defaultCountry])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container style={{display: "flex", justifyContent: "center", padding: 0}}>
                <div style={{
                    padding: 10,
                    maxWidth: 425,
                    height: "100%",
                    display: "flex",
                    minHeight: "100vh",
                    flexDirection: "column",
                }}>
                    <Typography variant="h2"
                                style={{fontWeight: "bold", fontSize: "1.8rem", textAlign: "right", marginBottom: 15}}>
                        MUI Phone Input Playground
                    </Typography>
                    <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 15, gap: 10}}>
                        <a href="https://typesnippet.org" target="_blank"
                           rel="noreferrer" style={{textDecoration: "none"}}>
                            <MuiIconButton mode={mode}>
                                <img style={{width: 17.5, height: 17.5}} src="https://github.com/typesnippet.png"
                                     alt="Icon"/>
                            </MuiIconButton>
                        </a>
                        <a href="//github.com/typesnippet/mui-phone-input"
                           target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
                            <MuiIconButton mode={mode}>
                                <GitHubIcon fontSize="small"/>
                            </MuiIconButton>
                        </a>
                        <MuiIconButton mode={mode} onClick={changeTheme}>
                            {mode === "dark"
                                ? <LightModeOutlined fontSize="small"/>
                                : <DarkModeOutlined fontSize="small"/>}
                        </MuiIconButton>
                    </div>
                    <Typography style={{fontSize: 14, textAlign: "justify"}}>
                        This is a playground for the MUI Phone Input component. You can change the settings and see how
                        the component behaves. Also, see the code for the component and the value it returns.
                    </Typography>
                    <Divider textAlign="left" style={{margin: "16px 0"}}>Settings</Divider>
                    <TableContainer component={Paper} sx={{
                        boxShadow: "none",
                        border: `1px solid ${mode === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.14)"}`
                    }}>
                        <Table size="small">
                            <TableBody>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Dropdown
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => setDropdown(!dropdown)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Parentheses
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => setParentheses(!parentheses)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Default Country
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            defaultChecked
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => {
                                                // The option applies to an empty value on mount, so start over
                                                setValue(null);
                                                setShow(false);
                                                setDefaultCountry(!defaultCountry);
                                                setTimeout(() => setShow(true), 10);
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Strict Validation
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => setStrict(!strict)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        SVG Icons
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => setUseSvg(!useSvg)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Disabled
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => setDisabled(!disabled)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Distinct
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => setDistinct(!distinct)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Search
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            color="primary"
                                            sx={{padding: 0}}
                                            disabled={!dropdown}
                                            onChange={() => setSearch(!search)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Arrow
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            color="primary"
                                            sx={{padding: 0}}
                                            onChange={() => setArrow(!arrow)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Variant
                                    </TableCell>
                                    <TableCell align="right">
                                        <MuiSelect
                                            value={variant}
                                            options={[
                                                {name: "Filled", key: "filled"},
                                                {name: "Outlined", key: "outlined"},
                                                {name: "Standard", key: "standard"},
                                            ]}
                                            onChange={({target}: any) => setVariant(target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Search Variant
                                    </TableCell>
                                    <TableCell align="right">
                                        <MuiSelect
                                            disabled={!search}
                                            value={searchVariant}
                                            options={[
                                                {name: "Filled", key: "filled"},
                                                {name: "Outlined", key: "outlined"},
                                                {name: "Standard", key: "standard"},
                                            ]}
                                            onChange={({target}: any) => setSearchVariant(target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        Localization
                                    </TableCell>
                                    <TableCell align="right">
                                        <MuiSelect
                                            value={lang}
                                            options={languages}
                                            onChange={({target}: any) => {
                                                setLang(target.value);
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider textAlign="left" style={{margin: "16px 0"}}>Code</Divider>
                    <div style={{position: "relative"}}>
                        <IconButton
                            onClick={() => {
                                copy(code);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            style={{position: "absolute", background: "transparent", top: 5, right: 5}}
                        >
                            {copied
                                ? <CheckIcon color="success" fontSize="small"/>
                                : <ContentCopyIcon fontSize="small"/>}
                        </IconButton>
                        <pre style={{
                            background: mode === "dark" ? "#1f1f1f" : "#efefef",
                            color: mode === "dark" ? "#efefef" : "#1f1f1f",
                            padding: 10, marginTop: 0, borderRadius: 4,
                        }}>
                            {code}
                        </pre>
                    </div>
                    <Divider textAlign="left" style={{margin: "16px 0"}}>Component</Divider>
                    <form onSubmit={handleSubmit(() => null)}
                          style={{display: "flex", flexDirection: "column", gap: 24}}>
                        {show && (
                            <PhoneInput
                                {...phoneProps}
                                error={error}
                                useSVG={useSvg}
                                variant={variant}
                                distinct={distinct}
                                disabled={disabled}
                                onChange={onChange}
                                enableArrow={arrow}
                                enableSearch={search}
                                style={{width: "100%"}}
                                disableDropdown={!dropdown}
                                searchVariant={searchVariant}
                                disableParentheses={!parentheses}
                                disableDefaultCountry={!defaultCountry}
                            />
                        )}
                        {(preview && value && !error) && (
                            <pre style={{
                                background: mode === "dark" ? "#1f1f1f" : "#efefef",
                                color: mode === "dark" ? "#efefef" : "#1f1f1f",
                                padding: 10, margin: 0, borderRadius: 4,
                            }}>
                                {JSON.stringify(value, null, 2)}
                            </pre>
                        )}
                        <div style={{display: "flex", gap: 24, justifyContent: "flex-start"}}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{width: "50%"}}
                                onClick={() => setPreview(true)}
                            >Preview Value</Button>
                            <Button
                                variant="outlined"
                                style={{width: "50%"}}
                                onClick={() => {
                                    setValue(null);
                                    setShow(false);
                                    setTimeout(() => setShow(true), 10);
                                }}
                            >Reset Value</Button>
                        </div>
                    </form>
                    <Alert icon={false} color="info" sx={{
                        margin: "24px 0 14px 0",
                        border: `1px solid ${mode === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.14)"}`
                    }}>
                        If your application uses one of <b>@material-ui/core</b>, <b>@mui/base</b> or <b>@mui/joy</b>
                        &nbsp;distributions of <b>Material UI</b>, you should check out the&nbsp;
                        <a target="_blank" rel="noreferrer" style={{textDecoration: "none"}}
                           href="//github.com/typesnippet/mui-phone-input/tree/master/examples">examples</a> to test the
                        components out.
                    </Alert>
                    <div style={{marginTop: "auto"}}>
                        <Divider style={{margin: "10px 0"}}/>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <div>
                                &copy; Made with ❤️ by&nbsp;
                                <a href="//github.com/typesnippet" target="_blank"
                                   style={{textDecoration: "none"}} rel="noreferrer author">
                                    TypeSnippet
                                </a>
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: 10}}>
                                <a target="_blank" rel="noreferrer" style={{display: "flex", alignItems: "center"}}
                                   href="//github.com/typesnippet/mui-phone-input/blob/master/LICENSE">
                                    <img src="//img.shields.io/npm/l/mui-phone-input" alt="MIT License"/>
                                </a>
                                <a target="_blank" rel="noreferrer" style={{display: "flex", alignItems: "center"}}
                                   href="//www.npmjs.com/package/mui-phone-input">
                                    <img src="//img.shields.io/npm/v/mui-phone-input" alt="NPM Package"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    )
}

export default Demo;
