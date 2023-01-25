"use strict";

const FCM_AUTO_INIT_ENABLED = "FCM_AUTO_INIT_ENABLED";

var log = require("./support/logger");
var pathHelper = require("./support/pathHelper");
var parser = require("./support/configParser");
var serializer = require("./support/configSerializer")

var logger = new log.Logger("cordova-plugin-firebase-messaging");

function toBoolString(value) {
    if (value) return "YES";
    return "NO";
}

function addAutoInitSettingForIOS(context) {
    logger.info("Adding FCM auto initialize setting for iOS");
    var pluginId = context.opts.plugin.id;
    var infoPlistPath = pathHelper.getInfoPlistPath();

    var packageJson = parser.parsePackageJson();
    var infoPlist = parser.parsePlistFile(infoPlistPath);

    var fcmAutoInitialize = true;

    if (packageJson.cordova && packageJson.cordova.plugins) {
        var pluginSection = packageJson.cordova.plugins[pluginId];

        if (pluginSection && pluginSection[FCM_AUTO_INIT_ENABLED]) {
            var value = pluginSection[FCM_AUTO_INIT_ENABLED];

            if (value === "false") {
                fcmAutoInitialize = false;
            } else if (value === "true") {
                // Do nothing
            } else {
                throw new Error(`Invalid value for variable ${FCM_AUTO_INIT_ENABLED}: ${value}. Must be "true" or "false"`);
            }
        }
    }

    logger.info(`Setting FirebaseMessagingAutoInitEnabled = ${toBoolString(fcmAutoInitialize)} in info plist`);
    infoPlist["FirebaseMessagingAutoInitEnabled"] = toBoolString(fcmAutoInitialize);
    serializer.savePlist(infoPlist, infoPlistPath);
}

module.exports = function(context) {
    addAutoInitSettingForIOS(context);
}
