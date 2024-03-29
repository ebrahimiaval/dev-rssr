import React, {Component} from 'react';
import Notify from "../Notify/Notify";
import SignIn from "./SignIn/SignIn";

class SignInModal extends Component {
    render() {
        return (
            <Notify id="signin-modal" title="ورود به حساب کاربری" className="auth-modal">
                {
                    //we pass SignIn component as a function
                    // because dont need run this component when modal is not open!
                    (notifySelf) => <SignIn notify={notifySelf}/>
                }
            </Notify>
        );
    }
}

export default SignInModal;
