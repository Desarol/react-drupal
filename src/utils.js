let expireTimeout
let earliestExpiration = Number.MAX_SAFE_INTEGER
let trackedItems = []
const clearExpiredItems = () => {
  const newTrackedItems = []
  let didDeleteItems = false
  // Find all tracked storage
  trackedItems.forEach(({ key, expiration }) => {
    try {
      if (expiration <= Date.now()) {
        // Delete item
        window.localStorage.setItem(key, null)
        didDeleteItems = true
      } else {
        newTrackedItems.push(key)
      }
    } catch (err) {}
  })
  trackedItems = newTrackedItems

  if (didDeleteItems) {
    // Notify storage listeners
    window.dispatchEvent(new StorageEvent('storage'))
  }

  if (trackedItems.length > 0) {
    setNextExpiration(trackedItems.sort((a, b) => b.expiration - a.expiration)[0].expiration)
  }
}
const setNextExpiration = (expiration) => {
  if (
    expiration !== -1 &&
    expiration < earliestExpiration
  ) {
    earliestExpiration = expiration
    clearTimeout(expireTimeout)
    expireTimeout = setTimeout(clearExpiredItems, earliestExpiration - Date.now())
  }
}

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
    trackedItems = [...trackedItems.filter(item => item.key === key), { key, expiration: item.expiration }]
    if (item.expiration !== -1) {
      setNextExpiration(item.expiration)

      if (item.expiration <= Date.now() && respectExpiration) {
        return null
      }
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
  trackedItems = [...trackedItems.filter(item => item.key === key), { key, expiration }]

  window.localStorage.setItem(key, JSON.stringify({
    expiration,
    object,
  }))
  // We have to trigger a custom storage event because
  // browsers don't dispatch a StorageEvent when the
  // modification happens within the same window.
  window.dispatchEvent(new StorageEvent('storage'))
  setNextExpiration(expiration)
}

export const DRUPAL_SESSION_KEY = 'drupal.session'

/**
 * Save a session in local storage.
 * 
 * @param {object} session
 * @param {string} key
 * @param {number} expireAfterMinutes default = 60
 */
export const saveSession = (session, key = DRUPAL_SESSION_KEY, expireAfterMinutes = 60) => {
  const expireAfterMs = (expireAfterMinutes * 60 * 1000)
  setLocalStorage(key, session, Date.now() + expireAfterMs)
}

/**
 * Get the current session from local storage.
 *
 * @param {string} key
 * 
 * @returns session or null
 */
export const getSession = (key = DRUPAL_SESSION_KEY) => {
  const session = getLocalStorage(key)
  return (typeof session === 'object' && session !== null ? session : {})
}

/**
 * Clear a session.
 * 
 * @param {string} key
 */
export const clearSession = (key = DRUPAL_SESSION_KEY) => {
  setLocalStorage(key, null)
}