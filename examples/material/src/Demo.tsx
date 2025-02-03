import {useCallback, useMemo, useState} from "react";
import copy from "copy-to-clipboard";
import {useForm} from "react-hook-form";
import PhoneInput from "mui-phone-input";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {checkValidity, parsePhoneNumber} from "react-phone-hooks";
import {
    Alert,
    Button,
    Container,
    CssBaseline,
    Divider,
    FormControlLabel,
    IconButton,
    Switch,
    Typography
} from "@mui/material";

const Demo = () => {
    const {register, handleSubmit} = useForm();
    const [value, setValue] = useState<any>(null);
    const [mode, setMode] = useState<string>("light");
    const [show, setShow] = useState<boolean>(true);
    const [arrow, setArrow] = useState<boolean>(false);
    const [strict, setStrict] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [preview, setPreview] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<boolean>(true);
    const [distinct, setDistinct] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [parentheses, setParentheses] = useState(true);

    const phoneProps = register("phone", {
        validate: (value: any) => checkValidity(parsePhoneNumber(value)),
        value,
    })

    const onChange = useCallback((value: any) => {
        setPreview(false);
        setValue(value);
    }, [])

    const error = useMemo(() => value?.valid && !value.valid(strict), [value, strict]);

    const theme = useMemo(() => createTheme({palette: {mode: mode as any}}), [mode]);

    const changeTheme = useCallback(() => setMode(mode === "dark" ? "light" : "dark"), [mode]);

    const code = useMemo(() => {
        let code = "<PhoneInput\n";
        if (distinct) code += "    distinct\n";
        if (disabled) code += "    disabled\n";
        if (arrow) code += "    enableArrow\n";
        if (search && dropdown) code += "    enableSearch\n";
        if (!dropdown) code += "    disableDropdown\n";
        if (!parentheses) code += "    disableParentheses\n";
        if (code === "<PhoneInput\n") code = "<PhoneInput />";
        else code += "/>";
        return code;
    }, [distinct, disabled, arrow, search, dropdown, parentheses])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container style={{display: "flex", justifyContent: "center"}}>
                <div style={{
                    minWidth: 425,
                    maxWidth: 425,
                    height: "100%",
                    display: "flex",
                    margin: "0 20px",
                    padding: "10px 0",
                    minHeight: "100vh",
                    flexDirection: "column",
                }}>
                    <Typography variant="h2" style={{fontWeight: "bold", fontSize: 30, marginBottom: "0.5em"}}>
                        MUI Phone Input Playground
                    </Typography>
                    <Typography style={{fontSize: 14, marginBottom: "1em"}}>
                        This is a playground for the MUI Phone Input component. You can change the settings and see how
                        the component behaves. Also, see the code for the component and the value it returns.
                    </Typography>
                    <Divider textAlign="left" style={{margin: "16px 0"}}>Settings</Divider>
                    <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                        <FormControlLabel
                            control={<Switch
                                defaultChecked
                                color="primary"
                                onChange={() => setDropdown(!dropdown)}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Dropdown"
                        />
                        <FormControlLabel
                            control={<Switch
                                defaultChecked
                                color="primary"
                                onChange={() => setParentheses(!parentheses)}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Parentheses"
                        />
                    </div>
                    <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                onChange={changeTheme}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Theme"
                        />
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                onChange={() => setStrict(!strict)}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Validation"
                            defaultChecked
                        />
                    </div>
                    <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                onChange={() => setDisabled(!disabled)}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Disabled"
                        />
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                onChange={() => setDistinct(!distinct)}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Distinct"
                        />
                    </div>
                    <div style={{gap: 24, display: "flex", alignItems: "center"}}>
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                disabled={!dropdown}
                                onChange={() => setSearch(!search)}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Search"
                        />
                        <FormControlLabel
                            control={<Switch
                                color="primary"
                                onChange={() => setArrow(!arrow)}
                            />}
                            labelPlacement="start"
                            style={{margin: 0}}
                            label="Arrow"
                        />
                    </div>
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
                            {copied ? <CheckIcon color="success" fontSize="small"/> :
                                <ContentCopyIcon fontSize="small"/>}
                        </IconButton>
                        <pre style={{
                            background: mode === "dark" ? "#1f1f1f" : "#efefef",
                            color: mode === "dark" ? "#efefef" : "#1f1f1f",
                            padding: 10, marginTop: 0,
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
                                distinct={distinct}
                                disabled={disabled}
                                onChange={onChange}
                                enableArrow={arrow}
                                enableSearch={search}
                                style={{width: "100%"}}
                                disableDropdown={!dropdown}
                                disableParentheses={!parentheses}
                            />
                        )}
                        {(preview && value && !error) && (
                            <pre style={{
                                background: mode === "dark" ? "#1f1f1f" : "#efefef",
                                color: mode === "dark" ? "#efefef" : "#1f1f1f",
                                padding: 10, margin: 0,
                            }}>
                                {JSON.stringify(value, null, 2)}
                            </pre>
                        )}
                        <div style={{display: "flex", gap: 24, justifyContent: "flex-start"}}>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => setPreview(true)}
                            >Preview Value</Button>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setValue(null);
                                    setShow(false);
                                    setTimeout(() => setShow(true), 10);
                                }}
                            >Reset Value</Button>
                        </div>
                    </form>
                    <Alert icon={false} color="info" style={{marginTop: 24}}>
                        If your application uses one of <b>@material-ui/core</b>, <b>@mui/base</b> or <b>@mui/joy</b>
                        &nbsp;distributions of <b>Material UI</b>, you should checkout the&nbsp;
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
                            <div style={{display: "flex", gap: 10}}>
                                <a target="_blank" rel="noreferrer"
                                   href="//github.com/typesnippet/mui-phone-input/blob/master/LICENSE">
                                    <img src="//img.shields.io/npm/l/mui-phone-input" alt="MIT License"/>
                                </a>
                                <a href="//www.npmjs.com/package/mui-phone-input" target="_blank" rel="noreferrer">
                                    <img src="//img.shields.io/npm/v/mui-phone-input" alt="NPM Package"/>
                                </a>
                            </div>
                        </div>
                        <Typography style={{margin: "5px 0 0 0"}}>
                            Find the&nbsp;
                            <a href="//github.com/typesnippet/mui-phone-input/tree/master/examples/material"
                               target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
                                source code
                            </a>
                            &nbsp;of this playground server on our GitHub repo.
                        </Typography>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    )
}

export default Demo;
