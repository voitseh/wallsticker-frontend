import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/delete-forever';
import _ActionGrade from 'material-ui/svg-icons/image/image';

const styles = {
  smallIcon: {
    width: 18,
    height: 18,
    color:'rgb(207, 205, 205)',  
  },
  small: {
    width: 36,
    height: 36,
  },
};

class LoadItemImg extends Component {
  constructor(props) {
    super(props)
  }
  
  onLoadImgClick(event) {
    document.getElementById('selectedFile').click()
    window.sijax_data('curFrameId', window.curFrameId)
  }

  render() {
    return (
    <div style={{position:'relative', float:'left', bottom:'14px', right:'102px'}}>
      <IconButton tooltip="load img" tooltipPosition="bottom-right" iconStyle={styles.smallIcon}
        style={styles.small}
        onClick={this.onLoadImgClick}>
        <_ActionGrade />
      </IconButton>
    </div>
    )
  }

}

class DeleteFrameBttn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //disabled: false,
    }
    this.deleteCurrentFrame = this.deleteCurrentFrame.bind(this);
  }
  deleteCurrentFrame(event){ 
     window.deleteFrame()
  }
  render() {
    return (
      <div style={{position:'relative', float:'right', marginTop:'-14px', marginRight:'-10px'}}>
      <IconButton name='delete' tooltip="delete" tooltipPosition="bottom-left" iconStyle={styles.smallIcon}
          style={styles.small} onClick={this.deleteCurrentFrame} >
        <ActionGrade />
      </IconButton>
    </div>
    );
  }
}

export default class LoadImgAndDeleteFrameBttns extends Component {
  
    render() {
      return (
        <div>
          <LoadItemImg />
          <DeleteFrameBttn />
        </div>
      );
    }
  }