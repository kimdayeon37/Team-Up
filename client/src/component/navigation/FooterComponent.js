import React, { useEffect, useRef, useState } from "react";
import ImageComponent from "../common/ImageComponent";
import "./FooterComponent.css";
function FooterComponent() {
  const [footershow, setFooterShow] = useState(false);
  function onFooterClick() {
    setFooterShow((footershow) => !footershow);
  }

  const ref = useRef(); // 현재접속자
  const handleClickOutSide1 = (e) => {
    if (footershow && !ref.current.contains(e.target)) {
      setFooterShow(false);
    }
  };
  useEffect(() => {
    if (footershow) document.addEventListener("click", handleClickOutSide1);
    return () => {
      document.removeEventListener("click", handleClickOutSide1);
    };
  });

  // useEffect(() => {
  //   //스타일 바꾸기
  //   if (footershow)
  //     document
  //       .getElementsByClassName("footer-useuser")[0]
  //       .setAttribute("style", "border-radius: 0px 0px 20px 20px;");
  //   else
  //     document
  //       .getElementsByClassName("footer-useuser")[0]
  //       .setAttribute("style", "");
  // });

  return (
    <div className="footer">
      <div className="footer-copyright">
        <a>@copyright TEAMUP | 팀원을 구해요, 팀업! </a>
      </div>
    </div>
  );
}

export default FooterComponent;
