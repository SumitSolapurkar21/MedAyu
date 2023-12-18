import {createContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [scannedPatientsData, setScannedPatientsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateBillRes, setUpdateBillRes] = useState([]);
  const [billHistoryArray, setBillHistoryArray] = useState([]);

  const contextValue = {
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
    patientsData,
    setPatientsData,
    scannedPatientsData,
    setScannedPatientsData,
    updateBillRes,
    setUpdateBillRes,
    billHistoryArray,
    setBillHistoryArray,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
