const express = require("express");
const mysql = require("../mysql/index.js");
const dayjs = require("dayjs");
const router = express.Router();

// 알림 생성은 다른데서 생성

// localhost:3001/api/notifications/1 . -> 1은 유저 아이디
// 회원별 알림 리스트 api
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const notifications = await mysql.query("noticesFindByUserId", id);

  res.json({ status: "ok", data: notifications });
});

// 한개 읽음 처리
// noti_no 넘겨주기
router.put("/readone/:id", async (req, res) => {
  const { id } = req.params;
  read_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const result = await mysql.query("noticesReadByNotiId", [read_at, id]);

  res.json({ status: "ok", data: result });
});

// 모두 읽음 처리
// 회원 no 넘겨주기
router.put("/readall/:id", async (req, res) => {
  const { id } = req.params;
  read_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const result = await mysql.query("noticesReadByUserId", [read_at, id]);

  res.json({ status: "ok", data: result });
});

module.exports = router;
