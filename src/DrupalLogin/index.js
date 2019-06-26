import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { User } from 'drupal-jsonapi-client'
import DrupalAuthenticationProvider from '../DrupalAuthenticationProvider'
import { saveSession, DRUPAL_SESSION_KEY } from '../utils'

export default ({
  onAuthenticationInit,
  onAuthenticationChange,
  onLogin = async (username, password) => ({}),
  onCreateSession = async (user, session) => session,
  expireAfterMinutes = 60,
  usernameLabel = 'Username',
  passwordLabel = 'Password',
  buttonLabel = 'Login',
}) => {
  return (
    <DrupalAuthenticationProvider onChange={onAuthenticationChange} onInit={onAuthenticationInit}>
      {({ jwt }) => !jwt ? (
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async ({ username, password }, { setSubmitting, setStatus }) => {
            try {
              const user = await onLogin(username, password)
              const session = await onCreateSession(user, { jwt: user.access_token })
              saveSession(session, DRUPAL_SESSION_KEY, expireAfterMinutes)
              setSubmitting(false)
            } catch (err) {
              try {
                setStatus(err.response.data.message)
              } catch (err) {
                setStatus('Unexpected error.')
              }
              setSubmitting(false)
            }
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required')
          })}
          >
          {props => {
            const {
              values,
              touched,
              errors,
              status,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            } = props

            return (
              <form className="drupal-login" onSubmit={handleSubmit}>
                {status && <div className="drupal-login__status">{status}</div>}
                <div className="drupal-login__field drupal-login__field--username">
                  <label htmlFor="drupal-login-username">{usernameLabel}</label>
                  <input
                    id="drupal-login-username"
                    name="username"
                    type="text"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div>
                {errors.username && touched.username && (
                  <div className="drupal-login__error drupal-login__error--username">
                    {errors.username}
                  </div>
                )}
                <div className="drupal-login__field drupal-login__field--password">
                  <label htmlFor="drupal-login-password">{passwordLabel}</label>
                  <input
                    id="drupal-login-password"
                    name="password"
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div>
                {errors.password && touched.password && (
                  <div className="drupal-login__error drupal-login__error--password">
                    {errors.password}
                  </div>
                )}
                <button
                  className="drupal-login__submit"
                  type="submit"
                  disabled={isSubmitting}>
                  {buttonLabel}
                </button>
              </form>
            )
          }}
        </Formik>
      ) : null}
    </DrupalAuthenticationProvider>
  )
}