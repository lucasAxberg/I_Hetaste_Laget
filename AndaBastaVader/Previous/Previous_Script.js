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
// Skapar 2 listor med 24 platser som kommer att fyllas med den timmens medelvärde

const ctx = document.getElementById("myCanvas").getContext("2d");
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

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const firebaseConfig = {
	apiKey: "AIzaSyBWy9aiEcXbiuDK3gOnQ_4VWkc84OpoJXk",

	authDomain: "i-hetaste-lagret.firebaseapp.com",

	databaseURL:
		"https://i-hetaste-lagret-default-rtdb.europe-west1.firebasedatabase.app",

	projectId: "i-hetaste-lagret",

	storageBucket: "i-hetaste-lagret.appspot.com",

	messagingSenderId: "608237085804",

	appId: "1:608237085804:web:216a3403321d1c36db6449",
};

let dayToShow = 0;
let data;
let currentTemp;
let currentHum;
let ArduinoList = ["Arduino3", "Arduino5", "Arduino1", "Arduino2", "Arduino4"];
let displayedArduino = 0;

firebase.initializeApp(firebaseConfig);

let dataBase = firebase.database().ref();
dataBase.on("value", (snapshot) => {
	// Koden körs varje gång databasen updaterar sig

	let dataObj = snapshot.val();

	// Tar ut datan från databasen från den valda arduinon som ett objekt

	data = dataObj[ArduinoList[displayedArduino]];
	// Väljer vilken arduino som datan ska läsas in från

	currentTemp = data["current"]["temp"];
	currentHum = data["current"]["hum"];
	// Tar de senaste värderna från databasen från den valda arduinon

	let d = new Date();
	let currentMonth = months[d.getMonth()];
	let currentDay = d.getDate();
	let currentHour = d.getHours();
	// Tar reda på vilken månad, dag och timme det är

	let allDays = Object.keys(data["saved"][currentMonth]);
	let usableDays = [];
	if (allDays.length - 1 > 0) {
		if (allDays.length - 1 > 7) {
			for (let i = allDays.length - 8; i < allDays.length - 1; i++) {
				usableDays.push(allDays[i]);
				// Lägger till de 7 senaste dagarna i en array
			}
		} else {
			for (let i = 0; i < 7; i++) {
				if (i < allDays.length - 1) {
					usableDays.push(allDays[i]);
				} else {
					usableDays.push(null);
				}
				// Lägger till alla dagar som finns förutom den senaste + null på de platser det inte finns något på för att visa vad som inte ska synas
			}
		}
	}

	for (let i = 0; i < usableDays.length; i++) {
		if (usableDays[i] != null) {
			// Kollar om det finns något eller är null
			document.getElementById(i).innerHTML = `${currentMonth} ${usableDays[i]}`;
			if (document.getElementById(i).classList.contains("hidden")) {
				document.getElementById(i).classList.remove("hidden");
			}
			// Updaterar texten på knapparna
		} else {
			document.getElementById(i).classList.add("hidden");
		}
	}

	let todaysData = data["saved"][currentMonth][usableDays[dayToShow]];
	console.log(todaysData);
	//   tar ut datan från den valda dagen

	let Hours = Object.keys(todaysData);
	let finishedHours = Hours.length - 1;
	// variabeln finishedHours är en int på hur många timmar som är färdigmätta

	let todaysDataKeys = Object.keys(todaysData);

	for (let i = 0; i < finishedHours; i++) {
		let tempSum = 0;
		let humSum = 0;
		// Skapar 2 variabler som ska innehålla summan av varje timmes värderna

		let hourKeys = Object.keys(todaysData[todaysDataKeys[i]]);
		for (let j = 0; j < hourKeys.length; j++) {
			let hour = todaysDataKeys[i];
			let minute = hourKeys[j];
			tempSum += todaysData[hour][minute]["temp"];
			humSum += todaysData[hour][minute]["hum"];
		}
		// Loopar igenom all data under en timme och adderar ihop allt i tempSum och humSum

		tempList[todaysDataKeys[i]] =
			Math.round((tempSum / hourKeys.length) * 10) / 10;
		humList[todaysDataKeys[i]] =
			Math.round((humSum / hourKeys.length) * 10) / 10;
		// Ränkar ut medelvärdet till en decimal av de avslutade timmarna och lägger till de på rätt plats i listan
	}
	myChart.update();
	// Updaterar grafen med de nya värderna
});

