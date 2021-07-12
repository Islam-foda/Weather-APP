/* Global Variables */
const apiKey = "31c72989e923f5a48e357d3edaf94f5c"
const button = document.getElementById("generate")


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const feeling = document.getElementById("feelings").value;




button.onclick =  function(){
  console.log("pressed");
  grapTemp().then((res)=>{
     let temp = document.querySelector("#temp")
     temp.innerHTML = res
  
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

