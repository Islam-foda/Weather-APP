/* Global Variables */
const apiKey = "31c72989e923f5a48e357d3edaf94f5c"
const button = document.getElementById("generate")


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//snipit from MDN
var options = { weekday: 'long'};
let dayInLetter = new Intl.DateTimeFormat('en-US',options).format(new Date());



button.onclick =  function(){
  console.log("pressed");
  grapTemp().then(async(res)=>{
    const feeling = document.getElementById("feelings").value;
     await fetch('/savedata',{
       method: "POST",
       credentials: "same-origin",
       headers:{"content-type":"application/json"},
       body:JSON.stringify({
         date: newDate,
         temp : res,
         content: feeling
       })
     })
     const serverResponse = await fetch('/send')
     let lastResult = await serverResponse.json()
     console.log(lastResult);
     //snipit from w3school
     let circle = "o";
     let dg = circle.sup()
   document.querySelector("#date").innerHTML = `Today is: ${dayInLetter}, ${lastResult.date}`
   document.querySelector("#temp").innerHTML = `Today Temperature In Celesuis Is: ${lastResult.temp}${dg}`
   document.querySelector("#content").innerHTML = `I see that You're ${lastResult.content}`
  
    console.log(res)})
}

async function grapTemp(){
  const zipCode = document.getElementById("zip").value;
  if (!zipCode) {
    alert("please Enter Zip code");
    return;
  }
  const baseUrl =   `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const res = await fetch(baseUrl)
    const allData =await res.json()
    const temp = allData.main.temp
     //console.log(temp);
  return temp
}

