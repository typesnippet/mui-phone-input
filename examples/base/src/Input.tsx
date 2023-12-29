import {forwardRef} from "react";
import {Input as BaseInput, InputProps} from "@mui/base/Input";

const Input = forwardRef<HTMLInputElement, InputProps>(({slotProps, ...props}, ref) => {
    const defaultRootProps = {background: "white", color: "black", paddingLeft: 5}
    const defaultInputProps = {outline: "none", paddingLeft: 5}
    return (
        <BaseInput
            ref={ref}
            {...props}
            slotProps={{
                ...slotProps,
                root: {
                    ...slotProps?.root,
                    style: {
                        ...defaultRootProps,
                        ...(slotProps?.root as any)?.style,
                    }
                },
                input: {
                    ...slotProps?.input,
                    style: {
                        ...defaultInputProps,
                        ...(slotProps?.input as any)?.style,
                    }
                }
            }}
        />
    )
})

export default Input;
