import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import Modal from "../Modal/Modal";
import ReplyComponent from "./ReplyComponent";
import WriteCommentComponent from "./WriteCommentComponent";

// 코멘트마다 WriteCommentComponent 아래에 두기(none)
// 맨밑에는 block
// 답글, 수정누르면 block으로 바꾸기 (api는다르게?)

function CommentComponent({ postNo, commentsCount, setCommentsCount }) {
  const [modal, setModal] = useState(false);
  const [contentid, setContentID] = useState();
  const [modalType, setModalType] = useState(); //모달 버튼개수
  const [modalEvent, setModalEvent] = useState(); //모달이 가질 이벤트

  //댓글 불러오기
  const nowParams = useParams();
  const [type, setType] = useState(false);
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get("/api/comments/" + postNo).then((response) => {
      setComments(response.data.data);
    });

    //댓글개수
    axios.get("/api/comments/count/" + postNo).then((response) => {
      setCommentsCount(response.data.data[0].count);
    });
  }, [nowParams, reload]);

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

  const commentsList = comments.map((comment, i) => {
    return (
      <div key={comment.comment_no} className="comment-container">
        <div className="comment-top">
          <div>
            <div>
              <img src={ImageComponent.Profile_user}></img>
              <a className="comment-user">{comment.user_nick}</a>
              <a className="comment-date">
                {comment.comment_ins_date.slice(0, 10)}
              </a>
            </div>
          </div>
          {comment.comment_isdeleted === 0 ? (
            <div className="comment-btns">
              <input
                id={`check-reply-${comment.comment_no}`}
                type={"checkbox"}
                name="checkbox"
                onChange={(e) => checkOnlyOne(e.target)}
              />
              <label
                htmlFor={`check-reply-${comment.comment_no}`}
                className="comment-reply"
              >
                답글
              </label>

              <input
                id={`check-edit-${comment.comment_no}`}
                type={"checkbox"}
                name="checkbox"
                onChange={(e) => checkOnlyOne(e.target)}
              />
              <label
                htmlFor={`check-edit-${comment.comment_no}`}
                className="comment-edit"
              >
                수정
              </label>
              <a
                id={comment.comment_no}
                className="comment-delete"
                onClick={(e) => {
                  DeleteModal(e);
                }}
              >
                삭제
              </a>
            </div>
          ) : null}
        </div>
        <div className="comment-content">{comment.comment_content}</div>
        <WriteCommentComponent
          reload={reload}
          setReload={setReload}
          postNo={postNo}
          modal={modal}
          setModal={setModal}
          setModalType={setModalType}
          setContentID={setContentID}
          display="hide"
          parentNo={comment.comment_no}
          commentNo={comment.comment_no}
          commentValue={comment.comment_content}
          type={type}
        />

        <ReplyComponent
          parent_no={comment.comment_no}
          reload={reload}
          setReload={setReload}
          postNo={postNo}
          modal={modal}
          setModal={setModal}
          setModalType={setModalType}
          setModalEvent={setModalEvent}
          setContentID={setContentID}
        />
        <hr className="dotted-line" />
      </div>
    );
  });

  //댓글달기
  const [textValue, setTextValue] = useState("");
  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  useEffect(() => {
    document.getElementsByClassName("comment-length")[0].innerHTML =
      textValue.length;
  }, [textValue]);

  //댓글에 들어갈 param

  return (
    <div className="comment">
      <div className="comment-count">
        <img src={ImageComponent.Comment} className="img_comment"></img>
        <a> 댓글</a> <a>{commentsCount}</a>
      </div>
      <div className="comment-view">
        {/*대댓글 만들어야함 */}
        {comments.length != 0 ? (
          commentsList
        ) : (
          <div className="no-comment">등록된 댓글이 없습니다.</div>
        )}
      </div>

      <WriteCommentComponent
        reload={reload}
        setReload={setReload}
        postNo={postNo}
        modal={modal}
        setModal={setModal}
        setModalType={setModalType}
        setContentID={setContentID}
        display="show"
      />

      {/* 모달 */}
      <Modal
        open={modal}
        close={() => {
          setModal(!modal);
        }}
        type={modalType}
        content={contentid}
        modalEvent={modalEvent}
      />
    </div>
  );
}

export default CommentComponent;
