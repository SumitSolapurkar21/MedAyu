import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import SplashScreen from 'react-native-splash-screen';
import Login from './src/screens/Login';
import Otp from './src/screens/Otp';
import Home from './src/screens/Home';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Consult from './src/screens/Consult';
import Medicines from './src/screens/Medicines';
import Tests from './src/screens/Tests';
import HealthRecords from './src/screens/HealthRecords';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FFA500',
        inactiveTintColor: '#127359',
        labelStyle: {fontSize: 11, fontWeight: '600'},
      }}>
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
        name="Health Records"
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
