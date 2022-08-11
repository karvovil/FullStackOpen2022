import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';

const AnEntry = ({entry}:{entry: Entry}) => {
    const [{ diagnoses }] = useStateValue();

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const entryDetails = (entry: Entry) => {
        switch (entry.type) {
            case 'Hospital':
                return <HospitalEntryDetails discharge={entry.discharge}/>;
            case 'OccupationalHealthcare': 
                return <OccupationalHealthcareEntryDetails employerName={entry.employerName} sickLeave={entry.sickLeave}/>;
            case 'HealthCheck':
                return <HealthCheckEntryDetails healthCheckRating={entry.healthCheckRating}/>;
            default:
                return assertNever(entry);
        }
    };
    const entryIcon =
        entry.type === 'Hospital' ? <LocalHospitalIcon/>
        :entry.type === 'OccupationalHealthcare' ? <WorkIcon/> 
        :entry.type === 'HealthCheck' ? <MonitorHeartIcon/>
        :null;


    if (Object.keys(diagnoses).length === 0){
        return null;
    }
    const diagnosisList = !entry.diagnosisCodes ? null :
        <ul> 
            {entry.diagnosisCodes.map(e=>
                <li key={e}>
                    {e} {diagnoses[e].name}
                </li>)}
        </ul>;

     return (
        <div style={{
            border: '1px solid black', 
       }}>
            {entry.date}  {entryIcon}  <br/>
            <b>{entry.description}</b> <br/>
            {entryDetails(entry)}<br/>
            {diagnosisList}
            specialist: {entry.specialist}
        </div>
    );
};
export default AnEntry;