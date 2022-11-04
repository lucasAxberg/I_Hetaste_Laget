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
	console.log(dataObj);
	// Tar ut datan från databasen från den valda arduinon som ett objekt

	data = dataObj[ArduinoList[displayedArduino]];
	// Väljer vilken arduino som datan ska läsas in från

	console.log(data);
	console.log(data["current"]["hum"]);
	console.log(data["current"]["temp"]);

	currentTemp = data["current"]["temp"];
	currentHum = data["current"]["hum"];
	// Tar de senaste värderna från databasen från den valda arduinon

	document.getElementById("temp").innerHTML = `${currentTemp}°C`;
	document.getElementById("humidity").innerHTML = `${currentHum}%`;
	// Sätter in de senaste värderna i hemsidan

	let d = new Date();
	let currentMonth = months[d.getMonth()];
	let currentDay = d.getDate();
	let currentHour = d.getHours();
	let todaysData = data["saved"][currentMonth][currentDay];
	// Tar reda på vilken månad, dag och timme det är

	let finishedHours = Object.keys(todaysData).length - 1;
	// variabeln finishedHours är en int på hur många timmar som är färdigmätta

	let todaysDataKeys = Object.keys(todaysData);
	console.log(currentHour);
	console.log(currentMonth);
	console.log(Object.keys(todaysData).length);
	console.log(finishedHours);

	console.log(todaysData[todaysDataKeys[0]]);

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
			Math.round((tempSum / (hourKeys.length - 1)) * 10) / 10;
		humList[todaysDataKeys[i]] =
			Math.round((humSum / (hourKeys.length - 1)) * 10) / 10;
		// Ränkar ut medelvärdet till en decimal av de avslutade timmarna och lägger till de på rätt plats i listan
	}
	console.log(tempList);
	myChart.update();
	// Updaterar grafen med de nya värderna
});
