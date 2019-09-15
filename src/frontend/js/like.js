import axios from "axios";
import routes from "../../routes";
import swal from "sweetalert";

let likeBtn = document.querySelector(".video-detail__like .like");
let unlikeBtn = document.querySelector(".video-detail__like .unlike");
let countLike = document.querySelector(".video-detail__like .countLike");
let countUnlike = document.querySelector(".video-detail__like .countUnlike");
let likeIcon = document.querySelector(".like i");
let unlikeIcon = document.querySelector(".unlike i");

// like
function changeToLike() {
	likeIcon.style.color = "rgb(91, 192, 222)";
	countLike.innerText++;
	swal("좋아요 목록에 추가됨", "", "success");

	if (unlikeIcon.style.color == "rgb(217, 83, 79)") {
		handleToggleUnlikeApi();
	}
}

async function handleLikeApi() {
	let id = window.location.href.split("/:")[1];

	let postLike = await axios({
		url: `/api${routes.like(id)}`,
		method: "post"
	});

	if (postLike.status == 200) {
		changeToLike();
	}
}

// toogle like
function changeToggleLike() {
	likeIcon.style.color = "";
	countLike.innerText--;
}

async function handleToggleLikeApi() {
	let id = window.location.href.split("/:")[1];

	let postToggleLike = await axios({
		url: `/api${routes.toogleLike(id)}`,
		method: "post"
	});

	if (postToggleLike.status == 200) {
		changeToggleLike();
	}
}

// handle like event
function handleLikeBtn() {
	if (likeIcon.style.color == "") {
		// 추천
		handleLikeApi();
	} else if (likeIcon.style.color == "rgb(91, 192, 222)") {
		// 추천 취소
		handleToggleLikeApi();
	}
}

// unlike
function changeToUnlike() {
	unlikeIcon.style.color = "rgb(217, 83, 79)";
	countUnlike.innerText++;

	if (likeIcon.style.color == "rgb(91, 192, 222)") {
		handleToggleLikeApi();
	}
}

async function handleUnlikeApi() {
	let id = window.location.href.split("/:")[1];

	let postUnlike = await axios({
		url: `/api${routes.unlike(id)}`,
		method: "post"
	});

	if (postUnlike.status == 200) {
		changeToUnlike();
	}
}

// toogle unlike
function changeToggleUnlike() {
	unlikeIcon.style.color = "";
	countUnlike.innerText--;
}

async function handleToggleUnlikeApi() {
	let id = window.location.href.split("/:")[1];

	let postToggleUnlike = await axios({
		url: `/api${routes.toogleUnlike(id)}`,
		method: "post"
	});

	if (postToggleUnlike.status == 200) {
		changeToggleUnlike();
	}
}

// handle unlike event
function handleUnlikeBtn() {
	if (unlikeIcon.style.color == "") {
		// 비추천
		handleUnlikeApi();
	} else if (unlikeIcon.style.color == "rgb(217, 83, 79)") {
		// 비추천 취소
		handleToggleUnlikeApi();
	}
}

function listenEvent() {
	if (likeBtn) {
		likeBtn.addEventListener("click", handleLikeBtn);
	}
	if (unlikeBtn) {
		unlikeBtn.addEventListener("click", handleUnlikeBtn);
	}
}

function init() {
	listenEvent();
}

init();
