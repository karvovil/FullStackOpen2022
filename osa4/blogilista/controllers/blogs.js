const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})


  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url){
    response.status(400).end()
  }else{
    if(!blog.likes)
      blog.likes = 0

    const result = await blog.save()

    response.status(201).json(result)
  }
})
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const b = request.body
  const newBlog = {
    author: b.author,
    title: b.title,
    url: b.url,
    likes: b.likes
  }
  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    .then(updatedNote => {
      logger.info('unote is '+updatedNote)
      response.json(updatedNote)
    })
/*
  const result = await Blog.findByIdAndUpdate((request.params.id, newBlog, { new: true }))

  logger.info('result of fibyidandup'+result)
  response.json(result)*/
})
module.exports = blogsRouter