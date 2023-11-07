import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";

// import "./MainComponent.css";
export default function CardDepartmentComponent() {
  const initial = {
    소프트웨어: "팀플",
    경영: "팀플",
    "전자|정보": "팀플",
    자연과학: "팀플",
  };

  const [departments, setDepartments] = useState([[]]);
  useEffect(() => {
    axios.get("/api/mainpages/1/2").then((response) => {
      setDepartments(response.data.data);
    });
  }, []);
  let count = 1;

  const dl = departments.map((department) => {
    count += 1;
    return (
      <>
        <Link
          to={`/부서/${department.cat_name}/post?postNo=${department.post_no}&currentPage=1`}
        >
          <div className="main1-departments-dp">
            <p className="dp-initial">{initial[department.cat_name]}</p>
            {department.NEW === "True" ? (
              <p className="dp-new">New!</p>
            ) : (
              <p className="dp-new hidden">New!</p>
            )}
            <div>
              <a className="dp-name">{department.cat_name}</a>
              <img src={ImageComponent.Ar_Right} className="img_arright"></img>
            </div>
            <p className="dp-title">{department.title}</p>
          </div>
        </Link>
        {count <= departments.length ? <div className="v-line"></div> : null}
      </>
    );
  });

  return <div className="main1-departments shadow">{dl}</div>;
}
