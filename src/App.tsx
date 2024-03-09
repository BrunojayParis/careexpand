import "./App.css";
import { Patient } from "./types";
import { fetchData } from "./fetchData";
import { Suspense } from "react";

import Nav from "./components/Nav";

const apiData = fetchData("http://localhost:3000/patients");

function App() {
  const data = apiData.read();
  return (
    <main className="container">
      <Nav />
      
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          {data?.map((patient: Patient) => (
            <li key={patient.id}>
              <h2>{patient.name}</h2>
              <p>{patient.genre}</p>
              <p>{patient.status}</p>
              <p>{patient.diagnostic}</p>
            </li>
          ))}
        </ul>
      </Suspense>
    </main>
  );
}

export default App;
