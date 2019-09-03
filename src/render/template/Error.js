import React, {Fragment} from 'react';
import "./error.scss";


export default (props) => {
    return (
        <Fragment>
            <div className="wrap" dir="rtl">
                <h2>خطای پردازش</h2>
                <p>متاسفانه در طول پردازش خطایی رخ داده است، در صورت امکان به صفحه قبل بازگردید و با پشتیبانی تماس بگیرید.</p>
            </div>
            <div className="message">
                {props.error.message}
            </div>
            <pre className="log">
                    {props.error.stack}
            </pre>
        </Fragment>
    )
}
