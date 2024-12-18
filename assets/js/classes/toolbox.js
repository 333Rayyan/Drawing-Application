// Class representing the Toolbox for Selecting & Using Drawing Tools.
function Toolbox() {
    const self = this;

    this.tools = [];
    this.selectedTool = null;

    // Function to Handle Clicking on a Tool Ccon in the toolbar.
    const toolbarItemClick = (event) => {
        const items = document.querySelectorAll(".tool-icon");
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("selected");
        };

        const toolName = event.currentTarget.dataset.tool;
        self.selectTool(toolName);

        drawingCanvas.loadPixels();
    };

    // Function to Add an Icon for a Tool to the Toolbar.
    const addIcon = (icon, name) => {
        const toolIcon = document.createElement("div");
        toolIcon.className = "tool-icon";
        toolIcon.dataset.tool = name;

        const img = document.createElement("img");
        img.src = icon;

        toolIcon.appendChild(img);
        toolIcon.addEventListener("click", toolbarItemClick);
        document.querySelector("#tool-bar .tool-group").appendChild(toolIcon);

        return toolIcon;
    };

    // Function to Add a Tool to the Toolbox.
    this.addTool = (tool) => {
        // Check if Tool has Required Properties.
        if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
            console.warn(`${tool.name} is Missing a Name/Icon`);
        };

        this.tools.push(tool);
        const toolIcon = addIcon(tool.icon, tool.name);

        if (this.selectedTool == null) {
            this.selectTool(tool.name);
            toolIcon.classList.add("selected-tool");
        };
    };

    // Function to Select a Tool from the Toolbox.
    this.selectTool = (toolName) => {
        for (let i = 0; i < this.tools.length; i++) {
            if (this.tools[i].name == toolName) {
                // Unselect Previous Tool & its Icon.
                if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
                    this.selectedTool.unselectTool();
                };

                if (this.selectedTool != null) {
                    document.querySelector(`.tool-icon[data-tool="${this.selectedTool.name}"]`).classList.remove("selected-tool");
                };
                this.selectedTool = this.tools[i];
                document.querySelector(`.tool-icon[data-tool="${toolName}"]`).classList.add("selected-tool");

                // Populate Tool Options if Tool has the Function.
                if (this.selectedTool.hasOwnProperty("populateOptions")) {
                    this.selectedTool.populateOptions();
                };
            };
        };
    };
};
