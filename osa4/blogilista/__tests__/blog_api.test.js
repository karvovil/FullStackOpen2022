const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    url: 'www.lol.pl',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('async/await simplifies making async calls')
})

test('Blog likes are 0 if they are not defined ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    url: 'www.lol.pl',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await helper.blogsInDb()

  const addedBlog = blogs[helper.initialBlogs.length]
  expect(addedBlog.likes).toBe(0)
})

test('posting blog with no title or url returns 400 Bad request', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'make',
  }
  const newBlog2 = {
    author: 'async/await simplifies making async calls',
    url: 'www.lol.pl',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const identifiers = blogsAtEnd.map(b => b.id)
  expect(identifiers).not.toContain(blogToDelete.id)
})

test('a specific blog can be modified', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToMod = blogsAtStart[0]
  const oldUrl = blogToMod.url

  const newBlog = {
    author: blogToMod.author,
    title: blogToMod.title,
    url: 'New and unique url that cant be found from existing DB',
    likes: 1337
  }
  logger.info(blogToMod.id)
  await api
    .put(`/api/blogs/${blogToMod.id}`)
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  logger.info(blogsAtEnd)
  const urls = blogsAtEnd.map(blog => blog.url)

  expect(urls).toContain(newBlog.url)
  expect(urls).not.toContain(oldUrl)
})

afterAll(() => {
  mongoose.connection.close()
})