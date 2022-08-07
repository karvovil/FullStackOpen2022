export type Diagnose = {
    code: string,
    name: string,
    latin?: string,
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}
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
export type NewPatient = Omit<Patient, 'id'>;
