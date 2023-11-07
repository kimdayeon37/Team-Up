const express = require("express");
const mysql = require("../mysql/index.js");
const { verifyToken } = require("../auth/middlewares");
const crypto = require("crypto");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const keys = process.env.JWTSECRETKEY;

//회원가입 api
// {
//     "param" :
//         {
//             "user_name" : "장석원",
//             "user_id" : "asdasd2112",
//             "user_nick" : "jhkkwon",
//             "user_password" : "aaa111222333",
//             "user_department": "기획",
//             "user_department_number" : "35"
//         }
// }
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const password = req.body.param.user_password;
  const salt = crypto.randomBytes(128).toString("base64");

  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("base64");

  params = {
    user_name: req.body.param.user_name,
    user_nick: req.body.param.user_nick,

    user_id: req.body.param.user_id,
    user_info: req.body.param.user_info,
    user_password: hashPassword,
    user_password2: salt,
    user_department: req.body.param.user_department,
    user_department_number: req.body.param.user_department_number,
    user_sign_in_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };

  const result = await mysql.query("usersInsert", params);

  res.json({ status: "ok", data: result });
});

// 토큰값 확인 및 정보 전달
router.get("/auth", verifyToken, async (req, res) => {
  console.log(req.decoded.id);

  const user = await mysql.query("findByNo", req.decoded.id);
  params = {
    user_no: user[0].user_no,
    user_class: user[0].user_class,
    user_name: user[0].user_name,
    user_nick: user[0].user_nick,
    user_id: user[0].user_id,
    user_email: user[0].user_email,
    user_department: user[0].user_department,
    user_department_number: user[0].user_department_number,
    user_info: user[0].user_info,
  };
  res.json({ ok: "ok", data: params });
});

// 로그인
router.post("/signin", async (req, res) => {
  const id = req.body.param.id;
  const password = req.body.param.password;
  const user = await mysql.query("findByID", id);

  if (user.length == 0) {
    return res.json({
      status: "false",
      message: "존재하지 않는 아이디입니다.",
    });
  }

  const hashPassword = crypto
    .pbkdf2Sync(password, user[0].user_password2, 100000, 64, "sha512")
    .toString("base64");

  if (user[0].user_password != hashPassword) {
    return res.json({
      status: "false",
      message: "비밀번호가 일치하지 않습니다.",
    });
  }

  const payload = {
    id: user[0].user_no,
  };
  const token = jwt.sign(payload, keys, {
    expiresIn: 3600,
  });

  return res.json({ status: "ok", data: "Bearer " + token });
});

// 아이디 중복 확인
// {
//   "param" :
//       {
//           "user_id" : "asdasd2112"
//       }
// }
router.post("/checkid", async (req, res) => {
  const id = req.body.param.user_id;

  const user = await mysql.query("findByID", id);

  if (user.length != 0) {
    return res.json({ status: "false", message: "아이디 중복" });
  }
  res.json({ status: "ok", message: "아이디 사용 가능" });
});

// 이메일 중복 확인
// {
//   "param" :
//       {
//           "user_email" : "jh981223@naver.com"
//       }
// }
router.post("/checkemail", async (req, res) => {
  const nick = req.body.param.user_nick;

  const user = await mysql.query("findByEmail", nick);

  if (user.length != 0) {
    return res.json({ status: "false", message: "이메일 중복" });
  }
  res.json({ status: "ok", message: "이메일 사용 가능" });
});

module.exports = router;
