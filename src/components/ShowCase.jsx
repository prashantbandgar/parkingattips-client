export default function ShowCase() {
    return (
      <ul className="ShowCase mt-5">
        <li>
          <span className="seat" /> <small>Not Now</small>
        </li>
        <li>
          <span className="seat selected" /> <small>Vacant</small>
        </li>
        <li>
          <span className="seat occupied" /> <small>Occupied</small>
        </li>
      </ul>
    );
  }