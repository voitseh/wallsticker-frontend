import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginRight: 20,
};

window.setBttnPlusEnabled = function setBttnPlusEnabled() { 
  FloatingButtonPlus.setEnabled();
}
window.setBttnPlusDisabled = function setBttnPlusDisabled() { 
  FloatingButtonPlus.setDisabled();
}
/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
export default class FloatingButtonPlus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
    }
    FloatingButtonPlus.setEnabled = FloatingButtonPlus.setEnabled.bind(this);
    FloatingButtonPlus.setDisabled = FloatingButtonPlus.setDisabled.bind(this);
  }
  static setEnabled() { 
    //this.setState({disabled: !this.state.disabled});
    this.setState({disabled: false});
  }
  static setDisabled() { 
    //this.setState({disabled: !this.state.disabled});
    this.setState({disabled: true});
  }
  render() {
    return (
      <div>
        <FloatingActionButton disabled={this.state.disabled}  style={style} onClick={() => window.FramePaper()}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

