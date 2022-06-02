import anecdoteService from '../services/anecdotes'
import { notify } from '../reducers/notificationReducer'

const anecdotesAtStart = []
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes : anecdoteToChange.votes +1 
      }
      return  state.map( a => id === a.id ? changedAnecdote : a )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'SET_ALL_ANECDOTES':
      return action.data
    default:
      return state
  }
}
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}
export const createAnecdote = (anecdote) => {
  console.log(anecdote);
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}
export const setAnecdotes = (anecdotes) => {
  console.log(anecdotes);
  return {
    type: 'SET_ALL_ANECDOTES',
    data: anecdotes
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const saveNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notify(`you created '${content}'`, 5))

  }
}
export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch(addVote(updatedAnecdote.id))
    dispatch(notify(`you voted '${anecdote.content}'`, 5))

  }
}
export default anecdoteReducer