const express = require("express");
const mysql = require("../mysql/index.js");
const router = express.Router();
// trueOrFalseLike userId
router.get("/", async (req, res) => {
  const { post_no, user_no } = req.query;
  const params = [post_no, user_no];

  const like = await mysql.query("likesFindByUserId", params);
  let result = false;
  if (like.length > 0) {
    result = true;
  }
  res.json({ status: "ok", data: { result: result, likes: like } });
});

// findBypostId리스트
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const likes = await mysql.query("likesFindByPostId", id);
  console.log(likes);
  res.json({ status: "ok", data: likes });
});

// 좋아요 추가
// 말머리 추가 api
// {
//     "param" : {
//         "post_no" : "4",
//         "user_no" : "1"
//     }
// }
router.post("/insert", async (req, res) => {
  const params = req.body.param;
  const result = await mysql.query("likesInsert", params);
  res.json({ status: "ok", data: result });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await mysql.query("likesDelete", id);
  res.json({ status: "ok", data: result });
});

module.exports = router;
