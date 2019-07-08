import React, {Component, Fragment} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import {Route, Switch} from "react-router-dom";
// action
import {firstSetup} from "../action/authentication";
// config
import {routeMap} from "../../root/config/routeMap";
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
                <Switch>
                    {
                        routeMap.map((route, index) => <Route key={index} {...route} />)
                    }
                    {
                        // move scroll bar to top of page when route changed
                        // jumpScrollToTop()
                    }
                </Switch>
                <Helmet defaultTitle="React Server Side Rendering"/>
                {/*<SignInModal/>*/}
                {/*<SignUpModal/>*/}
                <ToastContainer rtl={true}/>
            </Fragment>
        )
    }
}

export default App;
