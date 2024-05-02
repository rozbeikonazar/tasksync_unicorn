import { useState, useEffect} from 'react'
import './App.css'
import './index.css'
import { MainPage } from './components/MainPage'
import { UserContext } from './utils/contexts/UserContext'
import { Outlet } from 'react-router-dom'

function App() {
  // Load user data from local storage on initial render
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : { id: 0, username: '', displayName: '', isLoggedIn: false };
  });

  // Update local storage when userData changes
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{
      ...userData, 
      setUserData
    }}>
          <div>
      <MainPage/>
      <Outlet/>
    </div>
    </UserContext.Provider>
  )
}

export default App
