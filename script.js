const calendar = document.getElementById("calendar");
const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const yearButton = document.getElementById("yearButton");
const yearText = document.getElementById("yearText");
const audioPlayer = document.getElementById("audioPlayer");

let yearShown = false;

// --- TEST-EINSTELLUNGEN ---
const DEBUG_ALLOW_ALL = false;        // Auf 'true' setzen, um Datumssperre zu umgehen
const RESET_STORAGE_ON_START = false; // Auf 'true' setzen, um den Speicher bei jedem Laden zu leeren

// Falls der Test-Reset aktiv ist, Speicher für den Kalender vorab löschen
if (RESET_STORAGE_ON_START) {
	localStorage.removeItem("openedAdventsDoors");
}

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

// 1. Bereits geöffnete Türchen aus dem localStorage abrufen
const openedDoors = JSON.parse(localStorage.getItem("openedAdventsDoors") || "[]");

// Funktion zur Prüfung, ob ein Türchen bereits geöffnet werden darf
function isDoorAllowed(day) {
	if (DEBUG_ALLOW_ALL) return true;

	const today = new Date();
	const currentMonth = today.getMonth(); // 0 = Januar, 11 = Dezember
	const currentDate = today.getDate();

	// Darf nur im Dezember und erst ab dem jeweiligen Tag geöffnet werden
	return currentMonth === 9-1 && currentDate >= day;
}

// Kalender-Türchen generieren
images.forEach((imagePath, index) => {
	const day = index + 1;
	const filename = imagePath.split("/").pop();
	const parts = filename.split("-");
	const year = parts[1].replace(".jpg", "");
	const audioPath = "audio/" + filename.replace(".jpg", ".mp3");

	const card = document.createElement("div");
	card.className = "card";

	// Falls das Türchen in localStorage als geöffnet vermerkt ist, direkt "opened" Klasse hinzufügen
	if (openedDoors.includes(day)) {
		card.classList.add("opened");
	}

	card.innerHTML = `
		<div class="day">${day}. Dezember 🎁</div>
		<div class="preview">
			<img src="${imagePath}" loading="lazy">
		</div>
	`;

	card.addEventListener("click", () => {
		// Prüfen, ob das Türchen bereits erlaubt ist
		if (!isDoorAllowed(day)) {
			alert(`🔒 Dieses Türchen darfst du erst am ${day}. Dezember öffnen!`);
			return;
		}

		// Türchen als geöffnet markieren & im localStorage speichern
		card.classList.add("opened");
		if (!openedDoors.includes(day)) {
			openedDoors.push(day);
			localStorage.setItem("openedAdventsDoors", JSON.stringify(openedDoors));
		}

		overlayImage.src = imagePath;
		yearText.innerHTML = "";
		yearText.classList.remove("show");
		yearText.dataset.year = year;
		yearShown = false;
		yearButton.innerHTML = "🤔 Jahr geraten? 🎄 Jahr anzeigen";

		// Audio starten
		audioPlayer.pause();
		audioPlayer.src = audioPath;
		audioPlayer.currentTime = 0;
		audioPlayer.play().catch(err => console.log("Audio-Autoplay blockiert:", err));

		overlay.classList.add("show");
	});

	calendar.appendChild(card);
});

// Button-Logik im Overlay
yearButton.addEventListener("click", () => {
	if (!yearShown) {
		yearText.innerHTML = "✨ Dieses Foto ist aus dem Jahr " + yearText.dataset.year;
		yearText.classList.add("show");
		yearButton.innerHTML = "← Zurück";
		yearShown = true;
	} else {
		overlay.classList.remove("show");
		audioPlayer.pause();
		audioPlayer.currentTime = 0;
		yearButton.innerHTML = "🤔 Jahr geraten? 🎄 Jahr anzeigen";
		yearShown = false;
	}
});

// Schließen beim Klick auf den dunklen Hintergrund
overlay.addEventListener("click", (event) => {
	if (event.target === overlay) {
		overlay.classList.remove("show");
		audioPlayer.pause();
		audioPlayer.currentTime = 0;
	}
});

// --- SCHNEEFLOCKEN GENERATOR (Einmaliger Urknall) ---
for (let i = 0; i < 40; i++) {
	const snow = document.createElement("div");
	snow.className = "snowflake";
	snow.innerHTML = "❄";

	snow.style.left = Math.random() * 100 + "vw";
	snow.style.animationDuration = (5 + Math.random() * 10) + "s";
	snow.style.animationDelay = -(Math.random() * 10) + "s";
	snow.style.fontSize = (10 + Math.random() * 16) + "px";
	snow.style.opacity = 0.2 + Math.random() * 0.5;

	document.body.appendChild(snow);
}
