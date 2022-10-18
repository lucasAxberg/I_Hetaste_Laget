function changeActive(obj) {
	// alert(obj.id);
	console.log(obj.id);

	const parent = obj.parentElement;
	console.log(parent);
	const child = parent.children;
	for (var i = 0; i < child.length; i++) {
		if (child[i].classList.contains("active")) {
			child[i].classList.remove("active");
		}
	}
	obj.classList.add("active");
}
