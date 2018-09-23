// Height of the left screen's screen area in mm
var leftScreenHeightmm = 296
// Width of the left screen's screen area in mm
var leftScreenWidthmm = 475
// Height of the left screen in pixels
var leftScreenVerticalpx = 1050
// Width of the left screen in pixels
var leftScreenHorizontalpx = 1680

// Height of the middle screen's screen area in mm
var middleScreenHeightmm = 336
// Width of the middle screen's screen area in mm
var middleScreenWidthmm = 597
// width of the middle screen in pixels
var middleScreenVerticalpx = 2160
// Heigth of the middle screen in pixels
var middleScreenHorizontalpx = 3840

// Height of the right screen's screen area in mm
var rightScreenHeightmm = 313
// Width of the right screen's screen area in mm
var rightScreenWidthmm = 554
// Width of the right screen in pixels
var rightScreenVerticalpx = 1440
// Height of the right screen in pixels
var rightScreenHorizontalpx = 2560

// The distance from the top of the left screen to the highest point on all screens in mm
var leftScreenVerticalOffsetTopmm = 17
// The distance from the top of the middle screen to the highest point on all screens in mm
var middleScreenVerticalOffsetTopmm = 0
// The distance from the top of the right screen to the highest point on all screens in mm
var rightScreenVerticalOffsetTopmm = 3

// The width of the left screen's bezels
var leftScreenBezelWidthmm = 14
// The width of the middle screen's bezels
var middleScreenBezelWidthmm = 17
// The width of the right screen's bezels
var rightScreenBezelWidthmm = 9

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// NO EDITING BEYOND THIS POINT!                                             //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// The function that is the base of this script
function copyAndSaveSelection(selection, originalDimension, outputDimension, fileName) {
    // The options used to save the jpeg output files.
    var wallpaperSaveOptions = new JPEGSaveOptions()
    // I don't care what the input is, wallpapers should be good quality
    wallpaperSaveOptions.quality = 12

    // Set the source file as active
    app.activeDocument = wallpaperFile
    // Select the left screen's wallpaper
    app.activeDocument.selection.select(selection)
    // copy to clipboard
    app.activeDocument.selection.copy()

    // Create the image
    var tempImage = app.documents.add(originalDimension[0], originalDimension[1])
    // Set it as the active document
    app.activeDocument = tempImage
    // Paste the copied selection of the source file
    app.activeDocument.paste()
    // resize to the output dimensions
    tempImage.resizeImage(outputDimension[0], outputDimension[1])
    // Save it as the supplied filename in the selected location
    tempImage.saveAs(new File(savePath + "/" + fileName), wallpaperSaveOptions)
    // Close the file
    tempImage.close(SaveOptions.DONOTSAVECHANGES)
}

// Save the current units of measurement, so we can leave everything as it was
var originalUnits = preferences.rulerUnits
// We need to work with pixels here
preferences.rulerUnits = Units.PIXELS

// Now, first off, let's calculate some stuff we need

// Find the highest DPI
screenHorizontalpxPermm = Math.max(leftScreenHorizontalpx / leftScreenWidthmm, middleScreenHorizontalpx / middleScreenWidthmm, rightScreenHorizontalpx / rightScreenWidthmm)
screenVerticalpxPermm = Math.max(leftScreenVerticalpx / leftScreenHeightmm, middleScreenVerticalpx / middleScreenHeightmm, rightScreenVerticalpx / rightScreenHeightmm)

// Set the left screen's wallpaper size, adjusted for the highest dpi screen
var leftScreenAdjustedSize = Array(leftScreenWidthmm * screenHorizontalpxPermm, leftScreenHeightmm * screenVerticalpxPermm)

// Set the middle screen's wallpaper size, adjusted for the highest dpi screen
var middleScreenAdjustedSize = Array(middleScreenWidthmm * screenHorizontalpxPermm, middleScreenHeightmm * screenVerticalpxPermm)

// Set the right screen's wallpaper size, adjusted for the highest dpi screen
var rightScreenAdjustedSize = Array(rightScreenWidthmm * screenHorizontalpxPermm, rightScreenHeightmm * screenVerticalpxPermm)

// Set the left screen's wallpaper vertical offset
var leftScreenVerticalOffsetToppx = leftScreenVerticalOffsetTopmm * screenVerticalpxPermm

// Set the middle screen's wallpaper vertical offset
var middleScreenVerticalOffsetToppx = middleScreenVerticalOffsetTopmm * screenVerticalpxPermm

