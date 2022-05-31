import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const newAnecdote = (event) => {
        event.preventDefault()
        dispatch( createAnecdote(event.target.anecdote.value) )
      }
    return(
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}
export default AnecdoteForm