// Save the current displayDialogs setting
var originalDisplayDialogs = app.displayDialogs;
// Set displayDialogs to DialogModes.NO to prevent any dialogs from displaying
app.displayDialogs = DialogModes.NO;

// Loop through all open documents
for (var i = 0; i < app.documents.length; i++) {
    var doc = app.documents[i];
    
    // Get the document name
    var docName = doc.name;
    
    // Check if the document contains "idle" in the name and ends with ".psd"
    if (docName.toLowerCase().indexOf("idle") !== -1 && docName.slice(-4).toLowerCase() === ".psd") {
        // Set the current document as active
        app.activeDocument = doc;
        
        // Ask user if the pixel cut is done
        var cutPixel = confirm("Did you cut the pixel? Press 'OK' to continue.");
        if (!cutPixel) {
            continue; // Skip to the next document
        }
        
      ///insert function duplicate.jsx
        
        // Select layer named "Layer 1" in the destination document
        var layerInDestination = destinationDoc.artLayers.getByName("Layer 1");
        if (layerInDestination) {
            layerInDestination.selected = true;
        } else {
            alert("Layer 'Layer 1' not found in the destination document.");
            continue; // Skip to the next document
        }
        
        // Ask user if everything is okay
        var allOkay = confirm("Are all okay? Press 'OK' to continue.");
        if (allOkay) {
            // Duplicate "sombra" and "brillo" layers to destination document
            var layersToDuplicateAgain = ["sombra", "brillo"];
            for (var m = 0; m < layersToDuplicateAgain.length; m++) {
                var layerAgain = doc.artLayers.getByName(layersToDuplicateAgain[m]);
                if (layerAgain) {
                    layerAgain.duplicate(destinationDoc);
                } else {
                    alert("Layer '" + layersToDuplicateAgain[m] + "' not found in the document.");
                    break; // Stop duplicating layers and skip to the next document
                }
            }
            
            // Save destination document as its original name but in .psd format
            var saveOptions = new PhotoshopSaveOptions();
            saveOptions.embedColorProfile = true;
            saveOptions.alphaChannels = true;
            saveOptions.layers = true;
            saveOptions.spotColors = true;
            saveOptions.annotations = true;
            saveOptions.jpegQuality = 12;
            saveOptions.saveMultipleArtboards = true;
            
            var originalName = destinationDoc.name.split(".")[0]; // Get original name without extension
            var savePath = destinationDoc.path;
            var saveFile = File(savePath + "/" + originalName + ".psd");
            destinationDoc.saveAs(saveFile, saveOptions, true);
        } else {
            continue; // Skip to the next document if user cancels
        }
    }
}

// Restore the original displayDialogs setting
app.displayDialogs = originalDisplayDialogs;
