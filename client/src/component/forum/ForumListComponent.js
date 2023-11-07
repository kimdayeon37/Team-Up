import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import { lnbIdList } from "../common/lnbID";
import PagingComponent from "../post/PagingComponent";
import "./ForumComponent.css";

function ForumListComponent() {
  const nowParams = useParams();
  // 게시글 있는지 없는지

  //현재 페이지 설정 쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const currentPage = searchParams.get("currentPage");
  const postNo = searchParams.get("postNo");

  //데이터 가져오기
  const [forums, setForums] = useState([]);
  const [posts, setPosts] = useState([]);

  //페이지네이션
  const [totalPage, setTotalPage] = useState([[]]);

  useEffect(() => {
    axios
      .get("/api/posts/pagination/" + lnbIdList[nowParams.Sub], {
        params: {
          search: search,
          page: currentPage,
          perPage: 10,
        },
      })
      .then((response) => {
        setForums(response.data.data); //현재페이지, 퍼페이지, 총페이지, 게시글들
        setPosts(response.data.data.posts);
        const pageArray = Array.from(
          { length: response.data.data.totalPage },
          (v, i) => i + 1
        );
        const pageArr = [];
        for (let i = 0; i < pageArray.length; i += 5) {
          pageArr.push(pageArray.slice(i, i + 5));
        }

        // 페이지 나누기..
        if (pageArr.length !== 0) {
          setTotalPage(pageArr);
        } else {
          setTotalPage([[]]);
        }
      });
  }, [nowParams, currentPage]);

  //게시글 하나하나 => 카테고리별 게시글로 api수정
  const fl = posts.map((post) => {
    return (
      <div
        key={post.post_no}
        className={
          post.post_no == postNo
            ? "list-container now_post shadow"
            : "list-container shadow"
        }
      >
        <Link
          to={`/${nowParams.Category}/${nowParams.Sub}/post/?postNo=${
            post.post_no
          }&search=${search || ""}&currentPage=${currentPage}`}
        >
          {post.post_is_important ? (
            <div className="forum-important">
              <img src={ImageComponent.Star} className="img_star"></img>
              <img
                src={ImageComponent.Star_White}
                className="img_starwhite"
              ></img>
            </div>
          ) : (
            <a className="forum-num">{post.idx}</a>
          )}
          <a className="forum-title clamp1">{post.title}</a>
          <div className="forum-name">
            <img src={ImageComponent.Profile_user} />
            {post.user_nick}
          </div>
          <a className="forum-view">{post.post_hit}</a>
          <a className="forum-date">{post.post_ins_date.slice(0, 10)}</a>
        </Link>
      </div>
    );
  });

  return (
    <div className="forum-main">
      <div className="forum-top">
        <a className="top-num">번호</a>
        <a className="top-title">제목</a>
        <a className="top-name">이름</a>
        <a className="top-view">조회</a>
        <a className="top-date">등록일</a>
      </div>

      <hr />

      <div className="forum-list">
        {posts.length != 0 ? (
          fl
        ) : (
          <p className="no_data">등록된 게시글이 없습니다.</p>
        )}
      </div>

      <div className="forum-bottom">
        <Link to={`/${nowParams.Category || ""}/${nowParams.Sub || ""}/editor`}>
          <button className="btn-write">글쓰기</button>
        </Link>
      </div>
      {totalPage[0].length > 0 ? (
        <PagingComponent
          currentPage={currentPage}
          totalPage={totalPage}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        ></PagingComponent>
      ) : null}
    </div>
  );
}

export default ForumListComponent;
