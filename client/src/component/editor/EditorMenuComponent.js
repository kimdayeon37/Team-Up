import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Editor.css";

import ImageComponent from "../common/ImageComponent";
import Modal from "../Modal/Modal";
import { lnbIdList, getLnbName } from "../common/lnbID";
import { useNavigate, useParams } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import DraftComponent from "../dropdown/DraftComponent";

function EditorMenuComponent() {
  const [titleValue, setTitleValue] = useState(""); //제목 입력
  const handleSetValue = (e) => {
    setTitleValue(e.target.value);
  };

  const [dHead, setdHead] = React.useState(false); //드롭박스

  const ref = useRef(); //말머리 외부영역클릭
  const handleClickOutSide = (e) => {
    if (dHead && !ref.current.contains(e.target)) {
      setdHead(false);
    }
  };
  useEffect(() => {
    if (dHead) document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const nowParams = useParams();

  const [headList, setHeadList] = useState([]);
  useEffect(() => {
    axios.get("/api/heads/" + lnbIdList[nowParams.Sub]).then((response) => {
      setHeadList(response.data.data);
    });
  }, []);

  const [selectHead, setSelectHead] = useState("모집 상태"); //선택한 말머리
  const [selectHeadNo, setSelectHeadNo] = useState(null); //말머리 넘버
  const onClickHead = (e) => {
    setSelectHead(e.target.textContent);
    setSelectHeadNo(e.target.id);
  };

  const heads = headList.map((head) => {
    return (
      <li onClick={onClickHead} id={head.head_no}>
        {head.head_name}
        <img src={ImageComponent.Check} className="img_check"></img>
      </li>
    );
  });

  //임시저장
  const [draft, setDraft] = useState(false);
  function onClickDraft(e) {
    if (e.target.innerText == "임시저장") {
      setDraft(!draft);
    }
  }

  // 모달 관련 함수 선언,
  const [modal, setModal] = useState(false);
  const [contentid, setContentID] = useState();
  const [modalType, setModalType] = useState(1);
  const [modalEvent, setModalEvent] = useState(); //모달이 가질 이벤트

  const navigate = useNavigate();
  const onClickModal = (e) => {
    if (e.target.innerText == "취소") {
      setModalEvent(() => {
        const newpage = () => {
          navigate(-1);
        };
        return newpage;
      });
      setModal(!modal);
      setModalType(2);
      setContentID(4);
    } else if (e.target.innerText === "등록") {
      if (!titleValue || !text || selectHeadNo === "말머리") {
        setModal(!modal);
        setModalType(1);
        setContentID(4);
      } else {
        onClickPost();
      }
    }
  };

  const [thumbnailUrl1, setThumbnailUrl1] = useState("");
  //썸네일
  const ThumbnailOnChange = async (e) => {
    let filename = document.getElementsByClassName("thumbnail-text")[0];
    const inputfile = document.getElementById("thumbnail-input");
    if (inputfile.files[0] == undefined) {
      filename.innerText = "";
      return;
    }
    const file = inputfile.files[0];
    const formData = new FormData();
    formData.append("file", file); // formData는 키-밸류 구조
    var size;
    {
      nowParams.Sub === "집회 리뷰"
        ? (size = 2) //집회 리뷰 661:396
        : nowParams.Sub === "전시회"
        ? (size = 3) //전시회 800:1200
        : (size = 1); //나머지 346:251
    }
    try {
      const result = await axios.post(`/api/files/upload/${size}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setThumbnailUrl1(result.data.fileurl);
    } catch (error) {
      console.log(error);
    }

    filename.innerText = inputfile.files[0].name;
  };
  const ThumbnailInput = useRef();
  const onCickThumbnailUpload = () => {
    ThumbnailInput.current.click();
  };

  //체크박스
  const [iChecked, setIChecked] = useState(0);
  const checkHandler = ({ target }) => {
    if (iChecked == 0) {
      setIChecked(1);
    } else {
      setIChecked(0);
    }
  };
  //게시글등록
  function onClickPost() {
    axios
      .post("/api/posts/insert", {
        param: {
          user_no: localStorage.getItem("no"),
          cat_no: lnbIdList[nowParams.Sub],
          head_no: selectHeadNo,
          post_title: titleValue,
          post_content: text,
          post_status: 1,
          post_is_important: iChecked,
          post_thumb1: thumbnailUrl1,
        },
      })
      .then((response) => {
        navigate(`/${nowParams.Category}/${nowParams.Sub}?currentPage=1`);
      })
      .catch(function (error) {
        console.log(error.config);
      });
  }

  // quill 본문
  const [text, setText] = useState();

  return (
    <div className="board">
      {/* 위 */}
      <div className="board-top board-flex">
        <a>글쓰기</a>
        <button className="board-top-btn middle-margin" onClick={onClickDraft}>
          임시저장
          {draft ? <DraftComponent setDraft={setDraft} /> : null}
        </button>

        {/* 모달 주는법
        모달여는 버튼에 아이디(모달에 있는 리스트 참고)주고 onclick={openModal},         
        <Modal open={modal} close={openModal} content={contentid} /> 
        경우의수로 아이디 바꿔야하나? 그건생각못했네
        */}
        <Modal
          open={modal}
          close={() => {
            setModal(!modal);
          }}
          type={modalType}
          content={contentid}
          modalEvent={modalEvent}
        />

        <button className="board-top-btn" onClick={onClickModal}>
          취소
        </button>
        <button className="board-top-btn btn-write" onClick={onClickModal}>
          등록
        </button>
      </div>
      <hr />

      {/* 중간 */}
      <div className="board-mid ">
        <div className="board-mid-category">
          <div
            className="dropdown"
            onMouseUpCapture={() => setdHead(!dHead)}
            ref={ref}
          >
            {selectHead}
            <div
              className="dropdown-list"
              style={{ display: dHead === true ? "block" : "none" }}
            >
              {/* 말머리 리스트 */}
              <ul>{heads}</ul>
            </div>
            <img
              src={
                dHead === true
                  ? ImageComponent.Dropdown_Up
                  : ImageComponent.Dropdown
              }
              className="img_dropdown"
            ></img>
          </div>
        </div>
        <input
          id="thumbnail-input"
          type="file"
          style={{ display: "none" }}
          ref={ThumbnailInput}
          onChange={ThumbnailOnChange}
          accept=".gif, .jpg, .png"
        />

        <a className="thumbnail-text"></a>
      </div>

      {/* 아래 */}
      <div className="board-bottom ">
        <div className="board-title">
          {/* 이모티콘 들어가게 해야함 */}
          <input
            className="board-title-input"
            type="text"
            placeholder="제목을 입력해 주세요."
            value={titleValue}
            onChange={(e) => handleSetValue(e)}
          ></input>
        </div>
        <div className="board-important">
          <input
            type={"checkbox"}
            id="chk_imp"
            onChange={(e) => checkHandler(e)}
          ></input>
          <label for="chk_imp">
            <img src={ImageComponent.Check_Red} className="img_checkred"></img>
          </label>
          <a>중요글 등록</a>
        </div>
      </div>

      {/* Quill */}
      <EditorComponent text={text} setText={setText} />
    </div>
  );
}

export default EditorMenuComponent;
