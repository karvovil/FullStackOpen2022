import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const Apatient = () => {

    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        if(id){ 
            if (!patients[id] || !patients[id].ssn){
                const req = axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                req.then(res => {
                    dispatch({ type: "UPDATE_PATIENT", payload: res.data });
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

    return (
        <div>
            <h2>
                {patients[id].name} {genderIcon}
            </h2>
                ssn: {patients[id].ssn} <br/>
                occupation: {patients[id].occupation}
        </div>
    );
};
export default Apatient;