/**
 * Retrieves an item from local storage.
 * 
 * You can specify whether or not to respect the expiration.
 * 
 * @param {string} key 
 * @param {boolean} respectExpiration 
 */
export const getLocalStorage = (key, respectExpiration = true) => {
  if (
    typeof key !== 'string' ||
    typeof respectExpiration !== 'boolean'
  ) {
    throw new Error('Invalid arguments. Key must be a string, respectExpiration must be a boolean')
  }

  try {
    const item = JSON.parse(window.localStorage.getItem(key))
    if (
      respectExpiration === true &&
      item.expiration !== -1 &&
      item.expiration <= Date.now()
    ) {
      return null
    }
    return item.object
  } catch (err) {
    return null
  }
}

/**
 * Set a local storage item.
 * 
 * The item will expire after the specified
 * @param {string} key 
 * @param {object} object 
 * @param {number} expiration 
 */
export const setLocalStorage = (key, object, expiration = -1) => {
  if (
    typeof object !== 'object' ||
    typeof key !== 'string' ||
    typeof expiration !== 'number'
  ) {
    throw new Error('Invalid arguments. Key must be a string, object must be an object, expiration must be a number')
  }

  window.localStorage.setItem(key, JSON.stringify({
    expiration,
    object,
  }))
  // We have to trigger a custom storage event because
  // browsers don't dispatch a StorageEvent when the
  // modification happens within the same window.
  window.dispatchEvent(new StorageEvent('storage'))
}

export const DRUPAL_SESSION_KEY = 'drupal.session'

/**
 * Save a JWT in local storage.
 * 
 * @param {string} jwt
 * @param {number} expireAfterMinutes default = 60
 */
export const saveSession = (jwt, key = DRUPAL_SESSION_KEY, expireAfterMinutes = 60) => {
  const expireAfterMs = (expireAfterMinutes * 60 * 1000)
  setLocalStorage(key, { jwt }, Date.now() + expireAfterMs)
}

/**
 * Get the current JWT from local storage.
 * 
 * @returns jwt or null
 */
export const getSession = (key = DRUPAL_SESSION_KEY) => {
  const session = getLocalStorage(key)
  if (session) {
    return session.jwt
  }
  return null
}