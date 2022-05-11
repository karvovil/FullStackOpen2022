var lodash = require('lodash')
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum+blog.likes
  return(
    blogs.reduce(reducer, 0)
  )
}
const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  return(
    blogs.find(blog => blog.likes === mostLikes)
  )
}
const mostBlogs = (blogs) => {
  const counts = lodash.countBy(blogs, 'author')
  const biggestNumberOfBlogs = Math.max(...Object.values(counts))
  const author = Object.keys(counts).find( key => counts[key] === biggestNumberOfBlogs)

  return {
    author: author,
    blogs: biggestNumberOfBlogs
  }
}
const mostLikes = (blogs) => {
  const authors = [...new Set(blogs.map(blog => blog.author))]
  let authorsAndLikes = []

  for (const author of authors) {
    const likes = blogs.reduce(
      (total, blog) => blog.author === author ? total + blog.likes : total
      ,0)
    authorsAndLikes.push({ author: author, likes:likes })
  }

  const bestAuthorAndLikes = authorsAndLikes.reduce(
    (biggestItem, item) => item.likes > biggestItem.likes ? item : biggestItem
    ,{ likes: 0 })

  return bestAuthorAndLikes
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}