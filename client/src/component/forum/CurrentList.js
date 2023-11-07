import React, { Component } from 'react';
import CurrtentInfo from './CurrtentInfo';

class CurrentList extends Component {
  state = {
    style: {
      border: '1px solid #ccc',
      padding: '25px',
      margin: '15px',
    },
  };
  render() {
    const { data, onUpdate, onRemove, onDone } = this.props;

    return (
<>
      <div>
        
          {data.map((data) => (
            <ul style={this.state.style}>
              <CurrtentInfo data={data} onUpdate={onUpdate} onRemove={onRemove} onDone={onDone}/>
              </ul>
          ))}
       
      </div>
      </>
    );
  }
}

export default CurrentList;