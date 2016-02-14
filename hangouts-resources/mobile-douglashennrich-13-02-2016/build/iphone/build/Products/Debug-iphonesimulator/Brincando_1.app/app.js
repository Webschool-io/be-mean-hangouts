
/*!
 * liveview Titanium CommonJS require with some Node.js love and dirty hacks
 * Copyright (c) 2013 Appcelerator
 */
(function(globalScope) {
/**
 * Initialize a new `Process`.
 *
 * @api public
 */

function Process() {
  if (!(this instanceof Process)) return new Process();
  this.title = 'titanium';
  this.version = '';
  this.moduleLoadList = [];
  this.versions = {};
  this.arch = Ti.Platform.architecture;
  this.platform = Ti.Platform.osname;
  this.hardware = ('' + Ti.Platform.model).replace('google_');
}

// inherit from EventEmitter

Process.prototype.__proto__ = Emitter.prototype;
/*!
 * Event Emitters
 */

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) { return mixin(obj); }
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  fn._off = on;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = function(event, fn){
  this._callbacks = this._callbacks || {};
  var callbacks = this._callbacks[event];
  if (!callbacks) { return this; }

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var i = callbacks.indexOf(fn._off || fn);
  if (~i) { callbacks.splice(i, 1); }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1);
  var callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};
/**
 * Expose `Socket`.
 */

if (typeof module !== 'undefined') {
  module.exports = Socket;
}

/**
 * [Socket description]
 * @param {[type]} opts [description]
 */

function Socket(opts) {
  if (!(this instanceof Socket)){ return new Socket(opts); }
  opts = opts || {};
  this.timeout = 5000;
  this.host = opts.host;
  this.port = opts.port;
  this.retry = opts.retry;
  this.bytesRead = 0;
  this.bytesWritten = 0;
  this.ignore = [];
}

/**
 * Inherit from `Emitter.prototype`.
 */

Socket.prototype.__proto__ = Emitter.prototype;

/**
 * [connect description]
 * @param  {[type]}   opts [description]
 * @param  {Function} fn   [description]
 * @return {[type]}        [description]
 */

Socket.prototype.connect = function(opts, fn){
  var self = this;
  opts = opts || {};
  var reConnect = !!opts.reConnect;
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }

  self.host = opts.host || self.host || '127.0.0.1';
  self.port = opts.port || self.port;
  self.retry = opts.retry || self.retry;

  this._proxy = Ti.Network.Socket.createTCP({
    host: self.host,
    port: self.port,
    connected: function (e) {
      self.connected = true;
      self._connection = e.socket;
      fn && fn(e);
      self.emit(((reConnect) ? 'reconnect' : 'connect'), e);

      Ti.Stream.pump(e.socket, function(e){
        if (e.bytesProcessed < 0 || !!e.errorStatus) {
          self._proxy.close();
          self.close(true);
          return;
        } else {
          self.emit('data', '' + e.buffer);
        }
      }, 1024, true);
    },
    error: function(e) {
      var err = { code: e.errorCode, error: e.error };
      if (!~self.ignore.indexOf(err.code)) { return self.emit('error',  err); }
      self.emit('error ignored', err);
    }
  });

  this._proxy.connect();
};

/**
 * [close description]
 * @return {[type]} [description]
 */

Socket.prototype.close = function(serverEnded){
  var self = this;

  self.connected = false;
  self.closing = !serverEnded;

  if (self.closing){
    self.write(function(){
      self._proxy.close();
      self.emit('close');
    });
    return
  }

  var retry = ~~self.retry;

  self.emit('end');
  if(!retry) { return };

  setTimeout(function(){
    self.emit('reconnecting');
    self.connect({reConnect:true});
  }, retry);
};


Socket.prototype.write = function(data, fn) {
  if ('function' == typeof data) {
    fn = data;
    data = null;
  }

  data = (data) ?  ('' + data) : '';

  var msg = Ti.createBuffer({value:  data});

  var callback = fn || function(){};

  Ti.Stream.write(this._connection, msg, function(){
    callback([].slice(arguments));
  });

};

/**
 * [setKeepAlive description]
 * @param {[type]} enable       [description]
 * @param {[type]} initialDelay [description]
 */

Socket.prototype.setKeepAlive = function(enable, initialDelay) {
  var self = this;
  if (!enable) {
    self._keepAlive && clearInterval(self._keepAlive);
    self._keepAlive = null;
    return;
  }
  self._keepAlive = setInterval(function(){
    self.write('ping');
  },initialDelay || 300000);
};

