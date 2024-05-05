import { useContext, useState } from 'react'
import { UserContext } from '../utils/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import useAlert from '../utils/hooks/useAlert.js'

export function LoginForm() {
   const userContextData = useContext(UserContext)
   const navigate = useNavigate()
   const { setAlert } = useAlert()
   const [loginData, setLoginData] = useState({
      username: '',
      password: '',
   })
   const [usernameError, setUsernameError] = useState('')
   const [passwordError, setPasswordError] = useState('')
   const [error, setError] = useState('')

   const handleSubmit = async event => {
      event.preventDefault()
      // Reset error messages
      setUsernameError('')
      setPasswordError('')
      setError('')

      if (!loginData.username || loginData.username.length < 5) {
         setUsernameError('Username is too short')
         return
      }

      if (!loginData.password || loginData.password.length < 8) {
         setPasswordError('Password is too short')
         return
      }

      try {
         const response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
         })
         if (response.ok) {
            const data = await response.json()
            userContextData.setUserData(currentState => ({
               ...currentState,
               id: data.user._id,
               displayName: data.user.display_name,
               username: data.user.username,
               isLoggedIn: true,
            }))
            setAlert('Login success!', 'success')
            navigate('/')
         } else {
            setError('Invalid username or password')
         }
      } catch (err) {
         setAlert('Error occured while loging in, Please try again', 'error')
      }
   }

   return (
      <div className='flex justify-center'>
         <div className='border border-black p-5 rounded-lg'>
            <p className='text-xl font-medium'>Login</p>
            <form onSubmit={handleSubmit}>
               <div className='relative'>
                  <input
                     type='text'
                     value={loginData.username}
                     onChange={e =>
                        setLoginData(currentLoginData => ({
                           ...currentLoginData,
                           username: e.target.value,
                        }))
                     }
                     placeholder='Username:'
                     className='border border-black/60 rounded px-1 text-lg mt-6'
                  />
                  <label className='text-red-400 text-sm absolute top-0.5 left-0'>{usernameError}</label>
               </div>
               <div className='relative'>
                  <input
                     type='password'
                     value={loginData.password}
                     onChange={e =>
                        setLoginData(currentLoginData => ({
                           ...currentLoginData,
                           password: e.target.value,
                        }))
                     }
                     placeholder='Password:'
                     className='border border-black/60 rounded px-1 text-lg mt-6'
                  />
                  <label className='text-red-400 text-sm absolute top-0.5 left-0'>{passwordError}</label>
               </div>
               <button type='submit' className='text-xl py-1 px-2 rounded-lg bg-green-500 text-white mt-3'>
                  Continue
               </button>
            </form>
            {error && <label className='text-red-400 text-lg text-center'>{error}</label>}
         </div>
      </div>
   )
}
