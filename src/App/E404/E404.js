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
                    <div className="col-12 text-center">
                        <h4 className="py-5">متاسفانه صفحه مورد نظر پیدا نشد!</h4>
                        <img src="/asset/img/error-404.png" alt="page not found" width="300"/>
                    </div>
                </div>
            </div>
        );
    }
}




export default E404;
