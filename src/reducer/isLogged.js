/**
 *  Reducer that I am using as a proof of concept, do not include in portfolio
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const isLoggedReducer = (state=false, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return !state;
        default:
            return state;
    }
}

export default isLoggedReducer;