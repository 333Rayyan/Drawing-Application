/**
 * The LineTool Object.
 * This Tool Allows the User to Draw Straight Lines.
 */
function LineTool() {
	// Define the Icon & Name for the LineTool
	this.icon = "assets/img/line.png";
	this.name = "line";

	// Define the Start Mouse Coordinates & Drawing State
	this.startMouse = {
		x: -1,
		y: -1
	};
	this.isDrawing = false;


	/**
	 * The Draw Method for the LineTool.
	 * This Method Checks If the Mouse Is Pressed & Has Moved, Then Draws a Line from the Start Mouse Position to the Current Mouse Position.
	 */
	this.draw = () => {
		// Update the Slider Label with the Current Stroke Weight Value
		this.sliderLabel.html(`Weight: ${this.strokeWeightSlider.value()}px`);

		// Check If the Mouse Is Pressed
		if (mouseIsPressed) {
			// If This Is the First Mouse Press, Set the Start Mouse Coordinates & Start Drawing
			if (this.startMouse.x == -1) {
				this.startMouse.x = mouseX;
				this.startMouse.y = mouseY;
				this.isDrawing = true;
				drawingCanvas.loadPixels();
			}
			else {
				// If the Mouse Is Outside the Canvas or Has Not Moved, Reset the Start Mouse Coordinates & Return
				if (checkMouseInCanvas() == false || (mouseX == this.startMouse.x && mouseY == this.startMouse.y)) {
					this.startMouse.x = -1;
					this.startMouse.y = -1;
					return;
				};

				// Draw a Line from the Start Mouse Position to the Current Mouse Position
				drawingCanvas.updatePixels();
				drawingCanvas.strokeWeight(this.strokeWeightSlider.value());
				drawingCanvas.stroke(colourP);
				drawingCanvas.line(this.startMouse.x, this.startMouse.y, mouseX, mouseY);
			};
		}
		else if (this.isDrawing) {
			// If the Mouse Is Not Pressed but Was Previously Drawing, Reset the Start Mouse Coordinates & Stop Drawing
			drawingCanvas.loadPixels();
			this.isDrawing = false;
			this.startMouse.x = -1;
			this.startMouse.y = -1;
		};
	};


	/**
	 * Method to Populate the Tool Options for the LineTool.
	 */
	this.populateOptions = () => {
		// Create the Slider Container
		const sliderContainer = createDiv().parent("tool-options").style("display", "flex").style("flex-direction", "column");

		// Create the Slider Label
		this.sliderLabel = createP("Stroke Weight");
		this.sliderLabel.parent(sliderContainer).class("slider-label");

		// Create the Stroke Weight Slider
		this.strokeWeightSlider = createSlider(1, 100, 1);
		this.strokeWeightSlider.parent(sliderContainer);

		// Add a Divider to the Tool Options
		select("#tool-options").child(createDiv().addClass("divider"));
	};


	/**
	 * Method to Clear the Tool Options when the LineTool Is Unselected.
	 */
	this.unselectTool = () => {
		// Clear the Tool Options
		select("#tool-options").html("");
	};
};
