export const transitionNext = (cur) => {
  return (dispatch) => {
    dispatch({
      type: 'transition',
      payload: cur.next
    })
  }
}
