import { useState, useEffect } from 'react'
import { getSession, DRUPAL_SESSION_KEY } from '../utils'

const DrupalAuthenticationProvider = ({
  children,
  onChange = () => {},
  onInit = () => {},
  sessionStorageKey = DRUPAL_SESSION_KEY,
}) => {
  const [jwt, setJWT] = useState(getSession(sessionStorageKey))

  useEffect(() => {
    onInit(jwt)
  }, [onInit])

  const checkForSessionStorageData = () => {
    const session = getSession(sessionStorageKey)
    if (jwt !== session) {
      setJWT(session)
      onChange(session)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', checkForSessionStorageData)

    return () => {
      window.removeEventListener('storage', checkForSessionStorageData)
    }
  })

  return typeof children === 'function' ? children({ jwt }) : null
}

export default DrupalAuthenticationProvider