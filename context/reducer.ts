import { OrderState } from "context";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { Card, Delivery, Register, ComicInfo, Snackbar } from "dh-marvel/features/Types/state.types"

export type Action = 
  |  { type: 'ADD_COMIC' , payload: ComicInfo}
  |  { type: 'SUBMIT_REGISTER', payload: Register }
  |  { type: 'SUBMIT_DELIVERY', payload: Delivery }
  |  { type: 'SUBMIT_CARD', payload: Card }
  |  { type: 'SUBMIT_FORM'}
  |  { type: 'RESTORE_STATE'}
  |  { type: 'SET_SNACKBAR', payload: string}

export const initialState: OrderState = { 
    order: {
        comic: {
            img: "",
            price: 0,
            title: "",
        },
        register: {
            nombre: "Tony",
            apellido: "Stark",
            email: "Tony@stark.com",
        },
        delivery: {
            direccion: "Avengers Tower",
            departamento: "20 A",
            ciudad: "New York",
            provincia: "New York",
            codigoPostal: "9827",
        },
        card: {
            nroTarjeta: "1234123098",
            nombreTarjeta: "TONY STARK",
            fechaExp: "03/29",
            codSeguridad: "",
        },
    },
    snackbar: {
        open: false,
        message: "",
    },
    finishedOrder: {} as CheckoutInput,
};

export const reducer = (state: OrderState, action: Action) => {
    switch (action.type) {
        case 'ADD_COMIC':
            return {...state,
                order: {...state.order,
                    comic: action.payload
                }
            }
        case 'SUBMIT_REGISTER':
            return {...state,
                order: {...state.order,
                    register: action.payload
                }
            }
        case 'SUBMIT_DELIVERY':
            return {...state,
                order: {...state.order,
                    delivery: action.payload
                }
            }
        case 'SUBMIT_CARD':
            return {...state,
                order: {...state.order,
                    card: action.payload
                }
            }
        case 'SUBMIT_FORM':
            return{...state,
                finishedOrder: {order: { name: state.order.comic.title,
                                         image: state.order.comic.img,
                                         price: state.order.comic.price,
                                        },
                                card:  {number: state.order.card.nroTarjeta,
                                        nameOnCard: state.order.card.nombreTarjeta,
                                        expDate: state.order.card.fechaExp,
                                        cvc: state.order.card.codSeguridad,
                                    },
                                customer: {name: state.order.register.nombre,
                                           lastname: state.order.register.apellido,
                                           email: state.order.register.email,
                                           address: {address1: state.order.delivery.direccion,
                                                     address2: state.order.delivery.departamento,
                                                     city: state.order.delivery.ciudad,
                                                     state: state.order.delivery.provincia,
                                                     zipCode: state.order.delivery.codigoPostal,
                                        }
                                }
                            }
            }
        case 'SET_SNACKBAR':
            return {...state, snackbar: {open: !state.snackbar.open, message: action.payload}}
        default:
      return state;
    }
}