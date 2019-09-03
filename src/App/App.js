import React, {Component, Fragment} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
// action
import {firstSetup} from "./CA/auth";
// config
import Router from "./CC/Router";
// component
// import SignInModal from "./_component/Auth/SignInModal";
// import SignUpModal from "./_component/Auth/SignUpModal";
import Menu from "./Menu/Menu";
// app style
import "./app.scss";
import FirstLoading from "./CC/FirstLoading";



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
