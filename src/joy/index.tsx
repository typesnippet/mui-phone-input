"use client";

import {ChangeEvent, forwardRef, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Input, Option, Select} from "@mui/joy";

import {
    checkValidity,
    displayFormat,
    getCountry,
    getDefaultISO2Code,
    getFormattedNumber,
    getMetadata,
    getRawValue,
    parsePhoneNumber,
    useMask,
    usePhone,
} from "react-phone-hooks";

import {injectMergedStyles} from "./styles";
import {PhoneInputProps, PhoneNumber} from "./types";

injectMergedStyles();

const PhoneInput = forwardRef(({
                                   value: initialValue = "",
                                   variant = undefined,
                                   searchVariant = undefined,
                                   country = getDefaultISO2Code(),
                                   disabled = false,
                                   enableSearch = false,
                                   disableDropdown = false,
                                   onlyCountries = [],
                                   excludeCountries = [],
                                   preferredCountries = [],
                                   searchNotFound = "No country found",
                                   searchPlaceholder = "Search country",
                                   onMount: handleMount = () => null,
                                   onInput: handleInput = () => null,
                                   onChange: handleChange = () => null,
                                   onKeyDown: handleKeyDown = () => null,
                                   ...muiInputProps
                               }: PhoneInputProps, forwardedRef: any) => {
    searchVariant = searchVariant || variant;
    const inputRef = useRef<any>(null);
    const searchRef = useRef<boolean>(false);
    const initiatedRef = useRef<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [maxWidth, setMaxWidth] = useState<number>(0);
    const [countryCode, setCountryCode] = useState<string>(country);

    const {
        value,
        pattern,
        metadata,
        setValue,
        countriesList,
    } = usePhone({
        query,
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

    const selectValue = useMemo(() => {
        let metadata = getMetadata(getRawValue(value), countriesList);
        metadata = metadata || getCountry(countryCode as any);
        return ({...metadata})?.[0] + ({...metadata})?.[2];
    }, [countriesList, countryCode, value])

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

    const ref = useCallback((node: any) => {
        [forwardedRef, inputRef].forEach((ref) => {
            if (typeof ref === "function") ref(node);
            else if (ref != null) ref.current = node;
        })
    }, [forwardedRef])

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
        <div className="mui-phone-input-wrapper"
             ref={node => setMaxWidth(node?.offsetWidth || 0)}>
            {(!disableDropdown && !disabled) && (
                <Select
                    variant={variant}
                    listboxOpen={open}
                    value={selectValue}
                    onClose={() => setOpen(searchRef.current)}
                    style={{position: "absolute", top: 0, left: 0, visibility: "hidden", width: "100%", zIndex: -1}}
                >
                    <div className="mui-phone-input-search-wrapper" onKeyDown={(e: any) => e.stopPropagation()}>
                        {enableSearch && (
                            <Input
                                type="search"
                                value={query}
                                variant={searchVariant}
                                placeholder={searchPlaceholder}
                                className="mui-phone-input-search"
                                onChange={(e: any) => setQuery(e.target.value)}
                                onBlur={() => searchRef.current = false}
                                onFocus={() => searchRef.current = true}
                            />
                        )}
                        <div className="mui-phone-input-search-list">
                            {countriesList.length ? countriesList.map(([iso, name, dial, mask]) => (
                                <Option
                                    key={iso + mask}
                                    style={{maxWidth}}
                                    value={iso + dial}
                                    onClick={() => {
                                        const formattedNumber = getFormattedNumber(mask, mask);
                                        const input = inputRef.current.querySelector("input");
                                        input.value = formattedNumber;
                                        setValue(formattedNumber);
                                        setCountryCode(iso);
                                        setQuery("");
                                        const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value") as any).set;
                                        nativeInputValueSetter.call(input, formattedNumber);
                                        input.dispatchEvent(new Event("change", {bubbles: true}));
                                        setTimeout(() => input.focus(), 100);
                                    }}
                                    children={<div className="mui-phone-input-select-item">
                                        <div className={`flag ${iso}`}/>
                                        <div className="label">
                                            {name}&nbsp;{displayFormat(mask)}
                                        </div>
                                    </div>}
                                />
                            )) : <Option value="N/A" disabled>{searchNotFound}</Option>}
                        </div>
                    </div>
                </Select>
            )}
            <Input
                ref={ref}
                type="tel"
                value={value}
                variant={variant}
                onInput={onInput}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={onKeyDown}
                startDecorator={(
                    <span
                        style={{cursor: "pointer"}}
                        onClick={() => setOpen(!open)}
                    >
                        <div className={`flag ${countryCode}`}/>
                    </span>
                )}
                {...(muiInputProps as any)}
            />
        </div>
    )
})

export default PhoneInput;
