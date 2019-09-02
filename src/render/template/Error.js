import React from 'react';

export default (props) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <title>خطای پردازش</title>
                <style>{`
                    body {padding:15px; font-family:Tahoma; line-height: 30px;}
                    .wrap { padding:15px }
                    .message {margin-top:15px; background-color:#FFE1E1; border-radius:5px; padding:15px;}
                    .log {font-family:Consolas; font-size:11px; overflow:auto;}
                    h2 {margin:0;}
                `}
                </style>
            </head>
            <body>
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
            </body>
        </html>
    )
}
