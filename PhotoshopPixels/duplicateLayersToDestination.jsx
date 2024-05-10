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
        // Find the destination document based on the user's choice
        var destinationDoc = findDocumentWithNameAndExtension(destinationName, ".gif");
        if (!destinationDoc) {
            alert("Could not find a document with the specified name containing '" + destinationName + "' and ending with '.gif'.");
            return;
        }

        // Duplicate specified layers to destination document
        for (var k = 0; k < layersFound.length; k++) {
            layersFound[k].duplicate(destinationDoc);
        }
    } else {
        alert("Not all layers were found. Please ensure all required layers are present.");
    }
}