const express = require("express");
const mysql = require("../mysql/index.js");
const dayjs = require("dayjs");
const router = express.Router();

// 게시글 리스트 api
router.get("/", async (req, res) => {
  const posts = await mysql.query("postsAllList");
  console.log(posts);
  res.json({ status: "ok", data: posts });
});

// 게시글 findByCategory api
router.get("/findpost/bycatno/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await mysql.query("postsListByCatNo", id);

  res.json({ status: "ok", data: posts });
});

// 게시글 findById api
router.get("/findpost", async (req, res) => {
  const postId = req.query.postid;
  const catId = req.query.catid;
  const post = await mysql
    .query("postFindById", [postId, catId])
    .then(async (post) => {
      result = await mysql.query("postHitsUp", postId);
      return post;
    });
  console.log(post);
  res.json({ status: "ok", data: post });
});

// 게시글 페이지네이션 리스트 api
router.get("/pagination/:id", async (req, res) => {
  const { id } = req.params;
  const currentpage = parseInt(req.query.page || 1);
  const numPerPage = parseInt(req.query.perPage || 10);
  const keyword = req.query.search;

  // 검색어 X
  if (keyword === undefined) {
    const skip = (currentpage - 1) * numPerPage;

    const numRows = await mysql
      .query("postCount", id)
      .then((results) => results[0].count);

    const totalPage = Math.ceil(numRows / numPerPage);
    console.log(totalPage);
    const paginationPosts = await mysql.query("postPagination", [
      id,
      skip,
      numPerPage,
    ]);

    return res.json({
      status: "ok",
      data: {
        currentPage: currentpage,
        numPerPage: numPerPage,
        totalPage: totalPage,
        posts: paginationPosts,
      },
    });
  } else {
    const search = "%" + keyword + "%";
    const skip = (currentpage - 1) * numPerPage;

    const numRows = await mysql
      .query("postCountWithKeyWord", [id, search, search])
      .then((results) => results[0].count);

    const totalPage = Math.ceil(numRows / numPerPage);
    console.log(totalPage);
    const paginationPosts = await mysql.query("postPaginationWithKeyWord", [
      id,
      search,
      search,
      skip,
      numPerPage,
    ]);

    return res.json({
      status: "ok",
      data: {
        keyword: keyword,
        currentPage: currentpage,
        numPerPage: numPerPage,
        totalPage: totalPage,
        posts: paginationPosts,
      },
    });
  }
});

// // 게시글 추가 api
// {
//     "param" :
//         {
//             "user_no" : "2",
//             "cat_no" : "2",
//             "head_no": "1",
//             "post_title" : "연습입니다.",
//             "post_thumb1" : "URL",
//             "post_thumb2" : "URL",
//             "post_content" : "안녕, 내 이름은 장은수야. 만나서 반가워",
//             "post_status" : "1",
//             "post_is_important": "0"
//         }
// }
router.post("/insert", async (req, res) => {
  const params = req.body.param;

  // 중요글 등록시 기존 중요글 제거
  if (params.post_is_important == 1) {
    await mysql.query("postsDeleteImportant", [params.cat_no]);
  }
  params.post_ins_date = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const result = await mysql.query("postsInsert", params);
  res.json({ status: "ok", data: result });
});

// 일반게시글 수정
// {
//     "param" : [
//         {
//             "head_no": "1",
//             "post_title" : "연습입니다.(수정)",
//             "post_content" : "안녕, 내 이름은 장은수야. 만나서 반가워(수정)",
//             "post_status" : "0",
//             "post_is_important": "0"
//         }
//         ,4
//     ]
// }
router.put("/update", async (req, res) => {
  const params = req.body.param;
  params[0].post_upd_date = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(params);
  const result = await mysql.query("postsUpdate", params);
  res.json({ status: "ok", data: result });
});

// 일반게시글 삭제
// {
//     "param" : [
//         {
//             "post_status" : "0"
//         }
//         ,4
//     ]
// }
// 게시글 완전삭제 api
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await mysql.query("postsDelete", id);
  res.json({ status: "ok", data: result });
});

// 게시글 완전삭제 api
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await mysql.query("postsDBDelete", id);
  res.json({ status: "ok", data: result });
});

// userNo, catNo 별 임시 저장 게시글 불러오기 api

// 임시저장 후 게시글 등록 api
module.exports = router;
