import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch( createAnecdote(content) )
        dispatch( setNotification(`U created: '${content}'`) )
        setTimeout(()=>{dispatch(removeNotification())},5000)  

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