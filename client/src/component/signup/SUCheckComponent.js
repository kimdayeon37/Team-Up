import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./Signup.css";

export default function SUCheckComponent({ setStep }) {
  const [Checked1, setChecked1] = useState(false);
  const [Checked2, setChecked2] = useState(false);
  const checkHandler = (e) => {
    if (e.target.id == "chk_1") {
      setChecked1(!Checked1);
    } else if (e.target.id == "chk_2") {
      setChecked2(!Checked2);
    }
  };

  // 모달 관련 함수 선언,
  const [modal, setModal] = useState(false);
  const [contentid, setContentID] = useState();

  const modalHandler = () => {
    if (Checked1 & Checked2) {
      setStep(2);
    } else if (!Checked1) {
      setModal(!modal);
      setContentID(1);
    } else if (!Checked2) {
      setModal(!modal);
      setContentID(2);
    }
  };

  return (
    <div className="SUCheckComponent">
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
          <a className="chk_1">팀업 이용약관 동의 (필수)</a>
        </label>
      </div>
      <div className="terms">
        <p>팀업 이용약관 동의</p>
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
          <a className="chk_2">개인정보 수집 및 이용 동의 (필수)</a>
        </label>
      </div>
      <div className="terms">
        <p>팀업 개인정보 수집 및 이용 동의</p>
      </div>

      <div className="check-buttons">
        <Link to="/">
          <button>취소</button>
        </Link>
        <button
          className="btn-write"
          onClick={() => {
            modalHandler();
          }}
        >
          확인
        </button>
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
