import Part from './Part'
import { CoursePart } from "../types";
interface contentProps {
  courseParts: Array< CoursePart >
}
const Content = ( props: contentProps ) =>  {
  return (
    <div>
      {props.courseParts.map(
        part =>
          <div key = {part.name}>
            <Part part = {part} />
          </div>
      )}
    </div>
  );
}

export default Content