import "./MyPageComponent.css";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import ImageComponent from "../common/ImageComponent";

import { Link } from "react-router-dom";
import CurrentComponent from "../forum/CurrentComponent.js";
import DoneComponent from "../forum/DoneComponent.js";
import { useNavigate } from "react-router-dom";

export default function MyPageComponent() {
  //현재진행프젝 완료프젝
  let [project, setProject] = useState(0);
  const handleProject = () => {
    if (project === 0) {
      setProject(1);
    } else {
      setProject(0);
    }
  };

  const userList = {
    user_name: localStorage.getItem("name"),
    user_class: 1,
    user_department: localStorage.getItem("university"),
    user_department_number: localStorage.getItem("major"),
    user_id: localStorage.getItem("login_id"),
    user_info: localStorage.getItem("info"),
  };

  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);
  const navigate = useNavigate();

  const logOut = () => {
    removeCookie(["authorization"]);
    localStorage.removeItem("name");
    localStorage.removeItem("no");
    localStorage.removeItem("major");
    localStorage.removeItem("university");
    localStorage.removeItem("login_id");
    localStorage.removeItem("info");
    // 쿠키를 삭제
    // 메인 페이지로 이동
    navigate("/");
  };
  return (
    <div className="mypage">
      <div className="mypage-header">
        <div className="mypage-profile shadow">
          <div className="profile-left">
            <div className="profile-left-top">
              <img
                src={ImageComponent.Profile_user}
                className="img_profile"
              ></img>
              <div>
                <a>{userList.user_name}</a>
                <a>{userList.user_id}</a>
              </div>
            </div>
            <div className="profile-left-bottom">
              <a>{userList.user_department}</a>
              <a>|</a>
              <a>{userList.user_department_number}</a>

              <button onClick={logOut}>로그아웃</button>
              <br></br>
              <br></br>

              <p>{userList.user_info}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="forum-search">
        <a
          className={project === 0 ? "checked" : ""}
          onClick={() => handleProject()}
        >
          현재 진행중인 프로젝트
        </a>
        <a
          className={project === 0 ? "" : "checked"}
          onClick={() => handleProject()}
        >
          진행 완료 프로젝트
        </a>
      </div>
      {project == 0 ? <CurrentComponent /> : <DoneComponent />}
    </div>
  );
}
