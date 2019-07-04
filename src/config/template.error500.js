export default (error) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>عدم پاسخ سرور</title>
    <style>
        body {
            padding          : 15px;
            background-color : #cccccc;
            font-family      : Tahoma;
            line-height      : 30px;
        }

        .wrap, .log {
            background-color : #ffffff;
            padding          : 15px;
            border-radius    : 2px;
        }

        .log {
            font-family : Consolas;
            font-size: 13px;
            overflow: auto;
        }

        h2 {
            margin : 0;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <h2>Error 500</h2>
        <p> please, notify support!</p>
    </div>
<pre class="log">
${error.message}
${error.stack}
</pre>
</body>
</html>`)
