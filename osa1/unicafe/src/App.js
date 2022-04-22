import { useState } from 'react'

const Statistics = (props) => {
  let all = props.good + props.bad + props.neutral

  if (all === 0){
    return <div>no feedback given </div>
  }
  return(
    <table>
      <StatisticsLine text = "good:" value={props.good}/>
      <StatisticsLine text = "neutral:" value={props.neutral}/>
      <StatisticsLine text = "bad:" value={props.bad}/>
      <StatisticsLine text = "all:" value={all}/>
      <StatisticsLine text = "avg:" value={(props.good - props.bad)/all}/>
      <StatisticsLine text = "positive:" value={props.good*100/all} moreText=" %" />
    </table> 
  )
}
const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.moreText}</td>
    </tr>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodTo = newValue => { setGood(newValue) }
  const setNeutralTo = newValue => { setNeutral(newValue) }
  const setBadTo = newValue => { setBad(newValue) }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGoodTo(good + 1)} text="good" />
      <Button handleClick={() => setNeutralTo(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBadTo(bad + 1)} text="bad" />
      <h1>Stats</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
export default App