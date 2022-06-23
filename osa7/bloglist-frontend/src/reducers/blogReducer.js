import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification, removeNotification } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    setBlogs(state, action) {
      const blogsFromDB = action.payload
      console.log(blogsFromDB)
      return blogsFromDB.sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const blogs = state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      return blogs.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { addBlog, setBlogs, removeBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogsFromDB = await blogService.getAll()
    dispatch(setBlogs(blogsFromDB))
  }
}
export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogToModify = blogs.find((blog) => blog.id === id)
    const modifiedBlog = {
      ...blogToModify,
      user: blogToModify.user.id,
      likes: blogToModify.likes + 1,
    }
    const updatedBlog = await blogService.update(modifiedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}
export const deleteBlog = (id) => {
  return async (dispatch) => {
    if (window.confirm('Sure?')) {
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
    }
  }
}
export const appendBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.postNew(newBlog)
    dispatch(addBlog(createdBlog))
    dispatch(
      setNotification({
        message: `${createdBlog.title} created`,
        messageType: 'notification',
      })
    )
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}
