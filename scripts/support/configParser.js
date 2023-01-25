"use strict";

var fs = require('fs');
var path = require("path");
var xmlParser = require('xml-js');
var plistParser = require("plist");

function parseJsonFile(file) {
    var filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) throw new Error("Could not find JSON file at path: " + filePath);

    var json = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(json);
}

function parseXmlFile(file) {
    var filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) throw new Error("Could not find XML file at path: " + filePath);

    var xml = fs.readFileSync(filePath, 'utf-8');
    var json = xmlParser.xml2json(xml, { compact: true });
    return JSON.parse(json);
}

function parsePlistFile(file) {
    var filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) throw new Error("Could not find XML file at path: " + filePath);

    var contents = fs.readFileSync(filePath, 'utf-8');
    return plistParser.parse(contents);
}

function parsePluginXml(context) {
    if (!context) throw new Error("Must supply Cordova context");

    var pluginId = context.opts.plugin.id;
    if (!pluginId) throw new Error("Plugin id not found in Cordova context");

    var pluginXmlFile = path.join("plugins", pluginId, "plugin.xml");
    return parseXmlFile(pluginXmlFile);
}

function parseConfigXml() {
    return parseXmlFile("./config.xml");
}

function parsePackageJson() {
    return parseJsonFile("./package.json");
}

module.exports = {
    parsePlistFile,
    parsePluginXml,
    parseConfigXml,
    parsePackageJson,
}
