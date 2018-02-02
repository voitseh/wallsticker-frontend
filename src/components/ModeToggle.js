import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};
var counter = 0;
export default class ToggleExampleSimple extends Component {
  constructor(props) {
    super(props)
    this.onToggleClick = this.onToggleClick.bind(this);
  }
 
onToggleClick(event) {
  counter ++;
  if(counter%2 == 1){
    window.set_toggle_state("manuallyMode", "autoModeReact", 'checked');
  }
  else{
    window.set_toggle_state("manuallyMode", "autoModeReact", 'unchecked');
  }
}
render() {
  return (
  <div style={styles.block}>
    <Toggle 
      style={styles.toggle}
      onClick={this.onToggleClick}
    />
  </div>
);
}
}