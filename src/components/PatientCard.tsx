import { useDispatch } from "react-redux";
import { deletePatient } from "../features/patients/patientSlice";

export default function PatientCard({ id, name, birthday, diagnostic, genre, last, status }: { id:string, name: string; birthday: Date; diagnostic: string, genre: string, last:Date, status: string}) {

  const dispatch = useDispatch();

  //date calculation
  const yearsCalculation = (birthday: Date) => {
    const date = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age;
  }

  const daysCalculation = (last: Date) => {
    const date = new Date(last);
    const today = new Date();
    const days = Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  //delete handler
  const handleDelete = () => {

    //update redux state
    dispatch(deletePatient(id));

    fetch(`http://localhost:3000/patients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log("Error:", error));
  }
  

  return (
    <div className="patient-container">
      <div className="patient-name-age-diagnostic">
        <div className="patient-name-age">
          <p className="patient-name">{name}</p>
          <p className="patient-age">{yearsCalculation(birthday)} years</p>
        </div>
        <p className="patient-diagnostic">{diagnostic}</p>
      </div>
      <div className="patient-genre-status-last">
        <p className="patient-genre">{genre}</p>
        <p className={status}>{status}</p>
        <p className="patient-last">{daysCalculation(last) > 1 ? daysCalculation(last) + "days ago " : "Today"}</p>
      </div>
      <button className="delete-button" onClick={handleDelete}>DELETE</button>
    </div>
  );
}
