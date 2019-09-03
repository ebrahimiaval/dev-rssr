import React, {Component, Fragment} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import Router from "./CC/Router";
import Menu from "./component/Menu/Menu";
import "./app.scss";
import FirstLoading from "./CC/FirstLoading";
import {firstSetup} from "./CC/Auth/action/firstSetup";

// import SignInModal from "./_component/Auth/SignInModal";
// import SignUpModal from "./_component/Auth/SignUpModal";


class App extends Component {

    componentDidMount() {
        // user Authentication, get cart, set theme and more.
        firstSetup();
    }

    render() {
        // ''.map(function () {});

        return (
            <Fragment>
                <FirstLoading/>
                <Menu/>
                <Router/>
                <Helmet defaultTitle="React Server Side Rendering"/>
                {/*<SignInModal/>*/}
                {/*<SignUpModal/>*/}
                <ToastContainer rtl={true}/>
            </Fragment>
        )
    }
}

export default App;
