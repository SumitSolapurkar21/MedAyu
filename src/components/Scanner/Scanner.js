import {
  StyleSheet,
  Text,
  TouchableOpacity,
  LogBox,
  View,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../Context/Context';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import successIcon from '../../images/success.gif';
import axios from 'axios';
import api from '../../../api.json';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes',
]);

export default function Scanner({route}) {
  const navigation = useNavigation();

  const {userData} = useContext(UserContext);
  const {value} = route.params;

  const [msgPopup, setMsgPopup] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [message, setMessage] = useState('');

  const {_id, hospital_id} = userData.data[0];

  //Date Code in YYYY-MM-DD
  let today = new Date();

  let date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getDate().toString().padStart(2, '0');

  console.log('date : ', date);

  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');

  // const attendenceData = {
  //   reception_id: _id,
  //   hospital_id: hospital_id,
  //   login_time: `${hours}.${minutes}`,
  //   login_date: date,
  //   location: 'Nagpur',
  // };
  // console.log(attendenceData);
  let uhid;
  let appoint_id;

  const handleScannerSuccess = e => {
    const data = e.data.split(',');
    uhid = data[0];
    appoint_id = data[1];

    handleNavigation();
  };

  const handleNavigation = async () => {
    if (value != '1') {
      try {
        await axios
          .post(`${api.baseurl}/AddMobileAttendence`, {
            reception_id: _id,
            hospital_id: hospital_id,
            login_time: `${hours}.${minutes}`,
            login_date: date,
            location: 'Nagpur',
          })
          .then(response => {
            // return response.data;
            console.log(response.data);
            setMessage(response.data.message);
          });
      } catch (error) {
        console.error(error);
      }
      setMsgPopup(true);
      setBackdropOpacity(0.5);
    } else {
      await patientDetail();
    }
  };

  const patientDetail = async () => {
    try {
      await axios
        .post(`${api.baseurl}/ScanQrForMobile`, {
          uhid,
          appoint_id,
          reception_id: _id,
          hospital_id: hospital_id,
        })
        .then(res => {
          // setPatientData(res.data);
          console.log(res.data);

          navigation.navigate('EpatientDetails', {patientData: res.data});
          return res.data;
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <QRCodeScanner
          onRead={handleScannerSuccess}
          flashMode={RNCamera.Constants.FlashMode.off}
          showMarker={true}
          topContent={
            <Text style={styles.centerText}>
              <Text style={styles.textBold}>QR Code Scanner</Text>
            </Text>
          }
          topViewStyle={{marginVertical: 30}}
          bottomViewStyle={{marginVertical: 20}}
        />
        {/* <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={handleNavigation}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity> */}

        {msgPopup && (
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.modalBody}>
                <Image
                  source={successIcon}
                  alt="successIcon"
                  style={styles.img}
                />
                <Text style={styles.modalText}>{message}</Text>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => {
                    setMsgPopup(false);
                    navigation.navigate('Ehome');
                  }}>
                  <Text style={styles.modalBtnText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {msgPopup && (
          <View
            style={[
              styles.backdrop,
              {backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`},
            ]}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ffffff',
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  buttonTouchable: {
    padding: 10,
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderRadius: 6,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  modalBody: {
    backgroundColor: '#ffffff',
    width: 220,
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#127359',
  },
  modalBtn: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 6,
    marginVertical: 10,
    width: 60,
  },
  modalBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
