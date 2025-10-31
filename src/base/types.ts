"use client";

import {ChangeEvent, KeyboardEvent} from "react";
import types from "react-phone-hooks/types";
import {InputProps} from "@mui/base/Input";

export type PhoneNumber = types.PhoneNumber;

export interface PhoneInputProps extends Omit<InputProps, "onChange"> {
    value?: PhoneNumber | string;

    useSVG?: boolean;

    country?: string;

    disableParentheses?: boolean;

    onlyCountries?: string[];

    excludeCountries?: string[];

    preferredCountries?: string[];

    onMount?(value: PhoneNumber): void;

    onInput?(event: ChangeEvent<HTMLInputElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

    onChange?(value: PhoneNumber, event: ChangeEvent<HTMLInputElement>): void;
}
