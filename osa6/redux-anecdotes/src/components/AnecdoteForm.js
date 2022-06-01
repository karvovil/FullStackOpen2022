import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))

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