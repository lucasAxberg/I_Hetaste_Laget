function changeActive1(obj) {
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

let OriginValue = document.getElementById("temp").innerHTML;
console.log(OriginValue);
let StartUnit;

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
			temperature.innerHTML = OriginValue;
			return;
		}
		temperature.innerHTML =
			Math.round((temperature.innerHTML * 1.8 + 32) * 10) / 10;
		// Converts the temp to farenheit from celsius with 1 decimal point
	} else if (obj.id == "C") {
		if (obj.id == StartUnit) {
			temperature.innerHTML = OriginValue;
			return;
		}
		temperature.innerHTML =
			Math.round(((temperature.innerHTML - 32) / 1.8) * 10) / 10;
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


