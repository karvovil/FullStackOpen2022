const notificationReducer = (
  state = { message: null, messageType: null },
  action
) => {
  if (action.type === 'NEW_NOTIFICATION') {
    return { message: action.data.message, messageType: action.data.messageType }
  } else if (action.type === 'REMOVE_NOTIFICATION') {
    return { message: null, type: null }
  }
  return state
}
export default notificationReducer
