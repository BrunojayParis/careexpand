import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../features/patients/patientSlice";
import "./Form.css";

export default function Form() {
  const dispatch = useDispatch();

  //generate id
  const setId = () => {
    return "_" + Math.random().toString(36).substring(2);
  };

  //patients state
  const [patients, setPatients] = useState({
    name: "",
    diagnostic: "",
    birthdate: "",
    genre: "",
    status: "",
    lastModified: new Date().toISOString().split("T")[0],
  });

  //handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatients({ ...patients, [name]: value });
  };

  //submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = setId();

    //post request
    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...patients }),
    })
      .then((res) => res.json())
      //update redux state
      .then(() => dispatch(addPatient({ id, ...patients })))//
      .catch((error) => console.log("Error:", error));

    //reset form
    setPatients({
      name: "",
      diagnostic: "",
      birthdate: "",
      genre: "",
      status: "",
      lastModified: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-diagnostic">
          <input
            value={patients.name}
            type="text"
            className="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            value={patients.diagnostic}
            type="text"
            className="diagnostic"
            name="diagnostic"
            placeholder="Diagnostic"
            onChange={handleChange}
            required
          />
        </div>
        <div className="date-genre-status-button">
          <div className="date-genre-status">
            <input
              type="date"
              className="date"
              name="birthdate"
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required
            />
            <select
              className="genre"
              name="genre"
              onChange={handleChange}
              value={patients.genre}
              required
            >
              <option value="">Genre</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              className="status"
              name="status"
              onChange={handleChange}
              value={patients.status}
              required
            >
              <option value="">Status</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
            </select>
            <input type="date" name="lastModified" id="" value={new Date().toISOString().split("T")[0]} onChange={handleChange} hidden/>
          </div>
          <button className="add-button" type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
