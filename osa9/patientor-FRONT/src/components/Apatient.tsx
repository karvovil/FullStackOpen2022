import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { updatePatient } from "../state/reducer";
import AnEntry from "./AnEntry";

const Apatient = () => {

    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        if(id){ 
            if (!patients[id] || !patients[id].ssn){
                const req = axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                req.then(res => {
                    dispatch(updatePatient(res.data));
                })
                .catch(e => console.error(e));
            }
        }
    }, []);
    
    if(!id){
        return null;
    }
    if(!patients[id]){
       return <p>loading...</p>;
    }
    
    const genderIcon = 
        patients[id].gender === 'male' ? <MaleIcon/> 
        : patients[id].gender === 'female' ? <FemaleIcon/> 
        : <TransgenderIcon/>;
    
    const ents = patients[id].entries.map(e => <AnEntry key={e.id} entry={e}/>);
    const entsHead = ents ? <h3>entries</h3> : null;

    return (
        <div>
            <h2>
                {patients[id].name} {genderIcon}
            </h2>
                ssn: {patients[id].ssn} <br/>
                occupation: {patients[id].occupation}<br/>
                {entsHead}
                {ents}
                
        </div>
    );
};
export default Apatient;