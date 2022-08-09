import { Gender, NewPatient, NoSsnPatient, Patient, Entry, NewEntry } from '../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEntry = (entry: any): Entry => {

  const acceptedTypes = ['Hospital','OccupationalHealthcare','HealthCheck'];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if(!entry || typeof entry.type !== 'string' || !acceptedTypes.includes(entry.type) ){
    throw new Error('shit entry');
  }else{

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entry;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePatient = (patient: any):Patient => {

  if(!patient.entries){
    patient.entries = [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const parsedEntries: Entry[] = patient.entries.map((e: Entry) => validateEntry(e));
  patient.entries = parsedEntries;
  if(!patient.gender
  || typeof patient.gender !== 'string'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  || !Object.values(Gender).includes(patient.gender)){
    patient.gender = Gender.Other;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return patient;
};
const patients: Patient[] = patientData.map(p => validatePatient(p) );

const getPatients = (): NoSsnPatient[] => {
  return patients.map(p => validatePatient(p) )
    .map(
      ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
      })
    );
};
const getOnePatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  return validatePatient(patient);
};
const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();
  const patientToSave: Patient = { ...newPatient, id };
  patients.push(patientToSave);
  return patientToSave;
};


const validateNewEntry = (newEntry: NewEntry): Entry => {
  if(!newEntry.description || !newEntry.date || !newEntry.specialist){
    throw new Error('shit entry');
  }
  if(!newEntry || typeof newEntry.type !== 'string'
  || !['Hospital','OccupationalHealthcare','HealthCheck'].includes(newEntry.type) ){
    throw new Error('shit entry type');
  }
  switch (newEntry.type) {
  case 'Hospital':
    if(!newEntry.discharge){throw new Error('shit Hospital entry');}
    break;
  case 'OccupationalHealthcare':
    if(!newEntry.employerName){throw new Error('shit Occupational entry');}
    break;
  case 'HealthCheck':
    if(!newEntry.healthCheckRating){throw new Error('shit Healthcheck entry');}
    break;
  default:
    throw new Error('shit entry');
  }
  const entryId: string = uuid();
  const entry:Entry = { ...newEntry, id: entryId };
  return entry;
};
const addEntry = (id: string, newEntry: NewEntry): Entry => {

  const entryToSave: Entry = validateNewEntry(newEntry);
  const patient = patients.find( p => p.id === id);
  if(patient){
    patient.entries.push(entryToSave);
  }
  return entryToSave;
};

export default {
  getPatients,
  getOnePatient,
  addPatient,
  addEntry
};