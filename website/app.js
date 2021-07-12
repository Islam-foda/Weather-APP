/* Global Variables */
const apiKey = "31c72989e923f5a48e357d3edaf94f5c"
const button = document.getElementById("generate")


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//snipit from MDN
//get the day as a string not a number
var options = { weekday: 'long'};
let dayInLetter = new Intl.DateTimeFormat('en-US',options).format(new Date());



button.onclick =  function(){//after clicking it will make as follow
  //console.log("pressed");
  //calling async function grapTemp 
  grapTemp()

  //=================== 2- async function(save the data to an endpoint in the server)=========================//
  .then(async(res)=>{// res is the temp we returned from graptemp function
    const feeling = document.getElementById("feelings").value;
    //fetch our data in a defiend endpoint route with post method
    await fetch('/savedata',{
       method: "POST",// we make post request 
       credentials: "same-origin",
       headers:{"content-type":"application/json"},
       //data will be included in the body, will be saved in an object (projectdata)
       body:JSON.stringify({
         date: newDate,
         temp : res,//  :) our happy result
         content: feeling
       })
     })

     //==================3- asynch function(get back the data from our endpoint in the server)=======================//
     const serverResponse = await fetch('/send')// it's a get request no need to any other parameters
     let lastResult = await serverResponse.json()// save and convert the returned data to an json object
     console.log(lastResult);
     
     //==================4- Update Ui (easy part)========================//
     //snipit from w3school
     let circle = "o";
     let dg = circle.sup()
   document.querySelector("#date").innerHTML = `Today is: ${dayInLetter}, ${lastResult.date}`;
   document.querySelector("#temp").innerHTML = `Today Temperature In Celesuis Is: ${lastResult.temp}${dg}`;
   document.querySelector("#content").innerHTML = `I see that You're ${lastResult.content}`;
  
    //console.log(res)})
})}
//================= 1- asynch Function (fetch the data from openweather) ============================//
// to fetch the Data from openWeather Website, and extract the (temp) from it which we will use later.//

async function grapTemp(){
  const zipCode = document.getElementById("zip").value;//select the textarea 
  if (!zipCode) {//if condition to make sure user input a value in the zip code field.
    alert("please Enter a Zip code");
    return;
  }
  const baseUrl =   `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const res = await fetch(baseUrl)//fetch the data from the openweather, after input the zip code.
    const allData =await res.json() //return the Data in a json opject format to be readable.
    const temp = allData.main.temp //assign a variable to target Data (temperature).
     //console.log(temp);
  return temp; //return the temp as we'll use it for the next step
}
