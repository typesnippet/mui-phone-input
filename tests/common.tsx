import assert from "assert";
import {cloneElement} from "react";
import {useForm} from "react-hook-form";
import userEvent from "@testing-library/user-event";
import {act, render, screen} from "@testing-library/react";
import {checkValidity, parsePhoneNumber} from "react-phone-hooks";

Object.defineProperty(console, "warn", {
    value: jest.fn(),
})

Object.defineProperty(window, "matchMedia", {
    value: jest.fn().mockImplementation((): any => ({
        addListener: jest.fn(),
        removeListener: jest.fn(),
    })),
})

const Form = ({children, onFinish, ...props}: any) => {
    const {register, handleSubmit} = useForm();

    return (
        <form onSubmit={handleSubmit(onFinish)} {...props}>
            {Array.isArray(children) ?
                children.map((child, key) => {
                    if (child.type === FormItem)
                        return cloneElement(child, {key, register})
                    return child;
                }) : (children.type === FormItem ? cloneElement(children, {register}) : children)}
        </form>
    )
}

const FormItem = ({children, register, name, ...props}: any) => {
    const inputProps = register(name, {
        validate: (value: any) => checkValidity(typeof value === "object" ? value : parsePhoneNumber(value)),
    })

    const onChange = (value: any) => inputProps.onChange({target: {value, name: inputProps.name}});

    return cloneElement(children, {...inputProps, onChange, ...props});
}

export default function commonTests(PhoneInput: any, Button: any, theme: any, ThemeProvider: any) {
    describe("Checking the basic rendering and functionality", () => {
        it("Rendering without crashing", () => {
            render(<PhoneInput/>);
        })

        it("Rendering with a raw initial value", () => {
            render(<PhoneInput value="17021234567"/>);
            assert(screen.getByDisplayValue("+1 (702) 123 4567"));
        })

        it("Localization support check", async () => {
            if (theme === null) return; // Skip for @mui/base distribution
            const {container, getByText} = render(<ThemeProvider theme={theme}>
                <PhoneInput onlyCountries={["am"]}/>
            </ThemeProvider>);
            await act(async () => {
                await userEvent.click(container.querySelector(".flag") as any);
            });
            assert(!!getByText(/Arménie[\S\s]+\+374/));
        })

        it("Rendering with an initial value", () => {
            render(<PhoneInput
                onMount={(value: any) => {
                    assert(value.countryCode === 1);
                    assert(value.areaCode === "702");
                    assert(value.phoneNumber === "1234567");
                    assert(value.isoCode === "us");
                    assert(value.valid());
                }}
                value={{countryCode: 1, areaCode: "702", phoneNumber: "1234567"}}
            />);
            assert(screen.getByDisplayValue("+1 (702) 123 4567"));
        })

        it("Checking the component on user input", async () => {
            render(<PhoneInput
                onChange={(value: any) => {
                    assert(value.isoCode === "us");
                }}
                country="us"
            />);
            const input = screen.getByDisplayValue("+1");
            await userEvent.type(input, "907123456789");
            assert(input.getAttribute("value") === "+1 (907) 123 4567");
        })

        it("Using the input with FormItem", async () => {
            render(<Form onFinish={({phone}: any) => {
                assert(phone.countryCode === 1);
                assert(phone.areaCode === "907");
                assert(phone.phoneNumber === "1234567");
                assert(phone.isoCode === "us");
            }}>
                <FormItem name="phone">
                    <PhoneInput country="us"/>
                </FormItem>
                <Button data-testid="button" type="submit">Submit</Button>
            </Form>);
            const input = screen.getByDisplayValue("+1");
            await userEvent.type(input, "907123456789");
            assert(input.getAttribute("value") === "+1 (907) 123 4567");
            act(() => screen.getByTestId("button").click());
        })

        it("Checking input validation with FormItem", () => {
            render(<Form>
                <FormItem name="phone">
                    <PhoneInput value={{countryCode: 1, areaCode: "702", phoneNumber: "1234567"}}/>
                </FormItem>
                <Button data-testid="button" type="submit">Submit</Button>
            </Form>);
            act(() => screen.getByTestId("button").click());
        })

        it("Checking form with initial value", async () => {
            render(<Form>
                <FormItem name="phone">
                    <PhoneInput value={{countryCode: 1, areaCode: "702"}}/>
                </FormItem>
                <Button data-testid="button" type="submit">Submit</Button>
            </Form>);
            const input = screen.getByDisplayValue("+1 (702)");
            await userEvent.type(input, "1234567");
            assert(input.getAttribute("value") === "+1 (702) 123 4567");
        })
    })
}
