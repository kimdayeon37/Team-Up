import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";

function HeartListComponent({ postNo }) {
  // 좋아요 인원 표시 컴포넌트

  //유저 좋아요체크
  const [isLike, setIsLike] = useState(false);
  const [likeNo, setLikeNo] = useState();
  //현재 게시글 좋아요 리스트
  const [likeList, setLikeList] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    axios
      .get("/api/likes/", { params: { post_no: postNo, user_no: 1 } })
      .then((response) => {
        setIsLike(response.data.data.result);
        if (response.data.data.likes[0] != undefined) {
          setLikeNo(response.data.data.likes[0].like_no);
        }
      });
    //좋아요 카운트
    axios.get("/api/likes/" + postNo).then((response) => {
      setLikeList(response.data.data);
      setLikeCount(response.data.data.length);
    });
  }, [isLike, postNo]);

  //좋아요 온오프
  // true면 취소하는거니까 삭제
  function onlikeClick() {
    setIsLike((isLike) => !isLike);
    if (isLike) {
      axios
        .delete("/api/likes/delete/" + likeNo) //라이크 넘버 넣기
        .then((response) => {})
        .catch(function (error) {
          console.log(error.config);
        });
    } else {
      axios
        .post("/api/likes/insert", {
          param: {
            post_no: postNo,
            user_no: localStorage.getItem("no"),
          },
        })
        .then((response) => {})
        .catch(function (error) {
          console.log(error.config);
        });
    }
  }

  //좋아요 리스트 출력
  const likeL = likeList.map((item) => {
    return (
      <div key={item.user_nick} className="grid-item">
        <img src={ImageComponent.Profile_user}></img>
        <a>{item.user_nick}</a>
      </div>
    );
  });

  return (
    <>
      <div className="post-like-count">
        <img
          src={
            isLike == true ? ImageComponent.Heart : ImageComponent.Empty_Heart
          }
          className="img_heart"
          onClick={() => {
            onlikeClick();
          }}
        ></img>
        <a> 좋아요</a> <a>{likeCount}</a>
        <img src={ImageComponent.Dropdown} className="img_dropdown"></img>
      </div>

      <div className="post-like-grid">
        <div>{likeL}</div>
      </div>
    </>
  );
}

export default HeartListComponent;
