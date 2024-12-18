/**
 * BackgroundFill Tool Class.
 */
function BackgroundFill() {
	// Setting the Icon & Name of the Tool
	this.icon = "assets/img/backgroundFill.png";
	this.name = "backgroundFill";


	/**
	 * The Draw Method for the BackgroundFill Tool.
	 */
	this.draw = () => {
		// If the Mouse is Pressed
		if (mouseIsPressed) {
			// If the Mouse is not Within the Canvas, Return
			if (checkMouseInCanvas() == false) {
				return;
			};

			// Set the Background Colour to the Selected Colour
			backgroundColour = colourP;
			// Fill the Background Layer with the Selected Colour
			backgroundLayer.background(backgroundColour);

			// If an Image Background Exists
			if (imageBG) {
				// Load the Image & Draw it onto the Background Layer
				loadImage(imageBG.data, (img) => {
					backgroundLayer.image(img, 0, 0, width, height);
				});
			};
		};
	};
};
