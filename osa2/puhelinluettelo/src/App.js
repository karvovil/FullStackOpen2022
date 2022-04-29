import { useState, useEffect } from 'react'
import personService from './persons'

const Persons = ({ persons, filter, deleteHandler }) => {
  let filteredPersons = persons.filter(person => person.name.includes(filter))
  return( filteredPersons.map(person => <Person key={person.name} person={person} deleteHandler={deleteHandler}/> ) )
}
const Person = ({person, deleteHandler}) => {
  return (
    <li key={person.name}>{person.name} {person.number} 
      <DeleteButton deleteHandler={() => deleteHandler(person.id)} />
    </li>
  )
}
const DeleteButton =({deleteHandler}) => <button onClick={()=>deleteHandler()}>delete</button>
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
    personService
      .getAll()
      .then(serverPersons => {
        console.log('promise fulfilled')
        setPersons(serverPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber
    }
    if(persons.map(person => person.name).includes(nameObject.name)){
      window.alert(`${nameObject.name} is already in book`)
    }else{  
      personService
      .create(nameObject)
      .then(addedPerson => {
        console.log(addedPerson);
        setPersons(persons.concat(addedPerson))
        setNewName("")
        setNewNumber("")
      })
    }
  }
  const deleteName = (id) => {
    if (window.confirm("Delete??")) {
      personService
      .deletePerson(id)
      .then(stat => {
        console.log(stat)
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <Persons persons={persons} filter={filter} deleteHandler={deleteName}/>
    </div>
  )
}
export default App