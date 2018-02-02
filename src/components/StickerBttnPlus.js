import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/image/add-to-photos';

const styles = {
  smallIcon: {
    width: 18,
    height: 18,
    color:'rgb(207, 205, 205)',
  },
  small: {
    width: 36,
    height: 36,
    padding: 8,
  },
};

const StickerButtonPlus = () => (  
  <span style={{position:'relative', float:'right'}}>Sticker
    <div style={{position:'relative', float:'right', marginLeft:'20px', bottom:'5px', right:'10px'}}>
    
      <IconButton tooltip="load sticker" tooltipPosition="bottom-left" iconStyle={styles.smallIcon}
        style={styles.small} onClick={() => window.addSticker()}>
        <ActionGrade />
      </IconButton>
    </div>
  </span>
);

export default StickerButtonPlus;