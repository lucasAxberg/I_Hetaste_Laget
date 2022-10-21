
let weather = {
	state: "rain",
	TemperatureCelcius: 18,
	humidity: 0,
	time: 0,
	timestate: "noon"
}


const date = Date.now();
console.log(date);

let TemperatureFarenheight = Math.round(weather.TemperatureCelcius * 1.8 + 32);


document.getElementById("container").style.backgroundImage = "url('../Images/omg/P1.jpg')"


console.log(weather.state)
	if (weather.state == "rain") {
		console.log("hej");
	}

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





	

