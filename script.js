const calendar =
	document.getElementById("calendar");

const overlay =
	document.getElementById("overlay");

const overlayImage =
	document.getElementById("overlayImage");


// Alle Bilder

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


// Karten erzeugen

images.forEach((imagePath, index) => {

	const day = index + 1;

	// Jahr aus Dateinamen holen

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

		<div
			style="
				margin-top:8px;
				opacity:0.7;
			"
		>
			Weihnachtsbaum ${year}
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

			overlay.classList.add("show");
		}
	);

	calendar.appendChild(card);
});


overlay.addEventListener(
	"click",
	() => {

		overlay.classList.remove("show");
	}
);