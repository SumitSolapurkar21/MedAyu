import React, {useState, useContext, useRef} from 'react';

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
  Animated,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

import UserContext from '../Context/Context';
import axios from 'axios';
import api from '../../../api.json';
import Geolocation from '../Geolocation/Geolocation';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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
  const {setUserData} = useContext(UserContext);

  const [username, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // const fadeIn = message => {
  //   setMessage(message);

  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setTimeout(fadeOut, 1000);
  //   });
  // };

  // const fadeOut = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const handleContinue = async () => {
    if (username === '' || username.length < 10) {
      // fadeIn('Mobile Number should be 10 Digits');
      ToastAndroid.show(
        'Mobile Number should be 10 Digits',
        ToastAndroid.SHORT,
      );
    } else if (password === '') {
      // fadeIn('Password Is Required');
      ToastAndroid.show('Password Is Required', ToastAndroid.SHORT);
    } else {
      await loginHandler();
    }
  };

  const loginHandler = async () => {
    try {
      await axios
        .post(`${api.baseurl}/login`, {
          username: username,
          password: password,
        })
        .then(response => {
          const res = response.data;
          if (res.status === true) {
            // fadeIn(`${res.message}`);
            ToastAndroid.show(`${res.message}`, ToastAndroid.SHORT);
            navigation.navigate('Ehome');
            setMobilenumber('');
            setPassword('');
          } else {
            ToastAndroid.show(`${res.message}`, ToastAndroid.SHORT);
          }
          setUserData(res);
        });
    } catch (error) {
      console.error(error);
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
      {/* <Footer /> */}
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
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={{color: '#ffffff'}}>CONTINUE</Text>
      </TouchableOpacity>
      {/* <Geolocation /> */}
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F28500',
    padding: 10,
    width: 300,
    marginBottom: 80,
    borderRadius: 5,
  },
  fadingContainer: {
    width: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginVertical: 18,
    borderRadius: 20,
    padding: 10,
  },
  fadingText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  toastDiv: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
});
export default Onboarding;
