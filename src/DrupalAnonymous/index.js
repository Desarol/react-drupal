import React, { useEffect } from 'react'
import { getSession, DRUPAL_SESSION_KEY } from '../utils'

export default ({
  children,
  onAuthenticated,
  sessionStorageKey = DRUPAL_SESSION_KEY,
}) => {
  const [jwt, setJWT] = useState('ASSUME_JWT')

  const checkForSessionStorageData = () => {
    const jwt = getSession(sessionStorageKey)
    if (jwt) {
      onAuthenticated(jwt)
    } else {
      setJWT(null)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', checkForSessionStorageData)

    return () => {
      window.removeEventListener('storage', checkForSessionStorageData)
    }
  })

  useEffect(() => {
    if (jwt !== null) { checkForSessionStorageData() }
  })

  return <>{children}</>
}