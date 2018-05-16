var TOP_GALLERY_FRAME_DIMENSIONS = 150;
var previousWidth;
var previousHeight;
var imgProportion;
var resultImgIndex = 0;
var client_data = {}

var newScale;
var opacity = 1;

var resultImage = ''
var resultImageExt;

var currentImageIndex;
var circleBttnLabel;
var clickedGalleryImageSrc = ''
var clickedGalleryImageName = ''

var image, mask, sticker;
var canvasOffset = $("#layer2").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var startX;
var startY;

var mouseX, mouseY;

var pi2 = Math.PI * 2;
var resizerRadius = 8;
var rr = resizerRadius * resizerRadius;
var draggingResizer = {
    x: 0,
    y: 0
};

var imageX;
var imageY;
var imageWidth, imageHeight, imageRight, imageBottom;
var draggingImage = false;
var imageClick;

var BORDER_WIDTH;
var BORDER_HEIGHT;
var WIDTH;
var HEIGHT = 300;
var borderProportion;
var canvasProportion;
var stickerProportion;
var scale = 1;

var isDrawStarted;

var canvas = document.getElementById('layer2'),
    canvasContext = canvas.getContext('2d');

var backCanvas = document.getElementById('layer1'),
    backContext = canvas.getContext('2d');

var canvasWidth = WIDTH;
var canvasHeight = HEIGHT;

image = new Image();
mask = new Image();
sticker = new Image();

//**************utils********************
function sijax_data(key, value) {
    Sijax.setRequestUri('http://93.77.34.47:63100/');
    client_data[key] = value;
    Sijax.request('client_data', [client_data]);
    delete client_data[key];
}

window.onresize = function () {
    // These functions makes that ul width wraps li content every time.
    // This is necessary in order for the image to always be aligned in the center of the gallery.
    set_min_galleries_ul_width('wall_ul_div', 'wall_gallery');
    set_min_galleries_ul_width('sticker_ul_div', 'sticker_gallery');
  
    BORDER_WIDTH = get_border_props()['borderWidth'];
    BORDER_HEIGHT = get_border_props()['borderHeight'];
    borderProportion = get_border_props()['borderProportion'];
    setImageProperties();
    previousWidth = BORDER_WIDTH
    previousHeight = BORDER_HEIGHT
    draw(true, false)
    if (sticker.src.includes('data')) {
        onStickerLoading()
    }
    if (document.getElementById('theImg') != null){
        set_automode_result_img_style()
    }
}

function set_min_galleries_ul_width(div_container_id, gallery_id ){
    var min_width_of_couple_images_with_margins = 382;
    var min_width_of_one_image_with_margins = 180
    if($('#'.concat(div_container_id)).width() < min_width_of_couple_images_with_margins){
        $('#'.concat(gallery_id)).css('width', min_width_of_one_image_with_margins)
    }else{
        $('#'.concat(gallery_id)).css('width', min_width_of_couple_images_with_margins)
    }
}

function set_automode_result_img_style() {
    automodeResultImage = document.getElementById('theImg')
    automodeResultImage.style.width = (canvasContext.canvas.width).toString().concat('px')
    automodeResultImage.style.height = (canvasContext.canvas.height).toString().concat('px')
    automodeResultImage.style.top = canvasContext.canvas.style.top
    automodeResultImage.style.left = canvasContext.canvas.style.left
}

function get_border_props() {
    borderWidth = get_element_dim('canvasesdiv')['elementWidth']
    borderHeight = get_element_dim('canvasesdiv')['elementHeight']
    borderProportion = get_element_dim('canvasesdiv')['elementProportion']
    return { borderWidth, borderHeight, borderProportion }
}  

function get_element_dim(element_id) {
    var element = document.getElementById(element_id);
    elementWidth = element.clientWidth;
    elementHeight = element.clientHeight;
    elementProportion = elementWidth / elementHeight;
    return { elementWidth, elementHeight, elementProportion }
}  

