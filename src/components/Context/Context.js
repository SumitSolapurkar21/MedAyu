import {createContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [scannedPatientsData, setScannedPatientsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const contextValue = {
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
    patientsData,
    setPatientsData,
    scannedPatientsData,
    setScannedPatientsData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
