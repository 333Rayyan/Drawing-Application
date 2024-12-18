/**
 * Collection of Helper Functions for Canvas Operations.
 */
function HelperFunctions() {


	/**
	 * Function to Handle Colour Changes from the Colour Picker.
	 */
	function handleColorChange() {
		// Update the Selected Colour.
		colourP = colorPicker.value();
	};


	// Initialise Default Colour as Black.
	colourP = color(0, 0, 0);

	// Create a Colour Picker & Attach it to Colour Picker Element.
	colorPicker = createColorPicker(colourP);
	colorPicker.parent("colour-picker");

	// Attach Event Listener for Colour Change.
	colorPicker.input(handleColorChange);

	// Set the Height of the Colour Picker.
	colorPicker.style("height", "50px");


	// Attach Event Listener for 'Save Canvas' Button.
	select("#saveCanvas").mouseClicked(() => {
		// Save the Canvas as PNG.
		saveCanvas("myCanvas", "png");
	});


	// Attach Event Listener for 'Place Image' Button.
	select("#placeImage").mouseClicked(() => {
		// Trigger File Input Click.
		fileInput.elt.click();
	});


	// Attach Event Listener for 'Clear Canvas' Button.
	select("#clearCanvas").mouseClicked(() => {
		// Clear the Drawing Canvas & Reload Pixels.
		drawingCanvas.clear();
		drawingCanvas.loadPixels();
	});


	// Attach Event Listener for 'Reset Canvas' Button.
	select("#resetCanvas").mouseClicked(() => {
		// Clear the Background Image & Colour.
		imageBG = null;
		backgroundLayer.clear();
		backgroundColour = color(255, 255, 255);
		backgroundLayer.background(backgroundColour);

		// Clear the Drawing Canvas & Reload Pixels.
		drawingCanvas.clear();
		drawingCanvas.loadPixels();
	});


	// Attach Event Listener for 'Undo' Button.
	select("#undo").mouseClicked(() => {
		// Getting the Length of the Undo Stack.
		const stackLength = undoStack.length;

		// If the Stack is Not Empty . . .
		if (stackLength > 0) {
			// Clear the Drawing Canvas & Background Layer.
			drawingCanvas.clear();
			backgroundLayer.clear();

			// Pop the Last State from the Undo Stack & Push it to the Redo Stack.
			let lastState;
			if (stackLength == 1) {
				lastState = undoStack.pop();
				redoStack.push(lastState);
				backgroundLayer.background(255, 255, 255);
			} else {
				redoStack.push(undoStack.pop());
				lastState = undoStack[undoStack.length - 1];
				drawingCanvas.image(lastState.drawing, 0, 0);
				backgroundLayer.image(lastState.background, 0, 0);
			};
		};
	});


	// Attach Event Listener for 'Redo' Button.
	select("#redo").mouseClicked(() => {
		// If the Stack is Not Empty . . .
		if (redoStack.length > 0) {
			// Clear the Drawing Canvas & Background Layer.
			drawingCanvas.clear();
			backgroundLayer.clear();

			// Pop the Last State from the Redo Stack & Push it to the Undo Stack.
			const nextState = redoStack[redoStack.length - 1];
			drawingCanvas.image(nextState.drawing, 0, 0);
			backgroundLayer.image(nextState.background, 0, 0);
			undoStack.push(redoStack.pop());
		};
	});
};
