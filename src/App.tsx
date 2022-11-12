import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Preloader } from './components/common/Preloader';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { auth, selectAuth } from './store/authSlice';

function App() {

  const [loading, setLoading] = useState(true); // show Preloader

  const isAuth = useAppSelector(selectAuth); // show LoginForm or UserList
  
  const dispatch = useAppDispatch();

  const authorize = useCallback(async () => {
      await dispatch(auth());
      setLoading(false);
  }, [dispatch])

  useEffect(() => {
    authorize();
  }, [authorize]);

  if (loading) return <Preloader/>
  
  return (
    <div>
      <Routes>
        { isAuth ? 
          <Route path="/" element={<MainPage />} />
          :
          <Route path="/" element={<LoginPage />} />          
        }
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
