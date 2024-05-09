// Function to duplicate specific layers from the current document to a specified destination document
function duplicateLayersToDestination(doc, layersToDuplicate, destinationName) {
    // Select specific layers
    var layersFound = [];
    for (var j = 0; j < layersToDuplicate.length; j++) {
        var layer = doc.artLayers.getByName(layersToDuplicate[j]);
        if (layer) {
            layersFound.push(layer);
        } 
    }

    // If all layers are found, proceed with the duplication process
    if (layersFound.length === layersToDuplicate.length) {
        // Ask user to choose destination
        var result = app.dialogs.add("Choose the destination:");
        var dialogColumns = result.dialogColumns;
        var buttonsGroup = dialogColumns.add().buttonGroup;
        var backButton = buttonsGroup.add("button", undefined, "Back");
        var frontButton = buttonsGroup.add("button", undefined, "Front");
        var sideLButton = buttonsGroup.add("button", undefined, "Side-L");
        var sideRButton = buttonsGroup.add("button", undefined, "Side-R");
        var userChoice = result.show();
        result.close();
        
        // Process user choice
        var destination;
        if (userChoice === 1) {
            destination = "Back";
        } else if (userChoice === 2) {
            destination = "Front";
        } else if (userChoice === 3) {
            destination = "Side-L";
        } else if (userChoice === 4) {
            destination = "Side-R";
        } else {
            return; // Skip if user cancels
        }
        
        // Assuming the corresponding document is open
        var destinationDoc = app.documents.getByName(destination);
        app.activeDocument = doc; // Set the current document as active again
        
        // Duplicate specified layers to destination document
        for (var k = 0; k < layersFound.length; k++) {
            layersFound[k].duplicate(destinationDoc);
        }
    } else {
        alert("Not all layers were found. Please ensure all required layers are present.");
    }
}

// Usage example
var doc = app.activeDocument; // Get the currently active document
var layersToDuplicate = ["light1", "light2", "shad1", "shad2"];
duplicateLayersToDestination(doc, layersToDuplicate);
