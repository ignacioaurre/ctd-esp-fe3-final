import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider from '../../context';
import { initialState } from 'dh-marvel/context/reducer';
import RegisterForm, { registerSchema } from './RegisterForm';
import { Register } from 'dh-marvel/features/Types/state.types';

jest.mock("../../context/useOrder")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: initialState,
    dispatch: mockDispatch
})
const activeStep = 0;
const handleNext = jest.fn();
const handleBack = jest.fn();
const steps = ['Datos personales', 'Dirección de entrega', 'Sección de pago'];
const props = {
    activeStep,
    handleBack,
    handleNext,
    title: "Datos Personales",
    steps
}

const props2 = {
    activeStep: 2,
    handleBack,
    handleNext,
    title: "Datos Personales",
    steps
}


describe('Component RegisterForm', () => {
    test("Component should render", () => {
    const { baseElement } =
    render(
        <ContextProvider>
            <RegisterForm {...props} />
        </ContextProvider>
    )
    expect(baseElement).toMatchSnapshot();
    })

    test("Should show 3 labels and inputs", () => {
        render(
            <ContextProvider>
                <RegisterForm {...props} />
            </ContextProvider>
        )
        const usernameLabel = screen.getByLabelText('Nombre')
        const usernameInput = screen.getByRole('textbox', {name: /Nombre/i,})
        const lastNameLabel = screen.getByLabelText('Apellido')
        const lastNameInput = screen.getByRole('textbox', {name: /Apellido/i,})
        const emailLabel = screen.getByLabelText('Email')
        const emailInput = screen.getByRole('textbox', {name: /Email/i,})
        expect(usernameInput).toBeInTheDocument();
        expect(usernameLabel).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(lastNameLabel).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
    })
    test('should render the submit button', () => {
        render(
            <ContextProvider>
                <RegisterForm {...props} />
            </ContextProvider>
        )
        const submitButton = screen.getByRole('button', {name: /Proximo/i,})
        expect(submitButton).toBeInTheDocument();
    });
    test('should have focus on username', () => {
        render(
            <ContextProvider>
                <RegisterForm {...props} />
            </ContextProvider>
        )
        const usernameInput = screen.getByRole('textbox', {name: /Nombre/i,})
        expect(usernameInput).toHaveFocus();
    });

    describe("Validating form", () => {
        test('should return true', async () => {
            const register: Register = {
                nombre: 'valid',
                apellido: 'valid',
                email: 'valid@valid.com',
            }
            expect(await registerSchema.isValid(register)).toBeTruthy();
        })
        test('should return false', async () => {
            const register: Register = {
                nombre: '',
                apellido: 'valid',
                email: 'valid',
            }
            expect(await registerSchema.isValid(register)).toBeFalsy();
        })
        test('should show error message when submit', async () => {
            render(
                <ContextProvider>
                    <RegisterForm {...props} />
                </ContextProvider>
            )
            const emailInput = screen.getByRole('textbox', {name: /Email/i,})
            const submitButton = screen.getByRole('button', {name: /Proximo/i,})
            await userEvent.type(emailInput, "No Email");
            await userEvent.click(submitButton);
            const error = await screen.findByText('Debe ser un email válido');
            expect(error).toBeInTheDocument();
        });
    })

    describe("Submit Form", () => {
        test("Should dispatch info when submited", async () => {
            render(
                <ContextProvider>
                    <RegisterForm {...props} />
                </ContextProvider>
            )
            
            const usernameInput = screen.getByRole('textbox', {name: /Nombre/i,})
            await userEvent.type(usernameInput, "{backspace}{backspace}{backspace}{backspace}")
            await userEvent.type(usernameInput, 'Steve')
            const lastNameInput = screen.getByRole('textbox', {name: /Apellido/i,})
            await userEvent.type(lastNameInput, "{backspace}{backspace}{backspace}{backspace}{backspace}")
            await userEvent.type(lastNameInput, 'Rogers')
            const emailInput = screen.getByRole('textbox', {name: /Email/i,})
            await userEvent.type(emailInput, "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
            await userEvent.type(emailInput, 'steve@rogers.com')
            const submitButton = screen.getByRole('button', {name: /Proximo/i,})

            userEvent.click(submitButton);

            await waitFor(() => {
                expect(handleNext).toBeCalled();
            })
            expect(mockDispatch).toBeCalledWith({
                payload: {
                    nombre: "Steve",
                    apellido: "Rogers",
                    email: "steve@rogers.com"
                },
                type: "SUBMIT_REGISTER"
            })
            })
    })

    describe("Last Step", () => {
        test("This is te last step", () => {
            render(
                <ContextProvider>
                    <RegisterForm {...props2} />
                </ContextProvider>
            )

            const submitButton = screen.getByRole('button', {name: /Finalizar/i,})
            expect(submitButton).toBeInTheDocument();
        })
    })
})