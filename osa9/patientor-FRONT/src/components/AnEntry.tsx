import React from "react";
import { Entry } from "../types";

const AnEntry = ({entry}:{entry: Entry}) => {


    return (
        <div>
            {entry.date} <b>{entry.description}</b><br/> 
            {entry.diagnosisCodes ? `diagnosis codes: ${entry.diagnosisCodes.toString()}`  : null}
            <br/>
        </div>
    );
};
export default AnEntry;