import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { lnbIdList } from "../common/lnbID";
import "./LocalNavBarComponent.css";

function LocalNavBarComponent() {
  const nowParams = useParams();

  // 해당 카테고리 리스트 가져오기
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/categories/lnblists/" + lnbIdList[nowParams.Category])
      .then((response) => {
        console.log(data);
        setData(response.data.data);
      });
  }, [nowParams]);

  const lnbList = data.map((cat) => {
    return (
      <li
        id={cat.cat_no}
        className={cat.cat_name == nowParams.Sub ? "item-checked" : ""}
      >
        <Link to={`/${nowParams.Category}/${cat.cat_name}?currentPage=1`}>
          {cat.cat_name}
        </Link>
        <div className="underline"></div>
      </li>
    );
  });

  return (
    <div className="lnb">
      <div className="gnb-item">{nowParams.Category}</div>
      <div className="lnb-items">{lnbList}</div>
    </div>
  );
}

export default LocalNavBarComponent;
