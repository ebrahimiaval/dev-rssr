import React, {Component} from 'react';
import {Link} from "react-router-dom";
// config
import {route} from "../../../setup/route";

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">RSSR</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={route.home} className="nav-link">خانه</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/404" className="nav-link">راهنما</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-notify="signin-modal">ورود</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-notify="signup-modal">ثبت نام</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Menu;