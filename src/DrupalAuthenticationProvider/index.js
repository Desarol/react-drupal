import { useState, useEffect } from 'react'
import { getSession, DRUPAL_SESSION_KEY } from '../utils'

const DrupalAuthenticationProvider = ({
  children,
  onChange = () => {},
  onInit = () => {},
  sessionStorageKey = DRUPAL_SESSION_KEY,
}) => {
  const [session, setSession] = useState(getSession(sessionStorageKey))

  useEffect(() => {
    onInit(session)
  }, [onInit])

  const checkForSessionStorageData = () => {
    const nextSession = getSession(sessionStorageKey)
    if (session !== nextSession) {
      setSession(nextSession)
      onChange(nextSession)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', checkForSessionStorageData)

    return () => {
      window.removeEventListener('storage', checkForSessionStorageData)
    }
  })

  return typeof children === 'function' ? children(session) : null
}

export default DrupalAuthenticationProvider