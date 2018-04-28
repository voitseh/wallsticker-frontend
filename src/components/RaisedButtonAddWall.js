import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  //width: 10,
  marginTop: 10,
  marginBottom: 10
};

export default class RaisedButtonAddWall extends Component {
  
  onWallImgClick(event) {
    document.getElementById('imageInput').click()
  }

  render() {
    return (
      <div>
      <RaisedButton label="WALL" style={style}   onClick={this.onWallImgClick}/>
      </div>
    );
  }
}

