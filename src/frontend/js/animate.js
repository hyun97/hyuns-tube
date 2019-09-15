let video = document.querySelectorAll(".video__player video");
let loggedOut = document.querySelector(".header__logout");
let login = document.querySelector(".header__login");
let sign = document.querySelector(".header__sign");
let logo = document.querySelector(".header__title");

// Video
function handleVideoIn(event) {
	event.target.classList.remove("animated", "pulse-out", "faster");
	event.target.classList.add("animated", "pulse", "faster");
}

function handleVideoOut(event) {
	event.target.classList.remove("animated", "pulse", "faster");
	event.target.classList.add("animated", "pulse-out", "faster");
}

// Logout, Login, Sign
function handleLogoutIn(event) {
	event.target.classList.add("animated", "bounceIn", "faster");
}

function handleLogoutOut(event) {
	event.target.classList.remove("animated", "bounceIn", "faster");
}

// Logo
function handleLogoIn(event) {
	event.target.classList.add("animated", "bounceIn", "slower");
}

function handleLogoOut(event) {
	event.target.classList.remove("animated", "bounceIn", "slower");
}

// Listen Event
function listenEvent() {
	// Video
	if (video) {
		video.forEach(function(el) {
			el.addEventListener("mouseover", handleVideoIn);
			el.addEventListener("mouseout", handleVideoOut);
		});
	}

	// Logout
	if (loggedOut) {
		loggedOut.addEventListener("mouseover", handleLogoutIn);
		loggedOut.addEventListener("mouseout", handleLogoutOut);
	}

	// Sign
	if (sign) {
		sign.addEventListener("mouseover", handleLogoutIn);
		sign.addEventListener("mouseout", handleLogoutOut);
	}

	// Login
	if (login) {
		login.addEventListener("mouseover", handleLogoutIn);
		login.addEventListener("mouseout", handleLogoutOut);
	}

	// Logo
	if (logo) {
		logo.addEventListener("mouseover", handleLogoIn);
		logo.addEventListener("mouseout", handleLogoOut);
	}
}

function init() {
	listenEvent();
}

init();
