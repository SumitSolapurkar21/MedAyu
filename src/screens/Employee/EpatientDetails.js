import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import doctorImg from '../../images/doctor.png';
import ipd from '../../images/ipd.png';
import billHistory from '../../images/billHistory.png';
import panchakarma from '../../images/panchakarma.png';
import invoice from '../../images/invoice.png';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Menu, Button, Divider } from 'react-native-paper';

const EpatientDetails = () => {
  const navigation = useNavigation();
  const {
    setPatientsData,
    scannedPatientsData,
    userData,
    setIsLoggedIn,
    selectedFlow,
    setSelectedFlow,
  } = useContext(UserContext);

  const { firstname, mobilenumber, patientage, patientgender, uhid, patient_id } =
    scannedPatientsData;
  const { _id, hospital_id, role } = userData;

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      if (role === 'Doctor') {
        navigation.navigate('Tabs');
      } else {
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

  const _handleMore = () => {
    setVisible(true);
  };
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    setPatientsData({
      uhid: uhid,
      patient_id: patient_id,
      reception_id: _id,
      hospital_id: hospital_id,
      mobilenumber: mobilenumber
    });
  }, []);

  const logoutHandler = async () => {
    // Clear user token from AsyncStorage
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigation.navigate('LoginPage');
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
            role === 'Doctor'
              ? navigation.navigate('Tabs')
              : navigation.navigate('Home');
          }}
        />
        <Appbar.Content
          title="Patient Details"
          titleStyle={{ fontSize: 18, marginLeft: 10 }}
        />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
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
            leadingIcon="logout"
            onPress={() => {
              navigation.navigate('LoginPage'), logoutHandler();
            }}
            title="Logout"
          />
          <Divider />
          <Menu.Item
            dense
            leadingIcon="home"
            onPress={() => {
              navigation.navigate('Home'), closeMenu();
            }}
            title="Home"
          />

          {/* <Menu.Item onPress={() => {}} title="Item 2" /> */}
        </Menu>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={[styles.cardContent, { backgroundColor: '#afcafa' }]}>
            <Text style={styles.cardlabel}>Patient Name</Text>
            <Text style={styles.cardData}>{firstname}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardlabel}>UHID No.</Text>
            <Text style={styles.cardData}>{uhid}</Text>
          </View>
          <View style={[styles.cardContent, { backgroundColor: '#afcafa' }]}>
            <Text style={styles.cardlabel}>Mobile No.</Text>
            <Text style={styles.cardData}>{mobilenumber}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardlabel}>Gender / Age</Text>
            <Text style={styles.cardData}>
              {patientgender} / {patientage}
            </Text>
          </View>
        </View>

        <View style={styles.cardSelection}>
          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => navigation.navigate('Edepartment')}>
            <Image source={doctorImg} alt="DoctorImg" style={styles.img} />
            <Text style={styles.uName}>Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => {
              navigation.navigate('OpdHomePage'), setSelectedFlow('scanned');
            }}>
            <Image source={ipd} alt="OPD" style={styles.img} />
            <Text style={[styles.uName, { marginLeft: 10 }]}>OPD</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => navigation.navigate('Eipdoptions')}>
            <Image source={ipd} alt="IPD" style={styles.img} />
            <Text style={[styles.uName, { marginLeft: 10 }]}>IPD</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() =>
              ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
            }>
            <Image source={panchakarma} alt="DoctorImg" style={styles.img} />
            <Text style={styles.uName}>Panchakarma</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() =>
              navigation.replace('BillLayout', {
                uhid: uhid,
                patient_id: patient_id,
                reception_id: _id,
                hospital_id: hospital_id,
                mobilenumber: mobilenumber
              })
            }>
            <Image source={invoice} alt="IPD" style={styles.img} />
            <Text style={[styles.uName, { marginLeft: 10 }]}>Bill</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() =>
              navigation.navigate('BillHistory', {
                uhid: uhid,
                patient_id: patient_id,
                reception_id: _id,
                hospital_id: hospital_id,
              })
            }>
            <Image source={billHistory} alt="billHistory" style={styles.img} />
            <Text style={styles.uName}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => navigation.navigate('EpatientLogs')}>
            <Image source={billHistory} alt="billHistory" style={styles.img} />
            <Text style={styles.uName}>Logs</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default EpatientDetails;

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
    fontSize: 14,
    fontWeight: '600',
    color: '#127359',
    flexWrap: 'wrap',
    width: 90,
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
  card: {
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 8,
    borderRadius: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  cardlabel: {
    width: 120,
    fontSize: 16,
    fontWeight: '600',
  },
  cardData: {
    fontSize: 14,
    fontWeight: '600',
    color: '#127359',
  },
  cardSelection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 6,
    gap: 10,
    flexWrap: 'wrap',
  },
  selectDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
    borderRadius: 6,
    padding: 10,
    width: '47%',
  },
  img2: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
    marginLeft: 6,
  },
});