function setImageProperties() {
    if (canvasProportion <= borderProportion) {
        set_canvas_dimensions(BORDER_HEIGHT * canvasProportion, BORDER_HEIGHT)
        set_canvas_position(0, ((BORDER_WIDTH - canvasContext.canvas.width) / 2).toString().concat('px'))
    }
    else {
        set_canvas_dimensions(BORDER_WIDTH, BORDER_WIDTH / canvasProportion)
        set_canvas_position(((BORDER_HEIGHT - canvasContext.canvas.height) / 2).toString().concat('px'), 0)
    }
    WIDTH = canvasContext.canvas.width
    HEIGHT = canvasContext.canvas.height
    if (sticker.src.includes('data')) {
        onStickerLoading()
    }
}

function set_canvas_dimensions(canvasWidth, canvasHeight) {
    canvasContext.canvas.width = canvasWidth;
    canvasContext.canvas.height = canvasHeight;
}

function set_canvas_position(canvasTop, canvasLeft) {
    canvasContext.canvas.style.top = canvasTop;
    canvasContext.canvas.style.left = canvasLeft;
}

///////////////////////// HANDLE CLICK EVENTS ////////////////////
//********************** handle image click event ***************
$('body').on('click', 'img', function () {
    if ($(this).parent().parent().parent().parent().attr('id') == 'wall_gallery' && $(this).parent().attr('id') != 'formCanvasResponse') {
        clear_automode_img()
        
      
        currentImageIndex = $(this).parent().parent().parent().context.id.split('_wall')[1]
    
        if($('#del_wall'.concat(currentImageIndex)).children().children().children().children().children().children()[7].innerText != ''){ 
           circleBttnLabel = $('#del_wall'.concat(currentImageIndex)).children().children().children().children().children().children()[7].innerText
        }
        clicked_wall_name = this.getAttribute("name")

        first_uploaded_from_server = $(this).parent().attr('id')
    
        sijax_data('wall_mask', [clicked_wall_name, first_uploaded_from_server]);
        ////////////////////////////////////////////////////////////
      
        if(first_uploaded_from_server == 'uploaded') {// give image from cache
            if(circleBttnLabel == 'show mask'){ 
                image.src = $('#_wall'.concat(currentImageIndex)).attr('src')
                
            }else if(circleBttnLabel == 'show wall'){   
                image.src = $('#del_wall'.concat(currentImageIndex)).attr('src')
            }
        }
        else if(first_uploaded_from_server == 'not_uploaded'){  
            $(this).parent().attr('id', 'uploaded')
        }

        
        ////////////////////////////////////////////////////////////
        set_wall_or_mask_proportions(image)
        set_default_values()
        // show caption on wall/mask button click
        $(".caption").css("display", "inline-block");

    }
    else if ($(this).parent().attr('id') != 'formCanvasResponse') {
        clear_automode_img()
    
        //////////////////////////////////////////////////////////////
        currentImageIndex = $(this).parent().parent().context.id.split('_sticker')[1]
        if($(this).parent().attr('id') == 'not_uploaded'){
            sijax_data('sticker', this.getAttribute("name"));
        }else{ 
            sticker.src = $('#_sticker'.concat(currentImageIndex)).attr('src')
        }
        ///////////////////////////////////////////////////////////////
        onStickerLoading()
        set_default_values()
    } 
    set_button_download_state()
}

);    

mask.onload = function () {       
    if(sticker.src.includes('data')){
        draw(true, false)
    }else{
        draw(false, false)
    }
}

sticker.onload = function () {
    if( $('#_sticker'.concat(currentImageIndex)).parent().attr('id') == 'not_uploaded'){
        $('#_sticker'.concat(currentImageIndex)).attr('src', sticker.src)
        $('#_sticker'.concat(currentImageIndex)).parent().attr('id', 'uploaded')
    }
    onStickerLoading()
    set_button_download_state()
}

function set_button_download_state() {
    if (image.src.includes('data') && sticker.src.includes('data')) {
        setBttnDownloadEnabled()
    } else {
        setBttnDownloadDisabled()
    }
}

