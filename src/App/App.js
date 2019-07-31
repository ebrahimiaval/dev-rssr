import React, {Component, Fragment} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
// action
import {firstSetup} from "./commonAction/authentication";
// config
import Router from "./commonComponent/Router/Router";
// component
// import SignInModal from "./_component/Auth/SignInModal";
// import SignUpModal from "./_component/Auth/SignUpModal";
import Menu from "./Menu/Menu";
// app style
import "./app.scss";



class App extends Component {

    componentDidMount() {
        document.getElementById('app-loading').style.display = 'none';

        // user Authentication, get cart, set theme and more.
        firstSetup();
    }

    render() {
        // var x = '';
        // x.map(function () {
        //
        // });
        return (
            <Fragment>
                <div id="app-loading"></div>
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
