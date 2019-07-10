import React from 'react';
import serialize from "serialize-javascript";


export default function (props) {
    const
        {helmet, renderedApp, updatedState, fetchedData} = props,
        htmlAttrs = helmet.htmlAttributes.toComponent(),
        bodyAttrs = helmet.bodyAttributes.toComponent();

    // transfer setched data to client
    let dataHolder = `
        RSSR_FETCHED_DATA = ${serialize(fetchedData)};
        RSSR_UPDATED_REDUX_STATES = ${serialize(updatedState)};
    `;

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

        {/* transfer redux updated states (contain fetched data from API) */}
        <script dangerouslySetInnerHTML={{__html: dataHolder}}/>

        <script src={`/dist/client.js?v=${process.env.VERSION}`}></script>
        </body>
        </html>
    );
}