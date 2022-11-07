function openMenu() {
	document.getElementById("sideMenu").classList.toggle("toTheSide");
	document.getElementById("stripe1").classList.toggle("change-stripe1");
	document.getElementById("stripe2").classList.toggle("change-stripe2");
	document.getElementById("stripe3").classList.toggle("change-stripe3");
}

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
