import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAlert from '../utils/hooks/useAlert'

export function RegistrationForm() {
   const navigate = useNavigate()
   const { setAlert } = useAlert()

   const [registrationData, setRegistrationData] = useState({
      username: '',
      password: '',
      display_name: '',
   })
   const [nameError, setNameError] = useState('')
   const [usernameError, setUsernameError] = useState('')
   const [passwordError, setPasswordError] = useState('')
   const [error, setError] = useState('')

   const handleSubmit = async event => {
      event.preventDefault()
      setNameError('')
      setUsernameError('')
      setPasswordError('')
      setError('')
      if (!registrationData.display_name) {
         setNameError('Please enter a name')
         return
      }
      if (!registrationData.username || registrationData.username.length < 5) {
         setUsernameError('Username is too short')
         return
      }
      if (!registrationData.password || registrationData.password.length < 8) {
         setPasswordError('Password is too short')
         return
      }

      try {
         const response = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(registrationData),
         })
         if (response.ok) {
            setAlert('Registration success!', 'success')
            navigate('/login')
         } else {
            setError('Registration failed')
            console.log(data.message)
         }
      } catch (error) {
         console.error('Network error')
      }
   }

   return (
      <div className='flex justify-center'>
         <div className='border border-black p-5 rounded-lg'>
            <p className='text-xl font-medium'>Register</p>

            <form onSubmit={handleSubmit}>
               <div className='relative'>
                  <input
                     type='text'
                     id='name'
                     value={registrationData.display_name}
                     onChange={e =>
                        setRegistrationData(currentRegistrationData => ({
                           ...currentRegistrationData,
                           display_name: e.target.value,
                        }))
                     }
                     placeholder='Name:'
                     className='border border-black/60 rounded px-1 text-lg mt-6'
                  />
                  <label className='text-red-400 text-sm absolute top-0.5 left-0'>{nameError}</label>
               </div>

               <div className='relative'>
                  <input
                     type='text'
                     id='username'
                     value={registrationData.username}
                     onChange={e =>
                        setRegistrationData(currentRegistrationData => ({
                           ...currentRegistrationData,
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
                     id='password'
                     value={registrationData.password}
                     onChange={e =>
                        setRegistrationData(currentRegistrationData => ({
                           ...currentRegistrationData,
                           password: e.target.value,
                        }))
                     }
                     placeholder='Password:'
                     className='border border-black/60 rounded px-1 text-lg mt-6'
                  />
                  <label className='text-red-400 text-sm absolute top-0.5 left-0'>{passwordError}</label>
               </div>

               <button type='submit' className='text-xl py-1 px-2 rounded-lg bg-green-500 text-white mt-3'>
                  Register
               </button>
            </form>
            {error && <label className='text-red-400 text-lg text-center'>{error}</label>}  
         </div>
      </div>
   )
}
