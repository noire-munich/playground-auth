import { AuthProvider, useAuth } from '@redwoodjs/auth'
import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init()

const NetlifyTools = () => {
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
      <button onClick={signUp}>Sign Up</button>
    </>
  )
}

export default (props) => {
  return (
    <AuthProvider client={netlifyIdentity} type="netlify" {...props}>
      <NetlifyTools />
    </AuthProvider>
  )
}
