/**
 * BlurTool Class.
 */
function BlurTool() {
	// Setting the Icon & Name of the Tool
	this.icon = "assets/img/blur.png";
	this.name = "blur";


	/**
	 * The Draw Method for the BlurTool.
	 */
	this.draw = () => {
		// Update the Slider Label to Show the Current Size
		this.sliderLabel.html(`Size: ${this.sizeSlider.value()}px`);

		// If the Mouse is not Within the Canvas, Return
		if (checkMouseInCanvas() == false) {
			return;
		};

		// Get the Value of the Size Slider as the Radius
		const radius = this.sizeSlider.value();

		// If the Mouse is Pressed
		if (mouseIsPressed) {
			// Get the Area Around the Mouse to Blur
			const img = get(mouseX - radius, mouseY - radius, radius * 2, radius * 2);
			// Apply the Blur Filter to the Image
			img.filter(BLUR, radius / 4);

			// Create a New Image to Use as a Mask
			const maskImg = createImage(radius * 2, radius * 2);
			maskImg.loadPixels();

			// For Each Pixel in the Mask Image
			for (let x = 0; x < maskImg.width; x++) {
				for (let y = 0; y < maskImg.height; y++) {
					// Calculate the Distance from the Current Pixel to the Centre of the Image
					const d = dist(x, y, radius, radius);
					// Set the Alpha of the Pixel Based on its Distance from the Centre
					const alpha = d < radius ? 255 : 0;
					// Get the Location of the Pixel in the Pixels Array
					const loc = (x + y * maskImg.width) * 4;
					// Set the RGBA Values of the Pixel
					maskImg.pixels[loc] = 0;
					maskImg.pixels[loc + 1] = 0;
					maskImg.pixels[loc + 2] = 0;
					maskImg.pixels[loc + 3] = alpha;
				};
			};
			// Update the Pixels of the Mask Image
			maskImg.updatePixels();
			// Apply the Mask to the Image
			img.mask(maskImg);
			// Draw the Blurred Image on the Drawing Canvas
			drawingCanvas.image(img, mouseX - radius, mouseY - radius);
		};
		// Set the Drawing Style for the Circle Indicating the Blur Area
		noFill();
		strokeWeight(1);
		stroke(255, 0, 0);
		// Draw the Circle Indicating the Blur Area
		circle(mouseX, mouseY, radius * 2);
	};


	/**
	 * Method to Populate the Tool Options for the BlurTool.
	 */
	this.populateOptions = () => {
		// Create a Container for the Slider
		const sliderContainer = createDiv().parent("tool-options").style("display", "flex").style("flex-direction", "column");

		// Create a Label for the Size Slider & Add it to the Container
		this.sliderLabel = createP("Size");
		this.sliderLabel.parent(sliderContainer).class("slider-label");

		// Create the Size Slider & Add it to the Container
		this.sizeSlider = createSlider(10, 100, 10);
		this.sizeSlider.parent(sliderContainer);

		// Add a Divider to the Tool Options
		select("#tool-options").child(createDiv().addClass("divider"));
	};


	/**
	 * Method to Clear the Tool Options when the BlurTool is Unselected.
	 */
	this.unselectTool = () => {
		// Clear the Tool Options
		select("#tool-options").html("");
	};
};
