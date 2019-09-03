import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
// utility
import {ajax, formValidation} from "../../../../render/utility/helper/helper";
import {regexpPattern} from "../../../../render/utility/pattern";
import {api} from "../../../../render/utility/api";
import {route} from "../../../../render/utility/route";
// style
import "./forgetPassword.scss";




class ForgetPassword extends Component {

    state = {
        viewMod: 'loading', // values: form || loading || error
        newpassword: '',
        repassword: ''
    }


    componentDidMount() {
        ajax({
            name: 'submitForm',
            url: api.forgetPassword.trustToken(),
            type: 'POST',
            data: {
                token: this.props.match.params.token
            }
        })
        //--------------------------------------------------
            .done(() => {
                this.setState({viewMod: 'form'});
            })
            .fail((xhr, textStatus, text) => {
                if (text !== 'abort') {
                    console.log(xhr.status);

                    if (xhr.status === 404)
                        this.setState({viewMod: 'error'});
                    else
                        toast.error('request failed! chack internet connection.');
                }
            });
    }




    submitForm(e) {
        if (!formValidation(e))
            return false;

        const
            {newpassword} = this.state,
            {token} = this.props.match.params,
            request = {
                password: newpassword,
                token: token
            };

        ajax({
            name: 'submitForm',
            url: api.forgetPassword.resetPassword(),
            type: 'POST',
            data: request
        })
        //--------------------------------------------------
            .done(() => {
                toast.success('password successfully changed.');
                this.props.history.replace(route.home);
            })
            .fail((xhr, textStatus, text) => {
                if (text !== 'abort') {
                    toast.error('request failed! chack internet connection.');
                }
            });

    }


    render() {
        const {newpassword, repassword, viewMod} = this.state;

        return (
            <div id="frg" className="container-fluid pt-3 mt-5 mb-8">
                <div className="row px-3">
                    <div className="limited-row">
                        <div className="forget-password-wrap col-lg-18 offset-lg-3">
                            <h3>Submit New Password</h3>

                            {
                                (viewMod === 'form') ? (
                                    <div className="row">
                                        <div className="col-lhl-8    col-xl-9    col-lg-11   col-lmd-14     col-sm-16 col-24">
                                            <form ref={form => this.$form = $(form)}
                                                  onSubmit={this.submitForm.bind(this)}
                                                  noValidate>

                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input name="newPassword"
                                                           className="form-control"
                                                           type='password'
                                                           pattern={regexpPattern.password}
                                                           value={newpassword}
                                                           onChange={(e) => this.setState({newpassword: e.target.value})}
                                                           required/>
                                                    <div className="invalid-feedback">رمز عبور باید حداقل 8 کاراکتر باشد.</div>
                                                </div>

                                                <div className="form-group">
                                                    <label>Verify password</label>
                                                    <input name="renewPassword"
                                                           className="form-control"
                                                           type='password'
                                                           pattern={`^${newpassword}$`}
                                                           value={repassword}
                                                           onChange={(e) => this.setState({repassword: e.target.value})}
                                                           required/>
                                                    <div className="invalid-feedback">تکرار رمز عبور باید مشابه رمز عبور باشد.</div>
                                                </div>

                                                <button className="btn btn-primary mt-4" type="submit">Submit</button>
                                            </form>
                                        </div>
                                        <div className="auth-bg-image    col-lhl-16    col-xl-15   col-lg-13   col-lmd-8    col-sm-8 d-sm-block    d-none"></div>
                                    </div>
                                ) : (
                                    viewMod === 'loading' ? (
                                        <strong className="loading-effect">checking token. please wait ...</strong>
                                    ) : (
                                        <strong>invalid token!</strong>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ForgetPassword);
