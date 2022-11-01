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

firebase.initializeApp(firebaseConfig);
const dataBase = firebase.database().ref("Arduino1/current");
dataBase.on("value", (snapshot) => {
	data = snapshot.val();
	console.log(data);
	console.log(data["hum"]);
	console.log(data["temp"]);
});
