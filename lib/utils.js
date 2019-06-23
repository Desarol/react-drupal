'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var expireTimeout = void 0;
var earliestExpiration = Number.MAX_SAFE_INTEGER;
var trackedItems = [];
var clearExpiredItems = function clearExpiredItems() {
  var newTrackedItems = [];
  var didDeleteItems = false;
  // Find all tracked storage
  trackedItems.forEach(function (_ref) {
    var key = _ref.key,
        expiration = _ref.expiration;

    try {
      if (expiration <= Date.now()) {
        // Delete item
        window.localStorage.setItem(key, null);
        didDeleteItems = true;
      } else {
        newTrackedItems.push(key);
      }
    } catch (err) {}
  });
  trackedItems = newTrackedItems;

  if (didDeleteItems) {
    // Notify storage listeners
    window.dispatchEvent(new StorageEvent('storage'));
  }

  if (trackedItems.length > 0) {
    setNextExpiration(trackedItems.sort(function (a, b) {
      return b.expiration - a.expiration;
    })[0].expiration);
  }
};
var setNextExpiration = function setNextExpiration(expiration) {
  if (expiration !== -1 && expiration < earliestExpiration) {
    earliestExpiration = expiration;
    clearTimeout(expireTimeout);
    expireTimeout = setTimeout(clearExpiredItems, earliestExpiration - Date.now());
  }
};

/**
 * Retrieves an item from local storage.
 * 
 * You can specify whether or not to respect the expiration.
 * 
 * @param {string} key 
 * @param {boolean} respectExpiration 
 */
var getLocalStorage = exports.getLocalStorage = function getLocalStorage(key) {
  var respectExpiration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (typeof key !== 'string' || typeof respectExpiration !== 'boolean') {
    throw new Error('Invalid arguments. Key must be a string, respectExpiration must be a boolean');
  }

  try {
    var item = JSON.parse(window.localStorage.getItem(key));
    trackedItems = [].concat(trackedItems.filter(function (item) {
      return item.key === key;
    }), [{ key: key, expiration: item.expiration }]);
    if (item.expiration !== -1) {
      setNextExpiration(item.expiration);

      if (item.expiration <= Date.now() && respectExpiration) {
        return null;
      }
    }
    return item.object;
  } catch (err) {
    return null;
  }
};

/**
 * Set a local storage item.
 * 
 * The item will expire after the specified
 * @param {string} key 
 * @param {object} object 
 * @param {number} expiration 
 */
var setLocalStorage = exports.setLocalStorage = function setLocalStorage(key, object) {
  var expiration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object' || typeof key !== 'string' || typeof expiration !== 'number') {
    throw new Error('Invalid arguments. Key must be a string, object must be an object, expiration must be a number');
  }
  trackedItems = [].concat(trackedItems.filter(function (item) {
    return item.key === key;
  }), [{ key: key, expiration: expiration }]);

  window.localStorage.setItem(key, JSON.stringify({
    expiration: expiration,
    object: object
  }));
  // We have to trigger a custom storage event because
  // browsers don't dispatch a StorageEvent when the
  // modification happens within the same window.
  window.dispatchEvent(new StorageEvent('storage'));
  setNextExpiration(expiration);
};

var DRUPAL_SESSION_KEY = exports.DRUPAL_SESSION_KEY = 'drupal.session';

/**
 * Save a JWT in local storage.
 * 
 * @param {string} jwt
 * @param {string} key
 * @param {number} expireAfterMinutes default = 60
 */
var saveSession = exports.saveSession = function saveSession(jwt) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DRUPAL_SESSION_KEY;
  var expireAfterMinutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;

  var expireAfterMs = expireAfterMinutes * 60 * 1000;
  setLocalStorage(key, { jwt: jwt }, Date.now() + expireAfterMs);
};

/**
 * Get the current JWT from local storage.
 *
 * @param {string} key
 * 
 * @returns jwt or null
 */
var getSession = exports.getSession = function getSession() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DRUPAL_SESSION_KEY;

  var session = getLocalStorage(key);
  if (session) {
    return session.jwt;
  }
  return null;
};