function openMenu() {
	document.getElementById("sideMenu").classList.toggle("toTheSide");
	document.getElementById("stripe1").classList.toggle("change-stripe1");
	document.getElementById("stripe2").classList.toggle("change-stripe2");
	document.getElementById("stripe3").classList.toggle("change-stripe3");
}
// Visar menyn och justerar menubuttons utseende

function changeDay(obj) {
	toggleActiveDay(obj);
	let dayIndex = obj.id;
	dayToShow = dayIndex;
	//   Ändrar vilken dag som ska läsas in

	for (let i = 0; i < tempList.length; i++) {
		tempList[i] = null;
	}
	for (let i = 0; i < humList.length; i++) {
		humList[i] = null;
	}
	//   Rensar listorna

	firebase.database().ref("updater").set({
		val: dayIndex,
	});
}

function toggleActive(obj) {
	let parent = obj.parentElement;
	let child = parent.children;
	for (let i = 0; i < child.length; i++) {
		if (child[i].classList.contains("active")) {
			if (child[i] == obj) {
				return;
			}
			child[i].classList.remove("active");
		}
	}
	let id = obj.id;
	obj.classList.add("active");
	// Tar bort klassen active från den som hade den tidigare och ger den till den som blev klickad på

	switch (id) {
		case "11":
			displayedArduino = 0;
			break;
		case "12":
			displayedArduino = 1;
			break;
		case "13":
			displayedArduino = 2;
			break;
		case "14":
			displayedArduino = 4;
			break;
	}
	// Byter vilken arduino som datan ska läsas från

	for (let i = 0; i < tempList.length; i++) {
		tempList[i] = null;
	}
	for (let i = 0; i < humList.length; i++) {
		humList[i] = null;
	}
	//   Rensar listorna

	firebase.database().ref("updater").set({
		val: displayedArduino,
	});

	let hidden = true;
	let currentActive = document.getElementsByClassName("activeDay")[0];
	console.log(currentActive);
	console.log(currentActive.id);

	currentActive.classList.remove("activeDay");
	let Id = currentActive.id;
	console.log(document.getElementById(Id).classList.contains("hidden"));
	while (hidden) {
		if (document.getElementById(Id).classList.contains("hidden")) {
			Id = Id - 1;
			continue;
		} else {
			dayToShow = Id;
			console.log(dayToShow);
			document.getElementById(Id).classList.add("activeDay");
			hidden = false;
			firebase.database().ref("updater").set({
				val: dayToShow,
			});
		}
	}

	switch (id) {
		case "11":
			displayedArduino = 0;
			break;
		case "12":
			displayedArduino = 1;
			break;
		case "13":
			displayedArduino = 2;
			break;
		case "14":
			displayedArduino = 4;
			break;
	}
	// Byter vilken arduino som datan ska läsas från

	for (let i = 0; i < tempList.length; i++) {
		tempList[i] = null;
	}
	for (let i = 0; i < humList.length; i++) {
		humList[i] = null;
	}
	//   Rensar listorna

	firebase.database().ref("updater").set({
		val: displayedArduino,
	});
	// Updaterar ett värde på databasen för att läsa in det senaste värdet
}

function toggleActiveDay(obj) {
	let parent = obj.parentElement;
	let child = parent.children;
	for (let i = 0; i < child.length; i++) {
		if (child[i].classList.contains("activeDay")) {
			if (child[i] == obj) {
				return;
			}
			child[i].classList.remove("activeDay");
		}
	}
	obj.classList.add("activeDay");
}
//

// funktion som ändrar backrund beroende på vilken årstid det är
function dateBackGround() { 
	let date = new Date(); 

 console.log("hej") 
  let month =  date.getMonth() + 1; 


	if (month == 12 || month <= 3) {
		document.querySelector(".container").style.backgroundImage = "url('../images/seasons/winter.png')";
	}
	else if (month == 4 || month ==5  ) {
		document.querySelector(".container").style.backgroundImage = "url('../images/seasons/spring.png')";
	}
	else if (month >= 6 && month <=9 ) {
		document.querySelector(".container").style.backgroundImage = "url('../images/seasons/summer.png')";
	}
	else if (month == 10 || month == 11) {
    document.querySelector(".container").style.backgroundImage = "url('../images/seasons/fall.png')";
	}
  } 
  dateBackGround(); 

