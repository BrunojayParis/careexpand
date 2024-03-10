import { Patient } from "../types";
import PatientCard from "./PatientCard";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function PatientList() {

  const data: Patient[] = useSelector((state: RootState) => state.patients);
  return (
    <ul className="patient-list-container">
      {data?.map((patient: Patient) => (
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
      ))}
    </ul>
  );
}
