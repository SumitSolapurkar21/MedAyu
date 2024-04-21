import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  // ToastAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import medayuLogo from '../../images/medayu.jpeg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
//images
import pr from '../../images/pr.png';
import ss from '../../images/sss.png';
import attendence from '../../images/calendar.png';
// import axios from 'axios';
// import api from '../../../api.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ehome = () => {
  // ........ //
  const navigation = useNavigation();

  const {userData, setIsLoggedIn, setPatientSelectedValue} =
    useContext(UserContext);

  const logoutHandler = async () => {
    // Clear user token from AsyncStorage
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigation.navigate('LoginPage');
  };

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Are you sure you want to Exit App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // qrscan
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerHeader}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>Hi {userData?.name} </Text>
        </View>

        <View style={styles.hrcontent}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginPage'), logoutHandler();
            }}>
            <FontAwesome
              name="sign-out"
              size={22}
              color="#127359"
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{fontSize: 12, color: '#127359', marginLeft: '21%'}}>
        {userData?.role}
      </Text>

      <View style={styles.searchDiv}>
        <FontAwesome6
          name="magnifying-glass"
          color="#127359"
          size={18}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchtext}
          placeholder="Search for Medicines, Doctors, Lab Tests"
          placeholderTextColor="#127359"
        />
      </View>

      <View style={styles.contentDiv}>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => navigation.navigate('EpatientRegistration')}>
          <Image source={pr} style={styles.img} />
          <Text style={styles.contentText}>Patient Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => {
            navigation.navigate('QRScanner'), setPatientSelectedValue('1');
          }}>
          <Image source={ss} style={styles.img} />
          <Text style={styles.contentText}>Search Patient</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentDiv}>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => {
            navigation.navigate('HrModal');
          }}>
          <Image source={attendence} style={styles.img} />
          <Text style={styles.contentText}>HR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => {
            navigation.navigate('QRScanner'), setPatientSelectedValue('3');
          }}>
          <Image source={attendence} style={styles.img} />
          <Text style={styles.contentText}>Discharge Initiate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentDiv}>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => {
            navigation.navigate('PatientDischargeSummary');
          }}>
          <Image source={attendence} style={styles.img} />
          <Text style={styles.contentText}>Discharge Summary</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Ehome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  outerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hlcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 6,
  },
  uName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#127359',
  },
  hrcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 16,
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  searchDiv: {
    marginHorizontal: 12,
    marginVertical: 12,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {marginHorizontal: 10},
  searchtext: {
    fontSize: 14,
    color: '#127359',
    fontWeight: '600',
    width: '90%',
  },
  contentDiv: {
    flexDirection: 'row',
    marginHorizontal: 12,
    // marginVertical: 14,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 6,
    width: '48%',
    padding: 6,
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  contentText: {
    flexWrap: 'wrap',
    width: 100,
    fontSize: 12,
    color: '#127359',
    fontWeight: '600',
  },
});
