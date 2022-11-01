const express = require('express')
const bodyParser = require('body-parser');
const ms = require('ms');
const crypto = require('node:crypto')
//Loads the handlebars module
const handlebars = require('express-handlebars');
const router = express.Router()
const app = express()
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//uppy upload widget
const session = require('express-session')
const companion = require('@uppy/companion')
const multer = require('multer');

app.use(session({
    secret: 'no one knows',
    resave: true,
    saveUninitialized: true
}));
const path = require('path');
const storage = multer.diskStorage({
    destination: 'uploads/',
    fileName: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
},
});
const uploadImage = multer({ storage }).single('photo');

app.use(require('cors')({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  next()
})

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

// initialize uppy
const companionOptions = {
  providerOptions: {
    drive: {
      key: '586134598850-6cbp6nghnovlj1hlt5qvgg82p5ei7evm.apps.googleusercontent.com',
      secret: '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',
    },
    instagram: {
      key: '619293279981092',
      secret: '35fa7d240c1586e5eb94371911fd0182',
    },
    dropbox: {
      key: '2ylh7cmi8fvh3wk',
      secret: '20byyrz4usxwoxz',
    },
    box: {
      key: 'your box key',
      secret: 'your box secret',
    },
    facebook: {
      key: 'your box key',
      secret: 'your box secret',
    },
    onedrive: {
      key: 'f85bb582-efc7-4b3e-8d2b-96319b3dbd48',
      secret: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    },
    // you can also add options for additional providers here
  },
   s3: {
      getKey: (req, filename, metadata) => `${crypto.randomUUID()}-${filename}`,
      key: 'AKIAXAK6FJSJZ3PO7XXL',
      secret: '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',
      bucket: 'cluster-user-bucket',
      region: 'us-east-2',
      useAccelerateEndpoint: false, // default: false,
      expires: 3600, // default: 300 (5 minutes)
      acl: 'private', // default: none
   },
  server: {
    host: 'localhost:3020',
    protocol: 'http',
  },
  filePath: './output',
  secret: 'some-secret',
  debug: true,
}
const { app: companionApp } = companion.app(companionOptions)
app.use(companionApp)

//app.use((req, res) => {
//  return res.status(404).json({ message: 'Not Found' })
//})
//
//// handle server errors
//app.use((err, req, res) => {
//  console.error('\x1b[31m', err.stack, '\x1b[0m')
//  res.status(err.status || 500).json({ message: err.message, error: err })
//})

companion.socket(app.listen(3020))

console.log('Welcome to Companion!')
console.log(`Listening on http://0.0.0.0:${3020}`)

app.use('/', wiki);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on port 3000')
})

module.exports = router;