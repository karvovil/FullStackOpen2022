import express from 'express';
import { parseBmiValues, calculateBmi, BmiValues } from './bmiCalculator';
import {  ExcerciseParameters, ExcerciseValues, parseValues,  calculateExcercises } from './excerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  console.log('request: ',_req);
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {

  try {
    if (!req.query.height || !req.query.weight ) throw new Error('Argument missing');
    console.log(req.query.height);
    const values: BmiValues =  parseBmiValues(['', '', String(req.query.height), String(req.query.weight)]);
    const bmiResult = calculateBmi( values );
    res.send(bmiResult);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.send(errorMessage);
  }
});
app.post('/excercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: string = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises: Array<string> = req.body.daily_exercises;

  if ( !target || !daily_exercises || daily_exercises.length === 0) {
    return res.status(400).send({ error: 'parameters missing' });
  }
  if ( isNaN(Number(target))  || !daily_exercises.every(a => !isNaN(Number(a))  )  ){
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  try {
    const parameters: ExcerciseParameters = parseValues(['','', target, ...daily_exercises]);
    const result: ExcerciseValues = calculateExcercises(parameters);
    return res.send(result);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong with excercise calculator.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});