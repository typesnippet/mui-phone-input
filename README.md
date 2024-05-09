# MUI Phone Input <img src="https://github.com/typesnippet.png" align="right" height="64" />

[![npm](https://img.shields.io/npm/v/mui-phone-input)](https://www.npmjs.com/package/mui-phone-input)
[![distro](https://img.shields.io/badge/distro-core%20|%20material%20|%20base%20|%20joy-blue)](https://mui.com/)
[![types](https://img.shields.io/npm/types/mui-phone-input)](https://www.npmjs.com/package/mui-phone-input)
[![License](https://img.shields.io/npm/l/mui-phone-input)](https://github.com/typesnippet/mui-phone-input/blob/master/LICENSE)
[![Tests](https://github.com/typesnippet/mui-phone-input/actions/workflows/tests.yml/badge.svg)](https://github.com/typesnippet/mui-phone-input/actions/workflows/tests.yml)

Advanced phone input component for Material UI that leverages the [react-phone-hooks](https://www.npmjs.com/package/react-phone-hooks) supporting all countries. The package is compatible with [@material-ui/core](https://v4.mui.com/), [@mui/material](https://mui.com/), [@mui/base](https://mui.com/base-ui/getting-started/) and [@mui/joy](https://mui.com/joy-ui/getting-started/) distributions. It provides built-in support for area codes and strict validation.

## Value

The value of the component is an object containing the parts of the phone number. This format of value gives a wide range of opportunities for handling the data in your desired way.

```javascript
{
  countryCode: 1,
  areaCode: "702",
  phoneNumber: "1234567",
  isoCode: "us",
  valid: function valid(strict)
}
```

## Validation

The validation is checked by the `valid` function of the value object that returns a boolean value. An example with the [react-hook-form](https://www.npmjs.com/package/react-hook-form) is shown below:

```javascript
import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import PhoneInput from "mui-phone-input";
import {checkValidity, parsePhoneNumber} from "react-phone-hooks";

const Demo = () => {
  const {register, handleSubmit} = useForm();
  const [value, setValue] = useState({});

  const phoneProps = register("phone", {
    validate: (value: any) => checkValidity(parsePhoneNumber(value)),
  })

  const onChange = async (value: any) => {
    await phoneProps.onChange({target: {value, name: phoneProps.name}});
    setValue(value);
  }

  const error = useMemo(() => value.valid && !value.valid(), [value]);

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <PhoneInput
        enableSearch
        error={error}
        {...phoneProps}
        variant="filled"
        onChange={onChange}
        searchVariant="standard"
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Demo;
```

The `valid` function primarily checks if a phone number has a length appropriate for its specified country. In addition, a more comprehensive validation can be performed, including verifying the dial and area codes' accuracy for the selected country. To activate the strict validation, pass `true` as the first argument to the `valid` function.

## Props

Apart from the phone-specific properties described below, all [Input](https://mui.com/material-ui/api/input/#props) and [TextField](https://mui.com/material-ui/api/text-field/#props) properties supported by the used Material distribution can be applied to the phone input component.

| Property           | Description                                                                                                                   | Type                      |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| value              | An object containing a parsed phone number or the raw number.                                                                 | [object](#value) / string |
| country            | Country code to be selected by default. By default, it will show the flag of the user's country.                              | string                    |
| enableSearch       | Enables search in the country selection dropdown menu. Default value is `false`.                                              | boolean                   |
| searchVariant      | Accepts an Input variant, and values depend on the chosen Material distribution.                                              | TextFieldVariants         |
| searchNotFound     | The value is shown if `enableSearch` is `true` and the query does not match any country. Default value is `No country found`. | string                    |
| searchPlaceholder  | The value is shown if `enableSearch` is `true`. Default value is `Search country`.                                            | string                    |
| disableDropdown    | Disables the manual country selection through the dropdown menu.                                                              | boolean                   |
| onlyCountries      | Country codes to be included in the list. E.g. `onlyCountries={['us', 'ca', 'uk']}`.                                          | string[]                  |
| excludeCountries   | Country codes to be excluded from the list of countries. E.g. `excludeCountries={['us', 'ca', 'uk']}`.                        | string[]                  |
| preferredCountries | Country codes to be at the top of the list. E.g. `preferredCountries={['us', 'ca', 'uk']}`.                                   | string[]                  |
| onChange           | The only difference from the default `onChange` is that value comes first.                                                    | function(value, event)    |
| onMount            | The callback is triggered once the component gets mounted.                                                                    | function(value)           |

## Contribute

Any contribution is welcome. Don't hesitate to open an issue or discussion if you have questions about your project's usage and integration. For ideas or suggestions, please open a pull request. Your name will shine on our contributors' list. Be proud of what you build!

## License

Copyright (C) 2023 Artyom Vancyan. [MIT](https://github.com/typesnippet/mui-phone-input/blob/master/LICENSE)
