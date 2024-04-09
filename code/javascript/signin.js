import { validateEmailAddress, validatePassword,handleVisibility } from "./input_check.js";

const Input = document.querySelector("form");
const login_btn = document.querySelector(".login-form button");
const error_message = document.querySelectorAll(".input-err-message");
const eye = document.querySelector(".password-visible-btn");
login_btn.setAttribute("disabled", true);
let passwordValid = false;
let emailValid = false;

Input.addEventListener("input", (event) => {
  const userInput = event.target;

  switch (userInput.id) {
    case "userEmail":
      emailValid = validateEmailAddress(userInput,error_message[0]);
      break;
    case "userPassword":
      passwordValid = validatePassword(userInput,error_message[1]);
      break;
  }

  if (emailValid && passwordValid) {
    login_btn.removeAttribute("disabled");
  } else {
    login_btn.setAttribute("disabled", true);
  }
});

login_btn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "./items.html";
});


eye.addEventListener("click",(event)=>{
  handleVisibility(event.target);
})
