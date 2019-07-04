import React from 'react';

export default (props) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <title>خطای پردازش</title>
                <style>{`
                    body {padding:15px; background-color: #cccccc; font-family:Tahoma; line-height: 30px;}
                    .wrap, .log {background-color:#ffffff; padding:15px; border-radius:2px;}
                    .log {font-family:Consolas; font-size:13px; overflow:auto;}
                    h2 {margin:0;}
                `}
                </style>
            </head>
            <body>
                <div className="wrap" dir="rtl">
                    <h2>خطای پردازش</h2>
                    <p>
                        در طول پردازش خطایی رخ داده است. لطفا با پشتیبانی تماس بگیرید.
                    </p>
                </div>
                <pre className="log">
                    {props.error.message}
                    {props.error.stack}
                </pre>
            </body>
        </html>
    )
}
