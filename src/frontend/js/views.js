import axios from "axios";
import routes from "../../routes";

let videoDetail = document.querySelector(".video-detail video");

function handlePlay() {
	let id = window.location.href.split("/:")[1];
	axios({
		method: "post",
		url: `/api${routes.views(id)}`
	});
}

function listenEvent() {
	if (videoDetail) {
		videoDetail.addEventListener("play", handlePlay, {
			once: true
		});
	}
}

function init() {
	listenEvent();
}

init();
