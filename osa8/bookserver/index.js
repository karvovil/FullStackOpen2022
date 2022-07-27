require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int
}
  type Query {
    allBooks(author: String, genre: String): [Book]!
    bookCount: Int!
    allAuthors: [Author]!
    authorCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
  `
//TODO genre is mandatory!
const resolvers = {
  Query: {
    allBooks: async () =>  {
      /*       let filteredBooks = books
      if(args.author){
        filteredBooks = books.filter(b => b.author === args.author)
      }
      if(args.genre){
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      } */
      return Book.find({})
    },
    bookCount: async () => Book.collection.countDocuments({}),
    allAuthors: async () => Author.find({}),
    authorCount: async () => Author.collection.countDocuments({})
  },
  Author: {
    bookCount: async (root) => {
      console.log(root)
      return Book.collection.countDocuments({ author: root._id })
    }
  },
  Book: {
    author: async (root) => {
      return Author.findOne({ _id: root.author })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const allAuthors = await Author.find({})
      const authorIsNew = !allAuthors.map(a => a.name).includes(args.author)
      const author = authorIsNew ? new Author ({ name: args.author }) : allAuthors.find(a => a.name === args. author)
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const book = new Book({ ...args, author: author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if(!author){
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})