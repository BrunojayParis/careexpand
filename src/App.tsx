import "./App.css";

import { useDispatch } from "react-redux";
import { useFetch } from "./api/useFetch";
import { useEffect } from "react";
import { initializePatients } from "./features/patients/patientSlice";

import Nav from "./components/Nav";
import Form from "./components/Form";
import PatientList from "./components/PatientList";



function App() {
  const dispatch = useDispatch();
  const {data, loading, error } = useFetch("http://localhost:3000/patients");

  useEffect(() => {
    if (data) {
      dispatch(initializePatients(data));
    }
  }, [data, dispatch]);

  return (
    <main className="container">
      <Nav />
      <Form />
      {error && <p style={{textAlign: "center", fontWeight: "bold"}}>Error: {error}</p>}
      {loading && <p style={{textAlign: "center", fontWeight: "bold"}}>Loading...</p>}
      {data && <PatientList />}

    </main>
  );
}

export default App;
