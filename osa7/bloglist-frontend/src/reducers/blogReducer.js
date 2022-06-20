import blogService from '../services/blogs'

const blogReducer = async (state = [], action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'NEW_BLOG': {
      const createdBlog = await blogService.postNew(action.data)
      return state.concat(createdBlog)
    }
    case 'SET_BLOGS': {
      const blogsFromDB = await blogService.getAll()
      console.log(blogsFromDB.sort((a, b) => b.likes - a.likes))
      return blogsFromDB.sort((a, b) => b.likes - a.likes)
    }
    case 'REMOVE_BLOG':
      await blogService.deleteBlog(action.id)
      return state.filter((blog) => blog.id !== action.id)
    case 'LIKE_BLOG': {
      const blogToModify = state.find((blog) => blog.id === action.id)
      const modifiedBlog = {
        ...blogToModify,
        user: blogToModify.user.id,
        likes: blogToModify.likes + 1,
      }
      const updatedBlog = await blogService.update(modifiedBlog)
      return state.map((blog) => (blog.id === action.id ? updatedBlog : blog))
    }
    default:
      return state
  }
}
export default blogReducer
