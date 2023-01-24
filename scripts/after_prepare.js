"use strict";

var pathHelper = require("./support/pathHelper");
var parser = require("./support/configParser");
var serializer = require("./support/configSerializer")

function toBoolString(value) {
    if (value) return "YES";
    return "NO";
}

function addAutoInitSettingForIOS(context) {
    var pluginId = context.opts.plugin.id;
    var infoPlistPath = pathHelper.getInfoPlistPath();

    var packageJson = parser.parsePackageJson();
    var infoPlist = parser.parseInfoPlist();

    var fcmAutoInitialize = true;

    if (packageJson.cordova && packageJson.cordova.plugins) {
        var pluginSection = packageJson.cordova.plugins[pluginId];

        if (pluginSection && pluginSection["FCM_AUTO_INIT_ENABLED"]) {
            fcmAutoInitialize = pluginSection["FCM_AUTO_INIT_ENABLED"];
        }
    }

    infoPlist["FirebaseMessagingAutoInitEnabled"] = toBoolString(fcmAutoInitialize);
    serializer.savePlist(infoPlist, infoPlistPath);
}

module.exports = function(context) {
    addAutoInitSettingForIOS(context);
}
