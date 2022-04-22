import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey= "efe70099c6f470afe64760b376f00078"
const Content = ({countries, filter, buttonHandler}) => {
  let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase() ))

  if (filteredCountries.length > 10){
    return <p>Too many countries</p> 
  }else if (filteredCountries.length > 1){
    return <Countries countries={filteredCountries} buttonHandler ={buttonHandler}/>
  }else if (filteredCountries.length === 1){
    return <Country country ={filteredCountries[0]}/>
  }
}
const Countries = ({ countries, buttonHandler }) => countries.map(country =>
  <> 
    <li key={country.name.common}>{country.name.common}</li> 
    <button onClick={()=>buttonHandler(country.name.common)}>show</button>
  </>)

const Languages = ({languages}) =>  Object.values(languages).map(value =>  <li key={value}>{value}</li> )
const Country = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1> 
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>Languages</h3> 
      <ul>
        <Languages languages={country.languages}/>
      </ul>
      <img src={country.flags.png} alt={country.flags.png}/>
      <Weather lat = {country.latlng[0]} lon = {country.latlng[1]}/>
    </div>
  )
}

const Weather = ({lat, lon})=>{
  const [w, setW] = useState({})
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${"efe70099c6f470afe64760b376f00078"}`)
      .then(response => {
        setW(response.data)
      })
  }, [])
  console.log("effect", w)
  return <p>weather: {JSON.stringify(w.main)}</p>

}
const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
      find Countries
      <input  value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  //const [clicked, setClicked] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'notes')

  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const handleClick = (countryName) => { 
    setFilter(countryName)
  }

  return (
    <div>
      <Filter value={filter} handleFilterChange={handleFilterChange}/>
      <ul>
        <Content countries={countries} filter={filter} buttonHandler={handleClick}/>
      </ul>
    </div>
  )
}

export default App