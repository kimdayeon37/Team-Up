const express = require("express");
const mysql = require("../mysql/index.js");
const router = express.Router();

// 최신글
router.get("/1/2", async (req, res) => {
  const results = await mysql.query("mainPage1_2");

  res.json({ status: "ok", data: results });
});

module.exports = router;
