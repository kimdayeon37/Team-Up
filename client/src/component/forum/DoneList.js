import React, { Component } from 'react';
import DoneInfo from './DoneInfo';

class DoneList extends Component {
  state = {
    style: {
      border: '1px solid #ccc',
      padding: '25px',
      margin: '15px',
    },
  };
  render() {
    const { data } = this.props;

    return (
<>
      <div>
        <ul>
          {data.map((data) => (
            <ul style={this.state.style}>
              <DoneInfo data={data} />
            </ul>
          ))}
        </ul>
      </div>
    
      </>
    );
  }
}

export default DoneList;