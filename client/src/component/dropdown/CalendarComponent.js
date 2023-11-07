import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import "./CalendarComponent.css";
import dayjs from "dayjs";

export default function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());

  const mark = [];

  const getEvents = (value) => {
    const a = mark.filter((x) => x.date === dayjs(value).format("YYYY-MM-DD"));
    const list = a.map((event) => {
      return (
        <div className="events-list">
          <div className="dot"></div>
          <a className="event-time">
            {event.startTime} - {event.endTime}
          </a>
          <a className="event-name">{event.title} </a>
        </div>
      );
    });
    return list;
  };
  return (
    <div className="calendar shadow">
      <Calendar
        onChange={onChange}
        value={value}
        calendarType="US"
        prev2Label={null}
        next2Label={null}
        formatMonthYear={(locale, date) => dayjs(date).format("MMMM")}
        formatShortWeekday={(locale, date) => dayjs(date).format("dd")[0]}
        formatDay={(locale, date) => dayjs(date).format("D")}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          let dots = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (mark.find((x) => x.date === dayjs(date).format("YYYY-MM-DD"))) {
            // let result = mark.filter(
            //   (x) => x.date === dayjs(date).format("YYYY-MM-DD")
            // ).length;
            // for (let i = 0; i < result; i++) {
            dots.push(<div className="dot"></div>);
            // }
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="absolute">
                <div className="dot-list">{dots}</div>
              </div>
            </>
          );
        }}
      />
      <div className="calendar-events-list"></div>
    </div>
  );
}
