import {forwardRef} from "react";
import {Button as BaseButton, ButtonProps} from "@mui/base/Button";
import {useTheme} from "@mui/system";
import clsx from "clsx";

import PhoneInputBase from "./phone";
import {PhoneInputProps} from "./phone/types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, ...other}, ref) => {
    const {palette} = useTheme();
    const theme = palette.mode;

    return (
        <BaseButton
            ref={ref}
            className={clsx(
                `cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 active:bg-blue-700 focus-visible:outline-none ui-disabled:text-slate-700 ui-disabled:${theme}:text-slate-200 ui-disabled:bg-slate-200 ui-disabled:${theme}:bg-slate-700 ui-disabled:cursor-default ui-disabled:hover:bg-slate-200 ui-disabled:hover:${theme}:bg-slate-700`,
                className,
            )}
            {...other}
        />
    )
})

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>((props, ref) => {
    const {palette} = useTheme();
    const theme = palette.mode;

    return (
        <PhoneInputBase
            ref={ref}
            {...props}
            slotProps={{
                ...props.slotProps,
                root: {
                    ...props.slotProps?.root,
                    className: `px-3 py-2 rounded-lg bg-slate-100 ${theme}:bg-slate-900 text-slate-900 ${theme}:text-slate-300`
                },
                input: {
                    ...props.slotProps?.input,
                    className: `px-3 text-sm font-normal font-sans outline-none bg-slate-100 ${theme}:bg-slate-900 text-slate-900 ${theme}:text-slate-300`
                }
            }}
        />
    )
})
