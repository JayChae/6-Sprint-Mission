import {
  validateEmailAddress,
  validatePassword,
  validatePasswordTwice,
  validateNickName,
  handleVisibility,
} from "./input_check.js";

const Input = document.querySelector("form");
const login_btn = document.querySelector(".login-form button");
login_btn.setAttribute("disabled", true);
const eyes = document.querySelectorAll(".password-visible-btn");
const error_message = document.querySelectorAll(".input-err-message");
let passwordValid = false;
let emailValid = false;
let nickNameValid = false;
let passwordConfirmValid = false;
let newPassword;

Input.addEventListener("input", (event) => {
  const userInput = event.target;

  switch (userInput.id) {
    case "userEmail":
      emailValid = validateEmailAddress(userInput, error_message[0]);
      break;
    case "userNickName":
      nickNameValid = validateNickName(userInput, error_message[1]);
      break;
    case "userPassword":
      passwordValid = validatePassword(userInput, error_message[2]);
      newPassword = userInput.value;
      break;
    case "userPasswordCheck":
      passwordConfirmValid = validatePasswordTwice(
        userInput,
        newPassword,
        error_message[3]
      );
      break;
  }

  if (emailValid && passwordValid && passwordConfirmValid && nickNameValid) {
    login_btn.removeAttribute("disabled");
  } else {
    login_btn.setAttribute("disabled", true);
  }
});

login_btn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "./signin.html";
});

eyes.forEach((eye) => {
  eye.addEventListener("click", (event) => {
    handleVisibility(event.target);
  });
});
