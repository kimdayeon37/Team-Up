import React, { useEffect, useState } from "react";
import "./AlarmComponent.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getLnbName } from "../common/lnbID";

export default function AlarmComponent({
  alarm,
  setAlarm,
  alarms,
  reload,
  setReload,
}) {
  //하나 읽음
  const handleRead = (noti_no) => {
    axios
      .put("/api/notifications/readone/" + noti_no)
      .then((response) => {
        setReload(!reload);
        setAlarm(!alarm);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //전체 읽음
  const handleReadAll = () => {
    setReload(!reload);
    axios
      .put("/api/notifications/readall/" + 3)
      .then((response) => {
        setReload(!reload);
        setAlarm(!alarm);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const alarmList = alarms.map((alarm) => {
    return (
      <Link
        to={`/${getLnbName(alarm.cat_parent_no)}/${getLnbName(
          alarm.cat_no
        )}/post/?postNo=${alarm.post_no}&currentPage=1`}
        className="link"
        onClick={() => {
          handleRead(alarm.noti_no);
        }}
      >
        <div className="alarm-content">
          <div>
            {alarm.noti_type === 0 ? (
              <p className="alarm-why clamp1">
                {alarm.user_nick}님이 댓글을 남겼습니다
              </p>
            ) : (
              <p className="alarm-why clamp1">
                {alarm.user_nick}님이 답글을 남겼습니다
              </p>
            )}
            <p className="alarm-title clamp1">{alarm.title}</p>
          </div>
          <p className="alarm-where clamp1">
            {alarm.noti_created_at.slice(0, 10)}
          </p>
        </div>
      </Link>
    );
  });

  return (
    <div className="alarm shadow">
      <div className="alarm-head">댓글 알림</div>
      <div className="alarm-header">
        <div>
          <a>총 </a>
          <a>{alarms.length}</a>
          <a>개</a>
        </div>
        <a
          className="alarm-readall"
          onClick={() => {
            handleReadAll();
          }}
        >
          전체읽음
        </a>
      </div>
      <hr />
      <div className="alarm-list">{alarmList}</div>
    </div>
  );
}
