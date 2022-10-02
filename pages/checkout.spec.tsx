import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider, { OrderState } from 'dh-marvel/context/index';
import { initialState } from 'dh-marvel/context/reducer';
import Checkout from './checkout.page';
import { Comic } from 'dh-marvel/features/Types/comic.types';

jest.mock("dh-marvel/context/useOrder")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
const mockComic: OrderState = initialState;
mockComic.order.comic = {img: "img.jpg", price: 72, title: "Spiderman Volume 1"};
mockUseOrder.mockReturnValue({
    state: mockComic, 
    dispatch: mockDispatch
})

describe('Component Checkout', () => {
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