import RaisedButtonPush from './components/RaisedButton';
import RaisedButtonApply from './components/ApplyButton';
import RaisedButtonDownload from './components/DownloadButton';
import PaperComponent from './components/Paper';
import FloatingButtonPlus from './components/FloatingActionButton';
import ToggleExampleSimple from './components/ModeToggle';
import LinearProgressExampleDeterminate from './components/LinearProgress';
import ManuallyForm from './components/ManuallyModeForm';
import AutoForm from './components/AutoModeForm';
import WallButtonPlus from './components/WallBttnPlus';
import StickerButtonPlus from './components/StickerBttnPlus';
import DeleteBttn from './components/DeleteButton';
import DeleteFrameBttn from './components/DeleteFrameButton';
import LoadImgAndDeleteFrameBttns from './components/LoadImgAndDeleteFrameButtons';
import FrameRadioButtons from './components/FrameRadioBttns';
import FrameRadioButtonsResult from './components/FrameRadioBttnsWithResult';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import $ from "jquery";
import registerServiceWorker from './registerServiceWorker';

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey500,
  },
});

// add bottom frame 'image load' button
window.renderFrameImgLoadAndDelBttn = function renderFrameImgLoadAndDelBttn(id) {
  ReactDOM.render(<MuiThemeProvider><LoadImgAndDeleteFrameBttns /></MuiThemeProvider>, document.getElementById('load_del'.concat(id)));
}

// add bottom frame 'delete frame' button
window.renderDelFrameBttn = function renderDelFrameBttn(id) {
  ReactDOM.render(<MuiThemeProvider><DeleteFrameBttn /></MuiThemeProvider>, document.getElementById('load_del'.concat(id)));
}

// add bottom frame components with or without 'Result' button
window.renderFrameComponents = function renderFrameComponents() { 
  for (var i = 0; i <= $('#imgsHolder').children().length; i++) {
    if ($('#imgsHolder').children()[i] != undefined) {
      if (i != 0) {
        ReactDOM.render(<MuiThemeProvider><PaperComponent /></MuiThemeProvider>, $('#imgsHolder').children()[i].firstChild);
        ReactDOM.render(<MuiThemeProvider><DeleteFrameBttn /></MuiThemeProvider>, $('#imgsHolder').children()[i].childNodes[2]);
      }
    }
  }
   // add 3 or 4 circle buttons
   window.imagesDict.forEach(function (element, index, array) { 
    if (element._completed == false) {
      ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}><FrameRadioButtons /></MuiThemeProvider>, document.getElementById('radioBttns'.concat(element._id)));
    }
    else {
      ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}><FrameRadioButtonsResult /></MuiThemeProvider>, document.getElementById('radioBttns'.concat(element._id)));
      
    }
  });
}
// add Paper component when new frame creates
window.FramePaper = function FramePaper() {
  window.addFrame(20);  
  window.renderFrameComponents();
}
// add Delete buttons to top galleries images
function addDelBttns(container_id) {
  var imgId;
  var imgsCount = $(container_id).children().length;
  for (var i = 0; i <= imgsCount; i++) {
    if (i == imgsCount - 1) {
      imgId = $(container_id).children()[i].lastChild.lastChild.lastChild.id;
      ReactDOM.render(<MuiThemeProvider><DeleteBttn /></MuiThemeProvider>, document.getElementById(imgId));
    }
  }
};
//check wall or mask galleries load event
document.getElementById("wall_gallery")
  .addEventListener('DOMNodeInserted', function (event) {
    addDelBttns('#wall_gallery');
  });
document.getElementById("sticker_gallery")
  .addEventListener('DOMNodeInserted', function (event) {
    addDelBttns('#sticker_gallery');
  });


ReactDOM.render(<MuiThemeProvider><PaperComponent /></MuiThemeProvider>, document.getElementById('paper'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonPush /></MuiThemeProvider>, document.getElementById('buttonPush'));
ReactDOM.render(<MuiThemeProvider><FloatingButtonPlus /></MuiThemeProvider>, document.getElementById('buttonPlus'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonDownload /></MuiThemeProvider>, document.getElementById('buttonDownload'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonApply /></MuiThemeProvider>, document.getElementById('buttonApply'));
ReactDOM.render(<MuiThemeProvider><ToggleExampleSimple /></MuiThemeProvider>, document.getElementById('toggle'));
ReactDOM.render(<MuiThemeProvider><ManuallyForm /></MuiThemeProvider>, document.getElementById('manuallyModeReact'));
ReactDOM.render(<MuiThemeProvider><AutoForm /></MuiThemeProvider>, document.getElementById('autoModeReact'));
ReactDOM.render(<MuiThemeProvider><LinearProgressExampleDeterminate /></MuiThemeProvider>, document.getElementById('linearProgress'));
ReactDOM.render(<MuiThemeProvider><WallButtonPlus /></MuiThemeProvider>, document.getElementById('wallspan'));
ReactDOM.render(<MuiThemeProvider><StickerButtonPlus /></MuiThemeProvider>, document.getElementById('stickerspan'));

registerServiceWorker();
