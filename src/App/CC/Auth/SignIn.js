import React, {Component} from 'react';
import {connect} from "trim-redux";
import {toast} from 'react-toastify';
// config
import {regexpPattern} from "../../../../render/config/regexpPattern";
import {api} from "../../../../render/config/api";
import {route} from "../../../../render/config/route";
// action
import {signingIn} from "../../action/auth";
// utility
// import {ajax} from "../../../../render/utility/fetchData";
import {isSet} from "../../../../render/utility/checkSet";
import {errorHandeler} from "../../../../render/utility/errorHandeler";
import {formValidation} from "../../../../render/utility/formValidation";
import {random} from "../../../../render/utility/random";
//style
import "./signIn.scss";


class SignIn extends Component {
    state = {
        isLoadingMod: false,
        viewType: 'signInForm', //signInForm - forgetPassword - twoStepVerification
        message: null,
        userName: '',
        rememberMe: true,
        password: '',
        forgetEmail: '',
        twoPassword: '',  // for two step verification in sign in
    }


    submitSignIn(e) {
        if (!formValidation(e))
            return false;

        const {userName, password, rememberMe} = this.state;

        // set loading
        this.setState({isLoadingMod: true});
        //
        // ajax({
        //     name: 'submitSignIn',
        //     url: api.signin(),
        //     method: 'POST',
        //     data: {email: userName, password: password}
        // })
        // //----------------------------------------------
        //     .done((response) => {
        //
        //         // exist or not exist 2 step verificaton
        //         if (isSet(response.token)) {
        //             // close the modal when launched from Notify modal
        //             if (isSet(this.props.notify))
        //                 this.props.notify.$modal.modal('hide');
        //             // set token to localStorage if remember me checked and get user details
        //             signingIn(response.token, rememberMe);
        //         } else {
        //             this.setState({viewType: 'twoStepVerification',isLoadingMod: false})
        //         }
        //     })
        //     //----------------------------------------------
        //     .fail((xhr, textStatus, text) => {
        //         if (text !== 'abort') {
        //             // remove loading
        //             this.setState({isLoadingMod: false});
        //
        //             if (xhr.status !== 0) {
        //                 if (xhr.status === 401)
        //                     toast.error('username or password is not currect!');
        //
        //                 errorHandeler.e422(xhr);
        //             } else {
        //
        //             }
        //         }
        //     });
    }


    submitForgetPassword(e) {
        const {forgetEmail} = this.state;

        if (!formValidation(e))
            return false;

        // loading
        this.setState({isLoadingMod: true});

        ajax({
            name: 'submitForgetPassword',
            url: api.forgetPassword.sendEmail(),
            data: {
                "email": forgetEmail,
                "callback": window.location.origin + route.forgetPassword('') // NOTICE: server most be add token number to end of url
            },
            method: 'POST',
            complete: () => this.setState({isLoadingMod: false}) // remove loading
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
            });
    }


    towStepVerification(e) {
        e.preventDefault();

        // set loading
        this.setState({isLoadingMod: true});
        

        const {userName, password, rememberMe, twoPassword} = this.state;
        ajax({
            name: 'submitSignIn',
            url: api.signin(),
            method: 'POST',
            data: {email: userName, password: password, code: twoPassword}
        })
        //----------------------------------------------
            .done((response) => {
                // close the modal when launched from Notify modal
                if (isSet(this.props.notify))
                    this.props.notify.$modal.modal('hide');
                // set token to localStorage if remember me checked and get user details
                signingIn(response.token, rememberMe);

            })
            //----------------------------------------------
            .fail((xhr, textStatus, text) => {
                if (text !== 'abort') {
                    // remove loading
                    this.setState({isLoadingMod: false});

                    if (xhr.status !== 0) {
                        if (xhr.status === 422)
                            toast.error('the code is invalid');

                        errorHandeler.e422(xhr);
                    } else {

                    }
                }
            });
    }


