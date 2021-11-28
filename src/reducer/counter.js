/**
 * Reducer that I am using as a proof of concept, do not include in portfolio
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */

const counterReducer = (state=0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export default counterReducer;