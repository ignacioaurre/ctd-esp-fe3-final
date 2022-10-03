import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider from 'dh-marvel/context/index';
import { initialState } from 'dh-marvel/context/reducer';
import Checkout from './checkout.page';
import { useRouter } from "next/router";

jest.mock("dh-marvel/context/useOrder")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: initialState, 
    dispatch: mockDispatch
})

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
    push: mockPush,
}))

describe('Component Checkout', () => {

    test("Redirect to home if no comic selected", async () => {
        render(
            <ContextProvider>
                <Checkout />
            </ContextProvider>
        )
        await waitFor(() => {
            expect(mockPush).toHaveBeenNthCalledWith(1, "/"); 
        })
    })

    test("Component should render", () => {
    const { baseElement } =
    render(
        <ContextProvider>
            <Checkout />
        </ContextProvider>
    )
    expect(baseElement).toMatchSnapshot();
    })

    test("Component should render first form", () => {
        render(
            <ContextProvider>
                <Checkout />
            </ContextProvider>
        )

        const usernameInput = screen.getByRole('textbox', {name: /Nombre/i,});
        expect(usernameInput).toBeInTheDocument();
        const prevButton = screen.getByRole('button', {name: /Anterior/i,});
        expect(prevButton).toBeDisabled();
    })

    test("Component should go to next form", async () => {
        render(
            <ContextProvider>
                <Checkout />
            </ContextProvider>
        )
        const usernameInput = screen.getByRole('textbox', {name: /Nombre/i,});
        expect(usernameInput).toBeInTheDocument();
        const nextButton = screen.getByRole('button', {name: /Proximo/i,});
        await userEvent.click(nextButton);
        const directionInput = screen.findByRole('textbox', {name: /Departamento/i,})
        expect(await directionInput).toBeInTheDocument();
        const prevButton = screen.getByRole('button', {name: /Anterior/i,});
        expect(prevButton).not.toBeDisabled();
        await userEvent.click(prevButton);
        const usernameInput2 = screen.findByRole('textbox', {name: /Nombre/i,});
        expect(await usernameInput2).toBeInTheDocument();
        const prevButton2 = screen.findByRole('button', {name: /Anterior/i,});
        expect(await prevButton2).toBeDisabled();
    })
})