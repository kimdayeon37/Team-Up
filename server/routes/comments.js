const express = require("express");
const mysql = require("../mysql/index.js");
const router = express.Router();
const dayjs = require("dayjs");

// findBypostId 댓글 리스트
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const comments = await mysql.query("commentsFindByPostId", id);
  res.json({ status: "ok", data: comments });
});

// 댓글 추가 api
// {
//     "param" : {
//         "post_no" : "1",
//         "user_no" : "1",
//         "comment_content" : "3등 늦었네 ㅋ.",
//         "comment_parent_no" :"4"
//     }
// }
router.post("/insert", async (req, res) => {
  const params = req.body.param;
  let userNoTO;
  params.comment_ins_date = dayjs().format("YYYY-MM-DD HH:mm:ss");

  if (!params.comment_parent_no) {
    console.log(1);
    userNoTO = await mysql.query("noticesFindUserByPostId", params.post_no);
  } else {
    userNoTO = await mysql.query(
      "noticesFindByParentId",
      params.comment_parent_no
    );
  }

  const result = await mysql
    .query("commentsInsert", params)
    .then(async (result) => {
      if (userNoTO[0].user_no == params.user_no) {
        return result;
      }

      newParams = {
        post_no: params.post_no,
        user_no_to: userNoTO[0].user_no,
        user_no_from: params.user_no,
        noti_type: params.comment_parent_no ? 1 : 0,
        noti_created_at: params.comment_ins_date,
      };
      result2 = await mysql.query("noticesInsert", newParams);
      return result;
    });
  res.json({ status: "ok", data: result });
});

// 댓글 수정 api
// {
//     "param" : [{
//         "comment_content" : "1등 (수정)"
//     },1]
// }
router.put("/update", async (req, res) => {
  const params = req.body.param;

  params[0].comment_upd_date = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const result = await mysql.query("commentsUpdate", params);
  res.json({ status: "ok", data: result });
});

// 댓글 삭제 api
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await mysql.query("commentsDelete", id);
  res.json({ status: "ok", data: result });
});

// 댓글 완전삭제 api
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await mysql.query("commentsDBDelete", id);
  res.json({ status: "ok", data: result });
});

router.get("/count/:id", async (req, res) => {
  const { id } = req.params;
  const comments = await mysql.query("commentsCount", id);
  res.json({ status: "ok", data: comments });
});

router.get("/:id/:pid", async (req, res) => {
  const { id, pid } = req.params;
  const comments = await mysql.query("commentsFindByParentId", [id, pid]);
  res.json({ status: "ok", data: comments });
});

module.exports = router;
