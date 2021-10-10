import React from "react";
import { Link } from 'react-router-dom'
import '../../Departments.css'

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar-dark bg-dark shadow">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <Link to="/" className="navbar-brand">Hope Health Action</Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link active">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link active">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/employees" className="nav-link active">Employees</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/maternity" className="nav-link active">Maternity</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/rehab" className="nav-link active">Rehab</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/nicu_paed" className="nav-link active">Nicu_Paed</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/communityhealth" className="nav-link active">CommunityHealth</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;