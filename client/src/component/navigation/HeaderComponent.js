import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import AlarmComponent from "../dropdown/AlarmComponent";
import CalendarComponent from "../dropdown/CalendarComponent";
import ProfileComponent from "../dropdown/ProfileComponent";

import "./HeaderComponent.css";
function Header() {
  const nowLocation = useLocation();
  const [profile, setProfile] = useState(false);
  function onClickProfile(e) {
    if (e.target.parentElement.className == "header-profile-none") {
      setProfile(!profile);
    }
  }

  const [alarm, setAlarm] = useState(false);
  function onClickCAlarm() {
    setAlarm(!alarm);
  }

  const [calendar, setCalendar] = useState(false);
  function onClickCalendar() {
    setCalendar(!calendar);
  }

  const refP = useRef(); //프로필 외부영역클릭
  const refA = useRef(); //알림 외부영역클릭
  const refC = useRef(); //캘린더 외부영역클릭

  const handleClickOutSide = (e) => {
    if (profile && !refP.current.contains(e.target)) {
      setProfile(!profile);
    } else if (alarm && !refA.current.contains(e.target)) {
      setAlarm(!alarm);
    } else if (calendar && !refC.current.contains(e.target)) {
      setCalendar(!calendar);
    }
  };
  useEffect(() => {
    if (profile) document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  useEffect(() => {
    if (alarm) document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  useEffect(() => {
    if (calendar) document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const [name, setName] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);
  let [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("name")) {
      setLogin(true);
    } else setLogin(false);
  });

  useEffect(() => {
    setName(localStorage.getItem("name"));
  });

  const [alarms, setAlarms] = useState([]); //데이터
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/notifications/` + localStorage.getItem("no"))
      .then((response) => {
        setAlarms(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [nowLocation, reload, alarm]);

  return (
    <div className="header">
      {/* 좌측 */}
      <div className="header-logo">
        <Link to="/">
          <img src={ImageComponent.Logo} className="img_logo"></img>
        </Link>
      </div>

      {/* 우측 */}
      <div className="header-wrap">
        {!login ? (
          <>
            <Link
              to="/Login"
              onClick={() => {
                setLogin(!login);
              }}
            >
              로그인
            </Link>
            <a>|</a>
            <Link to="/Signup" state={{ step: 1 }}>
              회원가입
            </Link>
          </>
        ) : (
          <>
            <div className="header-profile" ref={refP} onClick={onClickProfile}>
              <div className="header-profile-none">
                <img
                  src={ImageComponent.Profile_user}
                  className="img_profile"
                ></img>
                <a className="header-profile-name">{name}</a>
                <a> 님</a>
              </div>
              {profile ? <ProfileComponent /> : null}
            </div>

            <div className="header-alarm" ref={refA}>
              {alarm ? (
                <>
                  <img
                    src={ImageComponent.Close}
                    className="img_close"
                    onClick={() => {
                      onClickCAlarm();
                    }}
                  ></img>
                  <AlarmComponent
                    alarm={alarm}
                    setAlarm={setAlarm}
                    alarms={alarms}
                    reload={reload}
                    setReload={setReload}
                  />
                </>
              ) : (
                <img
                  src={
                    alarms.length > 0
                      ? ImageComponent.Alarm_On
                      : ImageComponent.Alarm_Off
                  }
                  className="img_alarm"
                  onClick={() => {
                    onClickCAlarm();
                  }}
                ></img>
              )}
            </div>

            <div className="header-calendar" ref={refC}>
              {calendar ? (
                <>
                  <img
                    src={ImageComponent.Close}
                    className="img_close"
                    onClick={() => {
                      onClickCalendar();
                    }}
                  ></img>
                  <CalendarComponent />
                </>
              ) : (
                <img
                  src={ImageComponent.Calendar}
                  className="img_calendar"
                  onClick={() => {
                    onClickCalendar();
                  }}
                ></img>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
