
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


document.getElementById("container").style.backgroundImage = "url('Images/omg/P1.jpg')"


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
    temperature.innerHTML =
      TemperatureFarenheight;
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





	

