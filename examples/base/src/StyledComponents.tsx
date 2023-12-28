import {ForwardedRef, forwardRef} from "react";
import {Input as BaseInput, InputProps} from "@mui/base/Input";
import {Button as BaseButton, ButtonProps} from "@mui/base/Button";
import {Select as BaseSelect, SelectProps} from "@mui/base/Select";
import {Option as BaseOption, OptionOwnerState, OptionProps} from "@mui/base/Option";
import {useTheme} from "@mui/system";
import clsx from "clsx";

const getOptionColorClasses = ({selected, highlighted, disabled}: Partial<OptionOwnerState<number>>) => {
    let classes = "";
    if (disabled) {
        classes += "text-slate-400 dark:text-slate-700";
    } else {
        if (selected) {
            classes += " bg-purple-100 dark:bg-purple-950 text-purple-950 dark:text-purple-50";
        } else if (highlighted) {
            classes += " bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300";
        }
        classes += " hover:dark:bg-slate-800 hover:bg-slate-100 hover:dark:text-slate-300 hover:text-slate-900";
        classes += " focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:dark:outline-purple-300";
    }
    return classes;
}

const resolveSlotProps = (fn: any, args: any) => typeof fn === "function" ? fn(args) : fn;

export const Option = forwardRef<HTMLLIElement, OptionProps<string>>((props, ref) => {
    return (
        <BaseOption
            ref={ref}
            {...props}
            slotProps={{
                root: ({selected, highlighted, disabled}) => ({
                    className: `list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 ${getOptionColorClasses({
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
    return (
        <BaseButton
            ref={ref}
            className={clsx(
                "cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-violet-500 text-white rounded-lg px-4 py-2 border border-solid border-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none active:scale-[0.99] focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none ui-disabled:text-slate-700 ui-disabled:dark:text-slate-200 ui-disabled:bg-slate-200 ui-disabled:dark:bg-slate-700 ui-disabled:cursor-default ui-disabled:shadow-none ui-disabled:dark:shadow-none ui-disabled:hover:bg-slate-200 ui-disabled:hover:dark:bg-slate-700 ui-disabled:border-none",
                className,
            )}
            {...other}
        />
    )
})

export const Select = forwardRef(function CustomSelect<TValue extends {}, Multiple extends boolean>(props: SelectProps<TValue, Multiple>, ref: ForwardedRef<HTMLButtonElement>) {
    const theme = useTheme();

    return (
        <BaseSelect
            ref={ref}
            {...props}
            slots={{
                root: Button,
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
                            `relative text-sm font-sans box-border w-80 px-3 py-2 rounded-lg text-left bg-white dark:bg-neutral-900 border border-solid border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-neutral-300 transition-all hover:bg-slate-50 dark:hover:bg-neutral-800 outline-0 shadow-md shadow-slate-100 dark:shadow-slate-900 ${
                                ownerState.focusVisible
                                    ? "focus-visible:ring-4 ring-purple-500/30 focus-visible:border-purple-500 focus-visible:dark:border-purple-500"
                                    : ""
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
                            "text-sm font-sans p-1.5 my-3 w-80 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 shadow shadow-slate-200 dark:shadow-slate-900",
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
                            `${theme.palette.mode} z-10`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
            }}
        />
    )
})

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const theme = useTheme();

    return (
        <BaseInput
            ref={ref}
            {...props}
            className={clsx(theme.palette.mode, props.className)}
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
                            "w-80 text-sm font-normal font-sans leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple dark:outline-purple-600 focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-600 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0",
                            resolvedSlotProps?.className,
                        ),
                    };
                },
            }}
        />
    )
})
