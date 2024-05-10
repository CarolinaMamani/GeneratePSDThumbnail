// Function to handle button click events
function buttonClickHandler(buttonName) {
    var doc = app.activeDocument; // Get the currently active document
    var layersToDuplicate = ["shad1", "shad2","light1", "light2"];
    duplicateLayersToDestination(doc, layersToDuplicate, buttonName);
    
    var destinationDoc = findDocumentWithNameAndExtension(buttonName, ".gif"); // Find the selected document
    if (!destinationDoc) {
        alert("Could not find a document with the specified name containing '" + buttonName + "' and ending with '.gif'.");
        return;
    }
    app.activeDocument = destinationDoc; // Set the selected document as active

    // Move layers "shad1" and "shad2" 6 pixels down in the selected document
    moveShadLayersDown(6, destinationDoc);

    dialog.close(); // Close the dialog after selecting an option
}
