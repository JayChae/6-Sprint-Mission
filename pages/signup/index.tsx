import { ChangeEvent, useState, useEffect } from "react";
import ic_kakao from "@/images/ic_kakao.png";
import ic_google from "@/images/ic_google.png";
import ic_hidden from "@/images/btn_visibility_off.svg";
import ic_visible from "@/images/btn_visibility_on.svg";
import logo from "@/images/login_logo.png";
import {
  validateEmailAddress,
  validatePassword,
  validateNickName,
  validatePasswordTwice,
} from "@/utils/validateLogin";
import Link from "next/link";
import Image from "next/image";
import styles from "@/pages/signin/style.module.css";
import postSignup from "@/apis/postSignup";
import { FormEvent } from "react";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const [passWordCheck, setPassWordCheck] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [visiblePassWord, setVisiblePassWord] = useState<boolean>(false);
  const [visiblePassWordCheck, setVisiblePassWordCheck] =
    useState<boolean>(false);
  const eyeIconPassWord: string = visiblePassWord ? ic_visible : ic_hidden;
  const eyeIconPassWordCheck: string = visiblePassWordCheck
    ? ic_visible
    : ic_hidden;

  const buttonActivate: boolean =
    validateEmailAddress(email) &&
    validatePassword(passWord) &&
    validateNickName(nickName) &&
    validatePasswordTwice(passWord, passWordCheck);
  const emailErrorMessage: string =
    email === ""
      ? "이메일을 입력해주세요"
      : validateEmailAddress(email)
      ? ""
      : "잘못된 이메일 형식입니다";
  const passWordErrorMessage: string =
    passWord === ""
      ? "비밀번호 재입력해주세요"
      : validatePassword(passWord)
      ? ""
      : "비밀번호를 8자 이상 입력해주세요";
  const passWordCheckErrorMessage: string = validatePasswordTwice(
    passWord,
    passWordCheck
  )
    ? ""
    : "비밀번호가 일치하지 않습니다";

  const nickNameErrorMessage: string = validateNickName(nickName)
    ? ""
    : "닉네임을 입력해주세요";

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNickNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const handlePassWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassWord(e.target.value);
  };
  const handlePassWordCheckInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassWordCheck(e.target.value);
  };
  const handleVisiblePassWordBtn = () => {
    setVisiblePassWord((prev) => !prev);
  };
  const handleVisiblePassWordCheckBtn = () => {
    setVisiblePassWordCheck((prev) => !prev);
  };

  const handleSignUPButton = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await postSignup({
        email: email,
        nickName: nickName,
        password: passWord,
        passwordConfirmation: passWordCheck,
      });
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      alert("이미 로그인 상태입니다.");
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className={styles.sign_header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="판다마켓 로고" />
          </Link>
        </div>
      </div>
      <main className={styles.sign_main}>
        <div className={styles.login_content}>
          <form className={styles.login_form}>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userEmail">이메일</label>
                <input
                  id="userEmail"
                  type="email"
                  name="userEmail"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={handleEmailInput}
                />
              </div>
              <span className={styles.input_err_message}>
                {emailErrorMessage}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userNickName">닉네임</label>
                <input
                  id="userNickName"
                  type="text"
                  name="userNickName"
                  placeholder="닉네임을 입력해주세요"
                  value={nickName}
                  onChange={handleNickNameInput}
                />
              </div>
              <span className={styles.input_err_message}>
                {nickNameErrorMessage}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userPassword">비밀번호</label>
                <input
                  id="userPassword"
                  type={visiblePassWord ? "text" : "password"}
                  name="userPassword"
                  placeholder="비밀번호를 입력해주세요"
                  value={passWord}
                  onChange={handlePassWordInput}
                />
                <Image
                  src={eyeIconPassWord}
                  className={styles.password_visible_btn}
                  alt="비밀번호 숨기기 버튼"
                  onClick={handleVisiblePassWordBtn}
                />
              </div>
              <span className={styles.input_err_message}>
                {passWordErrorMessage}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userPasswordCheck">비밀번호 확인</label>
                <input
                  id="userPasswordCheck"
                  type={visiblePassWordCheck ? "text" : "password"}
                  name="userPasswordCheck"
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  value={passWordCheck}
                  onChange={handlePassWordCheckInput}
                />
                <Image
                  src={eyeIconPassWordCheck}
                  className={styles.password_visible_btn}
                  alt="비밀번호 숨기기 버튼"
                  onClick={handleVisiblePassWordCheckBtn}
                />
              </div>
              <span className={styles.input_err_message}>
                {passWordCheckErrorMessage}
              </span>
            </div>
            <button disabled={!buttonActivate} onClick={handleSignUPButton}>
              회원가입
            </button>
          </form>
          <div className={styles.login_easy}>
            <span>간편 로그인하기</span>
            <div className={styles.sns_icon}>
              <Link href="https://www.google.com/">
                <Image src={ic_google} alt="구글 아이콘" />
              </Link>
              <Link href="https://www.kakaocorp.com/page/">
                <Image src={ic_kakao} alt="카카오 아이콘" />
              </Link>
            </div>
          </div>
          <div className={styles.login_first}>
            <span>이미 회원이신가요?</span>
            <Link href="/signin">로그인</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
