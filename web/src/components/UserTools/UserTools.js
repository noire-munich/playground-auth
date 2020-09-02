import { useCallback, useReducer, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

const Auth0 = () => {
  const [data, record] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {}
  )
  const [error, setError] = useState()
  const [message, setMessage] = useState()

  const {
    loading,
    logIn,
    logOut,
    signUp,
    isAuthenticated,
    userMetadata,
    currentUser,
    type,
  } = useAuth()

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      // Put whatever logic one needs here to check the data.
      // logic...
      // Then do the signUp.
      signUp(data)
        .then(setMessage)
        .catch(({ message }) => setError(message))
    },
    [signUp, data]
  )

  if (loading) {
    return 'Loading...'
  }

  return (
    <>
      <h2>{type}</h2>
      {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}{' '}
      <button
        onClick={() => {
          isAuthenticated ? logOut() : logIn()
        }}
      >
        {isAuthenticated ? 'Log Out' : 'Log In'}
      </button>
      <br />
      <code>
        userMetaData:
        <br />
        {JSON.stringify(userMetadata, 2)}
      </code>
      <br />
      <code>
        currentUser:
        <br />
        {JSON.stringify(currentUser, 2)}
      </code>
      <br />
      <form onSubmit={onSubmit} action={'#'}>
        {error && <p>Error: {error}</p>}
        {message && <p>Message: {message}</p>}
        <label htmlFor={`${type}__email`}>Email</label>
        <input
          id={`${type}__email`}
          name={'email'}
          onChange={({ currentTarget: { value } }) => record({ email: value })}
        />
        <label htmlFor={`${type}__password`}>Password</label>
        <input
          type={'password'}
          id={`${type}__password`}
          name={'password'}
          placeholder={'password'}
          onChange={({ currentTarget: { value } }) =>
            record({ password: value })
          }
        />
        <button type={'submit'}>Sign Up</button>
      </form>
    </>
  )
}

export default Auth0
