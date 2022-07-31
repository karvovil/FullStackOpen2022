
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const SET_BIRTHYEAR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
  }
}
`
const SetBirthyear = ({ names, show }) => {
  const [name, setName] = useState(names[0])
  const [year, setYear] = useState('')
  const [ setBirthYear ] = useMutation(SET_BIRTHYEAR)

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('set year...')
    setBirthYear({ ignoreResults: false, variables: { name, setBornTo: year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {names.map(s => <option value={s} key={s}>{s}</option>)}
          </select>
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

