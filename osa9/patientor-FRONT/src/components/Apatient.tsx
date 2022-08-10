import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { HospitalEntry, Patient } from "../types";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { updatePatient } from "../state/reducer";
import AnEntry from "./AnEntry";
import { HospitalEntryFormValues } from "../AddHospitalEntryModal/AddHospitalEntryForm";
import { Button } from "@material-ui/core";
import AddHospitalEntryModal from "../AddHospitalEntryModal";

const Apatient = () => {
    
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    
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

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  
  const submitNewEntry = async (values: HospitalEntryFormValues) => {
    try {
        if(!id){throw new Error('no patient id');}
        const { data: newEntry } =
            values.type === 'Hospital' 
            ? await axios.post<HospitalEntry>(`${apiBaseUrl}/patients/${id}/entries`, values)
            : await axios.post<HospitalEntry>(`${apiBaseUrl}/patients/${id}/entries`, values);

        const updatedEntries = patients[id].entries.concat(newEntry);
        const updatedPatient = {...patients[id], entries: updatedEntries};
        dispatch(updatePatient(updatedPatient));
        closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
    
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
    
    const ents = patients[id].entries
        ? patients[id].entries.map(e => <AnEntry key={e.id} entry={e}/>)
        : null;
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
                <AddHospitalEntryModal
                    modalOpen={modalOpen}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button variant="contained" onClick={() => openModal()}>
                Add New Hospital Entry
                </Button>
        </div>
    );
};
export default Apatient;