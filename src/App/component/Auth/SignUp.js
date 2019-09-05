import React, {Component} from 'react';
import {connect} from "trim-redux";
import {withRouter} from "react-router-dom";
import "./signUp.scss";
import {formValidation} from "../../../setup/utility/formValidation";
import {regexp} from "../../../setup/constant";



class SignUp extends Component {
    state = {
        isLoading: false,
        username: '',
        password: ''
    }

    submitSignUp = (e) => {
        if (!formValidation(e))
            return false;

        const
            {history, notify} = this.props,
            {username, password} = this.state;

        // active loading mod
        this.setState({isLoading: true});

        // ajax({
        //     name: 'submitSignUp',
        //     url: api.signup(),
        //     method: 'POST',
        //     data: {
        //         email: username,
        //         password: password,
        //         first_name: username.split('@')[0], // first section of user name
        //     }
        // })
        // //--------------------------------------------------
        //     .done((response) => {
        //         // URL signup param (for google analytics)
        //         // exp: '/faq' -> '/faq?siginup=true'
        //         history.push({
        //             ...history.location,
        //             search: (history.search === "" || !isSet(history.search)) ? '?siginup=true' : history.search + '&siginup=true'
        //         });
        //
        //         // close modal when launched from modal (Notify modal)
        //         if (isSet(notify))
        //             notify.$modal.modal('hide');
        //
        //         // set token to localStorage if remember me checked and get user details
        //         signingIn(response.token, true);
        //     })
        //     //--------------------------------------------------
        //     .fail((xhr, textStatus, text) => {
        //         if (text !== 'abort') {
        //             // remove loading mode
        //             this.setState({isLoading: false});
        //
        //             errorHandeler.e422(xhr);
        //         }
        //     });
    }


    render() {
        const
            {localUser} = this.props,
            {isLoading} = this.state;

        return (
            <div className="row mx-0">
                <div className="col-14 text-center py-3">
                    <img className="mt-2" src="/asset/img/signup.png" alt="sign in"/>
                    <div className="pt-5 px-10">
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
                    <form
                        className="signup-form"
                        onSubmit={this.submitSignUp}
                        noValidate>

                        {/*-------------------- username -----------------------*/}
                        <div className="form-group">
                            <label>ایمیل</label>
                            <input type="text"
                                   className="form-control ltr-value"
                                   aria-describedby="emailHelp"
                                   name="username"
                                   pattern={regexp.email}
                                   value={this.state.username}
                                   onChange={(e) => this.setState({username: e.target.value})}
                                   required/>
                            <div className="invalid-feedback">نام کاربری الزامی است!</div>
                        </div>

                        {/*-------------------- password -----------------------*/}
                        <div className="form-group">
                            <label>password (more than 8 characters)</label>
                            <input type="password"
                                   name="password"
                                   className="form-control ltr-value"
                                   pattern={regexp.password}
                                   value={this.state.password}
                                   onChange={(e) => this.setState({password: e.target.value})}
                                   required/>
                            <div className="invalid-feedback">پسورد باید بیش از ۸ کاراکتر باشد.</div>
                        </div>

                        {/*-------------------- submit -----------------------*/}
                        <button type="submit"
                                className={`btn btn-block mt-7 ${(isLoading) ? 'loading-effect' : 'btn-primary'} `}
                                disabled={isLoading || !localUser.updated}>
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mstp = (state) => ({
    localUser: state.localUser
})

export default withRouter(connect(mstp)(SignUp));
