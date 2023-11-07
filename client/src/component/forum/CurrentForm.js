import React, { Component } from "react";
import MyPageInput from "./MyPageInput";

class CurrentForm extends Component {
  state = {
    text: "",
    text2: "",
    style: {
      border: "1px solid #ccc",
      padding: "25px",
      margin: "15px",
    },
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      text: "",
      text2: "",
    });
  };
  render() {
    const { text, text2 } = this.state;
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <ul style={this.state.style}>
              <MyPageInput
                value={text}
                name="text"
                placeholder="진행중인 프로젝트를 입력하세요"
                onChange={this.handleChange}
              ></MyPageInput>
              <br />
              <MyPageInput
                value={text2}
                name="text2"
                placeholder="팀원 아이디를 입력하세요"
                onChange={this.handleChange}
              ></MyPageInput>
              <button onClick={this.handleSubmit}>추가</button>
            </ul>
          </form>
        </div>
      </>
    );
  }
}

export default CurrentForm;