/**
 * Initialize a new `Module`.
 *
 * @api public
 */

function Module(id) {
  this.filename = id + '.js';
  this.id = id;
  this.platform = (process.platform === 'ipad') ? 'iphone' : process.platform;
  this.exports = {};
  this.loaded = false;
}

// global namespace

var global = Module._global = Module.global = {};

// main process

var process = global.process = Process();

// set environment type

global.ENV = 'liveview';

// set logging

global.logging = false;

// catch uncaught errors

global.CATCH_ERRORS = true;

// module cache

Module._cache = {};

/**
 * place holder for native require until patched
 *
 * @api private
 */

Module._requireNative = function(){
  throw new Error('Module.patch must be run first');
};

/**
 * place holder for native require until patched
 *
 * @api private
 */

Module._includeNative = function(){
  throw new Error('Module.patch must be run first');
};

/**
 * replace built in `require` function
 *
 * @param  {Object} globalCtx
 * @return {Function}
 * @api private
 */

Module.patch = function (globalCtx, url, port) {

  var defaultURL = (process.platform === 'android' && process.hardware === 'sdk')
    ? '10.0.2.2'
    : (Ti.Platform.model === 'Simulator' ? '127.0.0.1' : '192.168.0.18');
  Module._globalCtx = globalCtx;
  global._globalCtx = globalCtx;
  Module._url = url || defaultURL;
  Module._port = port || 8324;
  Module._requireNative = globalCtx.require;
  Module.evtServer && Module.evtServer.close();

  // FIX for android bug
  try { Ti.App.Properties.setBool('ti.android.bug2373.finishfalseroot', false); } catch(e){}

  globalCtx.localeStrings = Module.require('localeStrings');
  globalCtx.L = function (name, filler) {
    return (globalCtx.localeStrings[Ti.Locale.currentLanguage] || {})[name] || filler || name;
  };
  Module.connectServer();
}

/**
   * [reload description]
   * @return {[type]} [description]
   */

Module.global.reload = function(){
  try {
    Module.evtServer._proxy.close();
    console.log('[LiveView] Reloading App');
    Ti.App._restart();
  } catch(e){
    console.log('[LiveView] Reloading App via Legacy Method');
    Module.require('app');
  }
};


Module.connectServer = function() {

  var retryInterval = null;

  var client = Module.evtServer = new Socket({host: Module._url, port: 8323}, function() {
    console.log('[LiveView]', 'Connected to Event Server');
  });

  client.on('close', function(){
    console.log('[LiveView]', 'Closed Previous Event Server client');
  });

  client.on('connect', function(){
    if (retryInterval) {
      clearInterval(retryInterval);
      console.log('[LiveView]', 'Reconnected to Event Server');
    }
  });

  client.on('data', function(data) {
    if (!data) { return; }
    try{
      var evt = JSON.parse(''+data);
      if (evt.type === 'event' && evt.name === 'reload') {
        Module._cache = {};
        Module.global.reload();
      }
    } catch (e) { /*discard non JSON data for now*/ }
  });

  client.on('end', function () {
    console.error('[LiveView]', 'Disconnected from Event Server');
    retryInterval = setInterval(function(){
      console.log('[LiveView]', 'Attempting reconnect to Event Server');
      client.connect();
    }, 2000);
  });

  client.on('error', function(e){
    var err = e.error;
    var code = ~~e.code;
    if (code === 61) { err = 'Event Server unavailable. Connection Refused @ ' + Module._url + ':' + Module._port + '\n[LiveView] Please ensure your device and computer are on the same network and the port is not blocked.'; }
    throw new Error('[LiveView] ' + err);
  });

  client.connect();
  Module.require('app');
};

/**
 * include script loader
 * @param  {String} id
 *
 * @api public
 */

Module.include = function(ctx,id) {
  var file = id.replace('.js', '');
  var src = Module.prototype._getRemoteSource(file,10000);
  eval.call(ctx,src);
};

/**
 * commonjs module loader
 * @param  {String} id
 *
 * @api public
 */

Module.require = function(id) {
  var fullPath = id;
  var cached = Module.getCached(fullPath);
  if (!!cached) {
    return cached.exports;
  }

  var freshModule = new Module(fullPath);

  freshModule.cache();
  freshModule._compile();

  while (!freshModule.loaded) {}

  return freshModule.exports;
};

/**
 * [getCached description]
 * @param  {String} id
 * @return {Object}
 *
 * @api public
 */

Module.getCached = function(id) {
  return Module._cache[id];
};

/**
 * check if module file exists
 *
 * @param  {String} id
 * @return {[type]}    [description]
 * @api public
 */

