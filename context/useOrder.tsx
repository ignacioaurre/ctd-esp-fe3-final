import { OrderContext, OrderContextState } from ".";
import { useContext } from "react";

const useOrder = (): OrderContextState => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error(
            'useOrder must be used within a OrderProvider'
        );
    }
    return context;
};

export default useOrder;