import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../common/ImageComponent.js";
import "./GlobalNavBarComponent.css";

function GlobalNavBar() {
  // 메인 배경 그라데이션 설정하기위해 gnb에 관련함수
  const location = useLocation();
  function addClassName() {
    if (location["pathname"] !== "/") {
      document.getElementById("all").className = "";
    } else {
      document.getElementById("all").className = "mainpage";
    }
  }

  useEffect(() => {
    addClassName();
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/categories/").then((response) => {
      setData(response.data.data);
    });
  }, []);

  let gnbDict = {};
  let parentDict = {};
  data.map((gl) => {
    //부모 요소 따로
    if (gl.cat_parent_no == null) {
      parentDict[gl.cat_no] = gl.cat_name;
    }
    //parent별로 나누기 gnbDict에 저장
    if (gnbDict[gl.cat_parent_no] == null) {
      gnbDict[gl.cat_parent_no] = [[gl.cat_no, gl.cat_name]];
    } else {
      const arr = gnbDict[gl.cat_parent_no];
      arr.push([gl.cat_no, gl.cat_name]);
      if (Array.isArray(arr)) gnbDict[gl.cat_parent_no] = arr;
    }
  });

  const gnbList = Object.entries(gnbDict); //딕셔너리를 리스트로 변경
  const parentList = Object.entries(parentDict); //딕셔너리를 리스트로 변경

  //큰목록
  const parentName = parentList.map((p) => {
    return <a key={p[0]}>{p[1]}</a>;
  });

  // 카테고리들
  const catdata = gnbList.map((cl) => {
    if (cl[0] != "null") {
      const category = cl[1].map((cat) => {
        return (
          <li key={cat[0]} onClick={() => setDisplay(0)}>
            <Link
              to={`/${parentDict[cl[0]]}/${cat[1]}?currentPage=1`}
              className="link"
            >
              {cat[1]}
            </Link>
          </li>
        );
      });
      return (
        <div className="gnb-item-list">
          <ul>{category} </ul>
        </div>
      );
    }
  });

  const [display, setDisplay] = useState(0); //lnb 보이게

  return (
    <div
      className="gnb"
      onMouseOver={() => setDisplay(1)}
      onMouseOut={() => setDisplay(0)}
    >
      <div className="gnb-items">{parentName}</div>
      {/* LNB 온오프 */}
      {display == 1 ? (
        <div
          className="gnb-item-cover"
          onMouseOver={() => setDisplay(1)}
          onMouseOut={() => setDisplay(0)}
        >
          <div className="shadow">{catdata}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GlobalNavBar;
