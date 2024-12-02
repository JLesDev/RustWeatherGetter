/*// Import our outputted wasm ES6 module
// Which, export default's, an initialization function
import init from "./pkg/hello_world.js";

const runWasm = async () => {
  // Instantiate our wasm module
  const helloWorld = await init("./pkg/hello_world_bg.wasm");

  // Call the Add function export from wasm, save the result
  const addResult = helloWorld.add(24, 24);

  // Set the result onto the body
  document.body.textContent = `Hello World! addResult: ${addResult}`;
};
runWasm();
*/


// import wasmInit from "./pkg/hot_or_not_3.js";

import init, { get_weather_name, get_url } from './pkg/hot_or_not_3.js';

//import add from "pkg/exports.js";

await init();

//console.log(add(weather));

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
  //document.body.textContent = "hi";

  console.log(response);


  await fetch(String(url)) //1
    .then((response) => response.json()) //2
    .then((city) => {
      console.log(city);
      //document.body.textContent = city.current.temp_c;
      let ci = city.current.temp_c; //3
      var z = document.createElement("h1");
      z.setAttribute("id", "placeholder");
      document.body.appendChild(z);
      document.getElementById("placeholder").textContent = ci + "° C";
      document.getElementById("test").textContent = cicity;

      var feelsLike = document.createElement("h2");
      feelsLike.setAttribute("id", "feelsLikeText");
      document.getElementById("feels-div").appendChild(feelsLike);
      document.getElementById("feelsLikeText").textContent = city.current.feelslike_c + "° C";

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

      var readMoreButton = document.createElement("button");
      readMoreButton.setAttribute("id", "readMoreButt");
      document.getElementById("feels-div").appendChild(readMoreButton);
      var buttonText = document.getElementById("readMoreButt");
      buttonText.innerHTML = "Read More...";
      
      
      })
    .then((temp) => {
      //temp = temp.current.temp_c; //3
    }
    );
  //document.body.textContent = temp;

  var z = document.createElement("h1");
  z.setAttribute("id", "placeholder");
  document.body.appendChild(z);
  //document.getElementById("myHead").style.color = "light grey";
  // document.getElementById("placeholder").textContent = ci + " degrees celsius.";

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

/*
  const prom = Promise.resolve(weathers);

  prom
    .then((value) => {
      console.log(value.WeatherData.name); //This is a fulfilled promise  👈
    })
    .catch((err) => {
      console.log(err);
    });

  const promise1 = Promise.resolve(weathers);

  promise1.then((value) => {
    console.log(value.WeatherData);
    // Expected output: 123
  });
  console.log(Promise.resolve(weathers));
  console.log(decodeURIComponent(weathers));

  const promise = Promise.resolve("This is a fulfilled promise");
  */



  //big = await doSomething();

  // console.log(big);

  /*
  get_weather_name("London") //1
    .then((names) => {
      // console.log(names.WeatherData.name); //3
    });


  get_weather_name("London").then(meta => {
    console.log(meta);

  });

  (async () => {
    const meta = await get_weather_name("London");
    console.log(meta);
  })();
  return;
}
*/
}
run();

/*
const runWasm = async () => {
  // Instantiate our wasm module
  const rustWasm = await wasmInit("./pkg/hot_or_not_3_bg.wasm");

  console.log("hi");
  // Call the Add function export from wasm, save the result
  //const result = rustWasm.add(24, 24);
  let weathers = rustWasm.get_weather_name("London");
  //const weather = "Hi";
  console.log(weathers);
  //console.log(result);

  //console.log(result); // Should output '72'
  //console.log(rustWasm.ADD_CONSTANT); // Should output 'undefined'
  //console.log(rustWasm.add_integer_with_constant); // Should output 'undefined'
  document.body.textContent = "My WASM website";
  document.body.textContent = "My WASM website. It is good.";
  //document.body.textContent = weather;
  var x = document.createElement("HEADER");
  var t = document.createElement("HEADER");
  var z = document.createElement("BUTTON");
  x.setAttribute("color", "green");
  x.setAttribute("id", "myHeader");
  t.setAttribute("id", "myHeader2");
  z.setAttribute("id", "myButton");
  document.body.appendChild(x);
  document.body.appendChild(z);
  document.body.appendChild(t);
  document.getElementById("myHeader").style.color = "light grey";
  document.getElementById("myButton").style.color = "blue";
  document.getElementById("myButton").body = "Wow";
  document.getElementById("myButton").innerHTML = "This is a button";
  var button = document.getElementById("myButton");
  button.style.width = "200px";  // Set the width
  button.style.height = "100px"; // Set the height
  button.style.fontSize = "20px"; // Increase font size
  button.style.borderRadius = "40px";
  button.style.font = "Helvetica";
  button.style.backgroundColor = "lightBlue";
  let isBig = 0;
  button.onclick = function () {
    if (isBig === 0) {
      button.style.height = "200px"
      button.style.width = "400px";
      document.getElementById("myButton").innerHTML = isBig + 1;
      isBig++;
    }
    else if (isBig === 1) {
      button.style.width = "400px";
      button.style.height = "400px";
      document.getElementById("myButton").innerHTML = isBig + 1;
      isBig++;
    }
    else if (isBig === 2) {
      button.style.height = "400px";
      button.style.width = "200px";
      document.getElementById("myButton").innerHTML = isBig + 1;
      isBig++;
    }
    else if (isBig === 3) {
      button.style.width = "200px";
      button.style.height = "200px"
      document.getElementById("myButton").innerHTML = isBig + 1;
      isBig = 0;
    }
    else {
      button.style.width = "200px";
      button.style.height = "200px"
      document.getElementById("myButton").innerHTML = isBig + 1;
      isBig++;
    }
  };
  var y = document.createElement("H1");
  var o = document.createTextNode("This is a website");
  y.appendChild(o);
  document.getElementById("myHeader").appendChild(y);

};
runWasm();
*/