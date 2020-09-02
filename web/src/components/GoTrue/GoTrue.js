import { AuthProvider } from '@redwoodjs/auth'
import GoTrue from 'gotrue-js'

const goTrueClient = new GoTrue({
  APIUrl: 'https://MYAPP.netlify.app/.netlify/identity',
  setCookie: true,
})

export default (props) => {
  return <AuthProvider client={goTrueClient} type="goTrue" {...props} />
}
