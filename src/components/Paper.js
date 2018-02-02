import React from 'react';
import Paper from 'material-ui/Paper';

const style = { 
  height: 170,
  width: 170,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperComponent = () => (  
  <div>
    <Paper style={style} zDepth={3} />
  </div>
);

export default PaperComponent;

