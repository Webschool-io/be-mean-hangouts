function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openWindow() {
        var pnOptions;
        if (parseInt(Ti.Platform.version.split(".")[0], 10) >= 8) {
            var thumbUpAction = Ti.App.iOS.createUserNotificationAction({
                identifier: "THUMBUP_IDENTIFIER",
                title: "Agree",
                activationMode: Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_BACKGROUND,
                destructive: false,
                authenticationRequired: false
            });
            var thumbDownAction = Ti.App.iOS.createUserNotificationAction({
                identifier: "THUMBDOWN_IDENTIFIER",
                title: "Disagree",
                activationMode: Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_BACKGROUND,
                destructive: false,
                authenticationRequired: false
            });
            var thumbUpDownCategory = Ti.App.iOS.createUserNotificationCategory({
                identifier: "THUMBUPDOWN_CATEGORY",
                actionsForDefaultContext: [ thumbUpAction, thumbDownAction ],
                actionsForMinimalContext: [ thumbUpAction, thumbDownAction ]
            });
            var pnOptions = {
                types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND ],
                categories: [ thumbUpDownCategory ]
            };
        } else var pnOptions = {
            types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND ]
        };
        var onReceive = function() {};
        var tiPush = require("ti-push-notification").init({
            backendUrl: "http://domain.tld/register.php"
        });
        tiPush.registerDevice({
            pnOptions: pnOptions,
            onReceive: onReceive,
            extraOptions: {
                something: "a",
                key2: true,
                user_id: 1234,
                whatever: "youwant"
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tela2";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: false,
        backButtonTitle: "nudes",
        tintColor: "red",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    openWindow ? $.addListener($.__views.win, "open", openWindow) : __defers["$.__views.win!open!openWindow"] = true;
    $.__views.webView = Ti.UI.createWebView({
        id: "webView"
    });
    $.__views.win.add($.__views.webView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    console.log("- - - - - - - -");
    console.log("args: ", JSON.stringify(args));
    console.log("- - - - - - - -");
    __defers["$.__views.win!open!openWindow"] && $.addListener($.__views.win, "open", openWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;