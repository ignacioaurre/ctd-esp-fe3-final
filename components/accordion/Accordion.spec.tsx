import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from 'dh-marvel/context/useOrder';
import ContextProvider from 'dh-marvel/context/index';
import { initialState } from 'dh-marvel/context/reducer';
import AccordionComponent from './accordion';
import { characters, comics } from 'dh-marvel/test/mocks/characters';

jest.mock("dh-marvel/context/useOrder")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: initialState, 
    dispatch: mockDispatch
})

const props = {
    id: 1,
    title: "Titulo",
    description: "Descripción"
}
const props2 = {
    id: 1,
    title: "Titulo",
    characters: characters,
}
const props3 = {
    id: 1,
    title: "Titulo",
    characters: comics,
}

describe("Accordion tests", () => {
    test("Should match snapshot", () => {
        const { baseElement } = render(
            <ContextProvider>
                <AccordionComponent {...props}/>
            </ContextProvider>
        )
        expect(baseElement).toMatchSnapshot();
    })
    test("Should find title", () => {
        render(
            <ContextProvider>
                <AccordionComponent {...props}/>
            </ContextProvider>
        )

        const title = screen.getByLabelText("Titulo");
        expect(title).toBeInTheDocument();
    })
    test("Should have characters", () => {
        render(
            <ContextProvider>
                <AccordionComponent {...props2}/>
            </ContextProvider>
        )
    })
    test("Should have comics", () => {
        render(
            <ContextProvider>
                <AccordionComponent {...props3}/>
            </ContextProvider>
        )
    })

})