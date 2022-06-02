import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const rawAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = rawAnecdotes.filter(a => a.content.toLowerCase().includes(filter) ) 
    const anecdotes = filteredAnecdotes.sort((a,b) => b.votes-a.votes)
    const dispatch = useDispatch()

    const vote = async anecdote => {dispatch(voteAnecdote(anecdote))}
    return (       
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )
    )
}
export default AnecdoteList