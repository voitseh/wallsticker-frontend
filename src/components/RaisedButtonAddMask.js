import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  //width: 10,
  marginTop: 10,
  marginBottom: 10
};

export default class RaisedButtonAddMask extends Component {
  
  onMaskImgClick(event) {
    document.getElementById('maskInput').click()
  }

  render() {
    return (
      <div>
      <RaisedButton label="MASK"  style={style} onClick={this.onMaskImgClick}/>
      </div>
    );
  }
}

