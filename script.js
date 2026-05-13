const calendar =
	document.getElementById("calendar");

const overlay =
	document.getElementById("overlay");

const overlayImage =
	document.getElementById("overlayImage");


// Alle Bilder

const images = [

	"1-2009.jpg",
	"2-2020.jpg",
	"3-2006.jpg",
	"4-2016.jpg",
	"5-2014.jpg",
	"6-200x.jpg",
	"7-2008.jpg",
	"8-2006.jpg",
	"9-2013.jpg",
	"10-2011.jpg",
	"11-2015.jpg",
	"12-200x.jpg",
	"13-2007.jpg",
	"14-2007.jpg",
	"15-2022.jpg",
	"16-2024.jpg",
	"17-2017.jpg",
	"18-2009.jpg",
	"19-2021.jpg",
	"20-2025.jpg",
	"21-2019.jpg",
	"22-2021.jpg",
	"23-202x.jpg",
	"24-2016.jpg"

];


// Karten erzeugen

images.forEach((filename, index) => {

	const day = index + 1;

	const imagePath =
		"images/" + filename;

	// Jahr aus Dateinamen holen

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

			const tempImage = new Image();

			tempImage.onload = () => {

				overlayImage.src =
					imagePath;

				overlay.classList.add("show");
			};

			tempImage.src = imagePath;
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