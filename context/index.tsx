import { Order } from 'dh-marvel/features/Types/state.types';
import React, { useMemo, useReducer, createContext, FC, Dispatch, PropsWithChildren } from 'react';

import { reducer, initialState, Action } from './reducer';

export interface OrderState {
  order: Order
}

export type OrderContextState = {
  state: {order: Order},
  dispatch: Dispatch<Action>
}

export const OrderContext = createContext<OrderContextState | undefined>(undefined);

const ContextProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
        <OrderContext.Provider value={contextValue} >
          {children}
        </OrderContext.Provider>
      )

};

export default ContextProvider;