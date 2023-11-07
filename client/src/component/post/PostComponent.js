import { React, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import "./PostComponent.css";
import PostContentComponent from "./PostContentComponent";
import ImageComponent from "../common/ImageComponent";
import HeartListComponent from "./HeartListComponent";
import CommentComponent from "./CommentComponent";
import ForumListComponent from "../forum/ForumListComponent";

function PostComponent() {
  const nowParams = useParams();
  // 게시글 하나
  const [commentsCount, setCommentsCount] = useState();
  const toEditor = `/${nowParams.Category}/${nowParams.Sub}/editor`;

  //쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();
  const postNo = searchParams.get("postNo"); //게시글번호
  useEffect(() => {
    const postNo = searchParams.get("postNo"); //게시글번호
  }, [searchParams]);
  return (
    <div className="post">
      {/* 게시글내용 */}
      <PostContentComponent commentsCount={commentsCount} postNo={postNo} />

      <div className="post-btns">
        <button className="only-write">수정</button>
        <button className="only-write">삭제</button>
        <Link to={toEditor}>
          <button className="btn-write">글쓰기</button>
        </Link>
      </div>

      <div className="post-like">
        <hr></hr>
        <HeartListComponent postNo={postNo} /> {/* 좋아요 */}
        <hr></hr>
        <CommentComponent
          postNo={postNo}
          commentsCount={commentsCount}
          setCommentsCount={setCommentsCount}
        />
        {/* 댓글 */}
        <hr className="hr-bottom"></hr>
      </div>

      <ForumListComponent />
    </div>
  );
}

export default PostComponent;
