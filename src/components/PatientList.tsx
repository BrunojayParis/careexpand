import { Patient } from "../types";
import PatientCard from "./PatientCard";

export default function PatientList({ data }: { data: Patient[] }) {
  return (
    <ul className="patient-list-container">
      {data?.map((patient: Patient) => (
        <li key={patient.id}>
            <PatientCard
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
