#include "./findDocument.js"
#include "./moveShadLayersDown.js"
#include "./duplicateLayersToDestination.js";
#include "./buttonClickHandler.js";


// Crear la interfaz de usuario y asignar eventos a los botones
var dialog = new Window("dialog", "Choose Destination");
var buttonsGroup = dialog.add("group");
var backButton = buttonsGroup.add("button", undefined, "Back");
var frontButton = buttonsGroup.add("button", undefined, "Front");
var sideLButton = buttonsGroup.add("button", undefined, "Side-L");
var sideRButton = buttonsGroup.add("button", undefined, "Side-R");

// Agregar event listeners a los botones
backButton.onClick = function () { buttonClickHandler("Back", dialog); };
frontButton.onClick = function () { buttonClickHandler("Front", dialog); };
sideLButton.onClick = function () { buttonClickHandler("Side-L", dialog); };
sideRButton.onClick = function () { buttonClickHandler("Side-R", dialog); };


// Mostrar la interfaz de usuario
dialog.show();