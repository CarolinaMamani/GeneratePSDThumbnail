// Function to move layers down by a specified distance in the selected document
function moveShadLayersDown(distance, selectedDoc) {
    var shadLayers = [];
    // Find and add "shad1" and "shad2" layers to the array
    var shad1Layer = selectedDoc.artLayers.getByName("shad1");
    var shad2Layer = selectedDoc.artLayers.getByName("shad2");
    if (shad1Layer) shadLayers.push(shad1Layer);
    if (shad2Layer) shadLayers.push(shad2Layer);

    // Move layers down in the selected document
    for (var i = 0; i < shadLayers.length; i++) {
        shadLayers[i].translate(0, distance); // Move layer down by specified distance
    }
}