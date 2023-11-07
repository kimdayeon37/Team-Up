import "./UserInfoComponent.css";
import React, { useState } from "react";
export default function UserInfoComponent() {
  const user = {
    user_name: "권준혁",
    user_department: "광운대학교",
    user_department_number: "정보융합학부",
    user_id: "jhkkwon",
    user_pw: "1234567899",
    user_email: "jh981223@naver.com",
  };
  const [name, setName] = useState(user.user_name);
  const [dep, setDep] = useState(user.user_department);
  const [depNo, setDepNo] = useState(user.user_department_number);
  const [pw, setPw] = useState("*".repeat(user.user_pw.length));
  const [email, setEmail] = useState(user.user_email);
  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetDep = (e) => {
    setDep(e.target.value);
  };
  const handleSetDepNo = (e) => {
    setDepNo(e.target.value);
  };
  const handleSetpw = (e) => {
    setPw(e.target.value);
  };
  const handleSetemail = (e) => {
    setEmail(e.target.value);
  };

  const onClickEdit = (e) => {
    if (e.target.parentElement.children[1].classList.length > 1) {
      e.target.parentElement.children[1].className = "signup-input";
    } else {
      e.target.parentElement.children[1].className += " readonly";
    }
  };

  return (
    <div className="userinfo">
      <p>회원정보</p>

      <div className="userinfo-container">
        <div className="signup-container">
          <p className="signup-title">이름</p>
          <input
            className="signup-input readonly"
            value={name}
            onChange={handleSetName}
          ></input>
          <button
            onClick={(e) => {
              onClickEdit(e);
            }}
          >
            수정
          </button>
        </div>
        <div className="signup-hh">
          <div className="signup-half signup-container">
            <p className="signup-title">학교</p>
            <input
              className="signup-input readonly"
              value={dep}
              onChange={handleSetDep}
            ></input>
            <button
              onClick={(e) => {
                onClickEdit(e);
              }}
            >
              수정
            </button>
          </div>

          <div className="signup-half signup-container">
            <p className="signup-title">학과</p>
            <input
              className="signup-input readonly"
              value={depNo}
              onChange={handleSetDepNo}
            ></input>
            <button
              onClick={(e) => {
                onClickEdit(e);
              }}
            >
              수정
            </button>
          </div>
        </div>

        <div className="signup-container">
          <p className="signup-title">아이디</p>
          <div className="signup-input readonly">{user.user_id}</div>
        </div>

        <div className="signup-container">
          <p className="signup-title">비밀번호</p>
          <input
            className="signup-input readonly"
            value={pw}
            onChange={handleSetpw}
          ></input>
          <button
            onClick={(e) => {
              onClickEdit(e);
            }}
          >
            수정
          </button>
        </div>

        <div className="signup-container ">
          <p className="signup-title">이메일</p>
          <input
            className="signup-input readonly"
            value={email}
            onChange={handleSetemail}
          ></input>
          <button
            onClick={(e) => {
              onClickEdit(e);
            }}
          >
            수정
          </button>
        </div>
      </div>

      <div>
        <button>취소</button>
        <button>저장하기</button>
      </div>
    </div>
  );
}
