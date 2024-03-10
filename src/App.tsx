import "./App.css";
import { Patient } from "./types";
import { fetchData } from "./fetchData";
import { Suspense } from "react";
import { useDispatch } from "react-redux";

import Nav from "./components/Nav";
import Form from "./components/Form";
import PatientList from "./components/PatientList";
import { initializePatients } from "./features/patients/patientSlice";

const apiData = fetchData("http://localhost:3000/patients");

function App() {
  
  const dispatch = useDispatch();

  const data: Patient[] = apiData.read();
  dispatch(initializePatients(data));

  return (
    <main className="container">
      <Nav />
      <Form />
      <Suspense fallback={<p>Loading...</p>}>
        <PatientList />
      </Suspense>
    </main>
  );
}

export default App;
