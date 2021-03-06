import { useSelector } from 'react-redux'

/**
 * Text bubble that specifies next action input
 * from user in order to transition further into the portfolio.
 *
 * Specifies which action to take to close overlays.
 *
 * Not visible during transition animations.
 *
 * TODO: Add a timeout timer every X seconds to bring attention to the bubble.
 *
 * @param {*} props
 * @returns
 */
const NextAction = (props) => {
  const isOpen = useSelector((state) => state.interfaceStack.size)

  return (
    <div className='action-container'>
      <span className='next-action'>
        {isOpen === 0 ? 'Scroll down to continue' : 'Press escape to close the interface'}
      </span>
    </div>

  )
}

export default NextAction
