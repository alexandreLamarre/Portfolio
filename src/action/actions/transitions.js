export const transitionSelected = (pageName) => {
  return (dispatch) => {
    dispatch({
      type: 'transition-sel',
      payload: pageName
    })
  }
};

export const transitionNext = (pageName) => {
  return (dispatch) => {
    dispatch({
      type: 'transition-next',
      payload : pageName,
    })
  }
};

export const transitionPrev = (pageName) => {
  return (dispatch) => {
    dispatch({
      type:'transition-prev',
      payload : pageName
    })
  }
}