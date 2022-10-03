import {render, screen} from "@testing-library/react";
import IndexPage from "dh-marvel/pages/index.page";
import Index from "dh-marvel/pages/index.page";
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider from 'dh-marvel/context/index';
import { initialState } from "dh-marvel/context/reducer";
import comics from "dh-marvel/test/mocks/comics";
import userEvent from '@testing-library/user-event';


jest.mock("dh-marvel/context/useOrder")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: initialState, 
    dispatch: mockDispatch
})
const props = {comics: comics, total: 120}

describe('IndexPage', () => {
    describe('when rendering default', () => {
        test("Should match snapshot", () => {
            const {baseElement} = render(
                <ContextProvider>
                    <Index {...props}/>
                </ContextProvider>
            )
            expect(baseElement).toMatchSnapshot();
        })


        test('should render the title', () => {
            render(
                <ContextProvider>
                    <Index {...props}/>
                </ContextProvider>
            )
            const title = screen.getByText('Todos los Cómics')
            expect(title).toBeInTheDocument()
        })
    })

})