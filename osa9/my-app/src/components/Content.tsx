interface contentProps {
  courseParts: Array< {name: string, exerciseCount: number} >
}
const Content = ( props: contentProps ) =>  {
  return (
    <div>
      {props.courseParts.map(
        part =>
          <div key = {part.name}>
            <p>
              {part.name} {part.exerciseCount}
            </p>
          </div>
      )}
    </div>
  );
}

export default Content