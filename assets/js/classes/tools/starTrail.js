/**
 * Tool for Drawing Star Trails on Canvas.
 */
function StarTrail() {

	// Name & Icon for the Tool.
	this.icon = "assets/img/starTrail.png";
	this.name = "starTrail";

	// Default Size for the Star.
	this.size = 30;

	// Previous Mouse Position, Initialized to -1.
	this.previousMouse = {
		x: -1,
		y: -1
	};


	/**
	 * Method to Draw the Star on Canvas.
	 */
	this.draw = () => {
		// Get the Current Size from the Slider.
		const size = this.sizeSlider.value();

		// Update the Slider Label.
		this.sliderLabel.html(`Size: ${size}px`);

		// Check if Mouse is Inside Canvas.
		if (checkMouseInCanvas()) {
			// Set the Fill Colour & Remove Outline.
			noStroke();
			fill(colourP);

			// Draw the Star Shape.
			beginShape();
			// The Following Vertices Define the Shape of the Star.
			vertex(mouseX, mouseY - size * 3.5);
			vertex(mouseX + size, mouseY - size * 1.5);
			vertex(mouseX + size * 3, mouseY - size * 1.5);
			vertex(mouseX + size, mouseY - size * 0.5);
			vertex(mouseX + size * 2.3, mouseY + size * 1.5);
			vertex(mouseX, mouseY + size * 0.3);
			vertex(mouseX - size * 2.2, mouseY + size * 1.5);
			vertex(mouseX - size, mouseY - size * 0.5);
			vertex(mouseX - size * 3, mouseY - size * 1.5);
			vertex(mouseX - size, mouseY - size * 1.5);
			vertex(mouseX, mouseY - size * 3.5);
			endShape(CLOSE);
		}

		if (mouseIsPressed) {
			// If Mouse is Outside Canvas or Hasn't Moved, Reset Previous Mouse Position.
			if (checkMouseInCanvas() == false || (mouseX == this.previousMouse.x && mouseY == this.previousMouse.y)) {
				this.previousMouse.x = -1;
				this.previousMouse.y = -1;
				return;
			};

			// If Previous Mouse Position is Unset, Set to Current Position.
			if (this.previousMouse.x == -1) {
				this.previousMouse.x = mouseX;
				this.previousMouse.y = mouseY;
			} else {
				// If Previous Mouse Position is Unset, Set to Current Position.
				drawingCanvas.fill(colourP);
				drawingCanvas.noStroke();

				// Draw the Star on the Canvas.
				drawingCanvas.beginShape();

				// The Following Vertices Define the Shape of the Star.
				drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y - size * 3.5);
				drawingCanvas.vertex(this.previousMouse.x + size, this.previousMouse.y - size * 1.5);
				drawingCanvas.vertex(this.previousMouse.x + size * 3, this.previousMouse.y - size * 1.5);
				drawingCanvas.vertex(this.previousMouse.x + size, this.previousMouse.y - size * 0.5);
				drawingCanvas.vertex(this.previousMouse.x + size * 2.3, this.previousMouse.y + size * 1.5);
				drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y + size * 0.3);
				drawingCanvas.vertex(this.previousMouse.x - size * 2.2, this.previousMouse.y + size * 1.5);
				drawingCanvas.vertex(this.previousMouse.x - size, this.previousMouse.y - size * 0.5);
				drawingCanvas.vertex(this.previousMouse.x - size * 3, this.previousMouse.y - size * 1.5);
				drawingCanvas.vertex(this.previousMouse.x - size, this.previousMouse.y - size * 1.5);
				drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y - size * 3.5);
				drawingCanvas.endShape();

				// Update the Previous Mouse Position.
				this.previousMouse.x = mouseX;
				this.previousMouse.y = mouseY;
			};
		} else {
			// If Mouse is Not Pressed, Reset Previous Mouse Position.
			this.previousMouse.x = -1;
			this.previousMouse.y = -1;
		};
	};

	/**
	  * Populate the Options for the Tool.
	  */
	this.populateOptions = () => {
		// Create a Container for the Slider.
		const sliderContainer = createDiv().parent("tool-options").style("display", "flex").style("flex-direction", "column");

		// Create a Label for the Slider.
		this.sliderLabel = createP("Size");
		this.sliderLabel.parent(sliderContainer).class("slider-label");

		// Create a Slider to Control the Size of the Star.
		this.sizeSlider = createSlider(5, 50, 5);
		this.sizeSlider.parent(sliderContainer);

		// Add a Divider in the Options Panel.
		select("#tool-options").child(createDiv().addClass("divider"));
	};


	/**
	 * Unselect the Tool & Clear the Options.
	 */
	this.unselectTool = () => {
		select("#tool-options").html("");
	};
};
