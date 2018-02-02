import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

window.setBttnPushEnabled = function setBttnPushEnabled() { 
  RaisedButtonPush.setEnabled();
}
window.setBttnPushDisabled = function setBttnPushDisabled() { 
  RaisedButtonPush.setDisabled();
}

export default class RaisedButtonPush extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
    RaisedButtonPush.setEnabled = RaisedButtonPush.setEnabled.bind(this);
    RaisedButtonPush.setDisabled = RaisedButtonPush.setDisabled.bind(this);
  }
  static setEnabled() { 
    this.setState({disabled: false});
  }
  static setDisabled() { 
    this.setState({disabled: true});
  }
  render() {
    return (
      <div>
      <RaisedButton  disabled={this.state.disabled} label="Push" primary={true} style={style} onClick={() => window.pushToGallery()} />
      </div>
    );
  }
}

