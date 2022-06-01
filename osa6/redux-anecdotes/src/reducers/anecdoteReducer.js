import { createSlice } from '@reduxjs/toolkit'

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
      return  inOrder( state.map( a => id === a.id ? changedAnecdote : a ) )
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
const inOrder = state => state.sort((a,b) => b.votes-a.votes)

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
export default anecdoteReducer