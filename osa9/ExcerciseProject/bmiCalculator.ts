export interface BmiValues {
    height: number;
    weight: number;
  }
export const parseBmiValues = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers!');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  return {
    height,
    weight
  };
};
export const calculateBmi = (values: BmiValues): string => {
  const bmi = values.weight/((values.height/100)*(values.height/100));
  console.log(bmi);
  const bmidescription =
    bmi < 16 ? 'Underweight (Severe thinness)':
      bmi < 17 ? 'Underweight (Moderate thinness':
        bmi < 18.5 ? 'Underweight (Mild thinness)':
          bmi < 25 ? 'Normal (healthy weight)':
            bmi < 30 ? 'Overweight (Pre-obese)':
              bmi < 35 ? 'Obese (Class I)':
                bmi < 40 ? 'Obese (Class II)': 'Obese (Class III)';
  return bmidescription;
};

try {
  console.log( calculateBmi( parseBmiValues(process.argv) ) );
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
