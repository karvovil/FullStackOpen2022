import { NewPatient, NoSsnPatient, Patient } from '../types';
import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';
const patients: Patient[] = patientData;

const getPatients = (): NoSsnPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender,occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );
};
const addPatient = (newPatient: NewPatient): Patient => {
  const id: string = uuid();
  const patientToSave: Patient = { ...newPatient, id };

  patients.push(patientToSave);
  return patientToSave;
};

export default {
  getPatients,
  addPatient
};