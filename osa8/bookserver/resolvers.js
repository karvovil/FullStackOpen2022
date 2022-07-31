const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'salasana'

const resolvers = {
  Query: {
    allBooks: async (root, args) =>
      args.genre === 'all' ? Book.find({ }):
        !args.genre ? Book.find({ }):
          Book.find({ genres:{ $in: args.genre } }) ,
    bookCount: async () => Book.collection.countDocuments({}),
    allAuthors: async () => Author.find({}),
    authorCount: async () => Author.collection.countDocuments({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return Book.collection.countDocuments({ author: root._id })
    }
  },
  Book: {
    author: async (root) => {
      return Author.findOne({ _id: root.author })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
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
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}
module.exports = resolvers