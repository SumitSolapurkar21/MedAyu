import {
  StyleSheet,
  Text,
  TouchableOpacity,
  LogBox,
  View,
  Image,
  TextInput,
  BackHandler,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../Context/Context';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
// 
import successIcon from '../../images/success.gif';
import axios from 'axios';
import api from '../../../api.json';
import { Appbar } from 'react-native-paper';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes',
]);

export default function Scanner() {
  const navigation = useNavigation();

  const { userData, setScannedPatientsData, patientSelectedValue } =
    useContext(UserContext);
  // const {value} = route.params;

  const [msgPopup, setMsgPopup] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [message, setMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { _id, hospital_id, role } = userData;

  const [refreshing, setRefreshing] = React.useState(false);
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      if (patientSelectedValue == '3') {
        navigation.replace('Eipdoptions');
      } else if (patientSelectedValue == '1') {
        navigation.navigate('Home');
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //Date Code in YYYY-MM-DD
  let today = new Date();

  let date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getDate().toString().padStart(2, '0');

  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');

  let uhid;
  let appoint_id;
  let qrid;
  useEffect(() => {
    if (uhid != '') handleScannerSuccess();
  }, [uhid, qrid]);

  const handleScannerSuccess = e => {
    if (e) {
      const data = e.data.split(',');
      appoint_id = data[1];
      uhid = data[0];
      qrid = data[3];
      handleNavigation();
      // Clear the variables after handling the scan
      uhid = '';
      appoint_id = '';
      qrid = '';

      setScannedPatientsData([]);
    } else {
      return;
    }
  };
  const _navigationTabs = tabs => {
    if (tabs === 'Doctor') {
      navigation.navigate('Tabs');
    } else if (tabs === 'Receptionist') {
      navigation.navigate('Home');
    } else if (tabs === 'PExecutive') {
      navigation.navigate('PExecutiveHome');
    } else if (tabs === 'Nurse') {
      navigation.navigate('NurseHome');
    } else if (tabs === 'Attendant') {
      navigation.navigate('AttendantHome');
    } else if (tabs === 'Security') {
      navigation.navigate('SecurityHome');
    } else if (tabs === 'Kitchen') {
      navigation.navigate('KitchenHome');
    } else if (tabs === 'HouseKeeping') {
      navigation.navigate('HouseKeepingHome');
    } else if (tabs === 'Pharmacy') {
      navigation.navigate('PharmacyHome');
    } else if (tabs === 'HR') {
      navigation.navigate('HRHome');
    } else {
      return;
    }
  };
  const handleNavigation = async () => {
    if (patientSelectedValue != '1' || patientSelectedValue != '3') {
      try {
        await axios
          .post(`${api.baseurl}/AddMobileAttendence`, {
            reception_id: _id,
            hospital_id: appoint_id,
            login_time: `${hours}.${minutes}`,
            login_date: date,
            location: 'Nagpur',
            qrid: qrid,
          })
          .then(response => {
            setMessage(response.data.message);
            // Clear the variables after handling the scan
            uhid = '';
            appoint_id = '';
            qrid = '';

            // return response.data;
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

  //Get Data By QR Scan
  const patientDetail = async () => {
    try {
      await axios
        .post(`${api.baseurl}/ScanQrForMobile`, {
          uhid,
          appoint_id,
          reception_id: _id,
          hospital_id: hospital_id,
          type: 'QR',
        })
        .then(res => {
          setScannedPatientsData(res.data);
          if (res.data.status === true) {
            if (patientSelectedValue === '3') {
              navigation.navigate('DischargeInitiation');
            } else {
              if (userData?.role === 'Doctor') {
                navigation.replace('Tabs');
              } else {
                navigation.navigate('EpatientDetails');
              }
            }
            uhid = '';
            appoint_id = '';
            qrid = '';
          } else {
            console.warn(res.data.message);
          }
          return res.data;
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Get Data By Search Input :
  const patientDetailBySearchInput = async () => {
    try {
      if (searchInput !== '')
        await axios
          .post(`${api.baseurl}/ScanQrForMobile`, {
            inputvalue: searchInput,
            appoint_id,
            reception_id: _id,
            hospital_id: hospital_id,
            type: 'SEARCH',
          })
          .then(res => {
            setScannedPatientsData(res.data);
            if (res.data.status === true) {
              if (patientSelectedValue === '3') {
                navigation.navigate('DischargeInitiation');
              } else {
                navigation.navigate('EpatientDetails');
              }
              setSearchInput('');
            } else {
              console.warn(`Data Not Available`);
            }
            return res.data;
          });
      else return console.warn('Mobile Number or UHID Required!');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {!refreshing && (
        <>
          {/* Appbar header */}
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                patientSelectedValue == 3
                  ? navigation.navigate('Eipdoptions')
                  : patientSelectedValue == 1
                    ? navigation.navigate('Home')
                    : null;
              }}
            />
            <Appbar.Content title="Scan QR" style={styles.appbar_title} />
          </Appbar.Header>
          <View style={styles.container}>
            <QRCodeScanner
              onRead={handleScannerSuccess}
              flashMode={RNCamera.Constants.FlashMode.off}
              showMarker={true}
              // topContent={
              //   <Text style={styles.centerText}>
              //     <Text style={styles.textBold}>QR Code Scanner</Text>
              //   </Text>
              // }
              // topViewStyle={{marginVertical: 30}}
              bottomViewStyle={{ marginVertical: 20 }}
            />
            {(patientSelectedValue === '1' || patientSelectedValue === '3') && (
              <View style={styles.bottomContent}>
                <Text style={styles.bottomTxt}>- OR -</Text>
                <TextInput
                  style={styles.mobileInput}
                  placeholder="Enter Mobile Number or UHID No"
                  value={searchInput}
                  onChangeText={text => setSearchInput(text)}
                  autoComplete="off"
                  textAlign="center"
                  placeholderTextColor="black"
                />
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={patientDetailBySearchInput}>
                  <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
              </View>
            )}
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
                        _navigationTabs(role);

                        // if (userData?.role === 'Doctor') {
                        //   navigation.replace('Tabs');
                        // } else {
                        //   navigation.replace('Ehome');
                        // }
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
                  { backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` },
                ]}
              />
            )}
          </View>
        </>
      )}
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
    width: 'auto',
    alignSelf: 'center',
    marginVertical: 10,
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
  bottomContent: {
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  bottomTxt: {
    alignSelf: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff',
  },
  mobileInput: {
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#127359',
  },
});
