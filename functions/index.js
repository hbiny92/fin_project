import * as fs from "node/fs";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const jsdom = require('jsdom');
const fs = require('fs');
const jquery = fs.readFileSync('jquery.js','utf-8');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
var symbol = 'SAMSUNG'
jsdom.env({
    url: `http://finance.yahoo.com/q/hp?s=${symbol}`,
    src: [jquery],
    done: (err, window) => {
        var $ = window.$;
        var json = []
        $('.yfnc_datamodoutline1 table tbody')
            .children()
            .each(function(index) {
                    if (index === 0) return
                    if (!$(this).children().eq(1).text()) return
                    var data = {
                        date: $(this).children().eq(0).text(),
                        open: $(this).children().eq(1).text(),
                        high: $(this).children().eq(2).text(),
                        low: $(this).children().eq(3).text(),
                        close: $(this).children().eq(4).text(),
                        volume: $(this).children().eq(5).text(),
                    }
                    json.push(data)
                }
            );
        saveToFile(symbol, json)
    }
})


function saveToFile(name, data) {
    fs.writeFile(`${name}.json`, JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

