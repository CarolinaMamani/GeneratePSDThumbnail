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
        
        // Select specific layers
        var layersToDuplicate = ["light1", "light2", "shad1", "shad2"];
        var layersFound = [];
        for (var j = 0; j < layersToDuplicate.length; j++) {
            var layer = doc.artLayers.getByName(layersToDuplicate[j]);
            if (layer) {
                layersFound.push(layer);
            } 
        }

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
            continue; // Skip to the next document if user cancels
        }
        
        // Assuming the corresponding document is open
        var destinationDoc = app.documents.getByName(destination);
        app.activeDocument = doc; // Set the current document as active again
        
        // Duplicate specified layers to destination document
        for (var k = 0; k < layersFound.length; k++) {
            layersFound[k].duplicate(destinationDoc);
        }
        
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
