import { Diagnosis } from '../types';
import diagnoseData from '../../data/diagnoses.json';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getDiagnoses = () => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};