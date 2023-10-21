import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

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
  const {setUserData} = useContext(UserContext);
  const [referal, setReferal] = useState('');

  const [username, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');

  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);

  const navigation = useNavigation();

  const referalHandler = e => {
    setReferal(e);
  };

  const handleContinue = async () => {
    if (username === '' || username.length < 10) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid mobile number with at least 10 digits.',
      );
    } else if (password === '') {
      Alert.alert('Password Is Required');
    } else {
      await loginHandler();
      setMobilenumber('');
      setPassword('');
    }
  };

  const loginHandler = async () => {
    try {
      await axios
        .post(`http://43.204.70.195:1107/login`, {
          username: username,
          password: password,
        })
        .then(response => {
          const res = response.data;
          if (res.status === true) {
            Alert.alert('Login Success');
            navigation.navigate('Ehome');
          } else {
            Alert.alert('Login Failed');
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
          color: 'black',
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
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
        // onPress={() => navigation.navigate('OtpPage')}
      >
        <Text style={{color: 'white'}}>CONTINUE</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.mobileInput}
        backgroundColor="#f2fbff"
        textAlign="center"
        placeholder="Enter Referral Code(Optional)"
        value={referal}
        onChangeText={e => referalHandler(e)}
        autoComplete="off"
        keyboardType="numeric"
        maxLength={10}
      />
      <View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected1}
            onValueChange={setSelection1}
            style={styles.checkbox}
          />
          <Text style={styles.label}>
            Send me personlised health tips & offers on
          </Text>
          {/* <SocialIcon iconSize={30} type="whatsapp" /> */}
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected2}
            onValueChange={setSelection2}
            style={styles.checkbox}
            j
          />
          <Text style={styles.label}>
            I agree to the <Text style={{color: 'blue'}}>T&C</Text> and{' '}
            <Text style={{color: 'blue'}}>Privacy Policy</Text> of Apollo247
          </Text>
        </View>
      </View>
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
    marginBottom: 10,
    borderRadius: 5,
  },
});
export default Onboarding;
