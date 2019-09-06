import React from 'react';
import {Helmet} from "react-helmet";
import Error404 from "../../Error404/Error404";
import {browserHistory} from "../../../setup/browserHistory";


// use data error of axios ::3::
const DefaultErrors = (props) => {
    const {status, code} = props.data;

    if (status === 404)
        return <Error404/>;

    return (
        <div id="derr" className="container-fluid mb-3">
            <Helmet title={`خطای ${status}`}/>
            <div className="row">
                <div className="col-12 text-center">
                    <h4 className="py-5">خطای {status}</h4>
                    <button className="btn btn-secondary ml-3 mt-4" onClick={() => browserHistory.goBack()}>
                        <i className="fa fa-angle-right font-weight-bold ml-1"></i>
                        {
                            code ? 'code: ' + code : ''
                        }
                        بازگشت
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DefaultErrors;