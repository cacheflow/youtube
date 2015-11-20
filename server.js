var express = require('express');
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var app = express();
var port = process.env.port || 8080;
var VideoContainer = require('./app/js/components/VideoContainer');
var fs = require('fs');
var bundleJs = fs.readFileSync('./index.html', {encoding: 'utf8'});

app.get('/', function(request, response) {
    var VideoContainerAsHtml = ReactDOMServer.renderToString(React.createElement(VideoContainer));
    response.render('index.ejs', {videoContainer: VideoContainerAsHtml});
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port);
