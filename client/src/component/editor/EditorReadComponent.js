import React, { Component, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import { Quill } from "react-quill";

// 읽기전용
function EditorReadComponent(props) {
  let ReadQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const modules = {
    toolbar: false,
  };

  return <ReadQuill modules={modules} value={props.content} readOnly />;
}
export default EditorReadComponent;