function set_wall_or_mask_proportions(image) {
    image.onload = function () {           
        imgProportion = image.width / image.height;
        canvasProportion = imgProportion
        setImageProperties()

        if (imgProportion <= borderProportion) {
            HEIGHT = previousHeight
            if (previousWidth == WIDTH) {
                WIDTH = WIDTH * imgProportion / borderProportion;
            }
            set_canvas_dimensions(WIDTH, HEIGHT)
            set_canvas_position(0, ((previousWidth - WIDTH) / 2).toString().concat('px'))
            draw(false, false);
        }
        else {
            WIDTH = previousWidth;
            if (previousHeight == HEIGHT) {
                HEIGHT = HEIGHT * borderProportion / imgProportion;
            }
            set_canvas_dimensions(WIDTH, HEIGHT)
            set_canvas_position(((previousHeight - HEIGHT) / 2).toString().concat('px'), 0)
            draw(false, false);
        }
        canvasProportion = canvasContext.canvas.width / canvasContext.canvas.height
        if (sticker.src.includes('data')) {
            onStickerLoading()
        }
        set_button_download_state()
    };
}

function onStickerLoading() {
    if (!image.src.includes('data')) {
        WIDTH = BORDER_WIDTH
        HEIGHT = BORDER_HEIGHT
        imgProportion = borderProportion;
        set_canvas_dimensions(WIDTH, HEIGHT)
        set_canvas_position(0, 0)
    }
    stickerProportion = sticker.width / sticker.height;
    if (sticker.width == 0 || sticker.height == 0) {
        var i = new Image();
        i.onload = function () {
            stickerProportion = i.width / i.height;
            set_sticker_dim_and_pos()
        };
        i.src = sticker.src;
    } else {
        set_sticker_dim_and_pos()
    }
}

function set_sticker_dim_and_pos() {
    if (stickerProportion <= imgProportion) {
        imageWidth = HEIGHT * stickerProportion;
        imageHeight = HEIGHT;
        imageY = 0;
        imageX = (WIDTH - imageWidth) / 2;
    }
    else {
        imageWidth = WIDTH;
        imageHeight = WIDTH / stickerProportion;
        imageY = (HEIGHT - imageHeight) / 2;
        imageX = 0;
    }
    imageRight = imageX + imageWidth;
    imageBottom = imageY + imageHeight;

    draw(true, false);
    isDrawStarted = true;
    newScale = imageWidth / sticker.width * 100;

    setDefaultManuallyMode();

}
//*********** handle DOM Node inserted event ***************
//check auto mode edit image loads event to save proportions

document.getElementById('formCanvasResponse')
    .addEventListener('DOMNodeInserted', onAutoImgChangeHandler);

function onAutoImgChangeHandler(event) {
    event.target.width = WIDTH;
    event.target.height = HEIGHT;
    event.target.style.top = canvasContext.canvas.style.top;
    event.target.style.left = canvasContext.canvas.style.left;
};

//check wall,mask or sticker loads to top gallery event to save img proportions
document.getElementById("wall_gallery")
    .addEventListener('DOMNodeInserted', onTopGalleryChangeHandler);
document.getElementById("sticker_gallery")
    .addEventListener('DOMNodeInserted', onTopGalleryChangeHandler);

