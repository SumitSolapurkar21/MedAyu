import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext} from 'react';
import medayuLogo from '../../images/medayu.jpeg';
import doctorImg from '../../images/doctor.png';
import ipd from '../../images/ipd.png';
import billHistory from '../../images/billHistory.png';
import panchakarma from '../../images/panchakarma.png';
import invoice from '../../images/invoice.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';

const EpatientDetails = ({route}) => {
  const navigation = useNavigation();
  const {userData} = useContext(UserContext);
  // const {patientData} = route.params;
  // console.log(patientData);

  const {firstname, mobilenumber, patientage, patientgender, uhid, patient_id} =
    route.params?.patientData;
  const {reception_id, hospital_id} = route.params;

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
          onPress={() =>
            // navigation.navigate('Eappointment', {patient_id: patient_id}
            navigation.navigate('Edepartment', {patient_id: patient_id})
          }>
          <Image source={doctorImg} alt="DoctorImg" style={styles.img} />
          <Text style={styles.uName}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('EipdregistrationProfile')}>
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
              reception_id: reception_id,
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
              reception_id: reception_id,
              hospital_id: hospital_id,
            })
          }>
          <Image source={billHistory} alt="billHistory" style={styles.img} />
          <Text style={styles.uName}>History</Text>
        </TouchableOpacity>
      </View>
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