// Set the right screen's wallpaper vertical offset
var rightScreenVerticalOffsetToppx = rightScreenVerticalOffsetTopmm * screenVerticalpxPermm

// Set the bezel width of the left screen in pixels
var leftScreenBezelWidthpx = leftScreenBezelWidthmm * screenHorizontalpxPermm

// Set the bezel width of the middle screen in pixels
var middleScreenBezelWidthpx = middleScreenBezelWidthmm * screenHorizontalpxPermm

// Set the bezel width of the right screen in pixels
var rightScreenBezelWidthpx = rightScreenBezelWidthmm * screenHorizontalpxPermm

// Set the total width of the image
var totalWidthpx = leftScreenAdjustedSize[0] + leftScreenBezelWidthpx + (2 * middleScreenBezelWidthpx) + middleScreenAdjustedSize[0] + rightScreenBezelWidthpx + rightScreenAdjustedSize[0]

// The area to select for the left screen's wallpaper
var leftScreenSelection = Array(
    Array(
        0,
        leftScreenVerticalOffsetToppx
    ),
    Array(
        leftScreenAdjustedSize[0],
        leftScreenVerticalOffsetToppx
    ),
    Array(
        leftScreenAdjustedSize[0],
        (leftScreenVerticalOffsetToppx + leftScreenAdjustedSize[1])
    ),
    Array(
        0,
        (leftScreenVerticalOffsetToppx + leftScreenAdjustedSize[1])
    )
)

// The area to select for the middle screen's wallpaper
var middleScreenSelection = Array(
    Array(
        (leftScreenAdjustedSize[0] + leftScreenBezelWidthpx + middleScreenBezelWidthpx),
        middleScreenVerticalOffsetToppx
    ),
    Array(
        (leftScreenAdjustedSize[0] + leftScreenBezelWidthpx + middleScreenBezelWidthpx + middleScreenAdjustedSize[0]),
        middleScreenVerticalOffsetToppx
    ),
    Array(
        (leftScreenAdjustedSize[0] + leftScreenBezelWidthpx + middleScreenBezelWidthpx + middleScreenAdjustedSize[0]),
        (middleScreenVerticalOffsetToppx, middleScreenAdjustedSize[1])
    ),
    Array(
        (leftScreenAdjustedSize[0] + leftScreenBezelWidthpx + middleScreenBezelWidthpx),
        (middleScreenVerticalOffsetToppx, middleScreenAdjustedSize[1])
    )
)

// The area to select for the right screen's wallpaper
var rightScreenSelection = Array(
    Array(
        (leftScreenAdjustedSize[0] + leftScreenBezelWidthpx + (2 * middleScreenBezelWidthpx) + middleScreenAdjustedSize[0] + rightScreenBezelWidthpx),
        rightScreenVerticalOffsetToppx
    ),
    Array(
        totalWidthpx,
        rightScreenVerticalOffsetToppx
    ),
    Array(
        totalWidthpx,
        (rightScreenVerticalOffsetToppx + rightScreenAdjustedSize[1])
    ),
    Array(
        (leftScreenAdjustedSize[0] + leftScreenBezelWidthpx + (2 * middleScreenBezelWidthpx) + middleScreenAdjustedSize[0] + rightScreenBezelWidthpx),
        (rightScreenVerticalOffsetToppx + rightScreenAdjustedSize[1])
    )
)

// Browse for the source file
var dialogFile = app.openDialog()
// Browse for where to save the output
var savePath = Folder.selectDialog("Select where to save the output files")
// Open the source file
var wallpaperFile = app.open(dialogFile[0])

// We don't want any further dialogs
app.displayDialogs = DialogModes.NO

copyAndSaveSelection(leftScreenSelection, leftScreenAdjustedSize, Array(leftScreenHorizontalpx, leftScreenVerticalpx), "Left.jpg")
copyAndSaveSelection(middleScreenSelection, middleScreenAdjustedSize, Array(middleScreenHorizontalpx, middleScreenVerticalpx), "Middle.jpg")
copyAndSaveSelection(rightScreenSelection, rightScreenAdjustedSize, Array(rightScreenHorizontalpx, rightScreenVerticalpx), "Right.jpg")

// Close the source file
wallpaperFile.close(SaveOptions.DONOTSAVECHANGES)

// Leave everythign as we encountered it
preferences.rulerUnits = originalUnits
