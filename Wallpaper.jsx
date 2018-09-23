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

// Save the current units of measurement, so we can leave everything as it was
var originalUnits = preferences.rulerUnits
// We need to work with pixels here
preferences.rulerUnits = Units.PIXELS

// Find the highest DPI
ScreenHorizontalpxPermm = Math.max(leftScreenHorizontalpx / leftScreenWidthmm, middleScreenHorizontalpx / middleScreenWidthmm, rightScreenHorizontalpx / rightScreenWidthmm)
ScreenVerticalpxPermm = Math.max(leftScreenVerticalpx / leftScreenHeightmm, middleScreenVerticalpx / middleScreenHeightmm, rightScreenVerticalpx / rightScreenHeightmm)

// Set the left screen's wallpaper size, adjusted for the highest dpi screen
var leftScreenAdjustedHorizontalpx = leftScreenWidthmm * ScreenHorizontalpxPermm
var leftScreenAdjustedVerticalpx = leftScreenHeightmm * ScreenVerticalpxPermm

// Set the middle screen's wallpaper size, adjusted for the highest dpi screen
var middleScreenAdjustedHorizontalpx = middleScreenWidthmm * ScreenHorizontalpxPermm
var middleScreenAdjustedVerticalpx = middleScreenHeightmm * ScreenVerticalpxPermm

// Set the right screen's wallpaper size, adjusted for the highest dpi screen
var rightScreenAdjustedHorizontalpx = rightScreenWidthmm * ScreenHorizontalpxPermm
var rightScreenAdjustedVerticalpx = rightScreenHeightmm * ScreenVerticalpxPermm

// Set the left screen's wallpaper vertical offset
var leftScreenVerticalOffsetToppx = leftScreenVerticalOffsetTopmm * ScreenVerticalpxPermm

// Set the middle screen's wallpaper vertical offset
var middleScreenVerticalOffsetToppx = middleScreenVerticalOffsetTopmm * ScreenVerticalpxPermm

// Set the right screen's wallpaper vertical offset
var rightScreenVerticalOffsetToppx = rightScreenVerticalOffsetTopmm * ScreenVerticalpxPermm

// Set the bezel width of the left screen in pixels
var leftScreenBezelWidthpx = leftScreenBezelWidthmm * ScreenVerticalpxPermm

// Set the bezel width of the middle screen in pixels
var middleScreenBezelWidthpx = middleScreenBezelWidthmm * ScreenVerticalpxPermm

// Set the bezel width of the right screen in pixels
var rightScreenBezelWidthpx = rightScreenBezelWidthmm * ScreenVerticalpxPermm

// Set the total width of the image
var totalWidthpx = leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + (2 * middleScreenBezelWidthpx) + middleScreenAdjustedHorizontalpx + rightScreenBezelWidthpx + rightScreenAdjustedHorizontalpx

// The area to select for the left screen's wallpaper
var leftScreenSelection = Array(
    Array(
        0,
        leftScreenVerticalOffsetToppx
    ),
    Array(
        leftScreenAdjustedHorizontalpx,
        leftScreenVerticalOffsetToppx
    ),
    Array(
        leftScreenAdjustedHorizontalpx,
        (leftScreenVerticalOffsetToppx + leftScreenAdjustedVerticalpx)
    ),
    Array(
        0,
        (leftScreenVerticalOffsetToppx + leftScreenAdjustedVerticalpx)
    )
)

// The area to select for the middle screen's wallpaper
var middleScreenSelection = Array(
    Array(
        (leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + middleScreenBezelWidthpx),
        middleScreenVerticalOffsetToppx
    ),
    Array(
        (leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + middleScreenBezelWidthpx + middleScreenAdjustedHorizontalpx),
        middleScreenVerticalOffsetToppx
    ),
    Array(
        (leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + middleScreenBezelWidthpx + middleScreenAdjustedHorizontalpx),
        (middleScreenVerticalOffsetToppx, middleScreenAdjustedVerticalpx)
    ),
    Array(
        (leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + middleScreenBezelWidthpx),
        (middleScreenVerticalOffsetToppx, middleScreenAdjustedVerticalpx)
    )
)

// The area to select for the right screen's wallpaper
var rightScreenSelection = Array(
    Array(
        (leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + (2 * middleScreenBezelWidthpx) + middleScreenAdjustedHorizontalpx + rightScreenBezelWidthpx),
        rightScreenVerticalOffsetToppx
    ),
    Array(
        totalWidthpx,
        rightScreenVerticalOffsetToppx
    ),
    Array(
        totalWidthpx,
        (rightScreenVerticalOffsetToppx + rightScreenAdjustedVerticalpx)
    ),
    Array(
        (leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + (2 * middleScreenBezelWidthpx) + middleScreenAdjustedHorizontalpx + rightScreenBezelWidthpx),
        (rightScreenVerticalOffsetToppx + rightScreenAdjustedVerticalpx)
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

// The options used to save the jpeg output files.
var wallpaperSaveOptions = new JPEGSaveOptions()
// I don't care what the input is, wallpapers should be good quality
wallpaperSaveOptions.quality = 12

// Set the source file as active
app.activeDocument = wallpaperFile
// Select the left screen's wallpaper
app.activeDocument.selection.select(leftScreenSelection)
// copy to clipboard
app.activeDocument.selection.copy()

// Create the image for the left screen
var leftScreen = app.documents.add(leftScreenAdjustedHorizontalpx, leftScreenAdjustedVerticalpx)
// Set it as the active document
app.activeDocument = leftScreen
// Paste the copied selection of the source file
app.activeDocument.paste()
// resize to the output dimensions
leftScreen.resizeImage(leftScreenHorizontalpx, leftScreenVerticalpx)
// Save it as Left.jpg in the selected location
leftScreen.saveAs(new File(savePath + "/Left.jpg"), wallpaperSaveOptions)
// Close the file
leftScreen.close(SaveOptions.DONOTSAVECHANGES)

// Now do the same for middle and right
app.activeDocument = wallpaperFile
app.activeDocument.selection.select(middleScreenSelection)
app.activeDocument.selection.copy()

var middleScreen = app.documents.add(middleScreenAdjustedHorizontalpx, middleScreenAdjustedVerticalpx)
app.activeDocument = middleScreen
app.activeDocument.paste()
middleScreen.resizeImage(middleScreenHorizontalpx, middleScreenVerticalpx)
middleScreen.saveAs(new File(savePath + "/Middle.jpg"), wallpaperSaveOptions)
middleScreen.close(SaveOptions.DONOTSAVECHANGES)

app.activeDocument = wallpaperFile
app.activeDocument.selection.select(rightScreenSelection)
app.activeDocument.selection.copy()

var rightScreen = app.documents.add(rightScreenAdjustedHorizontalpx, rightScreenAdjustedVerticalpx)
app.activeDocument = rightScreen
app.activeDocument.paste()
rightScreen.resizeImage(rightScreenHorizontalpx, rightScreenVerticalpx)
rightScreen.saveAs(new File(savePath + "/Right.jpg"), wallpaperSaveOptions)
rightScreen.close(SaveOptions.DONOTSAVECHANGES)

// Close the source file
wallpaperFile.close(SaveOptions.DONOTSAVECHANGES)

// Leave everythign as we encountered it
preferences.rulerUnits = originalUnits
