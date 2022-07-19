
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const SET_BIRTHYEAR = gql`
mutation createBook( $name: String!, $setBornTo: Int!){
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ){name}
}
`
const SetBirthyear = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')


  const [ setBirthYear ] = useMutation(SET_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()

    console.log('set year...')
    const res = setBirthYear({  variables: { name, setBornTo: year } })
    console.log(res)

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          birth year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">set year</button>
      </form>
    </div>
  )
}

export default SetBirthyear

