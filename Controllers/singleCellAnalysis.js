const express = require('express');
const router = express.Router();
const showdown   = require('showdown');
const fs = require('fs');

converter = new showdown.Converter();
converter.setFlavor('github');


router.get('/', (req, res) => {
  res.render('mainLayout', {layout : 'index', manualMode: true});
});

router.get("/convert", function(req, res, next) {

    fs.readFile(__dirname + '/README.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var text = data;
      html = converter.makeHtml(text);
      res.render('mainLayout', {layout: 'index', contentText: html});
    });

//    res.render("./views/mdToHtml.hbs", contentText);
//res.render('mainLayout', {layout : 'index'}, function (err, html) {
//  res.send(html)
//})

//res.render(html, {layout : 'index'});
});

module.exports = router