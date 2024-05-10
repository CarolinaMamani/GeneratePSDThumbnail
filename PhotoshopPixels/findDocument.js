


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