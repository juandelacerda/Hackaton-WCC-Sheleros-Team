cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "ca.kloppmagic.plugin.uber.uber",
        "file": "plugins/ca.kloppmagic.plugin.uber/uber.js",
        "pluginId": "ca.kloppmagic.plugin.uber",
        "runs": true
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "ca.kloppmagic.plugin.uber": "0.2.5",
    "cordova-plugin-dialogs": "1.3.0"
};
// BOTTOM OF METADATA
});