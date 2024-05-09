// Code for cut a parte and make duplicate shadows and light from IDLE.psd
//to a .gif pixel animation flat 
//and saved it as .psd

// Reference the source document
var sourceDoc = app.activeDocument;

// Reference the destination document (replace "DestinationDocumentName" with the name of your destination document)
var destDoc = app.documents.getByName("DestinationDocumentName");

// Duplicate a layer to the destination document
var originalLayer = sourceDoc.artLayers.getByName("LayerName"); // Replace "LayerName" with the name of your layer
originalLayer.duplicate(destDoc, ElementPlacement.PLACEATBEGINNING);
