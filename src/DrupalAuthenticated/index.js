import { useState, useEffect } from 'react'
import { getSession, DRUPAL_SESSION_KEY } from '../utils'

export default ({
  children,
  onAnonymous,
  sessionStorageKey = DRUPAL_SESSION_KEY,
}) => {
  const [jwt, setJWT] = useState(null)

  const checkForSessionStorageData = () => {
    const session = getSession(sessionStorageKey)
    if (session) {
      setJWT(session)
    } else {
      onAnonymous()
    }
  }

  useEffect(() => {
    window.addEventListener('storage', checkForSessionStorageData)

    return () => {
      window.removeEventListener('storage', checkForSessionStorageData)
    }
  })

  useEffect(() => {
    if (jwt === null) { checkForSessionStorageData() }
  })

  return ((jwt && typeof children === 'function') ? children({ jwt }) : null)
}