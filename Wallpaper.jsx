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
        112,
        // Width of horizontal bezel in mm
        14
    ),
    new screenArea(336, 597, 2160, 3840, 70, 17),
    new screenArea(554, 313, 2560, 1440, 0, 9)
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
    var oldSelection = [
        [offsetLeft, verticalOffsetPx],
        [offsetLeft + horizontalPx + 1, verticalOffsetPx],
        [offsetLeft + horizontalPx + 1, verticalOffsetPx + verticalPx + 1],
        [offsetLeft, verticalPx + verticalOffsetPx + 1]
    ]

    var newSelection = [
        [0, 0],
        [horizontalPx + 1, 0],
        [horizontalPx + 1, verticalPx + 1],
        [0, verticalPx + 1]
    ]

    // Set the source file as active
    app.activeDocument = wallpaperFile;
    // Select the current screen's area
    app.activeDocument.selection.select(oldSelection);
    // copy to clipboard
    app.activeDocument.selection.copy();

    // Create the image
    var tempImage = app.documents.add(horizontalPx + 1, verticalPx + 1);
    // Set it as the active document
    app.activeDocument = tempImage;
    app.activeDocument.selection.select(newSelection);
    // Paste the copied selection of the source file
    app.activeDocument.paste(true);
    var cropDimensions = [
        new UnitValue(1, "px"),
        new UnitValue(1, "px"),
        new UnitValue(horizontalPx + 1, "px"),
        new UnitValue(verticalPx + 1, "px")
    ]
    app.activeDocument.crop(cropDimensions)
    // resize to the output dimensions
    tempImage.resizeImage(screens[i].horizontalPx, screens[i].verticalPx);
    // Save it as the supplied filename in the selected location
    tempImage.saveAs(new File(savePath + "/screen" + i + ".jpg"), wallpaperSaveOptions);
    // Close the file
    tempImage.close(SaveOptions.DONOTSAVECHANGES);

    // Set the offset for the next screen, by adding the width of the selection, and the width of the bezel
    offsetLeft += (horizontalPx + bezelPx - 1)
}

// Close the source file
wallpaperFile.close(SaveOptions.DONOTSAVECHANGES)

// Leave everything as we encountered it
preferences.rulerUnits = originalUnits
