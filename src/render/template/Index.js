import React from 'react';
import serialize from "serialize-javascript";
import als from "async-local-storage";


export default function (props) {
    const
        {renderedApp, helmet, isError} = props,
        htmlAttrs = helmet.htmlAttributes.toComponent(),
        bodyAttrs = helmet.bodyAttributes.toComponent(),
        fetch = als.get('fetch');

    // transfer data from server to client
    let transfer = '';
    if (!isError) {
        if (fetch) {
            const updatedState = als.get('updatedState');
            transfer = 'RSSR_UPDATED_REDUX_STATES =' + serialize(updatedState);
            transfer = <script dangerouslySetInnerHTML={{__html: transfer}}/>;
        }
    } else {
        transfer = <script dangerouslySetInnerHTML={{__html: 'RSSR_PROCCESS_ERROR=true'}}/>;
    }

    return (
        <html lang="fa" {...htmlAttrs}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#c90065"/>
            <link rel="manifest" href="/manifest.json"/>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            <link rel="shortcut icon" href="/fav.ico" type="image/icon"/>
            <link rel="stylesheet" href={`/dist/styles.css?v=${process.env.VERSION}`}/>
        </head>
        <body className="rtl" {...bodyAttrs}>
        <div id="app-root" dangerouslySetInnerHTML={{__html: renderedApp}}></div>
        {transfer}
        <script src={`/dist/client.js?v=${process.env.VERSION}`}></script>
        </body>
        </html>
    );
}