import { useDispatch } from "react-redux";
import { deletePatient } from "../features/patients/patientSlice";

import "./PatientCard.css";
import { useState } from "react";

export default function PatientCard({
  id,
  name,
  birthday,
  diagnostic,
  genre,
  last,
  status,
}: {
  id: string;
  name: string;
  birthday: Date;
  diagnostic: string;
  genre: string;
  last: Date;
  status: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const [newLast, setNewLast] = useState(last);

  const dispatch = useDispatch();

  //date calculation
  const yearsCalculation = (birthday: Date) => {
    const date = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age;
  };

  const daysCalculation = (newLast: Date) => {
    const date = new Date(newLast);
    const today = new Date();
    const days = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );
    return days;
  };

  //update status handler
  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setNewStatus(newStatus);
    setNewLast(new Date());

    fetch(`http://localhost:3000/patients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus, lastModified: new Date().toISOString().split("T")[0]}),
    })
      .then((res) => res.json())
      .catch((error) => console.log("Error:", error));
  };

  //delete handler
  const handleDelete = () => {
    setIsDeleting(true);

    fetch(`http://localhost:3000/patients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      //update redux state
      .then(() => dispatch(deletePatient(id)))
      .catch((error) => console.log("Error:", error))
      .finally(() => setIsDeleting(false));
  };

  return (
    <div className="patient-container-button">
      <div className="patient-container">
        <div className="patient-name-age-diagnostic">
          <div className="patient-name-age">
            <p className="patient-name">{name}</p>
            <p>{birthday + ""}</p>
            <p className="patient-age">({yearsCalculation(birthday)} years)</p>
          </div>
          <p className="patient-diagnostic">{diagnostic}</p>
        </div>
        <div className="patient-genre-status-last">
          <p className="patient-last">
            {daysCalculation(newLast) >= 1
              ? daysCalculation(newLast) + " days ago "
              : "Today"}
          </p>
          <p className="patient-genre">{genre}</p>
          {/* <p className={status}>{status}</p> */}
          <select
            className={newStatus}
            name="status"
            onChange={handleStatus}
            value={newStatus}
            required
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
          </select>
        </div>
      </div>
      <button
        className="delete-button"
        onClick={handleDelete}
        disabled={isDeleting}
        style={isDeleting ? { background: "gray" } : {}}
      >
        DELETE
      </button>
    </div>
  );
}

