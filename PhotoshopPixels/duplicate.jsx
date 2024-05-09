// Function to find a document with the specified name and ending with ".gif"
function findDocumentWithNameAndExtension(nameContains, extension) {
    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];
        if (doc.name.toUpperCase().indexOf(nameContains.toUpperCase()) !== -1 && doc.name.slice(-4).toLowerCase() === extension.toLowerCase()) {
            return doc;
        }
    }
    return null; // Return null if no matching document is found
}

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
        var destinationName = prompt("Choose the destination:\n- 'Back'\n- 'Front'\n- 'Side-L'\n- 'Side-R'");
        if (!destinationName) {
            return; // Exit if user cancels
        }
        
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

// Usage example
var doc = app.activeDocument; // Get the currently active document
var layersToDuplicate = ["light1", "light2", "shad1", "shad2"];
duplicateLayersToDestination(doc, layersToDuplicate);
