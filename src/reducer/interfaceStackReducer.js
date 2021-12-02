import INTERFACE_STACK from "../lib/interfaceStack";

const interfaceStackReducer = (state = {size: 0, top: new Map()}, action) => {
    switch(action.type){
        case 'add-interface':
            INTERFACE_STACK.add(action.payload);
            console.log(INTERFACE_STACK);
            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
        case 'remove-interface':
            console.log(action)
            INTERFACE_STACK.remove(action.payload);

            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
        case 'remove-top':
            INTERFACE_STACK.pop(action.payload);
            console.log(INTERFACE_STACK);
            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
        default:
            console.log(INTERFACE_STACK);
            return {size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active};
    };
};

export default interfaceStackReducer;