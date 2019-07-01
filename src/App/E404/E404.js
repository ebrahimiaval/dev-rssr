import React, {Component} from 'react';
import {Helmet} from "react-helmet";
// style
import "./e404.scss";



class E404 extends Component {
    render() {
        return (
            <div id="e404" className="container-fluid mb-3">
                <Helmet title="متاسفانه صفحه مورد نظر یافت نشد!"/>
                <div className="row">
                    <div className="limited-col pt-10 text-center">
                        <h1>متاسفانه صفحه مورد نظر پیدا نشد!</h1>
                        <img className="mt-10" src="/asset/img/error-404.png" alt="page not found"/>
                    </div>
                </div>
            </div>
        );
    }
}




export default E404;
