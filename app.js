const express = require('express')
const bodyParser = require('body-parser');
//Loads the handlebars module
const handlebars = require('express-handlebars');
const router = express.Router()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//uppy upload widget
//const session = require('express-session')
//const companion = require('@uppy/companion')
const multer = require('multer');

//app.use(session({
//    secret: 'no one knows',
//    resave: true,
//    saveUninitialized: true
//}));
const path = require('path');
const cors = require('cors');
const storage = multer.diskStorage({
    destination: 'uploads/',
    fileName: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
},
});
const uploadImage = multer({ storage }).single('photo');

app.use(cors());

app.post('/image', uploadImage, (req,res) => {
   console.log(req.file);
   if(req.file) return res.json({msg: 'good job uploading image'});

   res.send('Image upload failed');
});



//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars.engine({
layoutsDir: __dirname + '/views/layout',
//new configuration parameter
extname: 'hbs',
defaultLayout: false,
helperDirs: __dirname+ '/public/helpers/helpers.js',
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