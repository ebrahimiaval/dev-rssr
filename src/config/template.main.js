const serialize = require('serialize-javascript');


export default ({markup, helmet, storeState}) => {
    return (`<!DOCTYPE html>
<html lang="fa" ${helmet.htmlAttributes.toString()}>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>    
    <meta name="theme-color" content="#c93c00"/>
    <link rel="manifest" href="/manifest.json"/>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}             
    <link rel="shortcut icon" href="/fav.ico" type="image/icon"/>
    <link rel="stylesheet" href="/dist/styles.css?v=${process.env.VERSION}"/>
</head>      

<body ${helmet.bodyAttributes.toString()} class="rtl">
   <div id="app-root">${markup}</div>    
   
   <script>
      window.__rssrـstatesــ = ${serialize(storeState)}  
   </script>    
   <script src="/dist/client.js?v=${process.env.VERSION}"></script>
</body>
</html>`);
};
