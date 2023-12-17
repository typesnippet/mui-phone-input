import {ChangeEvent, KeyboardEvent} from "react";
import types from "react-phone-hooks/types";
import {TextFieldProps as Mui5TextFieldProps} from "@mui/material/TextField";
import {TextFieldProps as Mui4TextFieldProps} from "@material-ui/core/TextField";

export type PhoneNumber = types.PhoneNumber;

export interface PhoneInputProps extends Omit<Mui5TextFieldProps & Mui4TextFieldProps, "onChange"> {
    value?: PhoneNumber | string;

    variant?: "outlined" | "filled" | "standard";

    searchVariant?: "outlined" | "filled" | "standard";

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
