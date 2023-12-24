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

import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
import {Button} from 'react-native-paper';

const Epatientadt = () => {
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
        <Button
          mode="contained-tonal"
          onPress={() => console.log('Pressed')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>ADMITED</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => console.log('Pressed')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>DISCHARGE</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => console.log('Pressed')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>DEATH</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => console.log('Pressed')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>DAMA</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => console.log('Pressed')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>HOME</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => console.log('Pressed')}
          style={styles.btn}>
          <Text style={styles.btnTxt}>TRANSFER</Text>
        </Button>
      </View>

      {/* <HomeButton /> */}
    </SafeAreaView>
  );
};

export default Epatientadt;

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
    marginHorizontal: 10,
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 4,
    flexWrap: 'wrap',
  },

  btn: {
    width: 110,
  },
  btnTxt: {
    fontSize: 12,
  },
});
