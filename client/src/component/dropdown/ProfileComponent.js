import { React, useState } from "react";
import "./ProfileComponent.css";
import ImageComponent from "../common/ImageComponent";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProfileComponent() {
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);

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
    window.location.reload();
  };

  return (
    <div className="profile shadow">
      <div className="profile-top">
        <img src={ImageComponent.Profile_user} className="img_profile"></img>
        <a className="profile-name">{localStorage.getItem("name")}</a>
        <button className="profile-logout" onClick={logOut}>
          로그아웃
        </button>
      </div>
      <hr />
      <div className="profile-bottom">
        <Link to="/Mypage" className="profile-mypage">
          마이페이지
        </Link>
      </div>
    </div>
  );
}
