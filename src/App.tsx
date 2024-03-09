import "./App.css";
import { Patient } from "./types";
import { fetchData } from "./fetchData";
import { Suspense } from "react";

import Nav from "./components/Nav";
import Form from "./components/Form";

const apiData = fetchData("http://localhost:3000/patients");

function App() {
  const data = apiData.read();
  return (
    <main className="container">
      <Nav />
      <Form />
      
        <ul>
        <Suspense fallback={<div>Loading...</div>}>
          {data?.map((patient: Patient) => (
            <li key={patient.id}>
              <h2>{patient.name}</h2>
              <p>{patient.genre}</p>
              <p>{patient.status}</p>
              <p>{patient.diagnostic}</p>
            </li>
          ))}
          </Suspense>
        </ul>
      
    </main>
  );
}

export default App;
