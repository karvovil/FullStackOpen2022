const blogReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'NEW_BLOG': {
      return state.concat(action.data)
    }
    case 'SET_BLOGS': {
      return action.data.sort((a, b) => b.likes - a.likes)
    }
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.id)
    case 'UPDATE_BLOG': {
      return state.map((blog) => (blog.id === action.data.id ? action.data : blog))
    }
    default:
      return state
  }
}
export default blogReducer
