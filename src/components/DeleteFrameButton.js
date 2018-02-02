import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/delete-forever';

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

export default class DeleteFrameBttn extends Component {
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
      <IconButton name='delete' id='1' tooltip="delete" tooltipPosition="bottom-left" iconStyle={styles.smallIcon}
          style={styles.small} onClick={this.deleteCurrentFrame} >
        <ActionGrade />
      </IconButton>
    </div>
    );
  }
}