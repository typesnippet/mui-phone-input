import {ChangeEvent, KeyboardEvent} from "react";
import types from "react-phone-hooks/types";
import {InputProps} from "@mui/joy";

export type PhoneNumber = types.PhoneNumber;

export interface PhoneInputProps extends Omit<InputProps, "value" | "onChange"> {
    value?: PhoneNumber | string;

    searchVariant?: InputProps["variant"];

    country?: string;

    enableSearch?: boolean;

    searchNotFound?: string;

    searchPlaceholder?: string;

    disableDropdown?: boolean;

    onlyCountries?: string[];

    excludeCountries?: string[];

    preferredCountries?: string[];

    onMount?(value: PhoneNumber): void;

    onInput?(event: ChangeEvent<HTMLInputElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

    onChange?(value: PhoneNumber, event: ChangeEvent<HTMLInputElement>): void;
}
