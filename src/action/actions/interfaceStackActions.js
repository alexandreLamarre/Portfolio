
/**
 * Adds the interface with the given number to the redux store interface stack
 * @param {Number} number
 * @returns
 */
export const addInterfaceStack = (number) => {
  return (dispatch) => {
    dispatch({
      type: 'add-interface',
      payload: number
    })
  }
}

/**
 * Removes the interface with the given number to the redux store interface stack
 * @param {Number} number
 * @returns
 */
export const removeInterfaceStack = (number) => {
  return (dispatch) => {
    dispatch({
      type: 'remove-interface',
      payload: number
    })
  }
}

export const removeTopInterface = (number) => {
  return (dispatch) => {
    dispatch({
      type: 'remove-top',
      payload: undefined
    })
  }
}
