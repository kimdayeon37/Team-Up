const express = require("express");
const mysql = require("../mysql/index.js");
const dayjs = require("dayjs");
const router = express.Router();

// id를 통해 현재 진행중인 프로젝트 이름과 팀멤버 불러오기
router.get("/current/:id", async (req, res) => {
  const { id } = req.params;

  const teams = await mysql.query("teamCurrentFindById", id);
  console.log(teams);
  res.json({ status: "ok", data: teams });
});

// id를 통해 현재 진행중인 완료된 프로젝트 이름과 팀멤버 불러오기
router.get("/finished/:id", async (req, res) => {
  const { id } = req.params;

  const teams = await mysql.query("teamFinishedFindById", id);
  console.log(teams);
  res.json({ status: "ok", data: teams });
});

// {
//     "param" :
//         {
//             "team_no" : "1",
//             "user_id" : "jhkkwon"
//         }
// }
router.post("/join", async (req, res) => {
  const teamNo = req.body.param.team_no;

  const userId = await mysql.query("findByID", req.body.param.user_id);

  if (userId.length == 0) {
    return res.json({ staus: "false", message: "존재하지 않는 사용자입니다." });
  }

  params = {
    team_no: teamNo,
    user_no: userId[0].user_no,
    team_leader: 0,
  };

  const joinTeam = await mysql.query("teamsJoin", params);

  res.json({ staus: "ok", data: joinTeam });
});

// 팀 생성
// {
//     "param" :
//         {
//             "user_no" : "1",
//             "team_name" : "webservice"
//         }
// }
router.post("/create", async (req, res) => {
  const userNo = req.body.param.user_no;
  params = {
    user_no: userNo,
    team_start_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    team_name: req.body.param.team_name,
  };
  const createTeam = await mysql.query("teamsCreate", params);

  const JoinTeamLeader = await mysql.query("teamsJoinLeader", userNo);

  res.json({ staus: "ok", data: JoinTeamLeader });
});

// {
//     "param" :
//         {
//             "team_no" : "1"
//         }
// }
router.put("/finish", async (req, res) => {
  const teamNo = req.body.param.team_no;

  const finishedTeam = await mysql.query("teamsfinished", teamNo);

  res.json({ status: "ok", data: finishedTeam });
});

// {
//     "param" :
//         {
//             "evaluate" :
//                 {"jhkkwon": [1,0,0,0,0],
//                 "mingi": [1,0,0,0,0]
//                 }
//         }
// }
router.put("/evaluate", async (req, res) => {
  const eval = req.body.param.evaluate;

  params_nick = Object.keys(eval);
  params_score = {};

  console.log();
  console.log(Object.keys(eval));
  for (i = 0; i < Object.keys(eval).length; i++) {
    eval[params_nick[i]].push(params_nick[i]);

    const evaluate = await mysql.query("teamEvaluate", eval[params_nick[i]]);
    console.log(eval[params_nick[i]]);
  }
  res.json({ status: "ok", message: "success" });
});

module.exports = router;
