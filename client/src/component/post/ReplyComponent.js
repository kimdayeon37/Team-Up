import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import WriteCommentComponent from "./WriteCommentComponent";

function ReplyComponent({
  postNo,
  parent_no,
  reload,
  setReload,
  modal,
  setModal,
  setModalType,
  setModalEvent,
  setContentID,
}) {
  const nowParams = useParams();
  const [replyList, setReplyList] = useState([]);
  const [type, setType] = useState(false);
  useEffect(() => {
    axios.get("/api/comments/" + postNo + "/" + parent_no).then((response) => {
      setReplyList(response.data.data);
    });
  }, [nowParams, reload]);

  //댓글 삭제전 모달
  const DeleteModal = (e) => {
    setModalType(2);
    setContentID(5);
    setModalEvent(() => {
      const deleteC = () => {
        DeleteComment(e);
      };
      return deleteC;
    });
    setModal(!modal);
  };

  //댓글삭제
  const DeleteComment = (e) => {
    axios
      .delete("/api/comments/delete/" + e.target.id)
      .then((response) => {
        setModalType(1);
        setContentID(10);
        setModalEvent(() => {
          const reloadPage = () => {
            setReload(!reload);
            setModal(false);
          };
          return reloadPage;
        });
        setModal(!modal);
      })
      .catch((e) => console.log(e));
  };

  const checkOnlyOne = (checkThis) => {
    setType(checkThis.id.split("-")[1]);
    const checkboxes = document.getElementsByName("checkbox");

    //답글 수정 클릭에따른 클래스수정
    if (
      // 누르기 전 상태
      checkThis.parentNode.parentNode.parentNode.children[2].classList
        .length === 3
    ) {
      // reply or edit 추가
      checkThis.parentNode.parentNode.parentNode.children[2].className += ` ${
        checkThis.id.split("-")[1]
      }`;
    } else {
      if (
        // 이미 수정인데 수정 누르거나 답글인데 답글 누를경우
        checkThis.parentNode.parentNode.parentNode.children[2].classList[3] ===
        `${checkThis.id.split("-")[1]}`
      ) {
        //해당 클래스 제거
        checkThis.parentNode.parentNode.parentNode.children[2].classList.remove(
          `${checkThis.id.split("-")[1]}`
        );
      } else {
        // 서로 다른거 누를경우 변경
        checkThis.parentNode.parentNode.parentNode.children[2].classList.replace(
          checkThis.parentNode.parentNode.parentNode.children[2].classList[3],
          `${checkThis.id.split("-")[1]}`
        );
      }
    }

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] != checkThis) {
        checkboxes[i].checked = false;
        if (
          //reply, edit 이 있으면
          checkboxes[i].parentNode.parentNode.parentNode.children[2].classList
            .length !== 3 &&
          checkThis.parentNode.parentNode.parentNode.children[2] !==
            checkboxes[i].parentNode.parentNode.parentNode.children[2]
        ) {
          // reply, edit 제거
          checkboxes[
            i
          ].parentNode.parentNode.parentNode.children[2].classList.remove(
            checkboxes[i].parentNode.parentNode.parentNode.children[2]
              .classList[3]
          );
        }
      }
    }
  };

  const reply = replyList.map((replies) => {
    return (
      <div key={replies.comment_no} className="reply-container">
        <div className="comment-top">
          <div>
            <div>
              <img src={ImageComponent.Profile_user}></img>
              <a className="comment-user">{replies.user_nick}</a>
              <a className="comment-date">
                {replies.comment_ins_date.slice(0, 10)}
              </a>
            </div>
          </div>
          {replies.comment_isdeleted === 0 ? (
            <div className="comment-btns">
              <input
                id={`check-reply-${replies.comment_no}`}
                type={"checkbox"}
                name="checkbox"
                onChange={(e) => checkOnlyOne(e.target)}
              />
              <label
                for={`check-reply-${replies.comment_no}`}
                className="comment-reply"
              >
                답글
              </label>

              <input
                id={`check-edit-${replies.comment_no}`}
                type={"checkbox"}
                name="checkbox"
                onChange={(e) => checkOnlyOne(e.target)}
              />
              <label
                for={`check-edit-${replies.comment_no}`}
                className="comment-edit"
              >
                수정
              </label>
              <a
                id={replies.comment_no}
                className="comment-delete"
                onClick={(e) => {
                  // DeleteComment(e);
                  DeleteModal(e);
                }}
              >
                삭제
              </a>
            </div>
          ) : null}
        </div>
        <div className="comment-content">{replies.comment_content}</div>

        <WriteCommentComponent
          reload={reload}
          setReload={setReload}
          postNo={postNo}
          modal={modal}
          setModal={setModal}
          setModalType={setModalType}
          setContentID={setContentID}
          display="hide"
          parentNo={replies.comment_parent_no}
          commentValue={replies.comment_content}
          commentNo={replies.comment_no}
          type={type}
        />
      </div>
    );
  });

  return <>{reply}</>;
}

export default ReplyComponent;
