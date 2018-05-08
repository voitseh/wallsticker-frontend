import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  //width: 10,
  marginTop: 10,
  marginBottom: 10
};

//export default class RaisedButtonAddWall extends Component {

export default class RaisedButtonAddWall extends Component {

  constructor(props) {
    super(props);
    this.onWallImgClick = this.onWallImgClick.bind(this);
  }  
  
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

