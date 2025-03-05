import init, { get_weather_name, get_url } from './pkg/hot_or_not_3.js';

await init();

async function run() {
  await init();
  const weathers = get_weather_name("London");
  console.log("hi");
  console.log(String(weathers.name));
  console.log(weathers.region);
  let API = prompt("ENTER API KEY FOR WEATHER API (WeatherApi.com)");
  let cicity = prompt("Enter city to see temperature");
  const url = await get_url(cicity, API);
  console.log(url);


  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
  }
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(url),
  };

  console.log(response);


  await fetch(String(url)) 
    .then((response) => response.json()) 
    .then((city) => {
      console.log(city);
      let ci = city.current.temp_c; 
      var z = document.createElement("h1");
      z.setAttribute("id", "placeholder");
      document.body.appendChild(z);
      document.getElementById("placeholder").textContent = ci + "° C";
      document.getElementById("test").textContent = cicity;

      var feelsLike = document.createElement("h2");
      feelsLike.setAttribute("id", "feelsLikeText");
      document.getElementById("feels-div").appendChild(feelsLike);
      document.getElementById("feelsLikeText").textContent = city.current.feelslike_c + "° C";

      document.getElementById("feels").textContent = "Feels Like";

      let day = "night";
      if(city.current.is_day == 0){
        day = "night";
      }
      else{
        day = "day";
      }

      let uv = "";
      if(city.current.uv < 100 && city.current.uv > 10.9){
        uv = ". This is EXTREME and YOU WOULD BE A FOOL TO NOT WEAR SUN PROTECTION.";
      }
      else if (city.current.uv < 10.9 && city.current.uv > 7.9){
        uv = ". This is very high and you should absolutely wear sun protection.";
      }
      else if (city.current.uv < 7.9 && city.current.uv > 5.9){
        uv = ". This is high and you should definitely wear sun protection.";
      }
      else if (city.current.uv < 5.9 && city.current.uv > 2.9){

        uv = ". This is moderate and you should wear sun protection.";
      }
      else if (city.current.uv < 2.9){
        
        uv = ". This is low and you probably don't need any sun protection.";
      }
      else{
        uv = "??. I can't work out the uv index right now."
      }


      var long = document.createElement("h2");
      long.setAttribute("id", "longText");
      document.getElementById("feels-div").appendChild(long);
      document.getElementById("longText").textContent = "It is " + day + "time and the humidity is " + city.current.humidity + "%. The UV index is " + city.current.uv + uv;
      })
    .then((temp) => {
    }
    );

  var z = document.createElement("h1");
  z.setAttribute("id", "placeholder");
  document.body.appendChild(z);

  var feels = document.createElement("h2");
  feels.setAttribute("id", "feels");
  document.getElementById("feels-div").appendChild(feels);
  document.getElementById("feels").textContent = "Feels like";

  async function doSomething() {
    let result = await get_weather_name("London");
    console.log(result);
    return result;
  }

  const address = get_weather_name("London")
    .then((response) => get_weather_name("London"))
    .then((user) => {
      return user.name;
    });

  const printAddress = async () => {
    const a = await address;
    console.log(a);
  };

  function readMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Display more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Display less"; 
      moreText.style.display = "inline";
    }
  }

  printAddress();

}
run();
