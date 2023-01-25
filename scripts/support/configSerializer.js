"use strict";

var fs = require("fs");
var path = require("path");
var plist = require("plist");

function savePlist(plistObj, file) {
    var contents = plist.build(plistObj)
    var filePath = path.resolve(file);

    if (!fs.existsSync(filePath)) throw new Error(`Could not find plist file at path: ${filePath}`);

    fs.writeFileSync(filePath, contents, { encoding: 'utf-8' })
}

module.exports = {
    savePlist,
}
