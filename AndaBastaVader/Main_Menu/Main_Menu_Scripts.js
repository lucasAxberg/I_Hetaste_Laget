function goToAbout() {
	window.open("../About_Us/About_Us.html", "_self");
}

function goToTemp() {
	window.open("../Temp_Page/Temp_Page.html", "_self");
}

function goToPrev() {
	window.open("../Previous/Previous.html", "_self");
}

function openMenu() {
	document.getElementById("sideMenu").classList.toggle("toTheSide");
	document.getElementById("stripe1").classList.toggle("change-stripe1");
	document.getElementById("stripe2").classList.toggle("change-stripe2");
	document.getElementById("stripe3").classList.toggle("change-stripe3");
}



function rickroll() {
	document.querySelector("audio").autoplay= true;
	document.querySelector("audio").load();
}
