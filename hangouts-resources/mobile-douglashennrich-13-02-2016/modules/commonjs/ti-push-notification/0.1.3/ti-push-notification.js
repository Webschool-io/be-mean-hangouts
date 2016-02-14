(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tiPushNotification = f()}})(function(){var define,module,exports;return (function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var a=typeof require=="function"&&require;if(!u&&a)return a.length===2?a(i,!0):a(i);if(s&&s.length===2)return s(i,!0);if(s)return s(i);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[i].exports}var i=Array.prototype.slice;Function.prototype.bind||Object.defineProperty(Function.prototype,"bind",{enumerable:!1,configurable:!0,writable:!0,value:function(e){function r(){return t.apply(this instanceof r&&e?this:e,n.concat(i.call(arguments)))}if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=this,n=i.call(arguments,1);return r.prototype=Object.create(t.prototype),r.prototype.contructor=r,r}});var s=typeof require=="function"&&require;for(var u=0;u<r.length;u++)o(r[u]);return o})({1:[function(require,module,exports){
/**
 * Yes you can use it with your self-hosted server or any other cloud services
 * like Parse.com or Appcelerator cloud.
 *
 * @auther Hazem Khaled <hazem.khaled@gmail.com>
 */
var ANDROID = Ti.Platform.name === 'android',
  IOS = !ANDROID && (Ti.Platform.name === 'iPhone OS');

if (ANDROID) {
  var GCM = require("nl.vanvianen.android.gcm");
}

function TiPush(e) {
  this.backendUrl = e.backendUrl;
  this.token = '';
  this.os = (ANDROID) ? 'Android' : 'iOS';
}

TiPush.prototype.registerDevice = function(_prams) {
  var that = this,
    token = '',
    onReceive = _prams.onReceive,
    onStart = _prams.onStart || _prams.onReceive,
    onResume = _prams.onResume || _prams.onReceive,
    pnOptions = _prams.pnOptions,
    extraOptions = _prams.extraOptions || {};

  for (var key in extraOptions) {
    that[key] = extraOptions[key];
  }

  function deviceTokenSuccess(e) {
    if (ANDROID) {
      Ti.API.debug('[TiPush] Device Token:', e.registrationId);
      token = e.registrationId;
    } else if (IOS) {
      Ti.API.debug('[TiPush] Device Token:', e.deviceToken);
      token = e.deviceToken;
    }
    that.token = token;

    var uploadParams = {};

    for (var key in that) {
			if (['backendUrl', 'getToken', 'registerDevice'].indexOf(key) === -1) {
        uploadParams[key] = that[key];
      }
    }

    var xhr = Ti.Network.createHTTPClient({
      onload: function() {
        Ti.API.debug("[TiPush] Token sent to our backend");
      },
      onerror: function() {
        Ti.API.error("[TiPush] Can't send tokend to our backend");
      }
    });
    xhr.open("POST", that.backendUrl);
    xhr.send(uploadParams);
  }

  function deviceTokenError(e) {
    Ti.API.error('[TiPush] Token Error:', e.error);
  }

  function receivePush(e) {
    Ti.API.debug("[TiPush] onReceive Push callback =", JSON.stringify(e));

    if (IOS) {
      // Reset badge
      Titanium.UI.iPhone.appBadge = null;
    }

    onReceive(e.data);
    Ti.API.debug("[TiPush] Push notification received: Module", JSON.stringify(e.data));
  }

  if (ANDROID) {

    GCM.registerPush({
      senderId: pnOptions.senderId,
      notificationSettings: pnOptions.notificationSettings,
      success: deviceTokenSuccess,
      error: deviceTokenError,
      callback: receivePush
    });

    /* When the app is started */
    var lastData = GCM.getLastData();
    if (lastData) {
      onStart({
        data: lastData
      });
      GCM.clearLastData();
    }

    /* And when the app is resumed */
    Ti.Android.currentActivity.addEventListener("resume", function() {
      var lastData = GCM.getLastData();
      if (lastData) {
        onResume({
          data: lastData
        });
        GCM.clearLastData();
      }
    });

  } else if (IOS) {
    // Check if the device is running iOS 8 or later
    if (parseInt(Ti.Platform.version.split(".")[0], 10) >= 8) {
      function registerForPush() {
        Ti.Network.registerForPushNotifications({
          success: deviceTokenSuccess,
          error: deviceTokenError,
          callback: receivePush
        });
        // Remove event listener once registered for push notifications
        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
      }

      // Wait for user settings to be registered before registering for push notifications
      Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);

      // Register notification types to use
      Ti.App.iOS.registerUserNotificationSettings({
        types: pnOptions.types,
        categories: pnOptions.categories
      });

    } else {
      // For iOS 7 and earlier
      Ti.Network.registerForPushNotifications({
        // Specifies which notifications to receive
        types: pnOptions.types,
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
      });
    }

  } else {
    Ti.API.warn("[TiPush] Push notification not implemented yet into TiPushNotification for", Ti.Platform.osname);
  }
};

TiPush.prototype.getToken = function() {
  return this.token;
};

exports.init = function(param) {
  return new TiPush(param);
};

},{"nl.vanvianen.android.gcm":undefined}]},{},[1])(1)
});