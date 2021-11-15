import React from "react"
import {Link} from "react-router-dom"
import 'bootstrap'
class Navbar extends React.Component{
    // Logout= () =>{
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("petugas")
    //     window.location = "/login"
    // }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
                <a className="navbar-brand">
                    Lelang Online
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* menu */}
                <div id="menu" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/barang" className="nav-link">
                                Barang
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/lelang" className="nav-link">
                                Lelang
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/history" className="nav-link">
                                History
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;
