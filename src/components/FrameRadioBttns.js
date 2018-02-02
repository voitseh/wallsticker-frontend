import React, { Component } from 'react';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import ReactTooltip from 'react-tooltip';
import $ from "jquery";

export default class FrameRadioButtons extends Component {
  constructor(props) {
    super(props)
    this.common = this.common.bind(this);
    this.onWallClick = this.onWallClick.bind(this);
    this.onMaskClick = this.onMaskClick.bind(this);
    this.onStickerClick = this.onStickerClick.bind(this);
  }
  common(event, circleType) {
    window.curFrameId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
    var img_type;
    window.clickedCircle = circleType;
    switch (circleType) {
      case 'Wall': img_type = window.imagesDict[window.curFrameId]._wall;
        break;
      case 'Mask': img_type = window.imagesDict[window.curFrameId]._mask;
        break;
      case 'Sticker': img_type = window.imagesDict[window.curFrameId]._sticker;
    }
    if (img_type == '') {

      window.imagesDict.forEach(function (element, index, array) {
        if (element._id == window.curFrameId) {
          window.renderFrameImgLoadAndDelBttn(element._id)
        }
        else {
          window.renderDelFrameBttn(element._id)
        }
      });

      var imageSRC = document.getElementById('img'.concat(window.curFrameId));
      imageSRC.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAEzCAYAAABHfrtkAAAMqklEQVR4Ae3BW2JjAY5YMXD/i2b4m6Rnuh6S7dI9wOwRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dEREQ8w+wRERERzzB7RERExDPMHhEREfEMs0dERMQfmeMv7BFfafaIiIj4LXO82B7xbrNHRETEL5njjfaId5o9IiIifskcb7ZHvMvsERER8V/N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OX6QPX6QOSI+yh7/sDleYI/4brNHfKU5fqA9fog5Ij7KHv+oOV5kj/hus0d8lTl+sD2+2RwRH2mPf9AcL7JHfLfZI77CHP+APb7RHBEfaY9/zBwvtEd8t9kj3m2Of8geX2yOiEfY44eb4w32iO82e8Q7zPEB9nijOSIeaY8fZo432iO+24iIiPgSe8R3GxEREV9ij/huIyIi4kvsEd9tREREfIk94ruNiIiIL7FHfLcRERHxJfaI7zYiIiK+xB7x3UZERMSX2SO+04iIiPgye8R3GhEREV9qj/guIyIi4kvtEd9lREREfIs94quNiIiIb7VHfJURERER7PEAIyIiIv5/e3ygEREREf+7PT7EiIiIiN+3xz9oRERExPfb4wuMiIiI+Pfs8QdGREREPMeIiIiI5xgRERHxHCMiIiKeY0RERMRzjIiIiHiOEREREc8xIiIi4jlGREREPMeIiIiI5xgRERHxHCMiIiKeY0RERMRzjIiIiHiOEREREc8xIiIi4jlGREREPMeIiIiI5xgRERHxHCMiIiKeY0RERMRzjIiIiHiOEREREc8xIiIi4jlGREREPMeIiIiI5xgRERHxHCMiIiKeY0RERMRzjIiIiHiOEREREc8xIiIi4jlGREREPMeIiIiI5xgRERHxHCMiIiKeY0RERMRzjIiIiHiOEREREc8xIiIi4jlGREREPMeIiIiI5xgRERHxHCMiIiKeY0RERMRzjIiIiHiOEREREc8xIiIi4jlGREREPMeIiIiI5/g/PjRRmXM4V2kAAAAASUVORK5CYII=')
    }
    else {
      window.renderDelFrameBttn(window.curFrameId)
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
  render() {
    return (
      <div>
        <ReactTooltip place="bottom" type="dark" effect="float" />

        <RadioButtonGroup name="shipSpeed" style={{ display: 'flex' }}>

          <a data-tip="Sticker"
            value='1'
            style={{ display: 'inline-block', width: '35px' }}
            onClick={this.onStickerClick}
          />

          <a data-tip="Mask"
            value='2'
            style={{ display: 'inline-block', width: '35px' }}
            onClick={this.onMaskClick}
          />

          <a data-tip="Wall"
            value='3'
            style={{ display: 'inline-block', width: '35px' }}
            onClick={this.onWallClick}
          />

        </RadioButtonGroup>
      </div>
    );
  }
}
