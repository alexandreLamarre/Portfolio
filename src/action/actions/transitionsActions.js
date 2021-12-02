/**
 * This action is meant to set the current state of the store
 * to something unrelated to the current state.
 * @param {String} pageName
 * @returns
 */
export const transitionSelected = (pageName) => {
  return (dispatch) => {
    dispatch({
      type: 'transition-sel',
      payload: pageName
    })
  }
}

/**
 * This action is meant to modify the current state of the store
 * @param {String} pageName
 * @returns
 */
export const transitionNext = (pageName) => {
  return (dispatch) => {
    dispatch({
      type: 'transition-next',
      payload: pageName
    })
  }
}

/**
 * This action is meant to modify the current state of the store
 * @param {String} pageName
 * @returns
 */
export const transitionPrev = (pageName) => {
  return (dispatch) => {
    dispatch({
      type: 'transition-prev',
      payload: pageName
    })
  }
}
