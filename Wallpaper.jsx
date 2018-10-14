var screens = [
    new screenArea(
        // Height in mm
        296,
        //Width in mm
        475,
        // Vertical pixels
        1050,
        // Horizontal pixels
        1680,
        // Distance between top edge and highest top edge in mm
        17,
        // Width of horizontal bezel in mm
        14
    ),
    new screenArea(336, 597, 2160, 3840, 0, 17),
    new screenArea(313, 554, 1440, 2560, 3, 9)
];

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// NO EDITING NEEDED BEYOND THIS POINT!                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

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

// Save the current units of measurement, so we can leave everything as it was
var originalUnits = preferences.rulerUnits;
// We need to work with pixels here
preferences.rulerUnits = Units.PIXELS;

// Find the highest DPI
var horizontalPxPerMm = 0
var verticalPxPerMm = 0
for (i = 0; i < screens.length; i++) {
    horizontalPxPerMm = Math.max(screens[i].horizontalPxPerMm, horizontalPxPerMm);
    verticalPxPerMm = Math.max(screens[i].verticalPxPerMm, verticalPxPerMm);
}

// Browse for the source file
var dialogFile = app.openDialog()
// Browse for where to save the output
var savePath = Folder.selectDialog("Select where to save the output files")
// Open the source file
var wallpaperFile = app.open(dialogFile[0])

// We don't want any further dialogs
app.displayDialogs = DialogModes.NO

var wallpaperSaveOptions = new JPEGSaveOptions();
// I don't care what the input is, wallpapers should be good quality
wallpaperSaveOptions.quality = 12;

// We start at offset 0
offsetLeft = 0;

for (i = 0; i < screens.length; i++) {
    // Calculate the screen's pixel dimensions, adjusted for the highest DPI screen
    var horizontalPx = screens[i].width * horizontalPxPerMm
    var verticalPx = screens[i].height * verticalPxPerMm
    var bezelPx = screens[i].bezelWidth * horizontalPxPerMm
    var verticalOffsetPx = screens[i].verticalOffsetTop * verticalPxPerMm

    // If we're at the first screen, we don't need to add the bezel
    if (offsetLeft > 0) {
        offsetLeft += bezelPx
    }

    // Selections are an array of coordinates, in this case, top left, top right, bottom right, bottom left
    var selection = [
        [offsetLeft, verticalOffsetPx],
        [offsetLeft + horizontalPx, verticalOffsetPx],
        [offsetLeft + horizontalPx, verticalOffsetPx + verticalPx],
        [offsetLeft, verticalPx + verticalOffsetPx]
    ]

    // Set the source file as active
    app.activeDocument = wallpaperFile;
    // Select the current screen's area
    app.activeDocument.selection.select(selection);
    // copy to clipboard
    app.activeDocument.selection.copy();

    // Create the image
    var tempImage = app.documents.add(horizontalPx, verticalPx);
    // Set it as the active document
    app.activeDocument = tempImage;
    // Paste the copied selection of the source file
    app.activeDocument.paste();
    // resize to the output dimensions, if necessary
    if (screens[i].horizontalPxPerMm != horizontalPxPerMm) {
        tempImage.resizeImage(screens[i].horizontalPx, screens[i].verticalPx);
    }
    // Save it as the supplied filename in the selected location
    tempImage.saveAs(new File(savePath + "/screen" + i + ".jpg"), wallpaperSaveOptions);
    // Close the file
    tempImage.close(SaveOptions.DONOTSAVECHANGES);

    // Set the offset for the next screen, by adding the width of the selection, and the width of the bezel
    offsetLeft += (horizontalPx + bezelPx)
}

// Close the source file
wallpaperFile.close(SaveOptions.DONOTSAVECHANGES)

// Leave everything as we encountered it
preferences.rulerUnits = originalUnits
