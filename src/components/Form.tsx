import { useState } from "react";
import { Patient } from "../types";

export default function Form() {
  //patients state
  const [patients, setPatients] = useState({
    id: (1/Math.random()).toString(),
    name: "",
    diagnostic: "",
    birthdate: new Date(),
    genre: "",
    status: "",
    lastModified: new Date(),
  } as Patient);

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
    console.log(patients);



    //post request
    fetch("http://localhost:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patients),
    })
      .then((res) => res.json())
      .catch((error) => console.log("Error:", error));
  };


  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="name-diagnostic">
          <input
            type="text"
            className="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="text"
            className="diagnostic"
            name="diagnostic"
            placeholder="Diagnostic"
            onChange={handleChange}
          />
        </div>
        <div className="date-genre-status">
          <input
            type="date"
            className="date"
            name="birthdate"
            onChange={handleChange}
          />
          <select className="genre" name="genre" onChange={handleChange}>
            <option value="">Genre</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select className="status" name="status" onChange={handleChange}>
            <option value="">Status</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
          </select>
        </div>
        <button className="add-button" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
}
