import { NoSsnPatient, Patient } from '../types';
import patientData from '../../data/patients.json';
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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient
};