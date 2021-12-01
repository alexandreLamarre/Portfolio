import { useEffect, useRef } from "react";

/**
 * Based on answer from : 
 * https://stackoverflow.com/questions/29069639/listen-to-keypress-for-document-in-reactjs
 * @param {*} eventName 
 * @param {*} handler 
 * @param {*} element 
 */
function useEventListener(eventName, handler, element = window) {
    //Create a ref that stores the handler
    const memoizedHandler = useRef();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render ...
    useEffect(() => {
        memoizedHandler.current = handler;
    }, [handler]);

    useEffect(
        () =>{
            //Make sure element supports addEventListener
            const isSupported = element && element.addEventListener;
            if(!isSupported) {
                console.warn('element add event listeners are not supported');
                return;
            }

            // Create event listener that calls handler function stored in ref
            const eventListener = event => memoizedHandler.current(event);

            //Add the event listener
            element.addEventListener(eventName, eventListener);
            
            //Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
       },
       [eventName, element] //Re-run if eventName or element changes.
    )
};

export default useEventListener;