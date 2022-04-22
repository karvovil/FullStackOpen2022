import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({ persons, filter }) => {
  let filteredPersons = persons.filter(person => person.name.includes(filter))
  return( filteredPersons.map(person => <Person key={person.name} person = {person} /> ) )
}
const Person = ({person}) => <li key={person.name}>{person.name}{person.number}</li>

const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
      filter with
      <input  value={filter} onChange={handleFilterChange}/>
    </div>
  )
}
const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
  return(
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Name')
  const [newNumber, setNewNumber] = useState('default number')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber
    }
    if(persons.map(person => person.name).includes(nameObject.name)){
      window.alert(`${nameObject.name} is already in book`)
    }else{
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
  }
}
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App