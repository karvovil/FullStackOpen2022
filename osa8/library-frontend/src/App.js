import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { gql, useQuery, useApolloClient  } from '@apollo/client'


const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks  {
      title,
      author{
        name
      },
      published
    }
  }
`
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authorResult = useQuery( ALL_AUTHORS, { pollInterval: 2000 } )
  const bookResult = useQuery( ALL_BOOKS, { pollInterval: 2000 } )

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (authorResult.loading || bookResult.loading)  {
    return <div>loading...</div>
  }
  return (
    <div>
      <div>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button disabled={token === null} onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>log in</button>
      </div>

      <Authors show={page === 'authors'} showEdit={token !== null} authors={authorResult.data.allAuthors} />

      <Books show={page === 'books'} books={bookResult.data.allBooks} />

      <NewBook show={page === 'add' && token}  />

      <Login show={page === 'login'} setToken={setToken}  />
    </div>
  )
}

export default App
