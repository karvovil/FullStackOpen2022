const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height/100)*(height/100))
    const bmidescription =
    bmi < 16 ? 'Underweight (Severe thinness)':
    bmi < 17 ? 'Underweight (Moderate thinness':
    bmi < 18.5 ? 'Underweight (Mild thinness)':
    bmi < 25 ? 'Normal (healthy weight)':
    bmi < 30 ? 'Overweight (Pre-obese)':
    bmi < 35 ? 'Obese (Class I)':
    bmi < 40 ? 'Obese (Class II)': 'Obese (Class III)';
    return bmidescription
  }
  console.log(calculateBmi(180, 74))