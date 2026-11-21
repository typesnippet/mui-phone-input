"use client";

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

// Shown instead of a flag while the value is empty with `disableDefaultCountry`
const placeholder = (
    <svg className="mui-phone-input-placeholder" viewBox="0 0 16 16" focusable="false"
         width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="8" cy="8" r="6.5"/>
        <ellipse cx="8" cy="8" rx="2.75" ry="6.5"/>
        <path d="M1.5 8h13"/>
    </svg>
)

const Input = forwardRef<HTMLInputElement, InputProps>(({slotProps, ...props}, ref) => {
    const defaultInputProps = (slotProps?.input as any)?.className ? {} : {
        outline: "none",
        border: "none",
        paddingLeft: 5,
        width: "calc(100% - 30px)"
    };
    const defaultRootProps = (slotProps?.root as any)?.className ? {} : {
        background: "white",
        color: "black",
        paddingLeft: 5
    };
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
                        alignItems: "center",
                        display: "flex",
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
                                   useSVG = false,
                                   disableParentheses = false,
                                   disableDefaultCountry = false,
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
    // With `disableDefaultCountry`, an empty value shows an empty input and no country instead of a default one.
    const [isEmpty, setIsEmpty] = useState<boolean>(() => disableDefaultCountry && !getRawValue(initialValue));

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
        disableParentheses,
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
        setIsEmpty(disableDefaultCountry && !getRawValue(formattedNumber));
        setValue(formattedNumber);
        handleChange({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)}, event);
    }, [countriesList, disableDefaultCountry, handleChange, pattern, setValue])

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
        if (isEmpty) {
            // Keep the input empty instead of prefilling the default country code.
            setValue("");
            onMount({countryCode: null, areaCode: null, phoneNumber: null, valid: () => false});
            return;
        }
        let initialValue = getRawValue(value);
        if (!initialValue.startsWith(metadata?.[2] as string)) {
            initialValue = metadata?.[2] as string;
        }
        const formattedNumber = getFormattedNumber(initialValue, pattern);
        const phoneMetadata = parsePhoneNumber(formattedNumber, countriesList);
        onMount({...phoneMetadata, valid: (strict: boolean) => checkValidity(phoneMetadata, strict)});
        setCountryCode(phoneMetadata.isoCode as any);
        setValue(formattedNumber);
    }, [countriesList, isEmpty, metadata, onMount, pattern, setValue, value])

    return (
        <Input
            ref={ref}
            type="tel"
            value={isEmpty ? "" : value}
            onInput={onInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            startAdornment={isEmpty ? placeholder : <div className={`flag ${countryCode} ${useSVG ? "svg" : ""}`}/>}
            {...(muiInputProps as any)}
        />
    )
})

export default PhoneInput;
export {PhoneInputProps, PhoneNumber};
