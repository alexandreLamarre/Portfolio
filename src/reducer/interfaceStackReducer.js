import INTERFACE_STACK from '../lib/interfaceStack'

<<<<<<< HEAD
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
=======
const interfaceStackReducer = (state = { size: 0, top: new Map() }, action) => {
  switch (action.type) {
    case 'add-interface':
      INTERFACE_STACK.add(action.payload)
      console.log(INTERFACE_STACK)
      return { size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active }
    case 'remove-interface':
      console.log(action)
      INTERFACE_STACK.remove(action.payload)

      return { size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active }
    case 'remove-top':
      INTERFACE_STACK.pop(action.payload)
      console.log(INTERFACE_STACK)
      return { size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active }
    default:
      console.log(INTERFACE_STACK)
      return { size: INTERFACE_STACK.size(), top: INTERFACE_STACK.active }
  };
}
>>>>>>> decd044557a1f0195ccaf193211a9087bf4059d2

export default interfaceStackReducer
