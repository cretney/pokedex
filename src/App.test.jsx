import { waitFor } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { setupServer } from 'msw/node'
import { handlers } from '../mocks/handlers'

import App from './App'
import { store } from './store/store'

const server = setupServer(...handlers)

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})

test('Show App Component', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  await waitFor(() => {
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
  })
})

test('Click Pokemon Card', async () => {
  const user = userEvent.setup()
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  await waitFor(async () => {
    const pokemonTitle = screen.getByText('bulbasaur')
    await user.click(pokemonTitle)
    expect(screen.getByText('evolves into')).toBeInTheDocument()
  })
})