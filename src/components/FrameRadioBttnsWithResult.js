import React, { Component } from 'react';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import ReactTooltip from 'react-tooltip'

const styles = {
  radioButtonWall: {
    //marginRight: -25,
    width: '20px',
  },
  radioButtonMask: {
    //marginRight: -20,
    width: '20px',
  },
  radioButtonSticker: {
    //marginRight: -15,
    width: 20,
  },
  radioButtonResult: {
    //marginTop: -5,
    marginRight: 15,
  },
};

export default class FrameRadioButtonsResult extends Component {
  constructor(props) {
    super(props)
    this.common = this.common.bind(this);
    this.onWallClick = this.onWallClick.bind(this);
    this.onMaskClick = this.onMaskClick.bind(this);
    this.onStickerClick = this.onStickerClick.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
  }
  common(event, circleType) {  
    window.curFrameId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
    window.clickedCircle = circleType; 
    if (window.imagesDict[window.curFrameId]._wall == '' || window.imagesDict[window.curFrameId]._mask == '' || window.imagesDict[window.curFrameId]._sticker == '') { 
      document.getElementById('selectedFile').click()
      window.sijax_data('curFrameId', window.curFrameId)
    }
    else {
      window.onRadiusBttnPressed()
    }
  }

  onWallClick(event) {
    this.common(event, 'Wall')
  }
  onMaskClick(event) {
    this.common(event, 'Mask')
  }
  onStickerClick(event) {
    this.common(event, 'Sticker')
  }
  onResultClick(event) {
    window.curFrameId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
    window.clickedCircle = 'Result'
    window.onRadiusBttnPressed()
  }

  render() {
    return (
      <div>
        <ReactTooltip place="bottom" type="dark" effect="float" />

        <RadioButtonGroup name="shipSpeed" valueSelected="result" style={{ display: 'flex' }}>

          <a data-tip="Result"
            value="result"
            style={{ display: 'inline-block', width: '35px' }}
            onClick={this.onResultClick}
          />

          <a data-tip="Sticker"
            value="sticker"
            style={{ display: 'inline-block', width: '35px' }}
            onClick={this.onStickerClick}
          />

          <a data-tip="Mask"
            value="mask"
            style={{ display: 'inline-block', width: '35px' }}
            onClick={this.onMaskClick}
          />

          <a data-tip="Wall"
            value="wall"
            style={{ display: 'inline-block', width: '35px' }}
            onClick={this.onWallClick}
          />

        </RadioButtonGroup>
      </div>
    );
  }
}