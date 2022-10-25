let weather = {
	state: "rain",
	TemperatureCelcius: 18,
	humidity: 0,
	time: 0,
	timestate: "noon",
	season: "winter",
};

let backgroundImages = {
	normal: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
	sunSetRise: ["sunrise1", "sunrise2", "sunrise3", "sunrise4"],
	night: ["night1", "night2", "night3"],
	rain: ["rain1", "rain2", "rain3"],
	Thunder: ["Thunder1"],
};

console.log(backgroundImages);

let TemperatureFarenheight = Math.round(weather.TemperatureCelcius * 1.8 + 32);

function changebackgroundImage() {
	let backgroundImageUrl = { start: "../images/omg/", ending: ".jpg" };
	let random;
	let ImmageUrl;
	if (weather.state == "rain") {
		random = Math.floor(Math.random() * 1);

		ImageuUrl = backgroundImageUrl.start.concat(
			backgroundImages.rain[random],
			backgroundImageUrl.ending
		);
		console.log(ImageuUrl);

		document.getElementById("container").style.backgroundImage =
			'url("../images/omg/p5.jpg")';
	}
	return;
}

changebackgroundImage();

function TempButtonFunction(obj) {
	// alert(obj.id);
	console.log(obj.id);

	const parent = obj.parentElement;
	console.log(parent);
	const child = parent.children;
	for (var i = 0; i < child.length; i++) {
		if (child[i].classList.contains("active")) {
			if (child[i] == obj) {
				return;
			}
			child[i].classList.remove("active");
		}
	}
	obj.classList.add("active");
	Convertion(obj);
}

let parent = document.getElementsByClassName("temp-button");
let buttonChildren = parent[0].children;
console.log(buttonChildren);

for (let i = 0; i < buttonChildren.length; i++) {
	if (buttonChildren[i].classList.contains("active")) {
		StartUnit = buttonChildren[i].id;
	}
}

function Convertion(obj) {
	let temperature = document.getElementById("temp");
	if (obj.id == "F") {
		if (obj.id == StartUnit) {
			temperature.innerHTML = weather.TemperatureCelcius;
			return;
		}
		temperature.innerHTML = TemperatureFarenheight;
		// Converts the temp to farenheit from celsius with 1 decimal point
	} else if (obj.id == "C") {
		if (obj.id == StartUnit) {
			temperature.innerHTML = weather.TemperatureCelcius;
			return;
		}
		temperature.innerHTML = weather.TemperatureCelcius;
		// Converts the temp to celsius from farenheit with 1 decimal point
	}
}

function changeActive2(obj) {
	// alert(obj.id);
	console.log(obj.id);

	const parent = obj.parentElement;
	console.log(parent);
	const child = parent.children;
	for (var i = 0; i < child.length; i++) {
		if (child[i].classList.contains("active")) {
			if (child[i] == obj) {
				return;
			}
			child[i].classList.remove("active");
		}
	}
	obj.classList.add("active");
}

function openMenu() {
	document.getElementById("sideMenu").classList.toggle("toTheSide");
	document.getElementById("stripe1").classList.toggle("change-stripe1");
	document.getElementById("stripe2").classList.toggle("change-stripe2");
	document.getElementById("stripe3").classList.toggle("change-stripe3");
}
