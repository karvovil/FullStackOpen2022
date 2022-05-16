const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/',tokenExtractor, userExtractor, async (request, response) => {

  logger.info(request.user)
  const user = request.user
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id
  })

  if (!blog.title || !blog.url){
    response.status(400).end()
  }else{
    if(!blog.likes)
      blog.likes = 0

    const savedBlog = await blog.save()
    logger.info(savedBlog.id)
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})
blogsRouter.delete('/:id',tokenExtractor, userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if(user.id.toString() === blog.user.toString() ){

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  response.status(401).json({ error: 'Unauthorized' })
})

blogsRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const b = request.body
  const newBlog = {
    author: b.author,
    title: b.title,
    url: b.url,
    likes: b.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })

  response.json(result)
})
module.exports = blogsRouter