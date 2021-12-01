import PageManager from "../lib/pageState";

const pageStateReducer = (state = PageManager.step(0), action) => {
    switch(action.type){
        case "transition-sel":
            return PageManager.step( PageManager.lookup(action.payload));
        case "transition-next":
            try{
                const nextPage = PageManager.next(state); 
                return nextPage;
            }
            catch{
                console.warn("Tried to transition to an illegal next page");
                return state;
            }

        case "transition-prev":
            try{
                const prevPage = PageManager.prev(state);
                return prevPage;
            } catch{
                console.warn("Tried to transition to an illegal prev page");
                return state;
            }
        default:
            return state
    }
}

export default pageStateReducer;