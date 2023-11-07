import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import ReCaptcha from "../common/ReCaptchaComponent";
import Modal from "../Modal/Modal";

import "./Signup.css";

export default function SUComponent({ setStep }) {
  const navigate = useNavigate();

  //에러가 있으면 false
  const [nameValue, setNameValue] = useState(""); //이름 입력
  const [nameError, setNameError] = useState(false);
  const [yearValue, setYearValue] = useState(""); //기수 입력
  const [yearError, setYearError] = useState(false);
  const [idValue, setIdValue] = useState(""); //아이디 입력
  const [idError, setIdError] = useState(false);
  const [idCheck, setIdCheck] = useState(""); //아이디 중복
  const [pw1Value, setPw1Value] = useState(""); //비밀번호 입력
  const [pw1Error, setPw1Error] = useState(false);
  const [pw2Value, setPw2Value] = useState(""); //비밀번호 재입력
  const [pw2Error, setPw2Error] = useState(false);
  const [emailValue, setEmailValue] = useState(""); //이메일 입력
  const [emailError, setEmailError] = useState(false);
  const [emailCheck, setEmailCheck] = useState(""); //아이디 중복 ""입력시, 사용가능true 불가능 false
  const [InfoValue, setInfoValue] = useState(""); //비밀번호 입력
  const [InfoError, setInfoError] = useState(false);

  //부서 드롭박스
  const [depDrop, setDepDrop] = useState(false); //드롭박스 열고닫기
  const ref = useRef(); //말머리 외부영역클릭
  const handleClickOutSide = (e) => {
    //드롭박스 열고닫기
    if (depDrop && !ref.current.contains(e.target)) {
      setDepDrop(false);
    }
  };
  useEffect(() => {
    //외부영역
    if (depDrop) document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const [depValue, setDepValue] = useState("학교를 선택하세요"); //선택한 힉교
  const [depError, setDepError] = useState(false); //학교 선택되었는지
  const [depCount, setDepCount] = useState(0); //한번이라도 누르면?
  const onClickHead = (e) => {
    setDepValue(e.target.textContent);
  };
  const DepList = ["광운대", "하버드대", "예일대", "프린스턴대"];
  const deps = DepList.map((dep) => {
    return (
      <li onClick={onClickHead}>
        {dep}
        <img src={ImageComponent.Check} className="img_check"></img>
      </li>
    );
  });

  useEffect(() => {
    if ((depCount === 1) & (depValue === "학교를 선택하세요")) {
      setDepError(false);
    } else setDepError(true);
  }, [depCount, depValue]);

  const [captcha, setCaptcha] = useState(false); //리캡챠
  useEffect(() => {
    if (document.getElementsByClassName("recaptcha")[0].childElementCount === 0)
      setCaptcha(true);
  });

  const handleName = (e) => {
    //이름
    const userNameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
    if (!e.target.value || !userNameRegex.test(e.target.value)) {
      setNameError(false);
    } else setNameError(true);
    setNameValue(e.target.value);
  };

  const handleYear = (e) => {
    //학과
    const userYearRegex = /^[ㄱ-ㅎ|가-힣]+$/;
    if (!e.target.value || !userYearRegex.test(e.target.value)) {
      setYearError(false);
    } else setYearError(true);
    setYearValue(e.target.value);
  };

  const handleId = (e) => {
    //아이디
    const userIdRegex = /^[a-z|A-Z|0-9|]{3,}$/;
    if (!e.target.value || !userIdRegex.test(e.target.value)) {
      setIdError(false);
    } else setIdError(true);
    setIdValue(e.target.value);
    setIdCheck("");
  };

  const handlePw1 = (e) => {
    //비밀번호1
    const userPwRegex = /^.{3,}$/;
    if (!e.target.value || !userPwRegex.test(e.target.value)) {
      setPw1Error(false);
    } else setPw1Error(true);
    setPw1Value(e.target.value);

    if (pw1Value !== "" && e.target.value === pw2Value) setPw2Error(true);
    else setPw2Error(false);
  };

  const handlePw2 = (e) => {
    //비밀번호2
    setPw2Value(e.target.value);
    if (pw1Value !== "" && pw1Value === e.target.value) setPw2Error(true);
    else setPw2Error(false);
  };

  // const handleEmail = (e) => {
  //   //아이디
  //   const userEmailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
  //   if (!e.target.value || !userEmailRegex.test(e.target.value)) {
  //     setEmailError(false);
  //   } else setEmailError(true);
  //   setEmailValue(e.target.value);
  //   // setEmailCheck("");
  // };

  const handleEmail = (e) => {
    //아이디
    const userEmailRegex = /^.{3,}$/;
    if (!e.target.value || !userEmailRegex.test(e.target.value)) {
      setEmailError(false);
    } else setEmailError(true);
    setEmailValue(e.target.value);
    setEmailCheck("");
  };

  const handleInfo = (e) => {
    //아이디
    const userInfoRegex = /^.{3,}$/;
    if (!e.target.value || !userInfoRegex.test(e.target.value)) {
      setInfoError(false);
    } else setInfoError(true);
    setInfoValue(e.target.value);
  };

  const handleDup = (e) => {
    if (e.target.className === "btn-checkId") {
      axios
        .post("/api/users/checkid", {
          param: {
            user_id: idValue,
          },
        })
        .then((response) => {
          if (response.data.status === "ok") {
            setIdCheck(true);
          } else {
            setIdCheck(false);
          }
        })
        .catch(function (error) {
          console.log(error.config);
        });
    } else if (e.target.className === "btn-checkEmail") {
      axios
        .post("/api/users/checkemail", {
          param: {
            user_nick: emailValue,
          },
        })
        .then((response) => {
          if (response.data.status === "ok") {
            setEmailCheck(true);
          } else {
            setEmailCheck(false);
          }
        })
        .catch(function (error) {
          console.log(error.config);
        });
    }
  };

  // 모달 관련 함수 선언,
  const [modal, setModal] = useState(false); //모달 온오프
  const [modalType, setModalType] = useState(); //모달 버튼개수
  const [contentid, setContentID] = useState(); //모달이 나타낼 글
  const [modalEvent, setModalEvent] = useState(); //모달이 가질 이벤트

  const modalHandler = (e) => {
    //가입하기
    if (e.target.innerText === "가입하기") {
      setModalType(1);
      if (
        nameError &
        yearError &
        idError &
        pw1Error &
        pw2Error &
        emailError &
        depError &
        captcha &
        idCheck &
        emailCheck
      ) {
        axios
          .post("/api/users/signup", {
            param: {
              user_name: nameValue,
              user_id: idValue,
              user_nick: emailValue,
              user_password: pw2Value,
              user_department: depValue,
              user_department_number: yearValue,
              user_info: InfoValue,
            },
          })
          .then((response) => {
            navigate("/Login");
          })
          .catch(function (error) {
            console.log(error.config);
          });
      } else {
        setModal(!modal);
        setContentID(4);
      }
    }
    //취소
    else {
      setModalEvent(() => {
        const newState = () => {
          setStep(1);
        };
        return newState;
      });
      setModalType(2);
      setContentID(1);
      setModal(!modal);
    }
  };

  return (
    <>
      <div className="Signup">
        <div>
          <div className="signup-container">
            <p className="signup-title">이름</p>
            <input
              className="signup-input"
              placeholder="이름을 입력하세요"
              value={nameValue}
              onChange={(e) => handleName(e)}
            ></input>
            {nameValue && !nameError && (
              <>
                <img src={ImageComponent.Error} className="img_error"></img>
                <div className="invalid-input">
                  한글을 사용하세요. (특수기호, 공백 사용 불가)
                </div>
              </>
            )}
          </div>
          <div className="signup-hh">
            <div className="signup-half signup-container">
              <p className="signup-title">학교</p>

              <div
                className="signup-input signup-dropdown"
                onMouseUpCapture={() => {
                  setDepCount(1);
                  setDepDrop(!depDrop);
                }}
                ref={ref}
              >
                {depValue}
                <div
                  className="dropdown-list"
                  style={{ display: depDrop === true ? "block" : "none" }}
                >
                  {/* 학교 리스트 */}
                  <ul>{deps}</ul>
                </div>
                <img
                  src={
                    depDrop === true
                      ? ImageComponent.Dropdown_Up
                      : ImageComponent.Dropdown
                  }
                  className="img_dropdown"
                ></img>
              </div>
              {!depError && (
                <>
                  <div className="invalid-input">학교를 선택해주세요</div>
                </>
              )}
            </div>

            <div className="signup-half signup-container">
              <p className="signup-title">학과</p>
              <input
                className="signup-input"
                placeholder="학과를 입력하세요"
                value={yearValue}
                onChange={(e) => handleYear(e)}
              ></input>
              {yearValue && !yearError && (
                <>
                  <img src={ImageComponent.Error} className="img_error"></img>
                  <div className="invalid-input">
                    한글을 사용하세요. (특수기호, 공백 사용 불가)
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="signup-container chk-dup">
            <p className="signup-title">아이디</p>
            <input
              className="signup-input"
              placeholder="아이디를 입력하세요"
              value={idValue}
              onChange={(e) => handleId(e)}
            ></input>
            <button className="btn-checkId" onClick={handleDup}>
              중복체크
            </button>
            {idValue && !idError && (
              <>
                <img src={ImageComponent.Error} className="img_error"></img>
                <div className="invalid-input">
                  영문자, 숫자만 입력 가능합니다. 최소 3자 이상 입력하세요.
                </div>
              </>
            )}
            {idValue &&
              idCheck !== "" &&
              (idCheck ? (
                <div className="check-input">사용가능한 아이디입니다.</div>
              ) : (
                <div className="check-input impossible">
                  이미 사용중인 아이디입니다.
                </div>
              ))}
          </div>

          <div className="signup-container">
            <p className="signup-title">비밀번호</p>
            <input
              type={"password"}
              className="signup-input"
              placeholder="비밀번호를 입력하세요"
              value={pw1Value}
              onChange={(e) => handlePw1(e)}
            ></input>
            {pw1Value && !pw1Error && (
              <>
                <img src={ImageComponent.Error} className="img_error"></img>
                <div className="invalid-input">최소 3자 이상 입력하세요</div>
              </>
            )}
          </div>

          <div className="signup-container">
            <p className="signup-title">비밀번호 재확인</p>
            <input
              type={"password"}
              className="signup-input"
              placeholder="비밀번호를 재입력하세요"
              value={pw2Value}
              onChange={(e) => handlePw2(e)}
            ></input>
            {pw2Value && !pw2Error && (
              <>
                <img src={ImageComponent.Error} className="img_error"></img>
                <div className="invalid-input">
                  입력하신 비밀번호와 재확인 비밀번호가 일치하지 않습니다.
                </div>
              </>
            )}
          </div>

          <div className="signup-container chk-dup">
            <p className="signup-title">닉네임</p>
            <input
              className="signup-input"
              placeholder="닉네임을 입력하세요"
              value={emailValue}
              onChange={(e) => handleEmail(e)}
            ></input>
            <button className="btn-checkEmail" onClick={handleDup}>
              중복체크
            </button>
            {emailValue && !emailError && (
              <>
                <img src={ImageComponent.Error} className="img_error"></img>
                <div className="invalid-input">최소 3자 이상 입력하세요</div>
              </>
            )}
            {emailValue &&
              emailCheck !== "" &&
              (emailCheck ? (
                <div className="check-input">사용가능한 닉네임입니다.</div>
              ) : (
                <div className="check-input impossible">
                  이미 사용중인 닉네임입니다.
                </div>
              ))}
          </div>
        </div>

        <div className="signup-container chk-info">
          <p className="signup-title">자기소개</p>
          <input
            className="signup-input"
            placeholder="자신을 소개해주세요"
            value={InfoValue}
            onChange={(e) => handleInfo(e)}
          ></input>

          {InfoValue && !InfoError && (
            <>
              <img src={ImageComponent.Error} className="img_error"></img>
              <div className="invalid-input signup-input2">
                최소 3자 이상 입력하세요.
              </div>
            </>
          )}
        </div>

        <ReCaptcha setCaptcha={setCaptcha} />

        <div className="check-buttons">
          <button onClick={modalHandler}>취소</button>
          <button className="btn-write" onClick={modalHandler}>
            가입하기
          </button>
        </div>
      </div>

      <Modal
        open={modal}
        close={() => {
          setModal(!modal);
        }}
        type={modalType}
        content={contentid}
        modalEvent={modalEvent}
      />
    </>
  );
}
