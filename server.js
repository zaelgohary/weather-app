// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port}`);
}

// app.use((req, res, next) => {
//     next();
// })

// Get all routes
app.get('/all', sendData);
function sendData(req, res){
    res.send(projectData);
    console.log('send data done!');
}

// Post data
app.post('/addData', addData);
function addData(req, res){
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feeling = req.body.feeling;
    
    res.send();
    console.log(req.body);
}

