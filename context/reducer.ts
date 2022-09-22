import { OrderState } from "context";
import { Comic } from "dh-marvel/features/Types/comic.types"
import { Card, Delivery, Register, Order, ComicInfo } from "dh-marvel/features/Types/state.types"

export const types = {
    ADD_COMIC: 'ADD_COMIC',
    SUBMIT_REGISTER: 'SUBMIT_REGISTER',
    SUBMIT_DELIVERY: 'SUBMIT_DELIVERY',
    SUBMIT_CARD: 'SUBMIT_CARD', 
}

export type Action = 
  |  { type: 'ADD_COMIC' , payload: ComicInfo}
  |  { type: 'SUBMIT_REGISTER', payload: Register }
  |  { type: 'SUBMIT_DELIVERY', payload: Delivery }
  |  { type: 'SUBMIT_CARD', payload: Card };

export const initialState: OrderState = { 
    order: {
        comic: {
            img: "",
            price: 0,
            title: "",
        },
        register: {
            usuario: "",
            apellido: "",
            email: "",
        },
        delivery: {
            direccion: "Siempre Viva 123",
            departamento: "",
            ciudad: "",
            provincia: "",
            codigoPostal: "",
        },
        card: {
            nroTarjeta: "",
            nombreTarjeta: "",
            fechaExp: "",
            codSeguridad: "",
        }
    }
}

export const reducer = (state: OrderState, action: Action) => {
    switch (action.type) {
        case 'ADD_COMIC':
            return {...state, comic: action.payload}
        case 'SUBMIT_REGISTER':
            return {...state, register: action.payload}
        case 'SUBMIT_DELIVERY':
            return {...state, delivery: action.payload}
        case 'SUBMIT_CARD':
            return {...state, card: action.payload}
        default:
      return state;
    }
}