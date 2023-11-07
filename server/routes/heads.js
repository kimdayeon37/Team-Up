const express = require("express");
const mysql = require("../mysql/index.js");
const router = express.Router();

// 전체 말머리 api
router.get("/", async (req, res) => {
  const heads = await mysql.query("headsAllList");
  console.log(heads);
  res.json({ status: "ok", data: heads });
});

// lnb에 따른 말머리 리스트 api
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const lnb = await mysql.query("headsByLnbList", id);
  res.json({ status: "ok", data: lnb });
});

// 말머리 추가 api
// {
//     "param" : {
//         "head_name" : "모집중",
//         "cat_no" : "8"
//     }
// }
router.post("/insert", async (req, res) => {
  const params = req.body.param;
  const result = await mysql.query("headsInsert", params);
  res.json({ status: "ok", data: result });
});

// 말머리 수정 api
// {
//     "param" : [{
//         "head_name" : "[모집완료]",
//         "cat_no" : "3"
//     }, 23
//     ]
// }
router.put("/update", async (req, res) => {
  const params = req.body.param;
  const result = await mysql.query("headsUpdate", params);
  res.json({ status: "ok", data: result });
});

// 말머리 삭제 api
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await mysql.query("headsDelete", id);
  res.json({ status: "ok", data: result });
});

module.exports = router;
