function goToAbout() {
	window.open("../About_Us/About_Us.html", "_self");
}

function goToTemp() {
	window.open("../Temp_Page/Temp_Page.html", "_self");
}

function check() {
	document.getElementById("menu__toggle").checked = true;
  }
  
  function uncheck() {
	document.getElementById("menu__toggle").checked = false;
  }
  
  let s = 1;
  function menuButton(x) {
	console.log("hej")
	x.classList.toggle("change");
	let parent = x.parentElement
	console.log(parent)
	
	if (s == 2) {
	  parent.style.background = "#333333";
	  s = 1;
	  uncheck();
	}
	else {
	  parent.style.background = "#444444";
	  s = 2;
	  console.log(s)
	  check();
	  
	}
  }

function goToPrev() {
	window.open("../Previous/Previous.html", "_self");
}

