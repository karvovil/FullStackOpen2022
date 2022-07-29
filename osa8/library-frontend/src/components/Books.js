import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_GENRES = gql`
query AllBooks {
  allBooks {
    genres
  }
}
`
const ALL_BOOKS = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
    genres
  }
}
`
const Books = ({ show }) => {

  const [currentGenre, setCurrentGenre] = useState('all')
  const genresResult = useQuery(ALL_GENRES)
  const booksResult = useQuery(
    ALL_BOOKS,
    { variables: { genre: currentGenre } }
  )
  if (!show) {
    return null
  }
  if (booksResult.loading)  {
    return <div>loading...</div>
  }
  return (
    <div>
      <div>
        <h2>Books</h2>
        In genre
        <b> {currentGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { booksResult.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <select value={currentGenre} onChange={({ target }) => setCurrentGenre(target.value)}>
        <option value={'all'} key={'all'}>{'all'}</option>
        {  [ ...new Set(genresResult.data.allBooks.map(b => b.genres).reduce((a,b) => a.concat(b), []))].map(g => <option value={g} key={g}>{g}</option>)}
      </select>
    </div>
  )
}

export default Books
