import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { User } from 'drupal-jsonapi-client'
import DrupalAuthenticationProvider from '../DrupalAuthenticationProvider'
import { saveSession, DRUPAL_SESSION_KEY } from '../utils'

export default ({
  onAuthenticationInit,
  onAuthenticationChange,
  onCreateSession = async (user, session) => session,
  expireAfterMinutes = 60,
  usernameLabel = 'Username',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  buttonLabel = 'Register'
}) => {
  return (
    <DrupalAuthenticationProvider onChange={onAuthenticationChange} onInit={onAuthenticationInit}>
      {({ jwt }) => !jwt ? (
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={async ({ email, username, password }, { setSubmitting, setStatus }) => {
            try {
              await User.Register(email, username, password)
              const user = await User.Login(username, password)
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
            email: Yup.string().email().required('Required'),
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
              <form className="drupal-register" onSubmit={handleSubmit}>
                {status && <div className="drupal-register__status">{status}</div>}
                <div className="drupal-register__field drupal-register__field--email">
                  <label htmlFor="drupal-register-email">{emailLabel}</label>
                  <input
                    id="drupal-register-email"
                    name="email"
                    type="text"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div>
                {errors.email && touched.email && (
                  <div className="drupal-register__error drupal-register__error--email">
                    {errors.email}
                  </div>
                )}
                <div className="drupal-register__field drupal-register__field--username">
                  <label htmlFor="drupal-register-username">{usernameLabel}</label>
                  <input
                    id="drupal-register-username"
                    name="username"
                    type="text"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div>
                {errors.username && touched.username && (
                  <div className="drupal-register__error drupal-register__error--username">
                    {errors.username}
                  </div>
                )}
                <div className="drupal-register__field drupal-register__field--password">
                  <label htmlFor="drupal-register-password">{passwordLabel}</label>
                  <input
                    id="drupal-register-password"
                    name="password"
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div>
                {errors.password && touched.password && (
                  <div className="drupal-register__error drupal-register__error--password">
                    {errors.password}
                  </div>
                )}
                <button
                  className="drupal-register__submit"
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