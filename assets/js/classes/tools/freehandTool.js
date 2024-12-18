/**
 * The FreehandTool Object.
 * This Tool Allows the User to Draw Freehand Lines.
 */
function FreehandTool() {
	// Define the Icon & Name for the FreehandTool
	this.icon = "assets/img/freeHand.png";
	this.name = "freehand";

	// Define the Previous Mouse Coordinates
	this.previousMouse = {
		x: -1,
		y: -1
	};


	/**
	 * The Draw Method for the FreehandTool.
	 * This Method Checks If the Mouse Is Pressed & Has Moved, Then Draws a Line from the Previous Mouse Position to the Current Mouse Position.
	 */
	this.draw = () => {
		// Update the Slider Label with the Current Stroke Weight Value
		this.sliderLabel.html(`Weight: ${this.strokeWeightSlider.value()}px`);

		// Check If the Mouse Is Pressed
		if (mouseIsPressed) {
			// If This Is the First Mouse Press, Set the Previous Mouse Coordinates
			if (this.previousMouse.x == -1) {
				this.previousMouse.x = mouseX;
				this.previousMouse.y = mouseY;
			}
			else {
				// If the Mouse Is Outside the Canvas or Has Not Moved, Reset the Previous Mouse Coordinates & Return
				if (checkMouseInCanvas() == false || (mouseX == this.previousMouse.x && mouseY == this.previousMouse.y)) {
					this.previousMouse.x = -1;
					this.previousMouse.y = -1;
					return;
				};

				// Draw a Line from the Previous Mouse Position to the Current Mouse Position
				drawingCanvas.stroke(colourP);
				drawingCanvas.strokeWeight(this.strokeWeightSlider.value());
				drawingCanvas.line(this.previousMouse.x, this.previousMouse.y, mouseX, mouseY);

				// Update the Previous Mouse Coordinates
				this.previousMouse.x = mouseX;
				this.previousMouse.y = mouseY;
			};
		}
		else {
			// If the Mouse Is Not Pressed, Reset the Previous Mouse Coordinates
			this.previousMouse.x = -1;
			this.previousMouse.y = -1;
		};
	};


	/**
	 * Method to Populate the Tool Options for the FreehandTool.
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
	 * Method to Clear the Tool Options when the FreehandTool Is Unselected.
	 */
	this.unselectTool = () => {
		// Clear the Tool Options
		select("#tool-options").html("");
	};
};
