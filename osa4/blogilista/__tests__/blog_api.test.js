const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const helper = require('./test_helper')

describe('when no auth token is sent with request', () => {
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

  test('a valid blog can not be added without authorization', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'www.lol.pl',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain('async/await simplifies making async calls')
  })


  test('posting invalid blog with no authorization returns 401 Unauthorizes', async () => {
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
      .expect(401)

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(401)
  })

  test('a blog can not be deleted without authorization', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const identifiers = blogsAtEnd.map(b => b.id)
    expect(identifiers).toContain(blogToDelete.id)
  })

  test('a specific blog can not be modified without authorization', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToMod = blogsAtStart[0]
    const oldUrl = blogToMod.url

    const newBlog = {
      author: blogToMod.author,
      title: blogToMod.title,
      url: 'New and unique url that cant be found from existing DB',
      likes: 1337
    }
    await api
      .put(`/api/blogs/${blogToMod.id}`)
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const urls = blogsAtEnd.map(blog => blog.url)

    expect(urls).not.toContain(newBlog.url)
    expect(urls).toContain(oldUrl)
  })
})

let token
describe('when proper auth token is sent with request', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await api
      .post('/api/users')
      .send({ username: 'luser', name: 'Ulle Dulle', password: 'salas' })

      const response = await api
      .post('/api/login')
      .send({ username: 'luser', password: 'salas' })
      .expect(200)

      token = response.body.token
  })

  test('a valid blog can be added ', async () => {

    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'www.lol.pl',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog2)
      .expect(400)
  })

  test('a blog can be deleted', async () => {

    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'www.lol.pl',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1)
    const blogToDelete = blogsAtStart.find( blog => blog.url === 'www.lol.pl')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const identifiers = blogsAtEnd.map(b => b.id)
    expect(identifiers).not.toContain(blogToDelete.id)
  })

  test('a specific blog can be modified', async () => {

    const newBlog = {
      title: 'async/await simplifies making async calls',
      url: 'www.lol.pl',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()

    const blogToMod = blogsAtStart.find( blog => blog.url === 'www.lol.pl')
    const oldUrl = blogToMod.url

    const blogWithMods = {
      author: blogToMod.author,
      title: blogToMod.title,
      url: 'New and unique url that cant be found from existing DB',
      likes: 1337
    }
    await api
      .put(`/api/blogs/${blogToMod.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(blogWithMods)

    const blogsAtEnd = await helper.blogsInDb()
    const urls = blogsAtEnd.map(blog => blog.url)

    expect(urls).toContain(blogWithMods.url)
    expect(urls).not.toContain(oldUrl)
  })
})
afterAll(() => {
  mongoose.connection.close()
})