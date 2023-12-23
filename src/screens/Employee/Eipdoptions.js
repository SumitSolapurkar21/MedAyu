import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import vital from '../../images/vital.png';
import admission from '../../images/admission.png';
import adt from '../../images/adt.png';
import panchakarma from '../../images/panchakarma.png';
import invoice from '../../images/invoice.png';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome';
import HomeButton from '../../components/HomeButton/HomeButton';

const Eipdoptions = () => {
  const navigation = useNavigation();
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
      <View style={styles.cardSelection}>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('EipdregistrationProfile')}>
          <Image source={admission} alt="admission" style={styles.img} />
          <Text style={styles.uName}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('Epatientvital')}>
          <Image source={vital} alt="vital" style={styles.img} />
          <Text style={[styles.uName, {marginLeft: 10}]}>Vitals</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardSelection}>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('EipdregistrationProfile')}>
          <Image source={adt} alt="admission" style={styles.img} />
          <Text style={styles.uName}>A-D-T</Text>
        </TouchableOpacity>
      </View>

      {/* <HomeButton /> */}
    </SafeAreaView>
  );
};

export default Eipdoptions;

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
