import {ChangeEvent, forwardRef, KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import {Input as BaseInput, InputProps} from "@mui/base/Input";

import {
    checkValidity,
    getDefaultISO2Code,
    getFormattedNumber,
    getRawValue,
    parsePhoneNumber,
    useMask,
    usePhone,
} from "react-phone-hooks";

import {injectMergedStyles} from "./styles";
import {PhoneInputProps, PhoneNumber} from "./types";

injectMergedStyles();

const Input = forwardRef<HTMLInputElement, InputProps>(({slotProps, ...props}, ref) => {
    const defaultRootProps = {background: "white", color: "black", display: "flex", alignItems: "center", paddingLeft: 5};
    const defaultInputProps = {outline: "none", paddingLeft: 5};
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

const PhoneInput = forwardRef(({
                                   value: initialValue = "",
                                   country = getDefaultISO2Code(),
                                   onlyCountries = [],
                                   excludeCountries = [],
                                   preferredCountries = [],
                                   onMount: handleMount = () => null,
                                   onInput: handleInput = () => null,
                                   onChange: handleChange = () => null,
                                   onKeyDown: handleKeyDown = () => null,
                                   ...muiInputProps
                               }: PhoneInputProps, ref: any) => {
    const initiatedRef = useRef<boolean>(false);
    const [countryCode, setCountryCode] = useState<string>(country);

    const {
        value,
        pattern,
        metadata,
        setValue,
        countriesList,
    } = usePhone({
        country,
        countryCode,
        initialValue,
        onlyCountries,
        excludeCountries,
        preferredCountries,
    });

    const {
        onInput: onInputMaskHandler,
        onKeyDown: onKeyDownMaskHandler,
    } = useMask(pattern);

    const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        onKeyDownMaskHandler(event);
        handleKeyDown(event);
    }, [handleKeyDown, onKeyDownMaskHandler])

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = getFormattedNumber(event.target.value, pattern);
        const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList);
        setCountryCode(phoneMetadata.isoCode as any);
        setValue(formattedNumber);
        handleChange({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)}, event);
    }, [countriesList, handleChange, pattern, setValue])

    const onInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onInputMaskHandler(event);
        handleInput(event);
    }, [handleInput, onInputMaskHandler])

    const onMount = useCallback((value: PhoneNumber) => {
        handleMount(value);
    }, [handleMount])

    useEffect(() => {
        if (initiatedRef.current) return;
        initiatedRef.current = true;
        let initialValue = getRawValue(value);
        if (!initialValue.startsWith(metadata?.[2] as string)) {
            initialValue = metadata?.[2] as string;
        }
        const formattedNumber = getFormattedNumber(initialValue, pattern);
        const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList);
        onMount({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
        setCountryCode(phoneMetadata.isoCode as any);
        setValue(formattedNumber);
    }, [countriesList, metadata, onMount, pattern, setValue, value])

    return (
        <Input
            ref={ref}
            type="tel"
            value={value}
            onInput={onInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            startAdornment={<div className={`flag ${countryCode}`}/>}
            {...(muiInputProps as any)}
        />
    )
})

export default PhoneInput;
