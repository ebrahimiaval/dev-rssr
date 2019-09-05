import React, {Component} from 'react';
import {connect} from "trim-redux";
import {regexp} from "../../../../setup/constant";
import {formValidation} from "../../../../setup/utility/formValidation";


class ForgetPasswordForm extends Component {

    state = {
        isLoading: false,
        email: ''
    }

    submitForgetPassword = (e) => {
        if (!formValidation(e))
            return false;

        // const {email} = this.state;
        // loading
        this.setState({isLoading: true});

        /* ajax({
             name: 'submitForgetPassword',
             url: api.forgetPassword.sendEmail(),
             data: {
                 "email": email,
                 "callback": window.location.origin + route.forgetPassword('') // NOTICE: server most be add token number to end of url
             },
             method: 'POST',
             complete: () => this.setState({isLoading: false}) // remove loading
         })
         //--------------------------------------------------
             .done(() => {
                 this.setState({
                     message:
                         'The recovery link was sent to the "'
                         + email
                         + '". go to mail box and click on link.'
                 });

                 // close the modal when launched from Notify modal
                 setTimeout(() => {
                     const {notify} = this.props;
                     if (isSet(notify))
                         notify.$modal.modal('hide');
                 }, 15000);
             })
             //--------------------------------------------------
             .fail((xhr, textStatus, text) => {
                 if (text !== 'abort' && xhr.status === 400)
                     toast.error('User does not have this email.');
             });*/
    }

    render() {
        const
            {localUser, showSignInForm} = this.props,
            {isLoading, email} = this.state;

        return (
            <form className="forget-password-form"
                  onSubmit={this.submitForgetPassword}
                  noValidate>
                <div className="d-flex justify-content-between pb-3">
                    <h5>بازیابی رمز عبور</h5>
                    <a className="signin-toggle" onClick={() => showSignInForm()}>بازگشت</a>
                </div>
                <div className="form-group">
                    <label>ایمیل خود را وارد نمایید:</label>
                    <input type="text"
                           className="form-control ltr-value"
                           name="forgetpassword"
                           pattern={regexp.email}
                           value={email}
                           onChange={(e) => this.setState({email: e.target.value})}
                           required/>
                    <div className="invalid-feedback">this value is invaild!</div>
                </div>
                <button className={`btn btn-block ${(isLoading || !localUser.updated) ? 'loading-effect' : 'btn-primary'} `}
                        disabled={isLoading || !localUser.updated}
                        type="submit">
                    بازیابی
                </button>
            </form>
        )
    }
}

export default connect(s => ({localUser: s.localUser}))(ForgetPasswordForm);