Module.exists = function(id) {
  var path = Ti.Filesystem.resourcesDirectory + id + '.js';
  var file = Ti.Filesystem.getFile(path);

  if (file.exists()) return true;

  var pFolderPath = Ti.Filesystem.resourcesDirectory + '/' + this.platform + '/' + id + '.js';
  var pFile = Ti.Filesystem.getFile(pFolderPath)

  return pFile.exists();
};

/**
 * shady xhrSync request
 *
 * @param  {String} url
 * @param  {Number} timeout
 * @return {String}
 * @api private
 */

Module.prototype._getRemoteSource = function(file,timeout){
  var expireTime  = new Date().getTime() + timeout;
  var request = Ti.Network.createHTTPClient();
  var rsp = null;
  var done = false;
  var file = 'http://' + Module._url + ':' + Module._port + '/' + (file || this.id) + '.js';
  request.cache = false;
  request.open('GET', file);
  request.setRequestHeader('x-platform', this.platform);
  request.send();
  while(!done){
    if (request.readyState === 4 || request.status === 404) {
      rsp = (request.status === 200) ? request.responseText : false;
      done = true;
    } else if ((expireTime -  (new Date()).getTime()) <= 0) {
      rsp = false;
      done = true;
      throw new Error('[LiveView] File Server unavailable. Host Unreachable @ ' + Module._url + ':' + Module._port + '\n[LiveView] Please ensure your device and computer are on the same network and the port is not blocked.');
    }
  }

  return rsp;
};

/**
 * get module file source text

 * @return {String}
 * @api private
 */

Module.prototype._getSource = function() {
  var id = this.id;
  var isRemote = /^(http|https)$/.test(id) || (global.ENV === 'liveview');

  if (isRemote){
    return this._getRemoteSource(null,10000);
  } else {
    if (id === 'app') { id = '_app'; }
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, id + '.js');
    return (file.read()||{}).text;
  }
};

/**
 * wrap module source text in commonjs anon function wrapper
 *
 * @param  {String} script
 * @return {String}
 * @api private
 */

Module._wrap = function(source) {
  source = source.replace(/T[i||itanium]+.include\([\'|\"]([^\"\'\r\n$]*)[\'|\"]\)/g, function(exp, val) {
    var file = ('' + val).replace('.js', '');
    var _src = Module.prototype._getRemoteSource(file,10000);
    var evalSrc = '' +
        'try{ ' +
          _src.replace(/\/\/(.*)$/gm, '').replace(/\n/g, '') +
        '}catch(err){ ' +
          'lvGlobal.process.emit("uncaughtException", {module: "' + val + '", error: err})' +
        '}';

    return evalSrc;
  });
  return (global.CATCH_ERRORS) ? Module._errWrapper[0] + source + Module._errWrapper[1] : source;
};

// uncaught exception handler wrapper

Module._errWrapper = [
  'try {',
  '} catch (err) { lvGlobal.process.emit("uncaughtException", {module: __filename, error: err, source: module.source})}'
];

/**
 * compile commonjs module and string to js
 *
 * @api private
 */

Module.prototype._compile = function() {
  var src = this._getSource();
  if (!src) {
    this.exports = Module._requireNative(this.id);
    this.loaded = true;
    return;
  }
  this.source = Module._wrap(src);
  try{
    var fn = Function('exports, require, module, __filename, __dirname, lvGlobal',this.source);
    fn(this.exports, Module.require, this, this.filename, this.__dirname, global);
  } catch(err) {
    process.emit("uncaughtException", {module: this.id, error: err, source: ('' + this.source).split('\n')});
  }

  this.loaded = true;
};

/**
 * cache current module
 *
 * @api public
 */

Module.prototype.cache = function() {
  this.timestamp = (new Date()).getTime();
  Module._cache[this.id] = this;
};

/**
 * [ description]
 * @param  {[type]} [description]
 * @return {[type]} [description]
 */

  process.on('uncaughtException', function (err) {
    console.log('[LiveView] Error Evaluating', err.module, '@ Line:', err.error.line);
    // console.error('Line ' + err.error.line, ':', err.source[err.error.line]);
    console.error('' + err.error);
    console.error('File:', err.module);
    console.error('Line:', err.error.line);
    console.error('SourceId:', err.error.sourceId);
    console.error('Backtrace:\n', ('' + err.error.backtrace).replace(/'\n'/g, '\n'));
  });

  Module.patch(globalScope);

  // Prevent display from sleeping

  Titanium.App.idleTimerDisabled = true;

})(this);
