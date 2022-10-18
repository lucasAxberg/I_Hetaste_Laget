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

function Convertion(obj) {
	let temperature = document.getElementById("temp");
	if (obj.id == "C") {
		temperature.innerHTML = temperature.innerHTML * 1.8 + 32;
	} else if (obj.id == "F") {
		temperature.innerHTML = (temperature.innerHTML - 32) / 1.8;
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
