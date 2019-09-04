import React, {Component} from 'react';
import {connect} from "trim-redux";
import "./signIn.scss";
import {formValidation} from "../../../setup/utility/formValidation";
import {random} from "../../../setup/utility/random";
import {regexp} from "../../../setup/constant";


class SignIn extends Component {
    state = {
        isLoading: false,
        viewType: 'signInForm', //signInForm OR forgetPassword
        message: null,
        userName: '',
        rememberMe: true,
        password: '',
        forgetEmail: ''
    }


    submitSignIn(e) {
        if (!formValidation(e))
            return false;

        // const {userName, password, rememberMe} = this.state;

        // set loading
        this.setState({isLoading: true});
        /*
                ajax({
                    name: 'submitSignIn',
                    url: api.signin(),
                    method: 'POST',
                    data: {email: userName, password: password}
                })
                //----------------------------------------------
                    .done((response) => {

                        // exist or not exist 2 step verificaton
                        if (isSet(response.token)) {
                            // close the modal when launched from Notify modal
                            if (isSet(this.props.notify))
                                this.props.notify.$modal.modal('hide');
                            // set token to localStorage if remember me checked and get user details
                            signingIn(response.token, rememberMe);
                        } else {
                            this.setState({viewType: 'twoStepVerification',isLoading: false})
                        }
                    })
                    //----------------------------------------------
                    .fail((xhr, textStatus, text) => {
                        if (text !== 'abort') {
                            // remove loading
                            this.setState({isLoading: false});

                            if (xhr.status !== 0) {
                                if (xhr.status === 401)
                                    toast.error('username or password is not currect!');

                                errorHandeler.e422(xhr);
                            } else {

                            }
                        }
                    });*/
    }


    submitForgetPassword(e) {
        if (!formValidation(e))
            return false;

        // const {forgetEmail} = this.state;
        // loading
        this.setState({isLoading: true});

        /* ajax({
             name: 'submitForgetPassword',
             url: api.forgetPassword.sendEmail(),
             data: {
                 "email": forgetEmail,
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
                         + forgetEmail
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
            {localUser} = this.props,
            {isLoading, viewType, message, userName, password, forgetEmail, rememberMe} = this.state,
            readmeId = "remmber-me-" + random(1000); // fix confilict in Parallel use

        return (
            (message === null) ?
                (
                    (viewType === "signInForm") ?
                        (//------ login form ------
                            <form className="signin-form"
                                  ref={form => this.$form = $(form)}
                                  onSubmit={this.submitSignIn.bind(this)}
                                  noValidate>

                                {/*------ username ------*/}
                                <div className="form-group">
                                    <label>نام کاربری</label>
                                    <input type="text"
                                           className="form-control ltr-value"
                                           name="username"
                                           value={userName}
                                           onChange={(e) => this.setState({userName: e.target.value})}
                                           required/>
                                    <div className="invalid-feedback">نام کاربری الزامی است!</div>
                                </div>

                                {/*------ password ------*/}
                                <div className="form-group">
                                    <label>رمز عبور</label>
                                    <input type="password"
                                           name="password"
                                           className="form-control"
                                           value={password}
                                           pattern={regexp.password}
                                           onChange={(e) => this.setState({password: e.target.value})}
                                           required/>
                                    <div className="invalid-feedback">پسورد الزامی است</div>
                                </div>

                                {/*------ remember and recover pass ------*/}
                                <div className="d-flex justify-content-between">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox"
                                               name="rememberme"
                                               className="custom-control-input"
                                               id={readmeId}
                                               checked={rememberMe}
                                               onChange={(e) => this.setState({rememberMe: e.target.checked})}
                                        />
                                        <label className="custom-control-label" htmlFor={readmeId}>مرا به خاطر بسپار</label>
                                    </div>

                                    <a onClick={() => this.setState({viewType: 'forgetPassword'})}>
                                        <span>فراموشی رمز عبور</span>
                                        <i className="icon-angle-right"></i>
                                    </a>
                                </div>

                                <button className={`btn btn-block mt-3  ${(isLoading || !localUser.updated) ? 'loading-effect' : 'btn-primary'} `}
                                        disabled={isLoading || !localUser.updated}
                                        type="submit">
                                    ورود
                                </button>
                            </form>
                        )
                        :
                        ( //------ forget password ------
                            <form className="forget-password-form"
                                  ref={form => this.$form = $(form)}
                                  onSubmit={this.submitForgetPassword.bind(this)}
                                  noValidate>
                                <div className="d-flex justify-content-between pb-3">
                                    <h5>بازیابی رمز عبور</h5>
                                    <a className="signin-toggle" onClick={() => this.setState({viewType: 'signInForm'})}>بازگشت</a>
                                </div>
                                <div className="form-group">
                                    <label>ایمیل خود را وارد نمایید:</label>
                                    <input type="text"
                                           className="form-control ltr-value"
                                           name="forgetpassword"
                                           pattern={regexp.email}
                                           value={forgetEmail}
                                           onChange={(e) => this.setState({forgetEmail: e.target.value})}
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
                )
                :
                (
                    <div>
                        {message}
                    </div>
                )
        )
    }
}

export default connect(s => ({localUser: s.localUser}))(SignIn);
