import INTERFACE_STACK from "../lib/interfaceStack";

const interfaceStackReducer = (state = {size: 0, top: new Map()}, action) => {
    switch(action.type){
        case 'add-interface':
            INTERFACE_STACK.add(action.payload);
            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
        case 'remove-interface':
            INTERFACE_STACK.remove(action.payload);

            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
        case 'remove-top':
            INTERFACE_STACK.pop(action.payload);
            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
        default:
            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
    };
};

export default interfaceStackReducer;