import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {route} from "../../../setup/route";
import {isValidUser} from "../../../setup/utility/isValidUser";
import {connect} from "trim-redux";
import {signingOut} from "../Auth/action/signingOut";


const Menu = props => {
    const {detail, updated} = props.localUser;
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
                        {
                            updated ? (
                                    isValidUser() ?
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={() => window.confirm('می‌خواهید خارج شوید؟') ? signingOut() : ''}>
                                                <span>سلام </span>{detail.firstName}
                                            </a>
                                        </li>
                                        :
                                        <Fragment>
                                            <li className="nav-item">
                                                <a className="nav-link" data-notify="signin-modal">ورود</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-notify="signup-modal">ثبت نام</a>
                                            </li>
                                        </Fragment>
                                )
                                :
                                (
                                    <li className="nav-item">
                                        <div className="nav-link">در حال اعتبار سنجی ...</div>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default connect(s => ({localUser: s.localUser}))(Menu);