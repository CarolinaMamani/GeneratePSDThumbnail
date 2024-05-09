// Loop through all open documents
for (var i = 0; i < app.documents.length; i++) {
    var doc = app.documents[i];
    
    // Get the document name
    var docName = doc.name;
    
    // Check if the document ends with ".gif"
    if (docName.slice(-4).toLowerCase() === ".gif") {
        // Set the current document as active
        app.activeDocument = doc;
        
        // Select all layers
        var allLayers = doc.artLayers;
        for (var j = 0; j < allLayers.length; j++) {
            allLayers[j].selected = true;
        }

        // Make a new group
        var group = doc.layerSets.add();
        group.name = "Group";
        
        // Move selected layers into the group in reverse order
        var selectedLayers = [];
        for (var k = doc.artLayers.length - 1; k >= 0; k--) {
            if (doc.artLayers[k].selected) {
                selectedLayers.push(doc.artLayers[k]);
            }
        }
        
        for (var m = 0; m < selectedLayers.length; m++) {
            selectedLayers[m].move(group, ElementPlacement.INSIDE);
        }
    }
}
