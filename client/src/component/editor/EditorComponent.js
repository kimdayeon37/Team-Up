import axios from "axios";
import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ResizeModule from "@botom/quill-resize-module";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
Quill.register("modules/resize", ResizeModule);

//쓰기전용
function EditorComponent(props) {
  const quillRef = useRef();
  const videoRef = useRef();
  // 이미지 처리를 하는 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", ".gif, .jpg, .png");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file); // formData는 키-밸류 구조

      try {
        const result = await axios.post("/api/files/upload/0", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const IMG_URL = result.data.fileurl;
        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
        const range = editor.getSelection();
        console.log(editor);
        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  //비디오처리
  let ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  //비디오처리..
  function promptInput(callback, event) {
    let prompt = document.getElementsByClassName("ql-container")[0];
    const DivSo = document.getElementsByClassName("ql-bySo")[0];
    if (prompt) {
      if (prompt.childElementCount === 3) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("ql-tooltip", "ql-editing", "ql-bySo");
        newDiv.setAttribute("data-mode", "video");
        const newInput = document.createElement("input");
        newInput.setAttribute("placeholder", "Embed URL");
        newInput.classList.add("input-bySo");
        newDiv.appendChild(newInput);
        const newA = document.createElement("a");
        newA.classList.add("ql-action");
        newA.id = "ql-so";
        newDiv.appendChild(newA);
        newDiv.style.display = "block";
        prompt.appendChild(newDiv);
      } else {
        if (DivSo.style.display == "block") DivSo.style.display = "none";
        else DivSo.style.display = "block";
      }
    } else {
      DivSo.style.display = "none";
    }

    document.getElementById("ql-so").onclick = () => {
      const InputSo = document.getElementsByClassName("input-bySo")[0];
      if (InputSo.value.length > 0) {
        const DivSo = document.getElementsByClassName("ql-bySo")[0];
        DivSo.style.display = "none";
        callback(InputSo.value);
      }
    };
  }

  //영상링크 수정
  function getVideoUrl(url) {
    let match =
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
      ) ||
      url.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
      ) ||
      url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
    if (match && match[2].length === 11) {
      return "https" + "://www.youtube.com/embed/" + match[2] + "?showinfo=0";
    }
    if ((match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))) {
      // eslint-disable-line no-cond-assign
      return (
        (match[1] || "https") + "://player.vimeo.com/video/" + match[2] + "/"
      );
    }
    return null;
  }

  function videoHandler() {
    promptInput((value) => {
      const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
      const range = editor.getSelection(true);
      const videoUrl = getVideoUrl(value);
      if (videoUrl !== null) {
        editor.insertEmbed(range.index, "video", videoUrl);
        editor.setSelection(range.index + 1);
      }
    });
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          // [{ 'font': [] }],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
      },
      resize: {
        locale: {
          // change them depending on your language
          altTip: "Hold down the alt key to zoom",
          floatLeft: "왼쪽",
          floatRight: "Right",
          center: "Center",
          restore: "Restore",
        },
      },
    };
  }, []);

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  const onChange = (e) => {
    props.setText(e);
  };

  return (
    <div className="editor">
      <ReactQuill
        ref={quillRef}
        style={{ height: "600px" }}
        theme="snow"
        value={props.text || ""}
        modules={modules}
        formats={formats}
        onChange={(content, delta, source, editor) => {
          onChange(editor.getHTML());
        }}
      />
    </div>
  );
}
export default EditorComponent;
