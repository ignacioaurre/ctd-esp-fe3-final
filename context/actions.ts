import { Comic } from 'dh-marvel/features/Types/comic.types';
import { Card, Delivery, Register, ComicInfo } from 'dh-marvel/features/Types/state.types';
import { Dispatch } from 'react';
import { Action } from './reducer';

export const selectComic = (dispatch: Dispatch<Action>, comic: ComicInfo) => {
    dispatch({type: 'ADD_COMIC', payload: comic})
}

export const submitRegister = (dispatch: Dispatch<Action>, register: Register) => {
    dispatch({type: 'SUBMIT_REGISTER', payload: register});
}

export const submitDelivery = (dispatch: Dispatch<Action>, delivery: Delivery) => {
    dispatch({type: 'SUBMIT_DELIVERY', payload: delivery});
}

export const submitCard = (dispatch: Dispatch<Action>, card: Card) => {
    dispatch({type: 'SUBMIT_CARD', payload: card});
}