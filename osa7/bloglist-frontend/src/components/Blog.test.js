import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author but nothing else', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Manfred Mann',
    url: 'www.url.com',
    user: '2'
  }

  const { container } = render(<Blog blog={blog} />)
  screen.debug()
  const div1 = container.querySelector('.blogLess')
  const div2 = container.querySelector('.blogMore')
  expect(div2).not.toBeDefined
  expect(div1).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div1).toHaveTextContent('Manfred Mann')
  expect(container).not.toHaveTextContent('www.url.com')
  expect(container).not.toHaveTextContent('likes')

})
test('clicking the show button shows url and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Manfred Mann',
    url: 'www.url.com',
    user: '2'
  }
  const { container } = render(<Blog blog={blog} />)
  screen.debug()
  const user = userEvent.setup()
  const showButton = screen.getByText('Show')
  await user.click(showButton)
  expect(container).toHaveTextContent('www.url.com')
  expect(container).toHaveTextContent('likes')
})
test('clicking like button fires handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Manfred Mann',
    url: 'www.url.com',
    user: '2'
  }
  const likeMockHandler = jest.fn()
  render(<Blog blog={blog} likeHandler={likeMockHandler}/>)
  screen.debug()
  const user = userEvent.setup()
  const showButton = screen.getByText('Show')
  await user.click(showButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeMockHandler.mock.calls).toHaveLength(2)
})