function onTopGalleryChangeHandler(event) {
    try {
        var galleryImg = event.target.children[0].children[0].children[0];
        if (galleryImg.localName == 'img') {
            var i = new Image();
            i.onload = function () {
                var imgProportion = i.width / i.height;
                if (imgProportion <= 1) {
                    galleryImg.style.width = (TOP_GALLERY_FRAME_DIMENSIONS * imgProportion).toString().concat('px');
                    galleryImg.style.height = (TOP_GALLERY_FRAME_DIMENSIONS).toString().concat('px');

                    galleryImg.style.paddingLeft = ((TOP_GALLERY_FRAME_DIMENSIONS - galleryImg.width) / 2).toString().concat('px');
                    galleryImg.style.paddingRight = ((TOP_GALLERY_FRAME_DIMENSIONS - galleryImg.width) / 2).toString().concat('px');
                }
                else {
                    galleryImg.style.width = (TOP_GALLERY_FRAME_DIMENSIONS).toString().concat('px');
                    galleryImg.style.height = (TOP_GALLERY_FRAME_DIMENSIONS / imgProportion).toString().concat('px');

                    galleryImg.style.paddingTop = ((TOP_GALLERY_FRAME_DIMENSIONS - galleryImg.height) / 2).toString().concat('px');
                    galleryImg.style.paddingBottom = ((TOP_GALLERY_FRAME_DIMENSIONS - galleryImg.height) / 2).toString().concat('px');
                }
            };
            i.src = galleryImg.src;
        }
    } catch (e) {
        console.log(e.message)
    }
};
//******************draw canvas images********************
function drawDragAnchor(x, y) {
    canvasContext.beginPath();
    canvasContext.arc(x, y, resizerRadius, 0, pi2, false);
    canvasContext.closePath();
    canvasContext.fill();
}
function draw(withAnchors, withBorders) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    backContext.clearRect(0, 0, canvas.width, canvas.height);
    if (opacity != 1) {
        canvasContext.globalAlpha = opacity;
    }
    canvasContext.drawImage(sticker, 0, 0, sticker.width, sticker.height, imageX, imageY, imageWidth, imageHeight);
    canvasContext.globalAlpha = 1.0;
    newScale = imageWidth / sticker.width * 100;

    // optionally draw the draggable anchors

    if (sticker.src.includes('data') && withAnchors) {
        //drawDragAnchor(20, 20);
        drawDragAnchor(imageX, imageY);
        drawDragAnchor(imageRight, imageY);
        drawDragAnchor(imageRight, imageBottom);
        drawDragAnchor(imageX, imageBottom);
    }

    // optionally draw the connecting anchor lines
    if (sticker.src.includes('data') && withBorders) {
        canvasContext.beginPath();
        canvasContext.moveTo(imageX, imageY);
        canvasContext.lineTo(imageRight, imageY);
        canvasContext.lineTo(imageRight, imageBottom);
        canvasContext.lineTo(imageX, imageBottom);
        canvasContext.closePath();
        canvasContext.stroke();
    }

    var dest = canvasContext.globalCompositeOperation;
    canvasContext.globalCompositeOperation = "destination-in";
    canvasContext.drawImage(mask, 0, 0, WIDTH, HEIGHT);
    canvasContext.globalCompositeOperation = dest;
    

    var dest2 = backContext.globalCompositeOperation;
    backContext.globalCompositeOperation = "destination-atop";
    backContext.drawImage(image, 0, 0, WIDTH, HEIGHT);
    backContext.globalCompositeOperation = dest2;
}

draw(true, false);

//**************INTERFACE************************

////////////////// Tabs //////////////////////
/*
$("#wallspan").click(function () {
    sijax_data('wall_gallery', 'wall_gallery')

});
$("#stickerspan").click(function () {
    sijax_data('sticker_gallery', 'sticker_gallery')
});
*/
// add Wall and Sticker files to gallery
function addWall() {
    document.getElementById('wallFile').click();

}

function addMask() {
    document.getElementById('maskFile').click();
}

function addSticker() {
    document.getElementById('stickerFile').click()

}

//////////// form submit settings ///////////////
function loadGalleryWallFile() {
    var file = document.getElementById('wallFile').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
        sijax_data('galleryWallFile', reader.result)
        $("#wallFile")[0].value = '';
    }, false);
}

function loadGalleryMaskFile() {
    var file = document.getElementById('maskFile').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
        mask_name = createMaskName();
        sijax_data('galleryMaskFile', [mask_name, reader.result, currentImageIndex, circleBttnLabel])
        $("#maskFile")[0].value = '';
    }, false);
}

function createMaskName() {
    return clickedGalleryImageName.replace('wall', 'mask')
}

function loadGalleryStickerFile() {
    var file = document.getElementById('stickerFile').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
        sijax_data('galleryStickerFile', reader.result)
        $("#stickerFile")[0].value = '';
    }, false);

}

