const calendar =
	document.getElementById("calendar");

const overlay =
	document.getElementById("overlay");

const overlayImage =
	document.getElementById("overlayImage");

const yearButton =
	document.getElementById("yearButton");

const yearText =
	document.getElementById("yearText");


const images = [

	"images/1-2009.jpg",
	"images/2-2020.jpg",
	"images/3-2006.jpg",
	"images/4-2016.jpg",
	"images/5-2014.jpg",
	"images/6-200x.jpg",
	"images/7-2008.jpg",
	"images/8-2006.jpg",
	"images/9-2013.jpg",
	"images/10-2011.jpg",
	"images/11-2015.jpg",
	"images/12-200x.jpg",
	"images/13-2007.jpg",
	"images/14-2007.jpg",
	"images/15-2022.jpg",
	"images/16-2024.jpg",
	"images/17-2017.jpg",
	"images/18-2009.jpg",
	"images/19-2021.jpg",
	"images/20-2025.jpg",
	"images/21-2019.jpg",
	"images/22-2021.jpg",
	"images/23-202x.jpg",
	"images/24-2016.jpg"

];


images.forEach((imagePath, index) => {

	const day = index + 1;

	const filename =
		imagePath.split("/").pop();

	const parts =
		filename.split("-");

	const year =
		parts[1]
			.replace(".jpg", "");

	const card =
		document.createElement("div");

	card.className = "card";

	card.innerHTML = `

		<div class="day">
			${day}. Dezember 🎁
		</div>

		<div class="preview">

			<img
				src="${imagePath}"
				loading="lazy"
			>

		</div>

	`;

	card.addEventListener(
		"click",
		() => {

			card.classList.add("opened");

			overlayImage.src =
				imagePath;

			yearText.innerHTML = "";

			yearText.classList.remove("show");

			yearText.dataset.year =
				year;

			yearShown = false;

			yearButton.innerHTML =
				"🤔 Jahr geraten? 🎄 Jahr anzeigen";

			overlay.classList.add("show");
		}
	);

	calendar.appendChild(card);
});


let yearShown = false;


yearButton.addEventListener(
	"click",
	() => {

		// Erstes Klicken:
		// Jahr anzeigen

		if (!yearShown) {

			yearText.innerHTML =
				"✨ Dieses Foto ist aus dem Jahr "
				+ yearText.dataset.year;

			yearText.classList.add("show");

			yearButton.innerHTML =
				"← Zurück";

			yearShown = true;
		}

		// Zweites Klicken:
		// Overlay schließen

		else {

			overlay.classList.remove("show");

			yearButton.innerHTML =
				"🤔 Jahr geraten? 🎄 Jahr anzeigen";

			yearShown = false;
		}
	}
);


overlay.addEventListener(
	"click",
	(event) => {

		if (event.target === overlay) {

			overlay.classList.remove("show");
		}
	}
);