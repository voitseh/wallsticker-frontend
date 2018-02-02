import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RaisedButtonDownload from './DownloadButton';

const style = {
  margin: 15,
};

window.setBttnApplyEnabled = function setBttnApplyEnabled() { 
  RaisedButtonApply.setEnabled();
}
window.setBttnApplyDisabled = function setBttnApplyDisabled() { 
  RaisedButtonApply.setDisabled();
}

export default class RaisedButtonApply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
    RaisedButtonApply.setEnabled = RaisedButtonApply.setEnabled.bind(this);
    RaisedButtonApply.setDisabled = RaisedButtonApply.setDisabled.bind(this);
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
        <RaisedButton disabled={this.state.disabled} label="Apply" primary={true} style={style} onClick={() => window.onApply()} />
      </div>
    );
  }
}

