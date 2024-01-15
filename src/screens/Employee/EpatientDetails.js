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
import React, {useContext, useEffect} from 'react';
import doctorImg from '../../images/doctor.png';
import ipd from '../../images/ipd.png';
import billHistory from '../../images/billHistory.png';
import panchakarma from '../../images/panchakarma.png';
import invoice from '../../images/invoice.png';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome';
import HomeButton from '../../components/HomeButton/HomeButton';

const EpatientDetails = () => {
  const navigation = useNavigation();
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
  const {setPatientsData, scannedPatientsData, userData} =
    useContext(UserContext);

  const {firstname, mobilenumber, patientage, patientgender, uhid, patient_id} =
    scannedPatientsData;
  const {_id, hospital_id} = userData.data[0];

  useEffect(() => {
    setPatientsData({
      uhid: uhid,
      patient_id: patient_id,
      reception_id: _id,
      hospital_id: hospital_id,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.cardContent, {backgroundColor: '#afcafa'}]}>
          <Text style={styles.cardlabel}>Patient Name</Text>
          <Text style={styles.cardData}>{firstname}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardlabel}>UHID No.</Text>
          <Text style={styles.cardData}>{uhid}</Text>
        </View>
        <View style={[styles.cardContent, {backgroundColor: '#afcafa'}]}>
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
          onPress={() => navigation.navigate('Eipdoptions')}>
          <Image source={ipd} alt="IPD" style={styles.img} />
          <Text style={[styles.uName, {marginLeft: 10}]}>IPD</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardSelection}>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('Eappointment')}>
          <Image source={panchakarma} alt="DoctorImg" style={styles.img} />
          <Text style={styles.uName}>Panchakarma</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() =>
            navigation.navigate('BillLayout', {
              uhid: uhid,
              patient_id: patient_id,
              reception_id: _id,
              hospital_id: hospital_id,
            })
          }>
          <Image source={invoice} alt="IPD" style={styles.img} />
          <Text style={[styles.uName, {marginLeft: 10}]}>Bill</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardSelection}>
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
      </View>
      <HomeButton />
    </SafeAreaView>
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
    fontSize: 16,
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
  card: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
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
    marginVertical: 16,
    gap: 20,
  },
  selectDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
    borderRadius: 6,
    padding: 10,
    width: '47%',
  },
});
