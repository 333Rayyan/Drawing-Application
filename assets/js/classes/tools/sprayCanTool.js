/**
 * Tool for Creating a Spray Can Effect on Canvas.
 */
function SprayCanTool() {
    // Name & Icon for the Tool.
	this.name = "sprayCan";
	this.icon = "assets/img/spray.png";

    // Number of Points to Spray & their Spread.
	this.points = 13;
	this.spread = 10;


    /**
     * Method to Draw the Spray on Canvas.
     */
	this.draw = () => {
		// Calculate Random Size for Spray Droplets.
		const r = random(5, 10);

		if (mouseIsPressed) {
			// Check if Mouse is Inside Canvas.
			if (checkMouseInCanvas() == false) {
				return;
			};

			// Create Spray Effect.
			for (let i = 0; i < this.points; i++) {
				// Calculate Angle for Each Point.
				const angle = i * 360 / this.points;

				// Calculate Position for Each Point.
				const x = mouseX + cos(angle) * random(0, this.spread);
				const y = mouseY + sin(angle) * random(0, this.spread);

				// Set Colour & Stroke Weight.
				drawingCanvas.stroke(colourP);
				drawingCanvas.strokeWeight(1);

				// Draw Point.
				drawingCanvas.point(x, y, r, r);
			};
		};
	};
};
