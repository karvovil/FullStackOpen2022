import { CoursePart } from "../types";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = ({part}:{part:CoursePart}) => {
  let extraInfo = "";
  switch (part.type) {
  case "groupProject":
    extraInfo =  `group project count: ${part.groupProjectCount}`
    break;
  case "normal":
    extraInfo =  `description: ${part.description}`
    break;
  case "submission":
    extraInfo = `description: ${part.description} \nexcercise submission link: ${part.exerciseSubmissionLink}`
    break;
  case "special":
    extraInfo = part.requirements.reduce(
      (total, part) => total.concat( `${part} ` ), `prerequisites: `
    )
    break;
  default:
    return assertNever(part);
  }
  const finalInfo = extraInfo.split('\n').map(str => <p key={str}>{str}</p>)
  return(            
    <div>
      <b>{part.name} {part.exerciseCount}</b> <br/>
      {finalInfo}
      <br/>
    </div>
  )
}
export default Part