import { gql, useQuery } from '@apollo/client'

const FAVORITE_GENRE = gql`
query Me {
    me {
    favoriteGenre  
    }
  }
`
const Recommend = ({ books, show }) => {
  if (!show) {
    return null
  }
  const favoriteGenreResult = useQuery( FAVORITE_GENRE )

  if (favoriteGenreResult.loading)  {
    return <div>loading...</div>
  }
  return (
    <div>
      <div>
        <h2>books</h2>
        Books in your favorite genre
        <b> {favoriteGenreResult.data.me.favoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { books.filter( b => b.genres.includes(favoriteGenreResult.data.me.favoriteGenre)).map((a) => (
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
export default Recommend
