import express from 'express';
import patientService from  '../services/patientService';
import { NewPatient } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient: NewPatient = req.body;
  const savedPatient = patientService.addPatient(newPatient);
  res.json(savedPatient);
});

export default router;