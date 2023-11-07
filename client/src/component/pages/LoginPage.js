import axios from "axios";
import { React, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import "../LoginPage.css";
import Modal from "../Modal/Modal";

export default function LoginPage() {
  const [Checked1, setChecked1] = useState(false);
  const [Checked2, setChecked2] = useState(false);
  const checkHandler = (e) => {
    if (e.target.id == "chk_1") {
      setChecked1(!Checked1);
    } else if (e.target.id == "chk_2") {
      setChecked2(!Checked2);
    }
  };

  const [idValue, setIdValue] = useState(""); //아이디 입력
  const handleIdValue = (e) => {
    setIdValue(e.target.value);
  };
  const [pwValue, setPwValue] = useState(""); //비밀번호 입력
  const handlePwValue = (e) => {
    setPwValue(e.target.value);
  };

  const [modal, setModal] = useState(false); //모달 온오프
  const [modalType, setModalType] = useState(); //모달 버튼개수
  const [contentid, setContentID] = useState(); //모달이 나타낼 글
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);

  const handleLogin = () => {
    axios
      .post("/api/users/signin", {
        param: {
          id: idValue,
          password: pwValue,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "false") {
          setModal(!modal);
          setModalType(1);
          setContentID(response.data.message);
        } else {
          setCookie("authorization", response.data.data);
          const headers = {
            authorization: cookies.authorization,
          };
          axios
            .get("/api/users/auth/", { headers })
            .then((res) => {
              localStorage.setItem("name", res.data.data.user_name);
              localStorage.setItem("no", res.data.data.user_no);
              localStorage.setItem("login_id", res.data.data.user_id);
              localStorage.setItem("university", res.data.data.user_department);
              localStorage.setItem("info", res.data.data.user_info);
              localStorage.setItem(
                "major",
                res.data.data.user_department_number
              );
              window.location.href = "/";
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch(function (error) {
        console.log(error.config);
      });
  };

  return (
    <div className="login-container">
      <div className="shadow login-box">
        <img src={ImageComponent.Logo} className="img_logo"></img>
        <div className="login-center">
          <input
            className="login-input"
            placeholder="아이디"
            value={idValue}
            onChange={(e) => handleIdValue(e)}
          ></input>
          <input
            type={"password"}
            className="login-input"
            placeholder="비밀번호"
            value={pwValue}
            onChange={(e) => handlePwValue(e)}
          ></input>
          <div className="login-checkbox">
            <div className="checkbox-container">
              <input
                type={"checkbox"}
                id="chk_1"
                onChange={(e) => checkHandler(e)}
              ></input>
              <label for="chk_1">
                <a className="checked">✓</a>
              </label>
              <label for="chk_1">
                <a className="chk_1">로그인 상태 유지</a>
              </label>
            </div>
            <div className="checkbox-container">
              <input
                type={"checkbox"}
                id="chk_2"
                onChange={(e) => checkHandler(e)}
              ></input>
              <label for="chk_2">
                <a className="checked">✓</a>
              </label>
              <label for="chk_2">
                <a className="chk_2">아이디 저장</a>
              </label>
            </div>
          </div>
          <button className="btn-write btn-login" onClick={() => handleLogin()}>
            로그인
          </button>
        </div>
      </div>

      <div className="login-finds">
        <a className="login-find">아이디 찾기</a>
        <a>|</a>
        <a className="login-find">비밀번호 찾기</a>
        <a>|</a>
        <Link to="/signup" className="login-find">
          회원가입
        </Link>
      </div>

      <Modal
        open={modal}
        close={() => {
          setModal(!modal);
        }}
        type={1}
        content={contentid}
      />
    </div>
  );
}
