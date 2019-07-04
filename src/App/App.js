import React, {Component, Fragment} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import {Route, Switch} from "react-router-dom";
// component
// import SignInModal from "./_component/Auth/SignInModal";
// import SignUpModal from "./_component/Auth/SignUpModal";
// action
import {firstSetup} from "../action/authentication";
// utility
// import {jumpScrollToTop} from "../utility/jumpScrollToTop";
import {routeMap} from "../config/routeMap";
// npm styles
import 'react-toastify/dist/ReactToastify.min.css';
// App component styles and application public styles
import "./_style/style.scss";



class App extends Component {

    componentDidMount() {
        // user Authentication, get cart, set theme and more.
        firstSetup();
    }

    render() {
        return (
            <Fragment>
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
