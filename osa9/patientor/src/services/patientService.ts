import { Gender, NewPatient, NoSsnPatient, Patient, Entry, NewEntry } from '../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

const acceptedEntryTypes = ['Hospital','OccupationalHealthcare','HealthCheck'];

const validateEntry = (entry: Entry): Entry => {

  if(!entry || typeof entry.type !== 'string' || !acceptedEntryTypes.includes(entry.type) ){
    throw new Error('shit entry');
  }else{
    return entry;
  }
};
const validatePatient = (patient: Patient): Patient => {

  if(!patient.entries){
    patient.entries = [];
  }
  const parsedEntries: Entry[] = patient.entries.map((e: Entry) => validateEntry(e));
  patient.entries = parsedEntries;
  if(!patient.gender
  || typeof patient.gender !== 'string'
  || !Object.values(Gender).includes(patient.gender)){
    patient.gender = Gender.Other;
  }
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
const getOnePatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if(patient){
    return validatePatient(patient);
  }
  return undefined;
};
const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();
  const patientToSave: Patient = { ...newPatient, id, entries: [] };
  patients.push(patientToSave);
  return patientToSave;
};
const validateNewEntry = (newEntry: NewEntry): boolean => {
  if(!newEntry.description || !newEntry.date || !newEntry.specialist){
    throw new Error('shit entry');
  }
  if(!newEntry || typeof newEntry.type !== 'string'
  || !acceptedEntryTypes.includes(newEntry.type) ){
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
  return true;
};
const addEntry = (patientId: string, newEntry: NewEntry): Entry | undefined => {
  try{
    if(validateNewEntry(newEntry)){
      const entryId: string = uuid();
      const entryToSave: Entry = { ...newEntry, id: entryId };
      const patient = patients.find( p => p.id === patientId);
      if(patient){
        patient.entries.push(entryToSave);
        return entryToSave;
      }
    }
  }catch(e){
    return undefined;
  }
  return undefined;
};

export default {
  getPatients,
  getOnePatient,
  addPatient,
  addEntry
};