import express from 'express';
import { parseBmiValues, calculateBmi, BmiValues } from './bmiCalculator';
import { /* ExcerciseParameters, ExcerciseValues, parseValues, */ calculateExcercises } from './excerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {

  try {
    if (!req.query.height || !req.query.weight ) throw new Error('Argument missing');
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
  //const value1: ExcerciseParameters = req.body;
  console.log(req);
  const parameters = { hours:[2,3,4,5], target:2 };
  const result = calculateExcercises( parameters );

  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});