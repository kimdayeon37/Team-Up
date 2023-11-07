import React from "react";
import "./Modal.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, type, content, modalEvent, modalPara } = props;
  const contents = {
    1: {
      //회원가입
      1: [
        "애드파워 이용약관에 동의하셔야",
        <br />,
        "회원가입 하실 수 있습니다.",
      ],
      2: [
        "개인정보 수집 및 이용에 동의하셔야",
        <br />,
        "회원가입 하실 수 있습니다.",
      ],
      3: ["회원가입이 완료되었습니다.", <br />, "회원가입 하실 수 있습니다."],
      4: ["정보를 모두 입력해주십시오."],

      //글쓰기
      5: ["임시저장한 글이 삭제되었습니다."],
      6: ["작성 취소되었습니다."],
      7: ["제목을 입력해 주세요."],
      8: ["내용을 입력해 주세요."],

      //댓글
      9: ["댓글을 입력해 주세요."],
      10: ["댓글이 삭제되었습니다."],
    },
    2: {
      //회원가입
      1: ["정말 취소하시겠습니까?"],

      //글쓰기
      2: [
        "임시저장된 글을 불러오면,",
        <br />,
        "작성중인 글은 사라집니다.",
        <br />,
        "임시저장 글을 불러오시겠습니까?",
      ],
      3: [
        "삭제한 글은 복구할 수 없습니다.",
        <br />,
        "임시저장된 글을 삭제하시겠습니까?",
      ],
      4: [
        "작성 취소한 글은 복구할 수 없습니다.",
        <br />,
        "작성하던 글을 삭제하시겠습니까?",
      ],

      5: [
        "삭제한 댓글은 복구할 수 없습니다.",
        <br />,
        "정말로 댓글을 삭제하시겠습니까?",
      ],
    },
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className="shadow">
          <main>{contents[type][content] || content}</main>
          {type === 1 ? (
            <footer>
              <button className="yes" onClick={modalEvent || close}>
                확인
              </button>
            </footer>
          ) : (
            <footer>
              <button className="no" onClick={close}>
                아니요
              </button>
              <button className="yes" onClick={modalEvent}>
                예
              </button>
            </footer>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
