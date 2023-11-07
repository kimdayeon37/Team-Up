import { React } from "react";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";

export default function NotFoundPage(props) {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-contents">
        <img src={ImageComponent.Tool}></img>
        <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
        <p>존재하지 않는 주소를 입력하셨거나,</p>
        <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        <p>입력하신 페이지의 주소를 확인 후 다시 이용하시기 바랍니다.</p>
        <p>감사합니다.</p>
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            메인으로
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
