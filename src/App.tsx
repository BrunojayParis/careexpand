import "./App.css";
import { Patient } from "./types";
import { fetchData } from "./fetchData";
import { Suspense } from "react";

import Nav from "./components/Nav";
import Form from "./components/Form";
import PatientList from "./components/PatientList";

const apiData = fetchData("http://localhost:3000/patients");

function App() {
  const data: Patient[] = apiData.read();
  return (
    <main className="container">
      <Nav />
      <Form />
      <Suspense fallback={<p>Loading...</p>}>
        <PatientList data={data} />
      </Suspense>
    </main>
  );
}

export default App;
