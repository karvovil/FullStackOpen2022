import { useSelector, useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const rawAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const anecdotes = rawAnecdotes.filter(a => a.content.toLowerCase().includes(filter) ) 
    const dispatch = useDispatch()

    const vote = id => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(addVote(id))
        dispatch(setNotification(`U voted: '${anecdote.content}'`))
        setTimeout(()=>{dispatch(removeNotification())},5000)  

    }
    return (       
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )
    )
}
export default AnecdoteList