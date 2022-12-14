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
	if (document.getElementById("F").classList.contains("active")) {
		document.getElementById("F").classList.remove("active");
		document.getElementById("C").classList.add("active");
	}

	for (let i = 0; i < tempList.length; i++) {
		tempList[i] = null;
	}
	for (let i = 0; i < humList.length; i++) {
		humList[i] = null;
	}
	myChart.update();
	// Rensar listorna och tömmer grafen

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
	// Tar bort klassen active från den knapp som har den och lägger till den på den som blev clickad på

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
	// Väljer vilken arduino som datan ska läsas in från

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
// Skapar grafen

function dateBackGround() {
	let date = new Date();

	let month = date.getMonth() + 1;
	document.querySelector(".totalContainer").style.backgroundImage =
		"url('../images/seasons/winter.png')";

	if (month == 12 || month <= 3) {
		document.querySelector(".totalContainer").style.backgroundImage =
			"url('../images/seasons/winter.png')";
	} else if (month == 4 || month == 5) {
		document.querySelector(".totalContainer").style.backgroundImage =
			"url('../images/seasons/spring.png')";
	} else if (month >= 6 && month <= 9) {
		document.querySelector(".totalContainer").style.backgroundImage =
			"url('../images/seasons/summer.png')";
	} else if (month == 10 || month == 11) {
		document.querySelector(".totalContainer").style.backgroundImage =
			"url('../images/seasons/fall.png')";
	} else {
		alert("error to large number");
	}
}
dateBackGround();
