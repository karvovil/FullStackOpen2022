const notificationReducer = (
  state = { message: null, messageType: null },
  action
) => {
  if (action.type === 'NEW_NOTIFICATION') {
    return { message: action.data.message, type: action.data.type }
  } else if (action.type === 'REMOVE') {
    return { message: null, type: null }
  }
  return state
}
export default notificationReducer
