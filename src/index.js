import RaisedButtonAddWall from './components/RaisedButtonAddWall';
import RaisedButtonAddMask from './components/RaisedButtonAddMask';
import RaisedButtonAddSticker from './components/RaisedButtonAddSticker';
import RaisedButtonDownload from './components/DownloadButton';
import ToggleExampleSimple from './components/ModeToggle';
import LinearProgressExampleDeterminate from './components/LinearProgress';
import ManuallyForm from './components/ManuallyModeForm';
import AutoForm from './components/AutoModeForm';
import WallButtonPlus from './components/WallBttnPlus';
import StickerButtonPlus from './components/StickerBttnPlus';
import WallComponents from './components/WallFrameComponents';
import DeleteBttn from './components/DeleteButton';
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

function addWallComponents(event) { 
  if(event.target.tagName == 'LI'){
    ReactDOM.render(<MuiThemeProvider><WallComponents /></MuiThemeProvider>, document.getElementById(event.target.lastChild.lastChild.lastChild.id));
  }
};

function addDelBttns(event) {
  if(event.target.tagName == 'LI'){   
    ReactDOM.render(<MuiThemeProvider><DeleteBttn /></MuiThemeProvider>, document.getElementById(event.target.lastChild.lastChild.lastChild.id));
  }
};

//check wall or mask galleries load event
document.getElementById("wall_gallery")
  .addEventListener('DOMNodeInserted', addWallComponents);

document.getElementById("sticker_gallery")
  .addEventListener('DOMNodeInserted', addDelBttns);

ReactDOM.render(<MuiThemeProvider><RaisedButtonAddWall /></MuiThemeProvider>, document.getElementById('buttonAddWall'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonAddMask /></MuiThemeProvider>, document.getElementById('buttonAddMask'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonAddSticker /></MuiThemeProvider>, document.getElementById('buttonAddSticker'));
ReactDOM.render(<MuiThemeProvider><RaisedButtonDownload /></MuiThemeProvider>, document.getElementById('buttonDownload'));
ReactDOM.render(<MuiThemeProvider><ToggleExampleSimple /></MuiThemeProvider>, document.getElementById('toggle'));
ReactDOM.render(<MuiThemeProvider><ManuallyForm /></MuiThemeProvider>, document.getElementById('manuallyModeReact'));
ReactDOM.render(<MuiThemeProvider><AutoForm /></MuiThemeProvider>, document.getElementById('autoModeReact'));
ReactDOM.render(<MuiThemeProvider><LinearProgressExampleDeterminate /></MuiThemeProvider>, document.getElementById('linearProgress'));
ReactDOM.render(<MuiThemeProvider><WallButtonPlus /></MuiThemeProvider>, document.getElementById('wallspan'));
ReactDOM.render(<MuiThemeProvider><StickerButtonPlus /></MuiThemeProvider>, document.getElementById('stickerspan'));

registerServiceWorker();
