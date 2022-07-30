import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_GENRES, GENRE_BOOKS } from '../queries'

const Books = ({ show }) => {

  const [currentGenre, setCurrentGenre] = useState('')
  const genresResult = useQuery(ALL_GENRES)
  const booksResult = useQuery(
    GENRE_BOOKS,
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
        In genre_
        <select value={currentGenre} onChange={({ target }) => setCurrentGenre(target.value)}>
          <option value={''} key={'all'}>{'all'}</option>
          {  [ ...new Set(genresResult.data.allBooks.map(b => b.genres).reduce((a,b) => a.concat(b), []))].map(g => <option value={g} key={g}>{g}</option>)}
        </select>
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
    </div>
  )
}

export default Books
