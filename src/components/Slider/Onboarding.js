import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserContext from '../Context/Context';
import axios from 'axios';
import api from '../../../api.json';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../images/slider1.png'),
    subtitle: 'Consult with MedAyu doctors in 15 mins.',
  },
  {
    id: '2',
    image: require('../../images/slider2.png'),
    subtitle: 'Lab test at Home, starting at 199 rs',
  },
  {
    id: '3',
    image: require('../../images/slider3.png'),
    subtitle: 'Medicine delivery in 2 hours*',
  },
];

const Slide = ({item}) => {
  return (
    <View style={[styles.container, {width, marginBottom: 0}]}>
      <Image
        source={item?.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const Onboarding = () => {
  const {setUserData, isLoggedIn, setIsLoggedIn} = useContext(UserContext);

  const [username, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const _navigationTabs = tabs => {
    if (tabs.role === 'Doctor') {
      navigation.navigate('Tabs');
    } else if (tabs.role === 'Receptionist') {
      navigation.navigate('Home');
    } else if (tabs.role === 'PExecutive') {
      navigation.navigate('PExecutiveHome');
    } else if (tabs.role === 'Nurse') {
      navigation.navigate('NurseHome');
    } else if (tabs.role === 'Attendant') {
      navigation.navigate('AttendantHome');
    } else if (tabs.role === 'Security') {
      navigation.navigate('SecurityHome');
    } else if (tabs.role === 'Kitchen') {
      navigation.navigate('KitchenHome');
    } else if (tabs.role === 'HouseKeeping') {
      navigation.navigate('HouseKeepingHome');
    } else if (tabs.role === 'Pharmacy') {
      navigation.navigate('PharmacyHome');
    } else if (tabs.role === 'HR') {
      navigation.navigate('HRHome');
    } else {
      return;
    }
  };
  //
  useEffect(() => {
    const checkUserSignIn = async () => {
      const userToken = await AsyncStorage?.getItem('userToken');
      if (userToken !== null) {
        const userData = JSON.parse(userToken);
        setIsLoggedIn(true);
        // Extracting hospital _id from the response
        const USERDATA = userData.res;
        setUserData(USERDATA);
        _navigationTabs(USERDATA);
      }
    };

    checkUserSignIn();
  }, [isLoggedIn, setIsLoggedIn, navigation]);

  const loginHandler = async () => {
    try {
      const response = await axios.post(`${api.baseurl}/login`, {
        username: username,
        password: password,
      });

      const res = response.data;
      console.log('res data : ', res.data[0]);
      if (res.status === true) {
        ToastAndroid.show(`${res.message}`, ToastAndroid.SHORT);
        await AsyncStorage?.setItem(
          'userToken',
          JSON.stringify({res: res?.data[0]}),
        );
        setIsLoggedIn(true);
        setUserData(res.data[0]);
        setMobilenumber('');
        setPassword('');

        const _resData = res.data[0];
        _navigationTabs(_resData);
      } else {
        ToastAndroid.show(`${res.message}`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //
  const handleContinue = async () => {
    if (username === '' || username.length < 10) {
      ToastAndroid.show(
        'Mobile Number should be 10 Digits',
        ToastAndroid.SHORT,
      );
    } else if (password === '') {
      ToastAndroid.show('Password Is Required', ToastAndroid.SHORT);
    } else {
      await loginHandler();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Text
        style={{
          color: '#0a0a0a',
          fontWeight: '600',
          textAlign: 'center',
          marginVertical: 30,
        }}>
        SignIn / SignUp
      </Text>
      <TextInput
        style={styles.mobileInput}
        placeholder="Enter Mobile Number"
        value={username}
        onChangeText={text => setMobilenumber(text)}
        autoComplete="off"
        keyboardType="numeric"
        textAlign="center"
        maxLength={10}
      />
      <TextInput
        style={styles.mobileInput}
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
        autoComplete="off"
        textAlign="center"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={{color: '#ffffff'}}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: 'blue',
    fontSize: 13,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 20,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    width: 300,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F28500',
    padding: 10,
    width: 300,
    marginBottom: 80,
    borderRadius: 5,
  },
});

export default Onboarding;
