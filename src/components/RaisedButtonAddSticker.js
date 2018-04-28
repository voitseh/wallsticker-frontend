import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  //width: 10,
  marginTop: 10,
  marginBottom: 10
};

export default class RaisedButtonAddSticker extends Component {
  
  onStickerImgClick(event) {
    document.getElementById('stickerInput').click()
  }

  render() {
    return (
      <div>
      <RaisedButton label="STICKER" style={style} onClick={this.onStickerImgClick}/>
      </div>
    );
  }
}

