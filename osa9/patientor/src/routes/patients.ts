import express from 'express';
import patientService from  '../services/patientService';
import { NewPatient, NewEntry } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});
router.get('/:id', (req, res) => {
  res.send(patientService.getOnePatient(req.params.id));
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient: NewPatient = req.body;
  const savedPatient = patientService.addPatient(newPatient);
  res.json(savedPatient);
});
router.post('/:id/entries', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry: NewEntry = req.body;
  try {
    const savedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(savedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
});

export default router;