"use strict";

var parser = require("./configParser")

function getInfoPlistPath() {
    var configXml = parser.parseConfigXml()
    var projectName = configXml.widget.name._text.toString().trim()
    return path.join("platforms", "ios", projectName, projectName + "-Info.plist");
}

module.exports = {
    getInfoPlistPath,
}
