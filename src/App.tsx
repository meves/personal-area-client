import React from 'react';
import { useAppSelector } from './app/hooks';
import { LoginForm } from './components/LoginForm';
import { UserList } from './components/UserList';
import { selectAuth, selectRegistered } from './store/authSlice';

function App() {

  const auth = useAppSelector(selectAuth)
  const registered = useAppSelector(selectRegistered)

  return (
    <div>
      { auth ? 
        <UserList /> :
        <LoginForm registered={registered} />
      } 
    </div>
  );
}

export default App;
