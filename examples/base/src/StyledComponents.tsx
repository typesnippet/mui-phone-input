import {ForwardedRef, forwardRef, useCallback} from "react";
import {Input as BaseInput, InputProps} from "@mui/base/Input";
import {Button as BaseButton, ButtonProps} from "@mui/base/Button";
import {Select as BaseSelect, SelectProps} from "@mui/base/Select";
import {Option as BaseOption, OptionOwnerState, OptionProps} from "@mui/base/Option";
import {useTheme} from "@mui/system";
import clsx from "clsx";

const resolveSlotProps = (fn: any, args: any) => typeof fn === "function" ? fn(args) : fn;

export const Option = forwardRef<HTMLLIElement, OptionProps<string>>((props, ref) => {
    const {palette} = useTheme();
    const theme = palette.mode;

    const getOptionColorClasses = useCallback(({
                                                   selected,
                                                   highlighted,
                                                   disabled
                                               }: Partial<OptionOwnerState<number>>) => {
        let classes = "";
        if (disabled) {
            classes += `text-slate-400 ${theme}:text-slate-700`;
        } else {
            if (selected) {
                classes += ` bg-blue-100 ${theme}:bg-blue-950 text-blue-950 ${theme}:text-blue-50`;
            } else if (highlighted) {
                classes += ` bg-slate-100 ${theme}:bg-slate-800 text-slate-900 ${theme}:text-slate-300`;
            }
            classes += ` hover:${theme}:bg-slate-800 hover:bg-slate-100 hover:${theme}:text-slate-300 hover:text-slate-900`;
            classes += ` focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:${theme}:outline-blue-300`;
        }
        return classes;
    }, [theme])

    return (
        <BaseOption
            ref={ref}
            {...props}
            slotProps={{
                root: ({selected, highlighted, disabled}) => ({
                    className: `list-none p-2 rounded-lg cursor-default ${getOptionColorClasses({
                        selected,
                        highlighted,
                        disabled
                    })}`,
                }),
            }}
        />
    )
})

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

export const Select = forwardRef(function CustomSelect<TValue extends {}, Multiple extends boolean>(props: SelectProps<TValue, Multiple>, ref: ForwardedRef<HTMLButtonElement>) {
    const {palette} = useTheme();
    const theme = palette.mode;

    const SelectButton = forwardRef<HTMLButtonElement, ButtonProps>(({className, ...other}, ref) => (
        <BaseButton
            ref={ref}
            className={clsx(
                `cursor-pointer transition text-sm font-sans leading-normal bg-blue-500 text-slate-900 ${theme}:text-slate-300 rounded-lg px-4 py-2 hover:bg-blue-600 active:bg-blue-700 focus-visible:outline-none ui-disabled:text-slate-700 ui-disabled:${theme}:text-slate-200 ui-disabled:bg-slate-200 ui-disabled:${theme}:bg-slate-700 ui-disabled:cursor-default ui-disabled:hover:bg-slate-200 ui-disabled:hover:${theme}:bg-slate-700`,
                className,
            )}
            {...other}
        />
    ))

    return (
        <BaseSelect
            ref={ref}
            {...props}
            slots={{
                root: SelectButton,
                ...props.slots,
            }}
            className={clsx("CustomSelect", props.className)}
            slotProps={{
                ...props.slotProps,
                root: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.root,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `relative text-sm font-sans w-80 px-3 py-2 rounded-lg text-left bg-slate-100 ${theme}:bg-slate-900 text-slate-900 ${theme}:text-slate-300 transition-all hover:bg-slate-50 ${theme}:hover:bg-slate-800 outline-0 ${
                                ownerState.focusVisible ? `focus-visible:ring-4 ring-blue-500/30` : ""
                            } [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-2.5`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
                listbox: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.listbox,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `text-sm font-sans p-1.5 my-3 w-80 rounded-xl overflow-auto outline-0 bg-slate-100 ${theme}:bg-slate-900 text-slate-900 ${theme}:text-slate-300`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
                popper: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.popper,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `${theme} z-10`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
            }}
        />
    )
})

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {palette} = useTheme();
    const theme = palette.mode;

    return (
        <BaseInput
            ref={ref}
            {...props}
            className={clsx(theme, props.className)}
            slotProps={{
                ...props.slotProps,
                input: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.input,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: clsx(
                            `w-80 text-sm font-normal font-sans outline-none leading-5 px-3 py-2 rounded-lg bg-slate-100 ${theme}:bg-slate-900 text-slate-900 ${theme}:text-slate-300 focus-visible:outline-0`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
            }}
        />
    )
})
