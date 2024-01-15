import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import medayuLogo from '../../images/medayu.jpeg';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useContext, useEffect, useState} from 'react';
import DateTimeAppointment from '../../components/DateTimeAppointment';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';

// import successIcon from '../../images/success.gif';

import MsgPopup from '../../components/MsgPopup/MsgPopup';
import UserContext from '../../components/Context/Context';
import axios from 'axios';
import api from '../../../api.json';
import HomeButton from '../../components/HomeButton/HomeButton';

const Eappointment = ({route}) => {
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const {scannedPatientsData, userData} = useContext(UserContext);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const navigation = useNavigation();

  let reception_id = userData.data[0]._id;
  const {department_id, patient_id, doctor_id} = route.params;

  const [formData, setFormData] = useState({
    department: '',
    doctor: '',
  });
  const [msgPopup, setMsgPopup] = useState(false);

  const [dateArray, setDateArray] = useState([]);

  useEffect(() => {
    if (doctor_id) dateData();
  }, [doctor_id]);

  // let doctor_id = formData.doctor;
  let today = new Date();

  let date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getDate().toString().padStart(2, '0');

  const dateData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/ShowAppointDatesForMobile`, {
          reception_id,
          hospital_id: userData.data[0].hospital_id,
          todaysdates: date,
        })
        .then(res => {
          setDateArray(res.data.mydates);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerHeader}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>{userData.data[0].name}</Text>
        </View>
        <View style={styles.hrcontent}>
          <TouchableOpacity>
            <FontAwesome name="bell" size={22} color="#127359" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <FontAwesome name="user" size={22} color="#127359" />
          </TouchableOpacity>
        </View>
      </View>

      <MsgPopup
        msgPopup={msgPopup}
        setMsgPopup={setMsgPopup}
        backdropOpacity={backdropOpacity}
      />

      <View style={styles.main}>
        <View style={styles.selection}>
          <Text
            style={{
              marginVertical: 8,
              fontWeight: '600',
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
            }}>
            Add Appointments
          </Text>
        </View>
      </View>

      <DateTimeAppointment
        dateArray={dateArray}
        doctor_id={doctor_id}
        patient_id={patient_id}
        reception_id={reception_id}
        department_id={department_id}
        setMsgPopup={setMsgPopup}
        setBackdropOpacity={setBackdropOpacity}
      />
      <HomeButton />
    </SafeAreaView>
  );
};

export default Eappointment;

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
    width: 50,
    height: 50,
  },
  selection: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  fields: {
    marginVertical: 6,
  },
  fieldText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#127359',
  },
  fieldInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
  },
});
