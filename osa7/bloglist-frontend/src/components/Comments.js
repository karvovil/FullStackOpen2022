import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {
  console.log('blog in comments: ' + blog)
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const addComment = async (event) => {
    event.preventDefault()
    const commentedBlog = {
      ...blog,
      comments: [...blog.comments, comment],
    }
    dispatch(commentBlog(commentedBlog))
    setComment('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <form>
        <input
          id="new-comment"
          title="commentInput"
          type="text"
          value={comment}
          name="C"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit" onClick={addComment}>
          New comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}
export default Comments
