import React, {Component} from 'react';
import {toast} from "react-toastify";
import {formValidation} from "../../../../setup/utility/formValidation";
import {axios} from "../../../../setup/utility/axios";
import {api} from "../../../../setup/api";
import {isSet} from "../../../../setup/utility/checkSet";
import {signingIn} from "../action/signingIn";
import {regexp} from "../../../../setup/constant";
import {random} from "../../../../setup/utility/random";
import {connect} from "trim-redux";

class SignInForm extends Component {
    state = {
        isLoading: false,
        userName: '',
        rememberMe: true,
        password: '',
    }





    submitSignIn = (e) => {
        if (!formValidation(e))
            return false;

        const {userName, password, rememberMe} = this.state;

        this.setState({isLoading: true});

        axios({
            url: api.signin,
            method: 'POST',
            data: {email: userName, password: password}
        })
            .then((response) => {
                // close the modal when launched from Notify modal
                if (isSet(this.props.notify))
                    this.props.notify.$modal.modal('hide');

                // set token to localStorage if remember me checked and get user details
                signingIn(response.data.token, rememberMe);
            })
            .catch(() => {
                this.setState({isLoading: false});
                toast.error('نام کاربری یا رمز عبور اشتباه است!');
            });
    }





    render() {
        const
            {localUser, showForgetPasswordForm} = this.props,
            {isLoading, userName, password, rememberMe} = this.state,
            readmeId = "remmber-me-" + random(1000); // fix confilict in Parallel use

        return (
            <form className="signin-form"
                  onSubmit={this.submitSignIn}
                  noValidate>

                {/*------ username ------*/}
                <div className="form-group">
                    <label>نام کاربری</label>
                    <input type="text"
                           className="form-control ltr-value"
                           name="username"
                           value={userName}
                           onChange={(e) => this.setState({userName: e.target.value})}
                        // required
                    />
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
                        // required
                    />
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

                    <a onClick={() => showForgetPasswordForm()}>
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
        );
    }
}

export default connect(s => ({localUser: s.localUser}))(SignInForm);