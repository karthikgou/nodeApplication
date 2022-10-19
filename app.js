const express = require('express')
//Loads the handlebars module
const handlebars = require('express-handlebars');
const router = express.Router()
const app = express()

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars.engine({
layoutsDir: __dirname + '/views/layout',
//new configuration parameter
extname: 'hbs',
partialsDir: __dirname + '/views/partials/'
}));
app.use(express.static('public/'))

const wiki = require("./Controllers/singleCellAnalysis.js");


app.use('/', wiki);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on port 3000')
})

module.exports = router;