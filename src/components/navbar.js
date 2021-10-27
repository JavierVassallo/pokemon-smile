import {
    Link
  } from "react-router-dom";
  import 'bootstrap/dist/css/bootstrap.min.css'
export default function Nav() {
    return(
        <nav className="navbar navbar-expand-lg">
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/">Lista Pokemones</Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        </ul>
      </nav>
    )
}