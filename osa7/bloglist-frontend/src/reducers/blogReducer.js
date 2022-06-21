import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers:{
    addBlog(state, action){
      const newBlog = action.payload
      state.push(newBlog)
    },
    setBlogs(state, action){
      const blogsFromDB = action.payload
      return blogsFromDB.sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action){
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    updateBlog(state, action){
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    }
  }
})

export const { addBlog, setBlogs, removeBlog, updateBlog} = blogSlice.actions
export default blogSlice.reducer
