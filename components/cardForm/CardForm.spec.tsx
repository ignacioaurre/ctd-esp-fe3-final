import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider from '../../context';
import { initialState } from 'dh-marvel/context/reducer';
import CardForm, { cardSchema } from './CardForm';
import { Card } from 'dh-marvel/features/Types/state.types';

jest.mock("../../context/useOrder")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: initialState,
    dispatch: mockDispatch
})
const activeStep = 2;
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
    activeStep: 0,
    handleBack,
    handleNext,
    title: "Datos Personales",
    steps
}


describe('Component CardForm', () => {
    test("Component should render", () => {
    const { baseElement } =
    render(
        <ContextProvider>
            <CardForm {...props} />
        </ContextProvider>
    )
    expect(baseElement).toMatchSnapshot();
    })

    test("Should show 3 labels and inputs", () => {
        render(
            <ContextProvider>
                <CardForm {...props} />
            </ContextProvider>
        )
        const cardNumberLabel = screen.getByLabelText('Numero Tarjeta')
        const cardNumberInput = screen.getByRole('textbox', {name: /Numero Tarjeta/i,})
        const cardNameLabel = screen.getByLabelText('Nombre Tarjeta')
        const cardNameInput = screen.getByRole('textbox', {name: /Nombre Tarjeta/i,})
        const expDateLabel = screen.getByLabelText('Fecha de expiración')
        const expDateInput = screen.getByRole('textbox', {name: /Fecha de Expiración/i,})
        const cvvLabel = screen.getByLabelText('Codigo de Seguridad')
        const cvvlInput = screen.getByTestId("codSeguridad")
        expect(cardNumberInput).toBeInTheDocument();
        expect(cardNumberLabel).toBeInTheDocument();
        expect(cardNameInput).toBeInTheDocument();
        expect(cardNameLabel).toBeInTheDocument();
        expect(expDateInput).toBeInTheDocument();
        expect(expDateLabel).toBeInTheDocument();
        expect(cvvlInput).toBeInTheDocument();
        expect(cvvLabel).toBeInTheDocument();
    })
    test('should render the submit button', () => {
        render(
            <ContextProvider>
                <CardForm {...props} />
            </ContextProvider>
        )
        const submitButton = screen.getByRole('button', {name: /Finalizar/i,})
        expect(submitButton).toBeInTheDocument();
    });
    test('should have focus on username', () => {
        render(
            <ContextProvider>
                <CardForm {...props} />
            </ContextProvider>
        )
        const usernameInput = screen.getByRole('textbox', {name: /Numero Tarjeta/i,})
        expect(usernameInput).toHaveFocus();
    });

    describe("Validating form", () => {
        test('should return true', async () => {
            const card: Card = {
                nroTarjeta: 'valid',
                nombreTarjeta: 'valid',
                fechaExp: 'valid',
                codSeguridad: 'valid',
            }
            expect(await cardSchema.isValid(card)).toBeTruthy();
        })
        test('should return false', async () => {
            const card: Card = {
                nroTarjeta: '',
                nombreTarjeta: 'valid',
                fechaExp: 'valid',
                codSeguridad: 'valid',
            }
            expect(await cardSchema.isValid(card)).toBeFalsy();
        })
    })

    describe("Submit Form", () => {
        test("Should dispatch info when submited", async () => {
            render(
                <ContextProvider>
                    <CardForm {...props} />
                </ContextProvider>
            )
            
            const cardNumberInput = screen.getByRole('textbox', {name: /Numero Tarjeta/i,})
            await userEvent.type(cardNumberInput, "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}")
            await userEvent.type(cardNumberInput, '42424242 4242 4242')
            const cvvlInput = screen.getByTestId("codSeguridad")
            await userEvent.type(cvvlInput, '1234')
            
            const submitButton = screen.getByRole('button', {name: /Finalizar/i,})
            userEvent.click(submitButton);

            // expect(mockDispatch).toBeCalledWith({
            //     payload: {
            //         nroTarjeta: "42424242 4242 4242",
            //         nombreTarjeta: "TONY STARK",
            //         fechaExp: "03/29",
            //         codSeguridad: "1234",
            //     },
            //     type: "SUBMIT_CARD"
            //     })
            // })
            // expect(mockDispatch).toBeCalledWith({type: "SUBMIT_FORM"})
        })
    })

    describe("Last Step", () => {
        test("This is not the last step", () => {
            render(
                <ContextProvider>
                    <CardForm {...props2} />
                </ContextProvider>
            )

            const submitButton = screen.getByRole('button', {name: /Proximo/i,})
            expect(submitButton).toBeInTheDocument();
        })
    })
})