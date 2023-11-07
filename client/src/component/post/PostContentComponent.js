import React, { useEffect, useState } from "react";
import ImageComponent from "../common/ImageComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditorReadComponent from "../editor/EditorReadComponent";
import { lnbIdList, getLnbName } from "../common/lnbID";

function PostContentComponent(props) {
  const nowParams = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts/findpost", {
        params: {
          postid: props.postNo,
          catid: lnbIdList[nowParams.Sub],
        },
      })
      .then((response) => {
        setPost(response.data.data[0]);
      });
  }, [props.postNo]);

  // 게시글 본문내용
  return (
    <div>
      <div className="post-main">
        <div className="post-main-title">
          <a>{post.cat_name}</a> <a> | </a>
          <a> {post.title}</a>
        </div>
        <div className="post-main-count">
          <a>조회</a> <a> {post.post_hit}</a>
          <a>댓글</a> <a> {props.commentsCount}</a>
        </div>
      </div>
      <hr></hr>
      <div className="post-regist">
        <div className="post-regist-user">
          <img src={ImageComponent.Profile_user} className="img_profile"></img>
          <a>{post.user_nick}</a>
        </div>
        <div className="post-regist-time">
          <div>{post.post_ins_date}</div>
        </div>
      </div>
      <div className="post-content">
        <EditorReadComponent content={post.post_content} />
      </div>
    </div>
  );
}

export default PostContentComponent;
