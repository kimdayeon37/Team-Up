import React, { Component } from 'react';

class CurrtentInfo extends Component {
  state = {
    toggle: false,
    text  : '',
    text2  : '',
    style : {
      margin: '10px',
    },
  };

  handleChange = ( e ) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleToggleChange = () => {
    const { toggle, text, text2 } = this.state;
    const { data, onUpdate } = this.props;
    // false -> true
    if (!toggle) {
      this.setState({
        text  : data.text,
        text2 : data.text2,
        toggle: true,
      });
    } else {
      onUpdate(data.id, { text: text, text2: text2 });
      this.setState({
        toggle: false,
      });
    }
    // ture -> false
  };

  handleRemove = () => {
    const { data, onRemove } = this.props;
    onRemove(data.id);
  };
  handleDone = () => {
    const { data, onDone } = this.props;
    onDone(data.id);
  };

  render() {
    const { data } = this.props;
    const { toggle, text, text2 } = this.state;
    return (
      <div>
        {toggle ? (
          <input
            style={this.state.style}
            onChange={this.handleChange}
            value={text}
            name="text"
          ></input>
        ) : (
          <span style={this.state.style}>{data.text}</span>
        )}
        {toggle ? (
          <input
            style={this.state.style}
            onChange={this.handleChange}
            value={text2}
            name="text2"
          ></input>
        ) : (
          <span style={this.state.style}>{data.text2}</span>
        )}
        <button onClick={this.handleToggleChange}>{toggle ? '적용' : '수정'}</button>
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleDone}>완료</button>
      </div>
    );
        }
      }

export default CurrtentInfo;