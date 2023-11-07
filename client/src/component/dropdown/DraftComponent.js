import React, { useState } from "react";
import "./DraftComponent.css";
import ImageComponent from "../common/ImageComponent";

export default function DraftComponent(props) {
  const mark = [
    {
      date: "2022-11-02",
      startTime: "07:00",
      endTime: "10:00",
      title: "부서인의 아침",
    },
  ];

  return (
    <div className="draft shadow">
      <div className="draft-top">
        <a className="draft-head">임시저장된 글</a>
        <img
          src={ImageComponent.Close}
          className="img_close"
          onClick={() => {
            props.setDraft(false);
          }}
        ></img>
      </div>
      <div className="draft-list">
        <div className="draft-list-head">
          <a>총 </a>
          <a className="draft-count"> 0</a>
          <a>개</a>
          <a className="draft-deleteall">전체삭제</a>
        </div>

        <hr />
      </div>
    </div>
  );
}
