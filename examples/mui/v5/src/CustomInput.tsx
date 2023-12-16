import {useState} from "react";
import {InputAdornment, MenuItem, Select, TextField} from "@mui/material";

const CustomInput = ({variant}: any) => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{position: "relative"}}>
            <Select
                open={open}
                variant={variant}
                onClose={() => setOpen(false)}
                style={{position: "absolute", top: 0, left: 0, visibility: "hidden", minWidth: "100%", zIndex: -1}}
            >
                <MenuItem>1</MenuItem>
                <MenuItem>2</MenuItem>
                <MenuItem>3</MenuItem>
            </Select>
            <TextField
                variant={variant}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
							<span
                                style={{cursor: "pointer"}}
                                onClick={() => setOpen(!open)}
                            >
								🇺🇸
							</span>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default CustomInput;
