const calendar =
	document.getElementById("calendar");

const overlay =
	document.getElementById("overlay");

const overlayImage =
	document.getElementById("overlayImage");


const IMAGE =
	"images/tree.jpg";


for (let i = 1; i <= 24; i++) {

	const card =
		document.createElement("div");

	card.className = "card";

	card.innerHTML = `

		<div class="day">
			${i}. Dezember 🎁
		</div>

		<div class="preview">

			<img
				src="${IMAGE}"
			>

		</div>

	`;

	card.addEventListener(
		"click",
		() => {

			card.classList.add("opened");

			overlayImage.src = IMAGE;

			overlay.classList.add("show");
		}
	);

	calendar.appendChild(card);
}


overlay.addEventListener(
	"click",
	() => {

		overlay.classList.remove("show");
	}
);