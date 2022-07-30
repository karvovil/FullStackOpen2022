import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name,
    born,
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks  {
    title,
    author{
      name
    },
    published,
    genres
  }
}
`
export const FAVORITE_GENRE = gql`
query Me {
    me {
    favoriteGenre  
    }
  }
`
export const ALL_GENRES = gql`
query AllBooks {
  allBooks {
    genres
  }
}
`
export const GENRE_BOOKS = gql`
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
export const CREATE_BOOK = gql`
mutation createBook( $title: String!, $published: Int!, $author: String!, $genres: [String] ){
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ){title}
}
`