// let weather = {
// 	state: "rain",
// 	TemperatureCelcius: 18,
// 	humidity: 0,
// 	time: 0,
// 	timestate: "noon",
// 	season: "winter",
// };

// let backgroundImages = {
// 	normal: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
// 	sunSetRise: ["sunrise1", "sunrise2", "sunrise3", "sunrise4"],
// 	night: ["night1", "night2", "night3"],
// 	rain: ["rain1", "rain2", "rain3"],
// 	Thunder: ["Thunder1"],
// };

// console.log(backgroundImages);

// function changebackgroundImage() {
// 	let backgroundImageUrl = { start: "../images/omg/", ending: ".jpg" };
// 	let random;
// 	let ImmageUrl;
// 	if (weather.state == "rain") {
// 		random = Math.floor(Math.random() * 1);

// 		ImageuUrl = backgroundImageUrl.start.concat(
// 			backgroundImages.rain[random],
// 			backgroundImageUrl.ending
// 		);
// 		console.log(ImageuUrl);

// 		document.getElementById("container").style.backgroundImage =
// 			'url("../images/omg/p5.jpg")';
// 	}
// 	return;
// }

// changebackgroundImage();
let tempList = [
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
];
let humList = [
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
];
// Skapar 2 listor med 24 platser som sedan kommer att bytas ut till den timmens medeltemperatur

let noZeroTemp = tempList;
let noZeroHum = humList;

function TempButtonFunction(obj) {
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
	// tar bort klassen active från den knapp som har den, och lägger till det på den knapp som blev klickad
	Convertion(obj);
	console.log(currentTemp);
}

function toggleArd(obj) {
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
	let id = obj.id;
	console.log(id);

	switch (id) {
		case "1":
			displayedArduino = 0;
			break;
		case "2":
			displayedArduino = 1;
			break;
		case "3":
			displayedArduino = 2;
			break;
		case "4":
			displayedArduino = 4;
			break;
	}

	firebase.database().ref("updater").set({
		val: displayedArduino,
	});
}

function Convertion(obj) {
	let temperature = document.getElementById("temp");
	if (obj.id == "F") {
		let farenheitTemp = Math.round((currentTemp * 1.8 + 32) * 10) / 10;
		temperature.innerHTML = `${farenheitTemp}°F`;
		myChart.update();
		// Omvandlar temperaturen i celcius till farenheit med 1 decimal
	} else if (obj.id == "C") {
		temperature.innerHTML = `${currentTemp}°C`;
		// Byter tillbaka temperaturen till vad det står på databasen
	}
}

function changeActive2(obj) {
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

let maxY = 100;

const ctx = document.getElementById("graph").getContext("2d");
const myChart = new Chart(ctx, {
	type: "line",
	data: {
		labels: [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
		],
		datasets: [
			{
				label: "Temperatur °C",
				data: tempList,
				backgroundColor: ["rgba(0, 91, 150, 0.4)"],
				borderColor: ["rgba(0, 91, 150, 0.4)"],
				borderWidth: 4,
				yAxisID: "y",
			},
			{
				label: "Luftfuktighet %",
				data: humList,
				backgroundColor: ["rgba(255, 0, 0, 0.4)"],
				borderColor: ["rgba(255, 0, 0, 0.4)"],
				borderWidth: 4,
				yAxisID: "procent",
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
				max: 30,
				position: "left",
				type: "linear",
				ticks: {
					callback: function (value, index, values) {
						return `${value} °C`;
					},
				},
			},
			procent: {
				beginAtZero: true,
				max: 100,
				position: "right",
				type: "linear",
				grid: {
					drawOnChartArea: false,
				},
				ticks: {
					callback: function (value, index, values) {
						return `${value} %`;
					},
				},
			},
		},
	},
});
