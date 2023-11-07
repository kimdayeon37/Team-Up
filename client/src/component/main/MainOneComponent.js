import axios from "axios";
import React, { useEffect } from "react";
import ImageComponent from "../common/ImageComponent";
import CardDepartmentComponent from "./CardDepartmentComponent";
import "./MainComponent.css";
import { Link } from "react-router-dom";

function MainOneComponent() {
  return (
    <>
      <div className="main1">
        <Link to={`/팀플/소프트웨어?currentPage=1`}>
          <div className="main1-pi">
            <div className="main1-post">
              <p className="main1-post-week"> TeamPlay</p>
              <p className="main1-post-title clamp2">
                팀플 과제가 생기셨나요? 함께할 팀원들 찾으러 가기
              </p>
              <button className="main1-post-go">보러가기</button>
            </div>
            <div className="main1-post-img">
              <img src={ImageComponent.Gym} className="main1-img-img"></img>
            </div>
          </div>

          <CardDepartmentComponent />
        </Link>
      </div>
    </>
  );
}

export default MainOneComponent;
