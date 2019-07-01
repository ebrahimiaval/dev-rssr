import React, {Component} from 'react';
import Notify from "../Notify/Notify";
import SignUp from "./SignUp";

class SignUpModal extends Component {
    render() {
        return (
            <Notify id="signup-modal" size="lg" className="auth-modal">
                {
                    //we pass SignUp component as a function
                    // because dont need run this component when modal is not open!
                    (notifySelf) => <SignUp notify={notifySelf}/>
                }
            </Notify>
        );
    }
}

export default SignUpModal;
