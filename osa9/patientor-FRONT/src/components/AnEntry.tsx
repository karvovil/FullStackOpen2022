import React from "react";
import { Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { setDiagnosesList } from "../state";
import { useStateValue } from "../state";


const AnEntry = ({entry}:{entry: Entry}) => {
    const [{ diagnoses }, dispatch] = useStateValue();

    React.useEffect(() => {
        if(Object.keys(diagnoses).length === 0){
            console.log('fetching diagnoses');
            const req = axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
            req.then(res => {
                dispatch(setDiagnosesList(res.data));
            })
            .catch(e => console.error(e));
        }
    }, []);

    if (Object.keys(diagnoses).length === 0){
        return null;
    }
    return (
        <div>
            {entry.date} <b>{entry.description}</b><br/> 
            <ul>
            {entry.diagnosisCodes 
            ? entry.diagnosisCodes.map(e=>
                <li key={e}>
                    {e} {diagnoses[e].name}
                </li>)
            : null}
            </ul>
            <br/>
        </div>
    );
};
export default AnEntry;