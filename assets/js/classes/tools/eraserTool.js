/**
 * The EraserTool Object.
 * This Tool Allows the User to Erase Parts of Their Drawing.
 */
function EraserTool() {
	// Define the Icon & Name for the EraserTool
	this.icon = "assets/img/eraser.png";
	this.name = "eraser";

	// Define the Previous Mouse Coordinates
	this.previousMouse = {
		x: -1,
		y: -1
	};


	/**
	 * The Draw Method for the EraserTool.
	 * This Method Checks If the Mouse Is in the Canvas & If It Is Pressed, Then Erases a Circle Around the Mouse.
	 */
	this.draw = () => {
		// Update the Slider Label with the Current Size Value
		this.sliderLabel.html(`Size: ${this.sizeSlider.value()}px`);

		// Check If Mouse Is Inside the Canvas
		if (checkMouseInCanvas() == false) {
			return;
		};

		// Define the Eraser Size
		const size = this.sizeSlider.value();

		// Draw the Eraser Circle
		noFill();
		stroke(255, 0, 0);
		circle(mouseX, mouseY, size * 2);

		// Check If the Mouse Is Pressed
		if (mouseIsPressed) {
			// If the Mouse Is Outside the Canvas or Has Not Moved, Reset the Previous Mouse Coordinates & Return
			if (checkMouseInCanvas() == false || (mouseX == this.previousMouse.x && mouseY == this.previousMouse.y)) {
				this.previousMouse.x = -1;
				this.previousMouse.y = -1;
				return;
			};

			// If This Is the First Mouse Press, Set the Previous Mouse Coordinates
			if (this.previousMouse.x == -1) {
				this.previousMouse.x = mouseX;
				this.previousMouse.y = mouseY;
			}
			else {
				// Erase a Circle at the Mouse Position
				drawingCanvas.noStroke();
				drawingCanvas.fill(255);
				drawingCanvas.blendMode(REMOVE);
				drawingCanvas.circle(mouseX, mouseY, size * 2);

				// Update the Previous Mouse Coordinates
				this.previousMouse.x = mouseX;
				this.previousMouse.y = mouseY;
				drawingCanvas.blendMode(BLEND);
			};
		}
		else {
			// If the Mouse Is Not Pressed, Reset the Previous Mouse Coordinates
			this.previousMouse.x = -1;
			this.previousMouse.y = -1;
		};
	};


	/**
	 * Method to Populate the Tool Options for the EraserTool.
	 */
	this.populateOptions = () => {
		// Create the Slider Container
		const sliderContainer = createDiv().parent("tool-options").style("display", "flex").style("flex-direction", "column");

		// Create the Slider Label
		this.sliderLabel = createP("Size");
		this.sliderLabel.parent(sliderContainer).class("slider-label");

		// Create the Size Slider
		this.sizeSlider = createSlider(10, 100, 10);
		this.sizeSlider.parent(sliderContainer);

		// Add a Divider to the Tool Options
		select("#tool-options").child(createDiv().addClass("divider"));
	};


	/**
	 * Method to Clear the Tool Options when the EraserTool Is Unselected.
	 */
	this.unselectTool = () => {
		// Clear the Tool Options
		select("#tool-options").html("");
	};
};
