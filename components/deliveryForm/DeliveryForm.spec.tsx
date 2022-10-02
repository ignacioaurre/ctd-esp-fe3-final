import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider from '../../context';
import { initialState } from 'dh-marvel/context/reducer';
import DeliveryForm, { deliverySchema } from './DeliveryForm';
import { Delivery } from 'dh-marvel/features/Types/state.types';
import { validCard } from 'dh-marvel/pages/api/checkout.route';

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
    title: "Dirección de entrega",
    steps
}
const props2 = {
    activeStep: 2,
    handleBack,
    handleNext,
    title: "Dirección de entrega",
    steps
}


describe('Component DeliveryForm', () => {
    test("Component should render", () => {
    const { baseElement } =
    render(
        <ContextProvider>
            <DeliveryForm {...props} />
        </ContextProvider>
    )
    expect(baseElement).toMatchSnapshot();
    })

    test("Should show 3 labels and inputs", () => {
        render(
            <ContextProvider>
                <DeliveryForm {...props} />
            </ContextProvider>
        )
        const directionLabel = screen.getByLabelText('Dirección')
        const directionInput = screen.getByRole('textbox', {name: /dirección/i,})
        const departmentLabel = screen.getByLabelText('Departamento')
        const departmentInput = screen.getByRole('textbox', {name: /Departamento/i,})
        const citylLabel = screen.getByLabelText('Ciudad')
        const cityInput = screen.getByRole('textbox', {name: /Ciudad/i,})
        const stateLabel = screen.getByLabelText('Provincia')
        const stateInput = screen.getByRole('textbox', {name: /Provincia/i,})
        const zipCodeLabel = screen.getByLabelText('Codigo Postal')
        const zipCodeInput = screen.getByRole('textbox', {name: /Codigo Postal/i,})
        expect(directionLabel).toBeInTheDocument();
        expect(departmentLabel).toBeInTheDocument();
        expect(citylLabel).toBeInTheDocument();
        expect(stateLabel).toBeInTheDocument();
        expect(zipCodeLabel).toBeInTheDocument();
        expect(directionInput).toBeInTheDocument();
        expect(departmentInput).toBeInTheDocument();
        expect(cityInput).toBeInTheDocument();
        expect(stateInput).toBeInTheDocument();
        expect(zipCodeInput).toBeInTheDocument();
    })
    test('should render the submit button', () => {
        render(
            <ContextProvider>
                <DeliveryForm {...props} />
            </ContextProvider>
        )
        const submitButton = screen.getByRole('button', {name: /Proximo/i,})
        expect(submitButton).toBeInTheDocument();
    });
    test('should have focus on direction', () => {
        render(
            <ContextProvider>
                <DeliveryForm {...props} />
            </ContextProvider>
        )
        const directionInput = screen.getByRole('textbox', {name: /dirección/i,})
        expect(directionInput).toHaveFocus();
    });

    describe("Validating form", () => {
        test('should return true', async () => {
            const delivery: Delivery = {
                direccion: 'valid',
                departamento: 'valid',
                ciudad: 'valid',
                provincia: 'valid',
                codigoPostal: 'valid'
            }
            expect(await deliverySchema.isValid(delivery)).toBeTruthy();
        })
        test('should return false', async () => {
            const delivery: Delivery = {
                direccion: '',
                departamento: 'valid',
                ciudad: 'valid',
                provincia: 'valid',
                codigoPostal: 'valid'
            }
            expect(await deliverySchema.isValid(delivery)).toBeFalsy();
        })
    })

    describe("Submit Form", () => {
        test("Should dispatch info when submited", async () => {
            render(
                <ContextProvider>
                    <DeliveryForm {...props} />
                </ContextProvider>
            )
            
            const departmentnInput = screen.getByRole('textbox', {name: /departamento/i,})
            await userEvent.type(departmentnInput, "{backspace}{backspace}{backspace}{backspace}")
            await userEvent.type(departmentnInput, '14 F')
            const zipCodeInput = screen.getByRole('textbox', {name: /Codigo Postal/i,})
            await userEvent.type(zipCodeInput, "{backspace}{backspace}{backspace}{backspace}")
            await userEvent.type(zipCodeInput, '1234')

            const submitButton = screen.getByRole('button', {name: /Proximo/i,})
            userEvent.click(submitButton);

            await waitFor(() => {
                expect(handleNext).toBeCalled();
            })
            expect(mockDispatch).toBeCalledWith({
                payload: {
                    direccion: "Avengers Tower",
                    departamento: "14 F",
                    ciudad: "New York",
                    provincia: "New York",
                    codigoPostal: "1234",
                },
                type: "SUBMIT_DELIVERY"
            })
            })
    })

    describe("Last Step", () => {
        test("This is te last step", () => {
            render(
                <ContextProvider>
                    <DeliveryForm {...props2} />
                </ContextProvider>
            )

            const submitButton = screen.getByRole('button', {name: /Finalizar/i,})
            expect(submitButton).toBeInTheDocument();
        })
    })
})