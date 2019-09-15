import axios from "axios";
import routes from "../../routes";
import moment from "moment";
moment.updateLocale("en", {
	relativeTime: {
		future: "in %s",
		past: "%s 전",
		s: "몇 초",
		ss: "%d초",
		m: "1분",
		mm: "%d분",
		h: "1시간",
		hh: "%d시간",
		d: "1일",
		dd: "%d일",
		M: "1개월",
		MM: "%d개월",
		y: "1년",
		yy: "%d년"
	}
});

let commentForm = document.querySelector(".video-comment__text");
let commentList = document.querySelector(".video-comment__list");
let commentNum = document.querySelector(".video-comment__length span");
let delCommentBtn = document.querySelectorAll(".video-comment__edit--del");
let userName = document.querySelector(".throwName");
let userAvatar = document.querySelector(".throwAvatar");

// add process
function increaseComment() {
	commentNum.innerText++;
}

function createCommentElement(comment, commentId) {
	let avatar = document.createElement("img");
	let name = document.createElement("span");
	let createAt = document.createElement("span");
	let text = document.createElement("p");
	let delBtn = document.createElement("button");
	let editBlock = document.createElement("div");
	let commentBlock = document.createElement("div");
	let nameWrapper = document.createElement("div");

	avatar.className = "avatar";

	if (userAvatar.id.startsWith("http")) {
		avatar.src = `${userAvatar.id}`;
	} else {
		avatar.src = `/${userAvatar.id}`;
	}

	commentBlock.className = "video-comment__each";

	name.className = "name";
	name.innerText = userName.id;

	createAt.className = "createAt";
	createAt.innerText = moment(new Date(), moment()).fromNow();

	text.className = "text";
	text.innerText = comment;

	delBtn.className = "video-comment__edit--del";
	delBtn.id = commentId;
	delBtn.innerText = "삭제";

	nameWrapper.className = "name-wrapper";

	nameWrapper.appendChild(name);
	nameWrapper.appendChild(createAt);
	nameWrapper.appendChild(delBtn);

	commentBlock.appendChild(avatar);
	commentBlock.appendChild(nameWrapper);
	commentBlock.appendChild(text);

	commentBlock.appendChild(editBlock);
	commentList.prepend(commentBlock);

	delBtn.addEventListener("click", handleDelApi);

	increaseComment();
}

async function handleAddApi(comment) {
	let id = window.location.href.split("/:")[1];

	let postComment = await axios({
		url: `/api${routes.comment(id)}`,
		method: "post",
		data: {
			comment
		}
	});

	if (postComment.status == 200) {
		createCommentElement(comment, postComment.data._id);
	}
}

function handleSubmit(event) {
	event.preventDefault();

	let commentInput = commentForm.querySelector("input");
	let comment = commentInput.value;

	commentInput.value = null;

	handleAddApi(comment);
}

// delete process
function decreaseComment() {
	commentNum.innerText--;
}

function removeCommentElement(commentEl) {
	let delTarget = commentEl.parentNode;
	delTarget.remove();
	decreaseComment();
}

async function handleDelApi(event) {
	let commentId = event.target.id;

	let delComment = await axios({
		method: "post",
		url: `/api${routes.delComment(commentId)}`
	});

	if (delComment.status == 200) {
		removeCommentElement(event.target.parentNode);
	}
}

function listenEvent() {
	if (commentForm) {
		commentForm.addEventListener("submit", handleSubmit);
	}
	if (delCommentBtn) {
		delCommentBtn.forEach(function(el) {
			el.addEventListener("click", handleDelApi);
		});
	}
}

function init() {
	listenEvent();
}

init();
