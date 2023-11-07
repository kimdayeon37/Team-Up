const express = require("express");
const mysql = require("../mysql/index.js");
const router = express.Router();

router.post("/insert", async (req, res) => {
  const params = req.body.param;
  const result = await mysql.query("likesInsert", params);
  res.json({ status: "ok", data: result });
});

module.exports = router;
