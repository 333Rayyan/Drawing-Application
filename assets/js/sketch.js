// Defining Global Variables
let toolbox, helpers,
    p5canvas, drawingCanvas, backgroundLayer,
    backgroundColour,
    colourP, fileInput, imageBG,
    undoStack, redoStack, changedState;


/**
 * Called Once Internally when the Program Starts.
 * Used to Define Initial Environment Properties.
 * Such as Screen Size, Background Color & to Load Media such as Images & Fonts.
 */
function setup() {
    // Calculating Canvas Dimensions
    const canvasWidth = select("#content").width - select("#tool-bar").width;
    const canvasHeight = windowHeight - select("#header").height - select("#secondary-bar").height;

    // Creating Main Canvas, Drawing Canvas & Background Layer
    p5canvas = createCanvasORGraphics(createCanvas, canvasWidth, canvasHeight);
    drawingCanvas = createGraphics(canvasWidth, canvasHeight);
    backgroundLayer = createGraphics(canvasWidth, canvasHeight);

    // Setting Background Color
    backgroundColour = color(255, 255, 255);
    backgroundLayer.background(backgroundColour);

    // Initializing Helper Functions & Toolbox
    helpers = new HelperFunctions();
    toolbox = new Toolbox();

    // Creating File Input Handler
    fileInput = createFileInput(handleFile);
    fileInput.style("display", "none");

    // Creating Undo & Redo Stacks
    undoStack = [];
    redoStack = [];

    // Setting Changed State to False
    changedState = false;

    // Adding All Tools to the Toolbox
    const tools = [FreehandTool, LineTool, SprayCanTool, MirrorDrawTool, ShapesTool, StarTrail, BlurTool, EraserTool, BackgroundFill];
    for (let i = 0; i < tools.length; i++) {
        const Tool = tools[i]
        toolbox.addTool(new Tool());
    };
};


/**
 * Continuously Executes the Lines of Code Contained Inside its Block Until the Program Stops.
 */
function draw() {
    // Drawing the Background Layer & Drawing Canvas
    image(backgroundLayer, 0, 0);
    image(drawingCanvas, 0, 0);

    // Drawing with the Selected Tool, if One is Selected
    if (toolbox.selectedTool && toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        for (let i = 0; i < toolbox.tools.length; i++) {
            if (toolbox.tools[i].hasOwnProperty("draw")) {
                toolbox.selectedTool = toolbox.tools[i];
                break;
            };
        };
    };

    // If a Change has Occurred, Save the State
    if (changedState == true) {
        saveState();
    };
};


/**
 * This Function is Called when the Mouse Button is Pressed.
 * It is Used to Save the Current State of the Drawing Canvas.
*/
function mouseReleased() {
    // If the Mouse is in the Canvas, Save the State
    if (checkMouseInCanvas() == true) {
        changedState = true;
    };
};


/**
 * This Function is a Helper to Create a Canvas or a Graphics Layer.
 *
 * @param {Function} type - A Function that Creates a P5.js Canvas or a P5.js Graphics Layer.
 * @param {Number} width - The Width of the Canvas or Graphics Layer.
 * @param {Number} height - The Height of the Canvas or Graphics Layer.
 * @returns {Object} The Created Canvas or Graphics Layer.
 */
function createCanvasORGraphics(type, width, height) {
    // Creating Canvas or Graphics Layer & Parenting it to the Content Div
    const result = type(width, height);
    result.parent("content");
    return result;
};


/**
 * This Function Creates a Tool Option Button.
 *
 * @param {String} name - The Name of the Tool Option.
 * @returns {Object} The Created Button.
 */
function createToolOption(name) {
    // Creating a Button with the Given Name, Parenting it to the Tool-Options Div & Adding the Nav-Item Class
    button = createButton(name);
    button.parent("tool-options");
    button.addClass("nav-item");
    return button;
};


/**
 * This Function Handles the File Input.
 *
 * @param {Object} file - The Input File.
 */
function handleFile(file) {
    // If the File is an Image
    if (file.type === "image") {
        // Assign the File to imageBG
        imageBG = file;
        // Load the Image File & Draw it onto the Background Layer
        loadImage(file.data, (img) => {
            backgroundLayer.image(img, 0, 0, width, height);
        });
    };
};


/**
 * This Function is Used to Save the Current State of the Drawing Canvas and the Background.
 */
function saveState() {
    // Push the Current State onto the Undo Stack
    undoStack.push({
        drawing: drawingCanvas.get(),
        background: backgroundLayer.get()
    });

    // Clear the Redo Stack
    redoStack = [];

    // Set Changed State to False
    changedState = false;
};


/**
 * This Function Checks if the Mouse is Inside the Canvas.
 *
 * @returns {Boolean} True if the Mouse is Inside the Canvas, False Otherwise.
 */
function checkMouseInCanvas() {
    // Check if Mouse X & Y are Within the Canvas Dimensions
    return (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
};
