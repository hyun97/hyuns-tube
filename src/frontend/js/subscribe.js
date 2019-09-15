import axios from "axios";
import routes from "../../routes";
import swal from "sweetalert";

let subscribeBtn = document.querySelector(".subscribe");
let follower = document.querySelector(".subscribe-count");
let globalSubscribe = document.querySelector(".subscribeLogout");

async function handleSubscribeApi() {
	follower.innerText = parseInt(follower.innerText) + 1;
	console.log(follower);

	let postSubscribe = await axios({
		method: "post",
		url: `/api${routes.subscribe(subscribeBtn.id)}`
	});

	if (postSubscribe.status == 200) {
		subscribeBtn.innerText = `구독중 ${follower.innerText}명`;
	}
}

async function toggleSubscribeApi() {
	follower.innerText = parseInt(follower.innerText) - 1;

	let postToggleSubscribe = await axios({
		method: "post",
		url: `/api${routes.toogleSubscribe(subscribeBtn.id)}`
	});

	if (postToggleSubscribe.status == 200) {
		subscribeBtn.innerText = `구독 ${follower.innerText}명`;
	}
}

function handleClick() {
	if (subscribeBtn.innerText.startsWith("중", 2) == false) {
		handleSubscribeApi();
	} else {
		toggleSubscribeApi();
	}
}

function handleGlobalSubscribe() {
	swal("로그인 후 사용 가능합니다 🔒", "", "error");
}

function listenEvent() {
	if (subscribeBtn) {
		subscribeBtn.addEventListener("click", handleClick);
	}

	if (globalSubscribe) {
		globalSubscribe.addEventListener("click", handleGlobalSubscribe);
	}
}

function init() {
	listenEvent();
}

init();
