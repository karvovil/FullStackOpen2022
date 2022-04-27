import { useState, useEffect } from 'react'
import axios from 'axios'

const Content = ({countries, filter, buttonHandler}) => {
  let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase() ))

  if (filteredCountries.length > 10){
    return <p>Too many countries</p> 
  }else if (filteredCountries.length > 1){
    console.log(filteredCountries)
    return <Countries countries={filteredCountries} buttonHandler ={buttonHandler}/>
  }else if (filteredCountries.length === 1){
    return <Country country ={filteredCountries[0]}/>
  }
}
const Countries = ({ countries, buttonHandler }) => countries.map(country =>
    <li key={country.name.common}>
      {country.name.common} 
      <button onClick={()=>buttonHandler(country.name.common)}>show</button>
    </li> 
)

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

const Weather = ({lat, lon}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${"efe70099c6f470afe64760b376f00078"}`)
      .then(response => {
        console.log("weather fullfilled");
        console.log(response);
        setWeather(response.data)
      })
  }, [])
    const icon = weather ? weather.weather[0].icon : null
  return(
    <div>
      <p>Temperature: {weather ? weather.main.temp : null}</p>
      <img  src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon"/>
      <p>Wind: {weather ? weather.wind.speed : null}</p>

    </div>
    )
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