import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import _ActionGrade from 'material-ui/svg-icons/image/image';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import ReactTooltip from 'react-tooltip';
import $ from "jquery";

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

class LoadMaskBttn extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
    <div style={{position:'relative', float:'left', bottom:'14px', right:'128px'}}>
      <IconButton tooltip="load img" tooltipPosition="bottom-right" iconStyle={styles.smallIcon}
        style={styles.small}>
        <_ActionGrade />
      </IconButton>
    </div>
    )
  }

}

class CircleBttns extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ReactTooltip place="bottom" type="dark" effect="float" />
        <RadioButtonGroup name="shipSpeed" style={{ display: 'flex' }}>

         <a data-tip="Mask"
            value='2'
            style={{ display: 'inline-block', width: '35px' }}/>
          <a data-tip="Wall"
            value='3'
            style={{ display: 'inline-block', width: '35px' }}/>

        </RadioButtonGroup>
      </div>
    );
  }

}

export default class  extends Component {

    render() {
      return (
        <div>
          <LoadMaskBttn />
          <CircleBttns />
        </div>
      );
    }
  }