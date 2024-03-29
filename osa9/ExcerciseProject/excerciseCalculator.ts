export interface ExcerciseValues {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
  }
export interface ExcerciseParameters {
    hours: Array<number>,
    target: number,
  }
export const parseValues = (args: Array<string>): ExcerciseParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) throw new Error('Provided target value was not number!');
  const target = Number(args[2]);
  const hourStrings: Array<string> = args.splice(3);
  const hours: Array<number> = hourStrings.map(n => Number(n));
  if (hours.includes(NaN)) throw new Error('Invalid arguments');
  return {
    hours,
    target
  };
};

export const calculateExcercises = ( { hours, target }: ExcerciseParameters ): ExcerciseValues => {

  const periodLength = hours.length;
  const trainingDays = hours.filter(d => d>0).length;
  const average = hours.reduce((a,b) => a+b, 0 )/periodLength;
  const success = average >= target;
  const rating =
        average < target-1 ? 1 :
          average > target+1 ? 3 :
            2;
  const ratingDescription =
    rating === 1 ? 'too bad' :
      rating === 2 ? 'not too bad but could be better' :
        'better';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};
try {
  console.log(calculateExcercises(parseValues(process.argv)));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}