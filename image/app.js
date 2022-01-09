var datatables = require('datatables');
var express = require('express');
var fs = require('fs');
var path = require('path');

var port = 8081;

function log (level, msg) {
    let now = new Date();
    console.log(now.toISOString().replace('T', ' ') + ' ' + level + ' ' + msg);
}

var app = express();

app.get('/', function(req, res) {
    log("INFO", req.method + ' ' + req.url);
    res.redirect('/index.html')
});

app.get('/*.html', (req, res) => {
    log("INFO", req.method + ' ' + req.url);
    const options = {
        headers: {
            'Content-Type': 'text/html'
        }
    }
    res.sendFile(path.join(__dirname, req.url.replace('/', '')), options);
});

app.get('/*.css', (req, res) => {
    log("INFO", req.method + ' ' + req.url);
    const options = {
        headers: {
            'Content-Type': 'text/css'
        }
    }
    res.sendFile(path.join(__dirname, req.url.replace('/', '')), options);
});

app.get('/*.csv', (req, res) => {
    log("INFO", req.method + ' ' + req.url);
    const options = {
        headers: {
            'Content-Type': 'text/csv'
        }
    }
    res.sendFile(req.url, options);
});

app.get('/*.jpg', (req, res) => {
    log("INFO", req.method + ' ' + req.url);
    const options = {
        headers: {
            'Content-Type': 'image/jpeg'
        }
    }
    res.sendFile(path.join(__dirname, req.url.replace('/', '')), options);
});

app.get('/*.js', (req, res) => {
    log("INFO", req.method + ' ' + req.url);
    const options = {
        headers: {
            'Content-Type': 'application/javascript'
        }
    }
    res.sendFile(path.join(__dirname, req.url.replace('/', '')), options);
});

app.get('/*.png', (req, res) => {
    log("INFO", req.method + ' ' + req.url);
    const options = {
        headers: {
            'Content-Type': 'image/png'
        }
    }
    res.sendFile(path.join(__dirname, req.url.replace('/', '')), options);
});

app.listen(port, () => {
    log("INFO", 'server listening on port ' + port);
})
