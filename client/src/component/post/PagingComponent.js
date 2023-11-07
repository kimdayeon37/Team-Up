import { useEffect, useState } from "react";
import "./PagingComponent.css";

function PagingComponent({
  currentPage,
  totalPage,
  searchParams,
  setSearchParams,
}) {
  const [currentStatus, setCurrentStatus] = useState(0);
  let page = null;
  if (totalPage.length === 0 || totalPage[0].length !== 0) {
    page = totalPage[currentStatus].map((i) => {
      return (
        <button
          key={i}
          onClick={() => {
            onclickNum(i);
          }}
          className={i == currentPage ? "now" : ""}
        >
          {i}
        </button>
      );
    });
  } else {
    page = () => {
      return null;
    };
  }

  const onClickPre = () => {
    if (currentStatus > 0) {
      setCurrentStatus(currentStatus - 1);
    }
  };

  const onClickNext = () => {
    if (currentStatus < totalPage.length - 1) {
      setCurrentStatus(currentStatus + 1);
    }
  };

  function onclickNum(num) {
    // setCurrentPage(num);
    searchParams.set("currentPage", num);
    setSearchParams(searchParams);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => {
          onClickPre();
        }}
      >
        &lt;
      </button>

      {page}

      <button
        onClick={() => {
          onClickNext();
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default PagingComponent;
