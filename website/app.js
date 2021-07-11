/* Global Variables */
const apiKey = "31c72989e923f5a48e357d3edaf94f5c"
const button = document.getElementById("generate")


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

button.onclick =   function(){
    console.log("pressed");
grapTemp()
}


async function grapTemp(){
    const zipCode = document.getElementById('zip').value
    const baseUrl =   `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=31c72989e923f5a48e357d3edaf94f5c&units=metric`;
  //first action which fethc the url of openweather with the value of the zip code input to grap temp.
    fetchUrl(baseUrl,zipCode).then((res)=>{
        const temp = res;
        console.log(temp)})
 
}
const fetchUrl = async (url,zip)=>{

    const res = await fetch(url)
    try {
      const data = await res.json();
      const temp = data.main.temp
      //console.log(temp,data)
      return temp;
    }  catch(error) {
    console.error();;
    }
  }