// top gallery image button click
$(function () {
    $('ul').on('click', 'button', function (e) { //Get li under ul and invoke on contextmenu
        e.preventDefault(); //Prevent defaults

        var clicked_bttn_id = $(this).attr('id')
        //var currentImageIndex; 
        
        if ($(this).parent().parent().parent().attr('id').includes('del')) {// wall gallery
            currentImageIndex = $(this).parent().parent().parent().attr('id').split('del_wall')[1]
            clickedGalleryImageName = $('#_wall'.concat(currentImageIndex)).attr('name')
        } else {
            currentImageIndex = $(this).parent().parent().attr('id').split('del_sticker')[1]
            clickedGalleryImageName = $('#_sticker'.concat(currentImageIndex)).attr('name')
        }

        switch (clicked_bttn_id.split('_')[0]) {

            case 'delete':
                onFrameDeleteBttnClick(this, clickedGalleryImageName, clicked_bttn_id)
                break;
            case 'change':
                // hide caption on wall/mask button click
                $(".caption").css("display", "none");
                onChangeWallMaskBttnClick(this, currentImageIndex)
                break;
        }
    });
});

function onFrameDeleteBttnClick(_this, selectedImageName, delete_bttn_id) {
    if (window.confirm("Do you really want to delete an image?")) {

        imgName = $(_this).parent().parent().parent().parent().find('name');
        sijax_data('delGalleryImg', [selectedImageName, delete_bttn_id])
        $(_this).parent().parent().parent().parent().remove();
    }
}


function onChangeWallMaskBttnClick(_this, currentImageIndex) {
    circleBttnLabel = $(_this).text()
   
    if(circleBttnLabel == 'show mask'){
        circleBttnLabel = 'show wall'
    }else if(circleBttnLabel = 'show wall'){
        circleBttnLabel = 'show mask'
    }
    clickedGalleryImageSrc = $('#_wall'.concat(currentImageIndex)).attr('src')
    $('#_wall'.concat(currentImageIndex)).attr('src', $(_this).parent().parent().parent().attr('src'))
    $(_this).parent().parent().parent().attr('src', clickedGalleryImageSrc)
}


///////////// auto mode settings ////////////////
// auto mode form onChange
function onAutomodeSttsChange(isStickerCenter = false) {
    var stickerCenter = $('#sticker_center')[0].value;
    if(isStickerCenter == true){ 
        if($('#sticker_center')[0].value == 'false'){
            stickerCenter = true;
        }else{
            stickerCenter = false
        }
    }
    if (check_image_items_cmpleted()) {
        sijax_data('automode_settings', [stickerCenter, $('#repeat_x')[0].value, $('#repeat_y')[0].value, $('#opacity_auto')[0].lastChild.value])
    }
}
/*
function stickerCenterState(sticker_center) {
    console.log($('#sticker_center')[0].value)
    console.log($('#repeat_x')[0].value)
    console.log($('#repeat_y')[0].value)
    console.log($('#opacity_auto')[0].lastChild.value)
    
    if (check_image_items_cmpleted()) {
        sijax_data('sticker_center', sticker_center)
        sticker_center = false;
    }
}

function repeat_xState(repeat_x) {
    if (check_image_items_cmpleted()) {
        sijax_data('repeat_x', repeat_x)
        sijax_data('repeat_y', 1)
        repeat_x = 1;
    }
}

function repeat_yState(repeat_y) {
    if (check_image_items_cmpleted()) {
        sijax_data('repeat_y', repeat_y)
        sijax_data('repeat_x', 1)
        repeat_y = 1;
    }
}

function opacityState(opacity) {
    if (check_image_items_cmpleted()) {
        sijax_data('opacity', opacity)
        opacity = 1;
    }
}*/

function check_image_items_cmpleted() {
    if (image.src.includes('data') && sticker.src.includes('data')) {
        return true;
    }
    alert('You must load at least Wall and sticker')
    return false;
}

