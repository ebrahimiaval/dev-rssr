import React, {Component} from 'react';
import "./signIn.scss";
import ForgetPasswordForm from "./ForgetPasswordForm";
import SignInForm from "./SignInForm";


class SignIn extends Component {
    state = {
        showSignInForm: true
    }

    toggleView = (showSignInForm) => this.setState({showSignInForm: showSignInForm})

    render() {
        return (
            this.state.showSignInForm ?
                <SignInForm showForgetPasswordForm={() => this.toggleView(false)}/>
                :
                <ForgetPasswordForm showSignInForm={() => this.toggleView(true)}/>
        )
    }
}

export default SignIn;
