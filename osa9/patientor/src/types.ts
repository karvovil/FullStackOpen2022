export type Diagnosis = {
    code: string,
    name: string,
    latin?: string,
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface HospitalEntry extends BaseEntry{
  type: 'Hospital'
  discharge: {
    date: string;
    criteria: string;
  }
}
interface OccupationalHealthcareEntry extends BaseEntry{
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}
interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }
export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NoSsnPatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;

type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewEntry =
| NewHospitalEntry
| NewOccupationalHealthcareEntry
| NewHealthCheckEntry;