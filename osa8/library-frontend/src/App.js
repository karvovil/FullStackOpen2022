import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient, gql, useSubscription  } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author{
        name
      }
      published
      genres
    }
  }
`
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authorResult = useQuery( ALL_AUTHORS, { pollInterval: 2000 } )
  const bookResult = useQuery( ALL_BOOKS, { variables: { genre: '', pollInterval: 2000 } } )
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert('new book added!')
    }
  })

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
        <button onClick={logout} disabled={token === null}>logout</button>
        <button onClick={() => setPage('authors')} >authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} disabled={token === null}>add book</button>
        <button onClick={() => setPage('login')}disabled={token !== null}>log in</button>
        <button onClick={() => setPage('recommend')} disabled={token === null}>recommend</button>
      </div>

      <Authors show={page === 'authors'} showEdit={token !== null} authors={authorResult.data.allAuthors} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add' && token}  />

      <Login show={page === 'login'} setToken={setToken}  />

      <Recommend show={page === 'recommend' && token} books={bookResult.data.allBooks} />
    </div>
  )
}

export default App
