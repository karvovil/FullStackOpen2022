import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";
import { setDiagnosesList, setPatientList } from "./state/reducer";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import Apatient from "./components/Apatient";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        console.log('fetching list');
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList (patientListFromApi) );
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  React.useEffect(() => {
        console.log('fetching diagnoses');
        const req = axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        req.then(res => {
            dispatch(setDiagnosesList(res.data));
        })
        .catch(e => console.error(e));
}, []);
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id"  element={<Apatient/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
