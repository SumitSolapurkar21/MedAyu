import React, {useEffect, useContext} from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import SplashScreen from 'react-native-splash-screen';
import Login from './src/screens/Patients/Login';
import Otp from './src/screens/Patients/Otp';
import Home from './src/screens/Patients/Home';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Consult from './src/screens/Patients/Consult';
import Medicines from './src/screens/Patients/Medicines';
import Tests from './src/screens/Patients/Tests';
import HealthRecords from './src/screens/Patients/HealthRecords';
import DoctorList from './src/screens/Patients/DoctorList';
import TimeSlot from './src/screens/Patients/TimeSlot';
import UserContext, {UserProvider} from './src/components/Context/Context';
import Ehome from './src/screens/Employee/Ehome';
import EpatientRegistration from './src/screens/Employee/EpatientRegistration';
import Scanner from './src/components/Scanner/Scanner';
import EpatientDetails from './src/screens/Employee/EpatientDetails';
import DateTimeAppointment from './src/components/DateTimeAppointment';
import Eappointment from './src/screens/Employee/Eappointment';
import EipregistrationProfile from './src/screens/Employee/EipregistrationForm/EipregistrationProfile';
import EipdregistrationSocioeconomics from './src/screens/Employee/EipregistrationForm/EipdregistrationSocioeconomics';
import EipdregistrationIdentification from './src/screens/Employee/EipregistrationForm/EipdregistrationIdentification';
import EipdregistrationInsurance from './src/screens/Employee/EipregistrationForm/EipdregistrationInsurance';
import EipdregistrationEmergencyContact from './src/screens/Employee/EipregistrationForm/EipdregistrationEmergencyContact';
import Edepartment from './src/screens/Employee/Edepartment';
import Edoctors from './src/screens/Employee/Edoctors';
import BillLayout from './src/screens/Employee/Bill/BillLayout';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BillHistory from './src/screens/Employee/Bill/BillHistory';
import Pdf from './src/components/Pdf/Pdf';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  // const {setIsLoggedIn} = useContext(UserContext);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  // logouthandler....
  const logoutHandler = async () => {
    // Clear user token from AsyncStorage
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };
  return (
    <>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginPage"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OtpPage"
              component={Otp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DoctorList"
              component={DoctorList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TimeSlot"
              component={TimeSlot}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Ehome"
              component={Ehome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EpatientRegistration"
              component={EpatientRegistration}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QRScanner"
              component={Scanner}
              // options={{headerShown: true}}
            />
            <Stack.Screen
              name="EpatientDetails"
              component={EpatientDetails}
              options={({navigation}) => ({
                title: 'Patient Details',
                headerRight: () => (
                  <FontAwesome
                    name="sign-out"
                    size={22}
                    color="#127359"
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.navigate('LoginPage');
                      // , logoutHandler();
                    }}
                  />
                ),
                headerTitleStyle: {fontSize: 16},
              })}
            />
            <Stack.Screen
              name="Eappointment"
              component={Eappointment}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen
              name="Eipdregistration"
              component={Eipdregistration}
              options={{headerShown: false}}
            /> */}
            <Stack.Screen
              name="DTAppointment"
              component={DateTimeAppointment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EipdregistrationProfile"
              component={EipregistrationProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EipdregistrationSocioeconomics"
              component={EipdregistrationSocioeconomics}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EipdregistrationIdentification"
              component={EipdregistrationIdentification}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EipdregistrationInsurance"
              component={EipdregistrationInsurance}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EipdregistrationEmergencyContact"
              component={EipdregistrationEmergencyContact}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Edepartment"
              component={Edepartment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Edoctors"
              component={Edoctors}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BillLayout"
              component={BillLayout}
              options={({navigation}) => ({
                title: 'Patient Bill',
                headerRight: () => (
                  <FontAwesome
                    name="sign-out"
                    size={22}
                    color="#127359"
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.navigate('LoginPage');
                      // , logoutHandler();
                    }}
                  />
                ),
                headerTitleStyle: {fontSize: 16},
              })}
            />
            <Stack.Screen
              name="BillHistory"
              component={BillHistory}
              options={({navigation}) => ({
                title: 'Patient Bill History',
                headerRight: () => (
                  <FontAwesome
                    name="sign-out"
                    size={22}
                    color="#127359"
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.navigate('LoginPage');
                      // , logoutHandler();
                    }}
                  />
                ),
                headerTitleStyle: {fontSize: 16},
              })}
            />
            <Stack.Screen
              name="ExportPdf"
              component={Pdf}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#127359',
        tabBarLabelStyle: {fontSize: 11, fontWeight: '600'},
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome6
              name="house"
              color={focused ? '#FFA500' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Consult"
        component={Consult}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome6
              name="user-doctor"
              color={focused ? '#FFA500' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Medicines"
        component={Medicines}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome6
              name="capsules"
              color={focused ? '#FFA500' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tests"
        component={Tests}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome6
              name="microscope"
              color={focused ? '#FFA500' : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HealthRecords"
        component={HealthRecords}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome6
              name="table-list"
              color={focused ? '#FFA500' : color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default App;
