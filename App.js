import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {UserProvider} from './src/components/Context/Context';
import Routes from './src/Routes/Routes';
import {PaperProvider} from 'react-native-paper';

function App() {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <PaperProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </PaperProvider>
    </>
  );
}

export default App;
