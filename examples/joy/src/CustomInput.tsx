import {useState} from "react";
import {Input, Option, Select} from "@mui/joy";

const CustomInput = ({variant}: any) => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{position: "relative"}}>
            <Select
                variant={variant}
                listboxOpen={open}
                onClose={() => setOpen(false)}
                style={{position: "absolute", top: 0, left: 0, visibility: "hidden", minWidth: "100%", zIndex: -1}}
            >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
            </Select>
            <Input
                variant={variant}
                startDecorator={(
                    <span
                        style={{cursor: "pointer"}}
                        onClick={() => setOpen(!open)}
                    >
						🇺🇸
					</span>
                )}
            />
        </div>
    )
}

export default CustomInput;
