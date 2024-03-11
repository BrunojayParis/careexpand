import { Patient } from "../types";
import PatientCard from "./PatientCard";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import "./PatientList.css";

export default function PatientList() {
  const patients: Patient[] = useSelector((state: RootState) => state.patients);

  return (
    <ul className="patient-list-container">
      {patients.length === 0 ? (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          You have no patients
        </p>
      ) : (
        patients.map((patient: Patient) => (
          <li key={patient.id}>
            <PatientCard
              id={patient.id}
              name={patient.name}
              birthday={patient.birthdate}
              diagnostic={patient.diagnostic}
              genre={patient.genre}
              last={patient.lastModified}
              status={patient.status}
            />
          </li>
        ))
      )}
    </ul>
  );
}
