// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
let port = process.env.PORT || 2000;
app.listen(port,running)
function running(){console.log('Server Running on port',port);};

//add get route to send pack the data included in the projectData object
app.get("/send",(req,res)=>{
    res.status(200).send(projectData)
})

//post route to save the data sent with post request from the app
app.post("/savedata",saveData)

function saveData(req,res){
    projectData = req.body;
    res.end();
}
