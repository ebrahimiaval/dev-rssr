import React from 'react';


export default function (props) {
    const
        {helmet} = props,
        htmlAttrs = helmet.htmlAttributes.toComponent(),
        bodyAttrs = helmet.bodyAttributes.toComponent();

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
                <div id="app-root">__renderedApp__</div>
                <script>
                    window.UPDATED_REDUX_STATES = __UPDATED_REDUX_STATES__
                </script>
                <script src={`/dist/client.js?v=${process.env.VERSION}`}></script>
            </body>
        </html>
    );
}