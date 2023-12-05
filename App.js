import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {UserProvider} from './src/components/Context/Context';
import Routes from './src/Routes/Routes';

function App() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <UserProvider>
        <Routes />
      </UserProvider>
    </>
  );
}

export default App;
