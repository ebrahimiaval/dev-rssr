import React, {Component} from 'react';
import {connect} from "trim-redux";
import {regexp} from "../../../../setup/constant";
import {formValidation} from "../../../../setup/utility/formValidation";
import {axios} from "../../../../setup/utility/axios";
import {api} from "../../../../setup/api";
import {route} from "../../../../setup/route";
import {toast} from "react-toastify";


class ForgetPasswordForm extends Component {

    state = {
        isLoading: false,
        email: ''
    }

    submitForgetPassword = (e) => {
        if (!formValidation(e))
            return false;

        const {email} = this.state;

        this.setState({isLoading: true});

         axios({
             url: api.forgetPassword,
             data: {
                 "email": email,
                 // server most be add token number to end of url and redirect to it
                 "callback": window.location.origin + route.resetPassword('')
             },
             method: 'POST'
         })
         //--------------------------------------------------
             .done(() => {
                 // close the modal when launched from  modal
                 this.props.closeModal();

                 toast.error(`برای بازیابی بر روی لینک ارسال شده به ایمیل "${email}" کلیک نمایید.`);
             })
             //--------------------------------------------------
             .fail((e) => {
                 if (e.status === 400)
                     toast.error('User does not have this email.');
                 else
                     toast.error('User does not have this email.');
             });
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