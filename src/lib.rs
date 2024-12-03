use tokio::sync::oneshot;
// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::spawn_local;
use std::{sync::mpsc, time::Duration};
use reqwest;
use serde::Deserialize;
use std::thread;

#[wasm_bindgen]
#[no_mangle]
pub async extern fn get_url(locan: String, API: String) -> String {

    console_error_panic_hook::set_once();

    let (tx, rx) = oneshot::channel::<String>();
    spawn_local(async move {
        // tx.send("Hello".to_string()).unwrap();

                let api_key = API;
                let url = format!(
                    "http://api.weatherapi.com/v1/current.json?key={}&q={}&aqi=no",
                    api_key, locan);
            
        tx.send(url.to_string()).unwrap_throw();
    });

    rx.await.unwrap()

}

pub async fn process(url_passed: String) -> Result<WeatherData, reqwest::Error> {
    
    let url = url_passed;

    let response = reqwest::get(&url).await?.json::<WeatherData>().await?;
    Ok(response)
}


#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(v: String);
}

#[wasm_bindgen]
#[no_mangle]
pub async extern fn get_weather_name(location: String) -> String {

    console_error_panic_hook::set_once();

    let (tx, rx) = oneshot::channel::<String>();
    spawn_local(async move {
        // tx.send("Hello".to_string()).unwrap();
        let res = || async move {

            let fut = process(location).await;

            let weather = match fut {
                
                Ok(res) => res,
                Err(e) => return format!("Error: {e}"),
            };

            //let nam = "name".to_string();

            let a: WeatherData = weather;
            let weather_name: String = a.name;
            weather_name.to_string()
        };

        tx.send(res().await).unwrap_throw();
    });

    rx.await.unwrap()

}

#[derive(Debug, Deserialize)]
pub struct WeatherData {
    name: String,
    main: Main,
    weather: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct Main{
    temp: f32,
    feels_like: f32,
}


#[derive(Debug, Deserialize)]
struct Weather {
    description: String,
}
