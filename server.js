const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const path = require('path')
const fs = require("fs");
const app = new express()
const formidable = require('formidable');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(fileUpload());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

//   app.post('/', function (req, res){
//     const uploadFolder = path.join(__dirname, "uploads");
//     console.log('entered endpoint')
//     var form = new formidable.IncomingForm();
//     form.uploadFolder = uploadFolder;
    

//     form.parse(req);
//     console.log('form: ', form)
//     form.on('fileBegin', function (name, file){
//         file.filepath = __dirname + '/uploads/' + file.originalFilename;
//     });

//     form.on('file', function (name, file){
//         console.log('Uploaded ' + file.originalFilename);
//         imageURL = "/uploads/"+file.originalFilename
//     });

//     res.sendFile(__dirname + '/index.html');
    
// });
app.post('/upload', (req,res) =>{
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/uploads/' + image.name);
    imageURL = 'uploads/' + image.name
    res.sendFile(__dirname + '/index.html')
})




app.listen(8080, () => console.log("server is running on port 8080"))