    render() {
        const
            {localUser} = this.props,
            {isLoadingMod, viewType, message, userName, password, forgetEmail, twoPassword, rememberMe} = this.state,
            //when you is in order page and launch signin-modal then have confilicate in read me checkbox
            readmeId = "remmber-me-" + random(1000);

        return (
            <div className="row mx-0">
                <div className="col-14 text-center py-3">
                    <img className="mt-2" src="/asset/img/signin.png" alt="sign in"/>

                    <div className="pt-7 px-10">
                        <div className="oauth-topic">
                            Login with:
                        </div>

                     {/*   <button className="oauth-btn btn btn-info btn-sm" onClick={() => goToOAuth('google')}>
                            <img src="/asset/img/googleLogo.png" alt="google auth"/>
                        </button>
                        <button className="oauth-btn btn btn-info btn-sm ml-3" onClick={() => goToOAuth('amazon')}>
                            <img src="/asset/img/amazonLogo.svg" alt="google auth"/>
                        </button>*/}
                    </div>
                </div>
                <div className="form-wrap col-10 pr-5 pt-4">
                    {
                        (message === null) ?
                            (
                                (viewType === "signInForm") ?
                                    (//------------ login form ------------------
                                        <form className="signin-form"
                                              ref={form => this.$form = $(form)}
                                              onSubmit={this.submitSignIn.bind(this)}
                                              noValidate>

                                            <h6>Sign In</h6>

                                            {/*-------------------- username -----------------------*/}
                                            <div className="form-group">
                                                <label>Email or Phone number</label>
                                                <input type="text"
                                                       className="form-control ltr-value"
                                                       name="username"
                                                       value={userName}
                                                       onChange={(e) => this.setState({userName: e.target.value})}
                                                       required/>
                                                <div className="invalid-feedback">this field is require!</div>
                                            </div>

                                            {/*------ password --------*/}
                                            <div className="form-group">
                                                <label>password</label>
                                                <input type="password"
                                                       name="password"
                                                       className="form-control"
                                                       value={password}
                                                       pattern={regexpPattern.password}
                                                       onChange={(e) => this.setState({password: e.target.value})}
                                                       required/>
                                                <div className="invalid-feedback">password cannot be less than 8 char!
                                                </div>
                                            </div>

                                            {/*----- remember and recover pass -----*/}
                                            <div className="subaction-wrap custom-control custom-checkbox">
                                                <input type="checkbox"
                                                       name="rememberme"
                                                       className="custom-control-input"
                                                       id={readmeId}
                                                       checked={rememberMe}
                                                       onChange={(e) => this.setState({rememberMe: e.target.checked})}
                                                />
                                                <a className="forget-password-toggle"
                                                   onClick={() => this.setState({viewType: 'forgetPassword'})}>
                                                    <span>forget password</span>
                                                    <i className="icon-angle-right"></i>
                                                </a>
                                                <label className="custom-control-label" htmlFor={readmeId}>Remember
                                                    me</label>
                                            </div>

                                            <button type="submit"
                                                    className={`btn btn-block mt-3  ${(isLoadingMod || !localUser.updated) ? 'loading-effect' : 'btn-primary'} `}
                                                    disabled={isLoadingMod || !localUser.updated}>
                                                Sign in
                                            </button>
                                        </form>
                                    )
                                    :
                                    ( //------------ forget password ------------------
                                        (viewType === "twoStepVerification") ?
                                            <form
                                                className="forget-password-form"
                                                ref={form => this.$form = $(form)}
                                                onSubmit={this.towStepVerification.bind(this)}
                                                noValidate>
                                                <h3 className="my-6">
                                                    <span>please input 2step password</span>
                                                </h3>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password"
                                                           className="form-control ltr-value"
                                                           name="towstepverification"
                                                           value={twoPassword}
                                                           onChange={(e) => this.setState({twoPassword: e.target.value})}
                                                           required/>
                                                    <div className="invalid-feedback">this value is invalid!</div>
                                                </div>
                                                <button type="submit"
                                                        className={`btn btn-block btn-primary mt-6 Z`}
                                                        disabled={isLoadingMod}
                                                >
                                                    submit
                                                </button>
                                            </form>
                                            :
                                            <form
                                                className="forget-password-form"
                                                ref={form => this.$form = $(form)}
                                                onSubmit={this.submitForgetPassword.bind(this)}
                                                noValidate>
                                                <h3 className="my-6">
                                                    <span>Remembe Password</span>
                                                    <a className="signin-toggle"
                                                       onClick={() => this.setState({viewType: 'signInForm'})}>
                                                        <span>go back</span>
                                                        <i className="icon-angle-right"></i>
                                                    </a>
                                                </h3>
                                                <div className="form-group">
                                                    <label>your account E-mail</label>
                                                    <input type="text"
                                                           className="form-control ltr-value"
                                                           name="forgetpassword"
                                                           pattern={regexpPattern.email}
                                                           value={forgetEmail}
                                                           onChange={(e) => this.setState({forgetEmail: e.target.value})}
                                                           required/>
                                                    <div className="invalid-feedback">this value is invaild!</div>
                                                </div>
                                                <button type="submit"
                                                        className={`btn btn-block mt-6 ${(isLoadingMod || !localUser.updated) ? 'loading-effect' : 'btn-primary'} `}
                                                        disabled={isLoadingMod || !localUser.updated}>
                                                    submit
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
                    }
                </div>
            </div>
        )
    }
}

const mstp = (state) => ({
    localUser: state.localUser
})


export default connect(mstp)(SignIn);
