import { Gender, NewPatient, NoSsnPatient, Patient } from '../types';
import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsePatient = (patient: any):Patient => {

  if(!patient.entries){
    patient.entries = [];
  }
  if(!patient.gender
    || typeof patient.gender !== 'string'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    || !Object.values(Gender).includes(patient.gender)){
    patient.gender = Gender.Other;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return patient;
};
const patients: Patient[] = patientData.map(p => parsePatient(p) );

const getPatients = (): NoSsnPatient[] => {
  return patients.map(p => parsePatient(p) )
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
  return parsePatient(patient);
};
const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();
  const patientToSave: Patient = { ...newPatient, id };

  patients.push(patientToSave);
  return patientToSave;
};

export default {
  getPatients,
  getOnePatient,
  addPatient
};