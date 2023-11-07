  import React, { useState } from "react";
  import axios from "axios";
  import StyledBox from './styledBox';

  const CheckboxList = ({history}) => {
    
    const formData = [
      { id: 1, name: "회의시간을 잘 지켜요" },
      { id: 2, name: "활동에 적극적으로 참여해요" },
      { id: 3, name: "실력이 뛰어나요" },
      { id: 4, name: "아이디어가 좋아요" },
      { id: 5, name: "우리팀을 이끌어줬어요" },
    ];
  
    const [isChecked, setIsChecked] = useState(false); //체크 여부
    const [checkedItems, setCheckedItems] = useState(new Set());//체크된 요소들
  
    const checkHandler = ({ target }) => {
      setIsChecked(!isChecked);
      checkedItemHandler(target.parentNode, target.value, target.checked);
      console.log(target.parentNod, target.value, target.checked);
    };
  
    const checkedItemHandler = (box, id, isChecked) => {
      if (isChecked) { //체크 되었을때
        checkedItems.add(id); //체크시 삽입
        setCheckedItems(checkedItems); //체크 요소 넣어주기
      } else if (!isChecked && checkedItems.has(id)) { //체크가 안되었고, id가 있을때(클릭 2번시)
        checkedItems.delete(id); //체크 두번시 삭제
        setCheckedItems(checkedItems);
        box.style.backgroundColor = "#fff";
      }
      console.log(checkedItems);
      return checkedItems;
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('/user/evaluation/send')
          .then((response) => {
            if(response.status === 200) {
              alert("팀원 평가서를 보냈습니다.");
              history.push("/mypage");
            } else {
              alert("팀원 평가서를 보내기에 실패했습니다.")
            }
          })
      }
  
    return (
      <StyledBox>
        <form onSubmit={onSubmitHandler}>
            <p>닉1</p>
        {formData.map((item) => (
          <label key={item.id}>
            <div style={{display:"inline-block", margin:"10px"}}>
            <input
              type="checkbox"
              value={item.name}
              onChange={(e) => checkHandler(e)}
            />
            {item.name}</div>
          </label>
        ))}
        <button>보내기</button>
        </form>
        </StyledBox>
    );
  };
  
  export default CheckboxList;