//********************** handle Wall, Mask or Sticker button click event ***************
function readURL(input, type) {
    clear_automode_img()
   

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var result = e.target.result;
            switch (type) {
                case "image":
                    image.src = result;
                    sijax_data('custom_wall', [input.files[0]['name'], result])
                    $("#imageInput")[0].value = '';
                    break;
                case "mask":
                    mask.src = result;
                    sijax_data('custom_mask', [input.files[0]['name'], result])
                    $("#maskInput")[0].value = '';
                    break;
                case "sticker":
                    sticker.src = result;
                    sijax_data('custom_sticker', [input.files[0]['name'], result])
                    $("#stickerInput")[0].value = '';
                    break;
            }

            set_wall_or_mask_proportions(image)
            if (sticker.src.includes('data')) {
                onStickerLoading()
            }

            set_button_download_state();
        }

        reader.readAsDataURL(input.files[0]);
    }
    set_default_values()
}

$("#imageInput").change(function () {
    readURL(this, "image");
});

$("#maskInput").change(function () {
    readURL(this, "mask");
});

$("#stickerInput").change(function () {
    readURL(this, "sticker");
});

/////////////////// DRUG & SCALE ///////////////////////
// mouse move coords relative to canvas
$(canvas).mousemove(function (jqEvent) {
    var coords = {
        x: jqEvent.pageX - $(canvas).offset().left,
        y: jqEvent.pageY - $(canvas).offset().top
    };
    mouseX = coords.x
    mouseY = coords.y
});

///////////////////////////////////////////////////////////////////////////

function drawDragAnchor(x, y) {
    canvasContext.beginPath();
    canvasContext.arc(x, y, resizerRadius, 0, pi2, false);
    canvasContext.closePath();
    canvasContext.fill();
}

function anchorHitTest(x, y) {
    var dx, dy;
    // top-left
    dx = x - imageX;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (0);
    }
    // top-right
    dx = x - imageRight;
    dy = y - imageY;
    if (dx * dx + dy * dy <= rr) {
        return (1);
    }
    // bottom-right
    dx = x - imageRight;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (2);
    }
    // bottom-left
    dx = x - imageX;
    dy = y - imageBottom;
    if (dx * dx + dy * dy <= rr) {
        return (3);
    }
    return (-1);
}

function hitImage(x, y) {
    if (sticker.src != "")
        return (x > imageX && x < imageX + imageWidth && y > imageY && y < imageY + imageHeight);
}

function handleMouseDown(e) {
    var coords = {
        x: e.pageX - $(canvas).offset().left,
        y: e.pageY - $(canvas).offset().top
    };
    startX = coords.x
    startY = coords.y

    draggingResizer = anchorHitTest(startX, startY);
    draggingImage = draggingResizer < 0 && hitImage(startX, startY);
}

function handleMouseUp(e) {
    draggingResizer = -1;
    draggingImage = false;
    if ($(image).attr('src') != '') {
        draw(true, false);
    }
}

function handleMouseOut(e) {
    handleMouseUp(e);
}

function handleMouseMove(e) {
    if (draggingResizer > -1) {

        switch (draggingResizer) {
            case 0:
                //top-left
                imageX = mouseX;
                imageWidth = imageRight - mouseX;
                imageY = mouseY;
                imageHeight = imageBottom - mouseY;
                break;
            case 1:
                //top-right
                imageY = mouseY;
                imageWidth = mouseX - imageX;
                imageHeight = imageBottom - mouseY;
                break;
            case 2:
                //bottom-right
                imageWidth = mouseX - imageX;
                imageHeight = mouseY - imageY;
                break;
            case 3:
                //bottom-left
                imageX = mouseX;
                imageWidth = imageRight - mouseX;
                imageHeight = mouseY - imageY;
                break;
        }

        if (imageWidth < 25) { imageWidth = 25; }
        if (imageHeight < 25) { imageHeight = 25; }

        // set the image right and bottom
        imageRight = imageX + imageWidth;
        imageBottom = imageY + imageHeight;

        // redraw the image with resizing anchors
        draw(true, true);

    } else if (draggingImage) {

        imageClick = false;
        // move the image by the amount of the latest drag
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        imageX += dx;
        imageY += dy;
        imageRight += dx;
        imageBottom += dy;
        // reset the startXY for next time
        startX = mouseX;
        startY = mouseY;
        // redraw the image with border
        draw(false, true);
    }
}

