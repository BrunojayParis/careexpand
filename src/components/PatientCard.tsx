

export default function PatientCard({ name, birthday, diagnostic, genre, last, status }: { name: string; birthday: Date; diagnostic: string, genre: string, last:Date, status: string}) {
  

  return (
    <div className="patient-container">
      <div className="patient-name-age-diagnostic">
        <div className="patient-name-age">
          <p className="patient-name">{name}</p>
          <p className="patient-age">35 years</p>
        </div>
        <p className="patient-diagnostic">{diagnostic}</p>
      </div>
      <div className="patient-genre-status-last">
        <p className="patient-genre">{genre}</p>
        <p className={status}>{status}</p>
        <p className="patient-last">4 days ago</p>
      </div>
      <button className="delete-button">DELETE</button>
    </div>
  );
}
