import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ShowWallOrMaskBttn from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import DeleteBttn from 'material-ui/svg-icons/action/delete-forever';
import LoadMaskBttn from 'material-ui/svg-icons/image/image';
import ContentAdd from 'material-ui/svg-icons/content/add';
import $ from "jquery";

const styles = {
  smallIcon: {
    width: 18,
    height: 18,
    color: 'rgb(207, 205, 205)',
  },
  small: {
    width: 36,
    height: 36,
  },
};

class LoadMaskButton extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div style={{ position: 'relative', float: 'left', bottom: '180px' }}>
        <IconButton tooltip="load mask" tooltipPosition="bottom-right" id="load_mask" iconStyle={styles.smallIcon}
          style={styles.small}
          onClick={() => window.addMask()}>
          <LoadMaskBttn />
        </IconButton>
      </div>
    )
  }

}

class DeleteButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{ position: 'relative', float: 'right', left: '-3%', bottom: '180px' }}>
        <IconButton tooltip="delete" tooltipPosition="bottom-left" iconStyle={styles.smallIcon}
          style={styles.small} id="delete_wall_mask">
          <DeleteBttn />
        </IconButton>
      </div>
    )
  }

}

class Change_Wall_Mask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: 'show mask',
    };
    this.change_tooltip_text = this.change_tooltip_text.bind(this);
  }

  change_tooltip_text(event) { 
    if(this.state.label == 'show mask'){
      this.setState({ label: 'show wall' })
    }else{
      this.setState({ label: 'show mask' })
    }
  }

  render() {
    return (
      <div style={{ position: 'relative', float: 'right', left: '10%', bottom: '45px' }}>
        <IconButton tooltip={this.state.label} tooltipPosition="bottom-left" iconStyle={styles.smallIcon}
          style={styles.small} id="change_wall_mask" onClick={this.change_tooltip_text}>
          <ShowWallOrMaskBttn />
        </IconButton>
      </div>
    )
  }

}

export default class WallComponents extends Component {

  render() {
    return (
      <div>
        <LoadMaskButton />
        <DeleteButton />
        <Change_Wall_Mask />
      </div>
    );
  }
}
