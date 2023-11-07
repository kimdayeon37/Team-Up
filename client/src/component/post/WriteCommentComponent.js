import axios from "axios";
import { useEffect, useState } from "react";

export default function WriteCommentComponent({
  reload,
  setReload,
  postNo,
  modal,
  setModal,
  setModalType,
  setContentID,
  display,
  parentNo,
  commentNo, //
  type,
  commentValue, //수정용
}) {
  //댓글달기
  const [textValue, setTextValue] = useState(commentValue || "");

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  //답글=>빈칸, 수정=>이전내용
  useEffect(() => {
    if (type === "edit") {
      setTextValue(commentValue);
    } else {
      setTextValue("");
    }
  }, [type]);

  //등록누르면 댓글 작성창닫기
  const checkFalse = () => {
    const checkboxes = document.getElementsByName("checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  //등록버튼 누르면
  function onClickComment() {
    if (textValue.length > 0) {
      if (type === "edit") {
        axios
          .put("/api/comments/update", {
            param: [{ comment_content: textValue }, commentNo],
          })
          .then((response) => {
            setTextValue("");
            setReload(!reload);
            checkFalse();
          })
          .catch(function (error) {
            console.log(error.config);
          });
      } else {
        axios
          .post("/api/comments/insert", {
            param: {
              post_no: postNo,
              user_no: localStorage.getItem("no"),
              comment_content: textValue,
              comment_parent_no: parentNo || null,
            },
          })
          .then((response) => {
            setTextValue("");
            setReload(!reload);
            checkFalse();
          })
          .catch(function (error) {
            console.log(error.config);
          });
      }
    } else {
      setModalType(1);
      setContentID(9);
      setModal(!modal);
    }
  }
  return (
    <div className={`comment-box shadow comment-${display}`}>
      {type === "reply" ? (
        <div className="reply-icon">
          <div className="reply-rotate"></div>
        </div>
      ) : null}
      <div className="comment-write-box write">
        <input
          className="comment-write"
          type="text"
          placeholder="댓글을 입력하세요"
          value={textValue}
          onChange={(e) => {
            handleSetValue(e);
          }}
        ></input>
        <div className="comment-length">{textValue.length}</div>
        <div> / 200</div>
      </div>
      <button
        className="btn-write"
        onClick={() => {
          onClickComment();
        }}
      >
        작성하기
      </button>
    </div>
  );
}
