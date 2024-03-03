import {createContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [scannedPatientsData, setScannedPatientsData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [updateBillRes, setUpdateBillRes] = useState([]);
  const [billHistoryArray, setBillHistoryArray] = useState([]);
  const [patientEditArray, setPatientEditArray] = useState([]);
  const [surveyArray, setSurveyArray] = useState([]);
  const [admittedList, setAdmittedList] = useState([]);
  const [opdServices, setOpdServices] = useState([]);
  const [selectCategory, setSelectedCategory] = useState([]);
  const [selectserviceCategory, setSelectedServiceCategory] = useState([]);

  const updateSharedData = data => {
    setPatientEditArray(prevData => [...prevData, data]);
  };
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
    patientEditArray,
    setPatientEditArray,
    surveyArray,
    setSurveyArray,
    updateSharedData,
    admittedList,
    setAdmittedList,
    opdServices,
    setOpdServices,
    selectCategory,
    setSelectedCategory,
    selectserviceCategory,
    setSelectedServiceCategory,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
