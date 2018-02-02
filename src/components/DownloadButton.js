import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginTop: 15,
};

window.setBttnDownloadEnabled = function setBttnDownloadEnabled() { 
  RaisedButtonDownload.setEnabled();
}
window.setBttnDownloadDisabled = function setBttnDownloadDisabled() { 
  RaisedButtonDownload.setDisabled();
}

export default class RaisedButtonDownload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
    RaisedButtonDownload.setEnabled = RaisedButtonDownload.setEnabled.bind(this);
    RaisedButtonDownload.setDisabled = RaisedButtonDownload.setDisabled.bind(this);
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
        <RaisedButton disabled={this.state.disabled} label="Download" primary={true} style={style} onClick={() => window.onDownload()} />
      </div>
    );
  }
}
