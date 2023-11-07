import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class DoneInfo extends Component {
  state = {
    toggle: false,
    text  : '',
    text2  : '',
    style : {
      margin: '10px',
    },
  };


  render() {
    const { data } = this.props;
    const { toggle, text, text2 } = this.state;
    return (
      <div>
        {toggle ? (
          <input
            style={this.state.style}
            value={data.text}
            name="text"
          ></input>
        ) : (
          <span style={this.state.style}>{data.text}</span>
        )}
        {toggle ? (
          <input
            style={this.state.style}
            value={data.text2}
            name="text2"
          ></input>
        ) : (
          <span style={this.state.style}>{data.text2}</span>
        )}
        <Link to="/Mypage/Evaluation">
        <button>평가하기</button>
        </Link>
      </div>
    );
        }
      }

export default DoneInfo;