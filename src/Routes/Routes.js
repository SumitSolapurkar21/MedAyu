import {Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Patients/Login';
import Otp from '../screens/Patients/Otp';
import DoctorList from '../screens/Patients/DoctorList';
import TimeSlot from '../screens/Patients/TimeSlot';
import Ehome from '../screens/Employee/Ehome';
import EpatientRegistration from '../screens/Employee/EpatientRegistration';
import Scanner from '../components/Scanner/Scanner';
import EpatientDetails from '../screens/Employee/EpatientDetails';
import Eappointment from '../screens/Employee/Eappointment';
import DateTimeAppointment from '../components/DateTimeAppointment';
import EipregistrationProfile from '../screens/Employee/EipregistrationForm/EipregistrationProfile';
import EipdregistrationSocioeconomics from '../screens/Employee/EipregistrationForm/EipdregistrationSocioeconomics';
import EipdregistrationIdentification from '../screens/Employee/EipregistrationForm/EipdregistrationIdentification';
import EipdregistrationInsurance from '../screens/Employee/EipregistrationForm/EipdregistrationInsurance';
import EipdregistrationEmergencyContact from '../screens/Employee/EipregistrationForm/EipdregistrationEmergencyContact';
import Edepartment from '../screens/Employee/Edepartment';
import Edoctors from '../screens/Employee/Edoctors';
import BillLayout from '../screens/Employee/Bill/BillLayout';
import BillHistory from '../screens/Employee/Bill/BillHistory';
import Pdf from '../components/Pdf/Pdf';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import UserContext from '../components/Context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BillAddItems from '../screens/Employee/Bill/BillAddItems';
import BillEditItems from '../screens/Employee/Bill/BillEditItems';
import Eipdoptions from '../screens/Employee/Eipdoptions';
import Epatientvital from '../screens/Employee/Epatientvital';
import Signature from '../components/Signature/Signature';
import Epatientconsentform from '../screens/Employee/EipregistrationForm/Epatientconsentform';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const {setIsLoggedIn} = useContext(UserContext);
  const logoutHandler = async () => {
    // Clear user token from AsyncStorage
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };
  return (
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
          options={() => ({
            title: 'Patient Details',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
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
                  navigation.navigate('LoginPage'), logoutHandler();
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
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationSocioeconomics"
          component={EipdregistrationSocioeconomics}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationIdentification"
          component={EipdregistrationIdentification}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationInsurance"
          component={EipdregistrationInsurance}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="EipdregistrationEmergencyContact"
          component={EipdregistrationEmergencyContact}
          options={() => ({
            title: 'IPD',
            headerRight: () => (
              <>
                <FontAwesome6
                  name="location-dot"
                  color="#127359"
                  size={18}
                  marginRight={6}
                />
                <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
                  Nagpur
                </Text>
              </>
            ),
            headerTitleStyle: {fontSize: 16},
          })}
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
                  navigation.navigate('LoginPage'), logoutHandler();
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
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="BillAddItems"
          component={BillAddItems}
          options={({navigation}) => ({
            title: 'Add Items to Sale',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="BillEditItems"
          component={BillEditItems}
          options={({navigation}) => ({
            title: 'Edit Items',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
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
        <Stack.Screen
          name="Eipdoptions"
          component={Eipdoptions}
          options={({navigation}) => ({
            title: 'Select IPD Option',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Epatientvital"
          component={Epatientvital}
          options={({navigation}) => ({
            title: 'Add Vitals',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Signature"
          component={Signature}
          options={({navigation}) => ({
            title: 'Add Signature',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
        <Stack.Screen
          name="Epatientconsentform"
          component={Epatientconsentform}
          options={({navigation}) => ({
            title: 'Consent Form',
            headerRight: () => (
              <FontAwesome
                name="sign-out"
                size={22}
                color="#127359"
                style={{marginLeft: 20}}
                onPress={() => {
                  navigation.navigate('LoginPage'), logoutHandler();
                }}
              />
            ),

            headerTitleStyle: {fontSize: 16},
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
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

export default Routes;
