const validateEmailAddress = (userInput,error_message) => {
  const email = userInput.value;
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
 

  if (email === "") {
    userInput.classList.add("err-input");
    error_message.textContent = "이메일을 입력해주세요";
    return false;
  } else if (!emailRegex.test(email)) {
    userInput.classList.add("err-input");
    error_message.textContent = "잘못된 이메일 형식입니다";
    return false;
  } else {
    userInput.classList.remove("err-input");
    error_message.textContent = "";
    return true;
  }
};

const validatePassword = (userInput,error_message) => {
  const password = userInput.value;

  if (password === "") {
    userInput.classList.add("err-input");
    error_message.textContent = "비밀번호를 입력해주세요";
    return false;
  } else if (password.length < 8) {
    userInput.classList.add("err-input");
    error_message.textContent = "비밀번호를 8자 이상 입력해주세요";
    return false;
  } else {
    userInput.classList.remove("err-input");
    error_message.textContent = "";
    return true;
  }
};

const validateNickName = (userInput,error_message) => {
  const nickName = userInput.value;

  if (nickName === "") {
    userInput.classList.add("err-input");
    error_message.textContent = "닉네임을 입력해주세요";
    return false;
  } else {
    userInput.classList.remove("err-input");
    error_message.textContent = "";
    return true;
  }
};

const validatePasswordTwice = (userInput, newPassword,error_message) => {
  const confirmPassword = userInput.value;
  if (newPassword !== confirmPassword) {
    userInput.classList.add("err-input");
    error_message.textContent = "비밀번호가 일치하지 않습니다";
    return false;
  } else {
    userInput.classList.remove("err-input");
    error_message.textContent = "";
    return true;
  }
};

const handleVisibility = (eye) => {
  const userInput = eye.previousElementSibling;
  if (userInput.type === "password") {
    userInput.type = "text";
    eye.src = "../image/signin_image/visibility_visible.png";
  } else {
    userInput.type = "password";
    eye.src = "../image/signin_image/visibility_hidden.png";
  }
};

export {
  validateEmailAddress,
  validatePassword,
  validatePasswordTwice,
  validateNickName,
  handleVisibility,
};
