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

var originalUnits = preferences.rulerUnits
preferences.rulerUnits = Units.PIXELS

if (Math.max(leftScreenVerticalpx, middleScreenVerticalpx, rightScreenVerticalpx) == leftScreenVerticalpx) {
    ScreenHorizontalpxPermm = leftScreenHorizontalpx / leftScreenWidthmm
    ScreenVerticalpxPermm = leftScreenVerticalpx / leftScreenHeightmm
} else if (Math.max(leftScreenVerticalpx, middleScreenVerticalpx, rightScreenVerticalpx) == middleScreenVerticalpx) {
    ScreenHorizontalpxPermm = middleScreenHorizontalpx / middleScreenWidthmm
    ScreenVerticalpxPermm = middleScreenVerticalpx / middleScreenHeightmm
} else if (Math.max(leftScreenVerticalpx, middleScreenVerticalpx, rightScreenVerticalpx) == rightScreenVerticalpx) {
    ScreenHorizontalpxPermm = rightScreenHorizontalpx / rightScreenWidthmm
    ScreenVerticalpxPermm = rightScreenVerticalpx / rightScreenHeightmm
}

var leftScreenAdjustedHorizontalpx = leftScreenWidthmm * ScreenHorizontalpxPermm
var leftScreenAdjustedVerticalpx = leftScreenHeightmm * ScreenVerticalpxPermm

var middleScreenAdjustedHorizontalpx = middleScreenWidthmm * ScreenHorizontalpxPermm
var middleScreenAdjustedVerticalpx = middleScreenHeightmm * ScreenVerticalpxPermm

var rightScreenAdjustedHorizontalpx = rightScreenWidthmm * ScreenHorizontalpxPermm
var rightScreenAdjustedVerticalpx = rightScreenHeightmm * ScreenVerticalpxPermm

var leftScreenVerticalOffsetToppx = leftScreenVerticalOffsetTopmm * ScreenVerticalpxPermm

var middleScreenVerticalOffsetToppx = middleScreenVerticalOffsetTopmm * ScreenVerticalpxPermm

var rightScreenVerticalOffsetToppx = rightScreenVerticalOffsetTopmm * ScreenVerticalpxPermm

var leftScreenBezelWidthpx = leftScreenBezelWidthmm * ScreenVerticalpxPermm

var middleScreenBezelWidthpx = middleScreenBezelWidthmm * ScreenVerticalpxPermm

var rightScreenBezelWidthpx = rightScreenBezelWidthmm * ScreenVerticalpxPermm

var totalWidthpx = leftScreenAdjustedHorizontalpx + leftScreenBezelWidthpx + (2 * middleScreenBezelWidthpx) + middleScreenAdjustedHorizontalpx + rightScreenBezelWidthpx + rightScreenAdjustedHorizontalpx

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

var dialogFile = app.openDialog()
var wallpaperFile = app.open(dialogFile[0])


app.activeDocument = wallpaperFile
app.activeDocument.selection.select(leftScreenSelection)
app.activeDocument.selection.copy()

var leftScreen = app.documents.add(leftScreenAdjustedHorizontalpx, leftScreenAdjustedVerticalpx)
app.activeDocument = leftScreen
app.activeDocument.paste()
leftScreen.resizeImage(leftScreenHorizontalpx, leftScreenVerticalpx)

app.activeDocument = wallpaperFile
app.activeDocument.selection.select(middleScreenSelection)
app.activeDocument.selection.copy()

var middleScreen = app.documents.add(middleScreenAdjustedHorizontalpx, middleScreenAdjustedVerticalpx)
app.activeDocument = middleScreen
app.activeDocument.paste()
middleScreen.resizeImage(middleScreenHorizontalpx, middleScreenVerticalpx)

app.activeDocument = wallpaperFile
app.activeDocument.selection.select(rightScreenSelection)
app.activeDocument.selection.copy()

var rightScreen = app.documents.add(rightScreenAdjustedHorizontalpx, rightScreenAdjustedVerticalpx)
app.activeDocument = rightScreen
app.activeDocument.paste()
rightScreen.resizeImage(rightScreenHorizontalpx, rightScreenVerticalpx)
