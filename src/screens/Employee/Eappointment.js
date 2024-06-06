import {StyleSheet, Text, View, SafeAreaView, BackHandler} from 'react-native';

import React, {useContext, useEffect, useState} from 'react';
import DateTimeAppointment from '../../components/DateTimeAppointment';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Button, Menu} from 'react-native-paper';

// import successIcon from '../../images/success.gif';

import MsgPopup from '../../components/MsgPopup/MsgPopup';
import UserContext from '../../components/Context/Context';
import axios from 'axios';
import api from '../../../api.json';

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
  const {userData} = useContext(UserContext);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const navigation = useNavigation();

  let reception_id = userData._id;
  const {department_id, patient_id, doctor_id} = route.params;

  const [msgPopup, setMsgPopup] = useState(false);
  const [dateArray, setDateArray] = useState([]);

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };

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
          hospital_id: userData.hospital_id,
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
    <>
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: '#ebebeb',
        }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title="Appointments"
          titleStyle={{fontSize: 18, marginLeft: 10}}
        />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <View
        style={{
          position: 'absolute',
          right: 3,
          top: 60,
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}></Button>}>
          <Menu.Item
            dense
            leadingIcon="home"
            onPress={() => {
              navigation.navigate('Home'), closeMenu();
            }}
            title="Home"
          />
        </Menu>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.selection}>
            <Text
              style={{
                marginVertical: 6,
                fontWeight: '600',
                fontSize: 16,
                color: 'black',
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
      </SafeAreaView>
    </>
  );
};

export default Eappointment;

const styles = StyleSheet.create({
  container: {
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
