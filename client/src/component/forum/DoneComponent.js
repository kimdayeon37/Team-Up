import React, { Component } from "react";
import DoneList from "./DoneList";
class DoneComponent extends Component {
  id = 3;
  state = {
    doneList: [],
  };

  render() {
    const { doneList } = this.state;
    return (
      <div>
        <DoneList data={doneList} />
        <p class="no_data">진행 완료된 프로젝트가 없습니다</p>
      </div>
    );
  }
}

export default DoneComponent;
