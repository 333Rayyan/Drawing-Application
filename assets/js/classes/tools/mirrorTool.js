/**
 * The MirrorDrawTool Object.
 * This Tool Allows the User to Draw with a Mirror Reflection Along the X or Y Axis.
 */
function MirrorDrawTool() {
    // Define the Name & Icon for the MirrorDrawTool
    this.name = "mirrorDraw";
    this.icon = "assets/img/mirrorTool.png";

    // Define the Axis of Reflection & Line of Symmetry
    const self = this;
    this.axis = "x";
    this.lineOfSymmetry = width / 2;

    // Define the Previous Mouse Coordinates & Opposite Mouse Coordinates
    this.previousMouse = {
        x: -1,
        y: -1
    };
    this.previousMouseOpposite = {
        x: -1,
        y: -1
    };


    /**
     * The Draw Method for the MirrorDrawTool.
     * This Method Draws a Line in a Mirrored Fashion Along the X or Y Axis.
     */
    this.draw = () => {
        // Update the Slider Label with the Current Stroke Weight Value
        this.sliderLabel.html(`Weight: ${this.strokeWeightSlider.value()}px`);

        // Update the Drawing Canvas Pixels
        drawingCanvas.updatePixels();

        // Check If the Mouse Is Pressed
        if (mouseIsPressed) {
            // If This Is the First Mouse Press, Set the Previous & Opposite Mouse Coordinates
            if (this.previousMouse.x == -1) {
                this.previousMouse.x = mouseX;
                this.previousMouse.y = mouseY;
                this.previousMouseOpposite.x = this.calculateOpposite(mouseX, "x");
                this.previousMouseOpposite.y = this.calculateOpposite(mouseY, "y");
            }
            else {
                // If the Mouse Is Outside the Canvas or Has Not Moved, Reset the Previous & Opposite Mouse Coordinates & Return
                if (checkMouseInCanvas() == false || (mouseX == this.previousMouse.x && mouseY == this.previousMouse.y)) {
                    this.previousMouse.x = -1;
                    this.previousMouse.y = -1;
                    return;
                };

                // Draw a Line & Its Mirror Reflection
                drawingCanvas.stroke(colourP)
                drawingCanvas.strokeWeight(this.strokeWeightSlider.value());
                drawingCanvas.line(this.previousMouse.x, this.previousMouse.y, mouseX, mouseY);
                this.previousMouse.x = mouseX;
                this.previousMouse.y = mouseY;

                const oppositeX = this.calculateOpposite(mouseX, "x");
                const oppositeY = this.calculateOpposite(mouseY, "y");

                drawingCanvas.line(this.previousMouseOpposite.x, this.previousMouseOpposite.y, oppositeX, oppositeY);
                this.previousMouseOpposite.x = oppositeX;
                this.previousMouseOpposite.y = oppositeY;
            };
        }
        else {
            // If the Mouse Is Not Pressed, Reset the Previous & Opposite Mouse Coordinates
            this.previousMouse.x = -1;
            this.previousMouse.y = -1;

            this.previousMouseOpposite.x = -1;
            this.previousMouseOpposite.y = -1;
        };

        // Load the Drawing Canvas Pixels
        drawingCanvas.loadPixels();

        // Draw the Line of Symmetry
        drawingCanvas.push();
        drawingCanvas.strokeWeight(3);
        drawingCanvas.stroke("red");
        if (this.axis == "x") {
            drawingCanvas.line(width / 2, 0, width / 2, height);
        } else {
            drawingCanvas.line(0, height / 2, width, height / 2);
        };
        drawingCanvas.pop();
    };


    /**
    * The Method to Calculate the Opposite Coordinate for the Mirror Reflection.
    * @param {number} n - The Coordinate to Be Mirrored.
    * @param {string} a - The Axis of Reflection.
    * @returns {number} The Mirrored Coordinate.
    */
    this.calculateOpposite = (n, a) => {

        // If the Axis of Reflection Is Not the Same as the Given Axis, Return the Given Coordinate
        if (a != this.axis) {
            return n;
        };

        // Define the Line of Symmetry Depending on the Axis of Reflection
        let lineOfSymmetry;

        if (this.axis == "x") {
            lineOfSymmetry = width / 2;
        } else {
            lineOfSymmetry = height / 2;
        };

        // Calculate & Return the Mirrored Coordinate
        if (n < lineOfSymmetry) {
            return lineOfSymmetry + (lineOfSymmetry - n);
        }
        else {
            return lineOfSymmetry - (n - lineOfSymmetry);
        };
    };


    /**
     * The Method to Populate the Tool Options for the MirrorDrawTool.
     * This Method Adds a Button for Changing the Axis of Reflection & a Slider for Adjusting the Stroke Weight.
     */
    this.populateOptions = () => {
        // Create the Horizontal & Vertical Buttons & Add Them to the Tool Options
        const horizontalButton = createToolOption("Horizontal");
        horizontalButton.addClass("selected-item");
        horizontalButton.id("horizontalDirection");
        horizontalButton.mouseClicked(() => {
            horizontalButton.addClass("selected-item");
            select("#verticalDirection").removeClass("selected-item");
            self.axis = "x";
        });

        select("#tool-options").child(createDiv().addClass("divider"));

        const verticalButton = createToolOption("Vertical");
        verticalButton.id("verticalDirection");
        verticalButton.mouseClicked(() => {
            verticalButton.addClass("selected-item");
            select("#horizontalDirection").removeClass("selected-item");
            self.axis = "y";
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
     * The Method to Unselect the MirrorDrawTool.
     * This Method Clears the Tool Options.
     */
    this.unselectTool = () => {
        drawingCanvas.updatePixels();
        select("#tool-options").html("");
    };
};
