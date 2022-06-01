import { useSelector, useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
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