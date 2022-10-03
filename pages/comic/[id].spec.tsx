import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider from 'dh-marvel/context/index';
import { initialState } from 'dh-marvel/context/reducer';
import ComicDetail from './[id].page';
import { Characters } from 'dh-marvel/components/accordion/accordion';
import { useRouter } from 'next/router';

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

const props = {
    id: 1,
    thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
        extension: "jpg",
    },
    pageCount: 4,
    title: "titulo",
    description: "descripbion",
    characters: {} as Characters,
    price: 24,
    oldPrice: 20,
    stock: 2,
    format: "format",
}

describe("ID comic Page", () => {
    test("Component should match snapshot", () => {
        const { baseElement } = render (
            <ContextProvider>
            <ComicDetail {...props} />
        </ContextProvider>
        )
        expect(baseElement).toMatchSnapshot();
    })
    test("Button should be clickeable for purchase", async () => {
        render (
            <ContextProvider>
            <ComicDetail {...props} />
        </ContextProvider>
        )

        const purchaseButton = screen.getByRole('button', {name: /Comprar/i,});
        expect(purchaseButton).not.toBeDisabled();
        await userEvent.click(purchaseButton);

        expect(mockDispatch).toBeCalledWith({
            payload: {
                img: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg",
                price: 24,
                title: "titulo",
            },
            type: "ADD_COMIC"
        })
    })
})
