var screens = [ new screenArea(296, 475, 1050, 1680, 17, 14), new screenArea(336, 597, 2160, 3840, 0, 17), new screenArea(313, 554, 1440, 2560, 3, 9) ];

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// NO EDITING BEYOND THIS POINT!                                             //
//                                                                           //


function screenArea(height, width, verticalPx, horizontalPx, verticalOffsetTop, bezelWidth) {
    this.height = height;
    this.width = width;
    this.verticalPx = verticalPx;
    this.horizontalPx = horizontalPx;
    this.verticalOffsetTop = verticalOffsetTop;
    this.bezelWidth = bezelWidth;
    this.horizontalPxPerMm = horizontalPx / width;
    this.verticalPxPerMm = verticalPx / height;
}

// The function that is the base of this script
function copyAndSaveSelection(selection, originalDimension, outputDimension, fileName) {
    // The options used to save the jpeg output files.
    var wallpaperSaveOptions = new JPEGSaveOptions();
    // I don't care what the input is, wallpapers should be good quality
    wallpaperSaveOptions.quality = 12;

    // Set the source file as active
    app.activeDocument = wallpaperFile;
    // Select the left screen's wallpaper
    app.activeDocument.selection.select(selection);
    // copy to clipboard
    app.activeDocument.selection.copy();

    // Create the image
    var tempImage = app.documents.add(originalDimension[0], originalDimension[1]);
    // Set it as the active document
    app.activeDocument = tempImage;
    // Paste the copied selection of the source file
    app.activeDocument.paste();
    // resize to the output dimensions
    tempImage.resizeImage(outputDimension[0], outputDimension[1]);
    // Save it as the supplied filename in the selected location
    tempImage.saveAs(new File(savePath + "/" + fileName), wallpaperSaveOptions);
    // Close the file
    tempImage.close(SaveOptions.DONOTSAVECHANGES);
};

alert(screens)

// Save the current units of measurement, so we can leave everything as it was
var originalUnits = preferences.rulerUnits;
// We need to work with pixels here
preferences.rulerUnits = Units.PIXELS;

// Now, first off, let's calculate some stuff we need

// Find the highest DPI
var horizontalPxPerMm = 0
var verticalPxPerMm = 0
for (i = 0; i < screens.length; i++) {
    horizontalPxPerMm = Math.max(screens[i].horizontalPxPerMm, horizontalPxPerMm);
    verticalPxPerMm = Math.max(screens[i].verticalPxPerMm, verticalPxPerMm);
}

selections = new Array();
offsetLeft = 0;

for (i = 0; i < screens.length; i++) {
    var bezelPx = screens[i].bezelWidth * horizontalPxPerMm
    var horizontalPx = screens[i].width * horizontalPxPerMm
    var verticalPx = screens[i].height * verticalPxPerMm
    var verticalOffsetPx = screens[i].verticalOffsetTop * verticalPxPerMm
    if (offsetLeft > 0) {
        offsetLeft += bezelPx
    }
    selections[i] = [
        [offsetLeft, verticalOffsetPx],
        [offsetLeft + horizontalPx, verticalOffsetPx],
        [offsetLeft + horizontalPx, verticalOffsetPx + verticalPx],
        [offsetLeft, verticalPx + verticalOffsetPx]
    ]
    offsetLeft += (horizontalPx + bezelPx)
}

// Browse for the source file
var dialogFile = app.openDialog()
// Browse for where to save the output
var savePath = Folder.selectDialog("Select where to save the output files")
// Open the source file
var wallpaperFile = app.open(dialogFile[0])

// We don't want any further dialogs
// app.displayDialogs = DialogModes.NO

for (i = 0; i < screens.length; i++) {
    copyAndSaveSelection(selections[i], [(screens[i].width * horizontalPxPerMm), (screens[i].height * verticalPxPerMm)], [screens[i].horizontalPx, screens[i].verticalPx], "screen" + i + ".jpg")
}

// Close the source file
wallpaperFile.close(SaveOptions.DONOTSAVECHANGES)

// Leave everythign as we encountered it
preferences.rulerUnits = originalUnits
