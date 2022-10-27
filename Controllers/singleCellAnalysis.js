const express = require('express');
const router = express.Router();
const showdown   = require('showdown');
const fs = require('fs');

converter = new showdown.Converter();
//converter.setFlavor('github');

router.get("/", function(req, res, next) {
    res.render('mainLayout', {layout : 'index', landingPage: true});
//    res.render('landingPage', {layout : 'index'});
});

router.get("/:fileName", function(req, res, next) {

    fs.readFile(__dirname + '/' + req.params.fileName + '.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var text = data;
      html = converter.makeHtml(text);
      res.render('mainLayout', {layout: 'index', contentText: html});
    });
});

module.exports = router