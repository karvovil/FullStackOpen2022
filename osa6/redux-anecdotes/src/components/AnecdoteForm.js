import { connect } from 'react-redux'
import { saveNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.saveNewAnecdote(content)
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
  const mapDispatchToProps = {
    saveNewAnecdote,
  }
  const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
  export default ConnectedAnecdoteForm