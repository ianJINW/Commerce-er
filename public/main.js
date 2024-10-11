const sideP = document.querySelectorAll(".side ul li a");
const showBtn = document.querySelectorAll(".show");
const showP = document.querySelector(".showP");
const passI = document.querySelectorAll("#password");
const sidebar = document.querySelector(".side");
const navImg = document.querySelector(".side nav img");
const loginF = document.querySelector(".login");
const registerF = document.querySelector(".signup");
const loginA = document.querySelector(".login a");
const registerA = document.querySelector(".signup a");
const modals = document.querySelectorAll(".modal");
const modalCreate = document.querySelector(".modalCreate");
const modalC = document.querySelector(".modalC");
const modalL = document.querySelector(".modalL");
const updater = document.querySelector(".updater");
const deleter = document.querySelector(".deleter");
const dp = document.querySelector(".profile img");

// On page load, hide login and signup modals initially, show modalCreate
window.onload = () => {
	document.querySelectorAll(".modal").forEach(modal => {
		modal.style.display = "none";
	});
	document.querySelector(".modalCreate").style.display = "flex";
	deleter.style.display = "none";
	updater.style.display = "none";
};

// Close all modals and show modalCreate
document.querySelectorAll(".close").forEach(closeBtn => {
	closeBtn.addEventListener("click", () => {
		document.querySelectorAll(".modal").forEach(modal => {
			modal.style.display = "none";
		});

		document.querySelector(".modalCreate").style.display = "flex"; // Show modalCreate again
	});
});

// Show signup form, hide login and modalCreate
document.querySelector(".modalC").addEventListener("click", () => {
	document.querySelector(".signup").style.display = "flex";
	document.querySelector(".login").style.display = "none";
	document.querySelector(".modalCreate").style.display = "none";
});

// Show login form, hide signup and modalCreate
document.querySelector(".modalL").addEventListener("click", () => {
	document.querySelector(".login").style.display = "flex";
	document.querySelector(".signup").style.display = "none";
	document.querySelector(".modalCreate").style.display = "none";
});

// Toggle between login and signup within the forms
document.querySelector(".login a").addEventListener("click", e => {
	e.preventDefault();
	document.querySelector(".signup").style.display = "flex";
	document.querySelector(".login").style.display = "none";
	document.querySelector(".modalCreate").style.display = "none";
});

document.querySelector(".signup a").addEventListener("click", e => {
	e.preventDefault();
	document.querySelector(".login").style.display = "flex";
	document.querySelector(".signup").style.display = "none";
	document.querySelector(".modalCreate").style.display = "none";
});

// Show/hide password functionality
document.querySelectorAll(".show").forEach(showBtn => {
	showBtn.addEventListener("click", () => {
		let passwordInput = showBtn.previousElementSibling;
		if (passwordInput.type === "password") {
			passwordInput.type = "text";
			showBtn.value = "Hide";
		} else {
			passwordInput.type = "password";
			showBtn.value = "Show";
		}
	});
});

showP.addEventListener("click", () => {
	let passwordInput = showBtn.previousElementSibling;
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		showBtn.value = "Hide";
	} else {
		passwordInput.type = "password";
		showBtn.value = "Show";
	}
});

dp.addEventListener("click", () => {
	deleter.style.display = "flex";
	updater.style.display = "flex";
});
