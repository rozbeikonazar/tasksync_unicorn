import React, { useContext } from 'react'
import { UserContext } from '../utils/contexts/UserContext'
import { Link } from 'react-router-dom'
import { LogoutButton } from './LogoutButton'

export function Navbar() {
   const { isLoggedIn, displayName } = useContext(UserContext)

   return (
      <nav className='bg-gray-50 border-b border-black/20'>
         <div className='flex justify-between items-center px-6 py-2'>
            <Link className='text-2xl font-medium lhover:underline' to='/'>
               Home
            </Link>
            <div className=''>
               {isLoggedIn ? (
                  <div className='flex items-center gap-3'>
                     <span className=''>Hello, {displayName}!</span>
                     <LogoutButton />
                  </div>
               ) : (
                  <div className='flex gap-2'>
                     <button className='text-xl py-1 px-2 rounded-lg bg-blue-500 text-white'>
                        <Link to='/login'>Login</Link>
                     </button>
                     <button className='text-xl py-1 px-2 rounded-lg bg-blue-500 text-white'>
                        <Link to='/registration'>Register</Link>
                     </button>
                  </div>
               )}
            </div>
         </div>
      </nav>
   )
}
