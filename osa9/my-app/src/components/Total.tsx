const Total = ( {courseParts}: { courseParts: Array<{name: string, exerciseCount: number}> } ) => {
  return(
    <div>
      Number of exercises{" "}
      {courseParts.reduce( (total, part) => part.exerciseCount + total, 0 )}
    </div>
  )
} 
export default Total