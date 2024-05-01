//-----WORKING WITH THE ACTUAL OPEN DOCUMENT
//var activeDoc = app.activeDocument; //catch the open document psd
//alert(activeDoc.name); //show up a messege with the file's name

//var layers = activeDoc.layers; //catch the layers on the active document
//alert(layers.length); // show up how many layers the document have
//alert(layers[0].name); //show up the name of the layer [0]

//-----------TO CREATE A NEW DOCUMENTO
var newDocument = app.documents.add(2250,300,72,'Testing',NewDocumentMode.RGB);
//          (width, height, pixels per inch, name, mode)
var layers = newDocument.artLayers; //artLayer able to work with layers on the document
var newLayer = layers.add(); //.add add layer to the doc
newLayer.name = 'New layer here :)'; //here we can name it

newLayer.kind = LayerKind.TEXT; //change the layer to a text layer
//newLayer.layerKing = LayerKind.VIDEO;
var textItem = newLayer.textItem;
//alert(textItem);

var fonts = app.fonts;
//alert(fonts.length);
var randomFont = fonts[Math.floor(Math.random()*fonts.length)];

//alert(randomFont.name);

var myColour = new SolidColor();
var rgb = myColour.rgb;
rgb.red = 0;
rgb.blue= 255;
rgb.green = 50;



textItem.font = randomFont.postScriptName;
textItem.contents = 'This is my text'
textItem.size = 180;
textItem.color = myColour;
textItem.justification = Justification.CENTER;
textItem.position = [newDocument.width/2,250]


var imageFile = File("/Basic Script/ren.jpg");
alert(imageFile.exists);
if(imageFile.exists){

}