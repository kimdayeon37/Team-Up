const express = require("express");
const mysql = require("../mysql/index.js");
const router = express.Router();

// 전체 카테고리 api
router.get("/", async (req, res) => {
  const categories = await mysql.query("categoriesAllList");
  console.log(categories);
  res.json({ status: "ok", data: categories });
});

// Gnb Id에 따른 Lnb 리스트 api
router.get("/lnblists/:id", async (req, res) => {
  const { id } = req.params;
  const lnb = await mysql.query("categorieslnbList", id);
  res.json({ status: "ok", data: lnb });
});

// 카테고리 추가 api
// {
//     "param" : {
//         "cat_name" : "IT|개발",
//         "cat_parent_no" : "2",
//         "cat_order" : 1
//     }
// }
router.post("/insert", async (req, res) => {
  const params = req.body.param;
  const result = await mysql.query("categoriesInsert", params);
  res.json({ status: "ok", data: result });
});

// 카테고리 수정 api
// {
//     "param" : [{
//         "cat_name" : "IT|개발",
//         "cat_parent_no" : "2",
//         "cat_order" : 1
//     }, 23
//     ]
// }
router.put("/update", async (req, res) => {
  const params = req.body.param;
  const result = await mysql.query("categoriesUpdate", params);
  res.json({ status: "ok", data: result });
});

// 카테고리 삭제 api
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await mysql.query("categoriesDelete", id);
  res.json({ status: "ok", data: result });
});

module.exports = router;
