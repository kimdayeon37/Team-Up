import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";

import ForumListComponent from "./ForumListComponent";

import "./ForumComponent.css";

// 게시판 컴포넌트
function ForumComponent() {
  const nowParams = useParams(); //주소에서 /:Category/:Sub

  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type");

  // 검색어 입력
  const [textValue, setTextValue] = useState(""); //제목
  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };
  useEffect(() => {
    setTextValue("");
  }, [nowParams.Sub]);

  return (
    <div className="forum">
      <div className="forum-search">
        <div className="shadow">
          <input
            className="board-title-input"
            type="text"
            placeholder="검색어를 입력하세요"
            value={textValue}
            onChange={(e) => handleSetValue(e)}
          ></input>

          <Link to={`?search=${textValue}&currentPage=1`}>
            <img src={ImageComponent.Search} className="img_search"></img>
          </Link>
        </div>
      </div>

      <ForumListComponent />
    </div>
  );
}

export default ForumComponent;
