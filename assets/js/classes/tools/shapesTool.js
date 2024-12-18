/**
 * Tool for Drawing Shapes on Canvas.
 */
function ShapesTool() {

	// Icon & Name for the Tool.
	this.icon = "assets/img/shapes.png";
	this.name = "shapesTool";

	// Default Size for the Shapes.
	this.size = 30;

	// Store the Previous Mouse Position.
	this.previousMouse = {
		x: -1,
		y: -1
	};

	// Default Colour Mode.
	this.colourMode = "fill";

	// Object to Hold the Currently Selected Shape & its Corresponding Button.
	this.selected = {};

	// Flag to Check if the Tool is Currently Drawing.
	this.isDrawing = false;


	/**
	 * Method to Draw Shapes on Canvas.
	 */
	this.draw = () => {
		// Update the Stroke Weight Label.
		this.sliderLabel.html(`Weight: ${this.strokeWeightSlider.value()}px`);

		if (mouseIsPressed) {
			if (this.previousMouse.x == -1) {
				// If the Mouse was Just Pressed, Store the Current Mouse Position.
				this.previousMouse.x = mouseX;
				this.previousMouse.y = mouseY;
				this.isDrawing = true;
				drawingCanvas.loadPixels();
			} else {
				// If the Mouse is Being Dragged.
				drawingCanvas.updatePixels();

				if (checkMouseInCanvas() == false || (mouseX == this.previousMouse.x && mouseY == this.previousMouse.y)) {
					// If the Mouse is Outside the Canvas or Hasn't Moved, Reset the Previous Mouse Position.
					this.previousMouse.x = -1;
					this.previousMouse.y = -1;
					return;
				};

				// Set the Colour Mode.
				if (this.colourMode == "fill") {
					drawingCanvas.fill(colourP);
					drawingCanvas.noStroke();
				} else if (this.colourMode == "stroke") {
					drawingCanvas.noFill();
					drawingCanvas.strokeWeight(this.strokeWeightSlider.value());
					drawingCanvas.stroke(colourP);
				};

				// Draw the Selected Shape.
				if (this.selected.shape == "rect") {
					drawingCanvas.rect(this.previousMouse.x, this.previousMouse.y, mouseX - this.previousMouse.x, mouseY - this.previousMouse.y);
				} else if (this.selected.shape == "ellipse") {
					drawingCanvas.ellipse(this.previousMouse.x, this.previousMouse.y, mouseX - this.previousMouse.x, mouseY - this.previousMouse.y);
				} else if (this.selected.shape == "star") {
					// For the Star & Triangle Shapes, Use beginShape & Vertex to Create Custom Shapes.
					// Code for Drawing the Star Shape Goes Here...
					drawingCanvas.beginShape();
					drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y - ((mouseY - this.previousMouse.y) / 3));
					drawingCanvas.vertex(this.previousMouse.x + ((mouseX - this.previousMouse.x) / 6), this.previousMouse.y - ((mouseY - this.previousMouse.y) / 6));
					drawingCanvas.vertex(this.previousMouse.x + ((mouseX - this.previousMouse.x) / 2), this.previousMouse.y - ((mouseY - this.previousMouse.y) / 6));
					drawingCanvas.vertex(this.previousMouse.x + ((mouseX - this.previousMouse.x) / 6), this.previousMouse.y - ((mouseY - this.previousMouse.y) / 18));
					drawingCanvas.vertex(this.previousMouse.x + ((mouseX - this.previousMouse.x) / 4), this.previousMouse.y + ((mouseY - this.previousMouse.y) / 6));
					drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y + 5);
					drawingCanvas.vertex(this.previousMouse.x - ((mouseX - this.previousMouse.x) / 4), this.previousMouse.y + ((mouseY - this.previousMouse.y) / 6));
					drawingCanvas.vertex(this.previousMouse.x - ((mouseX - this.previousMouse.x) / 6), this.previousMouse.y - ((mouseY - this.previousMouse.y) / 18));
					drawingCanvas.vertex(this.previousMouse.x - ((mouseX - this.previousMouse.x) / 2), this.previousMouse.y - ((mouseY - this.previousMouse.y) / 6));
					drawingCanvas.vertex(this.previousMouse.x - ((mouseX - this.previousMouse.x) / 6), this.previousMouse.y - ((mouseY - this.previousMouse.y) / 6));
					drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y - ((mouseY - this.previousMouse.y) / 3));
					drawingCanvas.endShape();
				} else if (this.selected.shape == "triangle") {
					// Code for Drawing the Triangle Shape Goes Here...

					drawingCanvas.beginShape();
					drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y);
					drawingCanvas.vertex(this.previousMouse.x + ((mouseX - this.previousMouse.x) / 2), this.previousMouse.y + (mouseY - this.previousMouse.y));
					drawingCanvas.vertex(this.previousMouse.x - ((mouseX - this.previousMouse.x) / 2), this.previousMouse.y + (mouseY - this.previousMouse.y));
					drawingCanvas.vertex(this.previousMouse.x, this.previousMouse.y);
					drawingCanvas.endShape();
				};
			};
		} else if (this.isDrawing) {
			// If the Mouse was Just Released, Reset the Previous Mouse Position.
			drawingCanvas.loadPixels();
			this.isDrawing = false;
			this.previousMouse.x = -1;
			this.previousMouse.y = -1;
		};
	};


	/**
	 * The Method to Populate the Tool Options for the ShapesTool.
	 * This Method Adds Buttons for Shapes & Sliders for Adjusting the Stroke Weight.
	 */
	this.populateOptions = () => {
		// Create the Shapes Buttons to the Tool Options

		rectButton = createToolOption("Rectangle")
		rectButton.addClass("selected-item")
		rectButton.id("rectangle")
		rectButton.mouseClicked(() => {
			rectButton.addClass("selected-item");
			this.selected.button.removeClass("selected-item");
			this.selected = {
				shape: "rect",
				button: rectButton
			};
		});

		ellipseButton = createToolOption("Circle")
		ellipseButton.id("ellipse")
		ellipseButton.mouseClicked(() => {
			ellipseButton.addClass("selected-item");
			this.selected.button.removeClass("selected-item");
			this.selected = {
				shape: "ellipse",
				button: ellipseButton
			};
		});

		triangleButton = createToolOption("Triangle")
		triangleButton.id("triangle")
		triangleButton.mouseClicked(() => {
			triangleButton.addClass("selected-item");
			this.selected.button.removeClass("selected-item");
			this.selected = {
				shape: "triangle",
				button: triangleButton
			};
		});

		starButton = createToolOption("Star")
		starButton.id("star")
		starButton.mouseClicked(() => {
			starButton.addClass("selected-item");
			this.selected.button.removeClass("selected-item");
			this.selected = {
				shape: "star",
				button: starButton
			};
		});

		this.selected = {
			shape: "rect",
			button: rectButton
		};

		select("#tool-options").child(createDiv().addClass("divider"));

		fillButton = createToolOption("Fill");
		fillButton.addClass("selected-item");
		fillButton.id("fill");
		fillButton.mouseClicked(() => {
			fillButton.addClass("selected-item");
			outlineButton.removeClass("selected-item");
			this.colourMode = "fill";
		});

		outlineButton = createToolOption("Outline");
		outlineButton.id("outline");
		outlineButton.mouseClicked(() => {
			outlineButton.addClass("selected-item");
			fillButton.removeClass("selected-item");
			this.colourMode = "stroke";
		});

		select("#tool-options").child(createDiv().addClass("divider"));

		// Create the Slider Container & Add It to the Tool Options
		const sliderContainer = createDiv().parent("tool-options").style("display", "flex").style("flex-direction", "column");

		// Create the Slider Label & Add It to the Slider Container
		this.sliderLabel = createP("Stroke Weight");
		this.sliderLabel.parent(sliderContainer).class("slider-label");

		// Create the Stroke Weight Slider & Add It to the Slider Container
		this.strokeWeightSlider = createSlider(1, 100, 1);
		this.strokeWeightSlider.parent(sliderContainer);

		select("#tool-options").child(createDiv().addClass("divider"));
	};


	/**
	 * The Method to Unselect the ShapesTool.
	 * This Method Clears the Tool Options.
	 */
	this.unselectTool = () => {
		select("#tool-options").html("");
	};
};
