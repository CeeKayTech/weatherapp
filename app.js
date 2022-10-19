const button = document.querySelector("button")

let weather = {
	API_KEY: "453cee7fed0e5bb7d0f8894b6135723c",
	fetchWeather: function (city) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.API_KEY
		)
			.then(res => res.json())
			.then(data => this.showDataWeather(data))
			.catch(err => alert("Wrong City, Please Enter City Name"));
	},
	search: function () {
		this.fetchWeather(document.querySelector(".searchbar").value);
	},
	showDataWeather: function (data) {
		// const { name } = data;
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp,pressure,humidity,temp_max,temp_min, } = data.main;
		const { speed } = data.wind;
		const { timezone } = data.timezone;
		const { country,sunrise,sunset} = data.sys;
		console.log(data);
		document.querySelector(".imgcon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".pressure").innerText = pressure + "hPa";
		document.querySelector(".tempmessage").innerText = description;
		document.querySelector(".temp").innerText =  temp+"℃";
		document.querySelector(".max").innerText = "Max: "+ temp_max+"°";
		document.querySelector(".min").innerText = "Min: "+ temp_min+"°";
		document.querySelector(".wind").innerText = speed + "km/h";
		document.querySelector(".humidity").innerText = humidity + "%";
		document.querySelector(".country").innerText = country;
		document.querySelector(".city").innerText = name+ ",";
		let x = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('HH:mm A')
		let y = moment.utc(sunset, 'X').add(timezone, 'seconds').format('HH:mm A')
		document.querySelector(".rise").innerHTML = (x);
		document.querySelector(".set").innerHTML = (y);
	}
};

button.addEventListener("click", function (){
	weather.search();
})

document.querySelector(".searchbar").addEventListener("keyup", function (event){
	if(event.key == "Enter") {
		weather.search();
	}
});