$("#layer2").mousedown(function (e) {
    handleMouseDown(e);
});
$("#layer2").mousemove(function (e) {
    if (sticker.src.includes('data'))
        handleMouseMove(e);
});
$("#layer2").mouseup(function (e) {
    handleMouseUp(e);
});
$("#layer2").mouseout(function (e) {
    handleMouseOut(e);
});

/////////////////toggle button///////////////////
function set_toggle_state(manuallyMode, autoMode, toggle_state) {
    if (toggle_state == 'checked') {
        document.getElementById(manuallyMode).hidden = true;
        document.getElementById(autoMode).hidden = false;
    }
    else {

        document.getElementById(autoMode).hidden = true;
        document.getElementById(manuallyMode).hidden = false;
    }
    automodeImgDivVisibility()
}

function automodeImgDivVisibility() {
    var automodeImgDiv = document.getElementById("formCanvasResponse");
    if (automodeImgDiv.style.display === "none") {
        automodeImgDiv.style.display = "block";
    } else {
        automodeImgDiv.style.display = "none";
    }
}

window.onload = function () {// default settings mode
    set_initial_galleries_ul_width()

    BORDER_WIDTH = get_border_props()['borderWidth'];
    BORDER_HEIGHT = get_border_props()['borderHeight'];
    borderProportion = get_border_props()['borderProportion'];
    WIDTH = BORDER_WIDTH
    HEIGHT = BORDER_HEIGHT
    previousWidth = WIDTH
    previousHeight = HEIGHT

    set_toggle_state("manuallyMode", "autoModeReact", 'not_uploaded');

    sijax_data('sticker_gallery', 'sticker_gallery')
    sijax_data('wall_gallery', 'wall_gallery')
}

function set_initial_galleries_ul_width(){
    var summary_img_horizontal_margin = 68;
    var initial_ul_width = TOP_GALLERY_FRAME_DIMENSIONS*2 + summary_img_horizontal_margin
    $('#wall_gallery').css('width', initial_ul_width)
    $('#sticker_gallery').css('width', initial_ul_width)
}

//****************** DOWNLOAD AND APPLY IMAGES *****************
/* Download an img */
function download(img, title) {
    var download = document.createElement('a');
    download.href = img;
    download.download = title;
    download.click();
    //for firefox
    fireEvent(download, 'click')
}
//for firefox browsers:
function fireEvent(obj, evt) {
    var fireOnThis = obj;
    if (document.createEvent) {
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent(evt, true, false);
        fireOnThis.dispatchEvent(evObj);
    } else if (document.createEventObject) {
        var evObj = document.createEventObject();
        fireOnThis.fireEvent('on' + evt, evObj);
    }
}

function onDownload() {
    resultImgIndex = resultImgIndex += 1
    set_automode_img_attrs()
    if (resultImage != "") {
        title = 'result-'.concat(resultImgIndex).concat(resultImageExt);
        download(resultImage, title)
        setPercent(100);
    } resultImage = ''
    //set_default_values();
    //clearLargeImg();
    sijax_data('downloaded', 'true');
    setTimeout(setPercent, 800, 0);
    //setBttnDownloadDisabled()
}

function set_automode_img_attrs() {
    var img_src = $('#theImg').attr('src')
    resultImage = canvas.toDataURL();
    if (img_src != undefined) {
        resultImage = img_src;
        resultImageExt = '.jpg'
    } else {
        resultImageExt = '.png'
    }
}

function clear_automode_img() {
    if ($('#theImg') != undefined) {
        $('#theImg').remove();
    }
}

function set_default_values() {
    if(image.src.includes('data') && sticker.src.includes('data')){
        setDefaultAutoMode();
        setDefaultManuallyMode();
    }
}
/*
function clearLargeImg() {
    //canvas data URL
    image.src = '';
    mask.src = '';
    sticker.src = '';
    clearCanvas();
    clear_automode_img()
}

function clearCanvas() {
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
    backContext.clearRect(0, 0, WIDTH, HEIGHT);
}*/





