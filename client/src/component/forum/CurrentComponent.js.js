import React, { Component } from "react";
import CurrentForm from "./CurrentForm";
import CurrentList from "./CurrentList";

class CurrentComponent extends Component {
  id = 3;
  state = {
    currentList: [],
  };

  handleCreate = (data) => {
    const { currentList } = this.state;

    this.setState({
      currentList: currentList.concat({
        id: this.id++,
        ...data,
      }),
    });
  };

  handleUpdate = (id, data) => {
    const { currentList } = this.state;

    this.setState({
      currentList: currentList.map((currentList) => {
        console.log(currentList);
        if (currentList.id === id) {
          console.log(currentList.id + " / " + id);
          return {
            id,
            ...data,
          };
        }
        return currentList;
      }),
    });
  };

  handleRemove = (id) => {
    const { currentList } = this.state;
    this.setState({
      currentList: currentList.filter((data) => data.id !== id),
    });
  };
  // 완료 시 전송해야됨
  handleDone = (id) => {
    const { currentList } = this.state;
    this.setState({
      currentList: currentList.filter((data) => data.id !== id),
    });
  };

  render() {
    const { currentList } = this.state;

    return (
      <>
        <div>
          <CurrentForm onCreate={this.handleCreate} />
          <CurrentList
            data={currentList}
            onUpdate={this.handleUpdate}
            onRemove={this.handleRemove}
            onDone={this.handleDone}
          />
        </div>
      </>
    );
  }
}

export default CurrentComponent;
