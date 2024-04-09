import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  LogBox,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
import {Button} from 'react-native-paper';
import Eadtpatientadmitted from './ADT/Eadtpatientadmitted';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Eadtpatientdischarge from './ADT/Eadtpatientdischarge';
import Eadtpatientdeath from './ADT/Eadtpatientdeath';
import Eadtpatientdama from './ADT/Eadtpatientdama';
import Eadtpatienthome from './ADT/Eadtpatienthome';
import Eadtpatienttransfer from './ADT/Eadtpatienttransfer';

LogBox.ignoreLogs([
  'Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.',
]);

const Epatientadt = () => {
  const navigation = useNavigation();
  const {setPatientsData, scannedPatientsData, userData} =
    useContext(UserContext);

  const {uhid, patient_id} = scannedPatientsData;
  const {_id, hospital_id} = userData;
  const [selectedButton, setSelectedButton] = useState('Admitted');
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

  useEffect(() => {
    setPatientsData({
      uhid: uhid,
      patient_id: patient_id,
      reception_id: _id,
      hospital_id: hospital_id,
    });
  }, []);

  const getButtonStyle = buttonType => {
    return buttonType === selectedButton ? styles.selectedBtn : styles.btn;
  };
  const clickHandler = buttonType => {
    setSelectedButton(buttonType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardSelection}>
        <Button
          mode="contained-tonal"
          onPress={() => clickHandler('Admitted')}
          style={[styles.btn, getButtonStyle('Admitted')]}>
          <Text style={styles.btnTxt}>ADMITED</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => clickHandler('Discharge')}
          style={[styles.btn, getButtonStyle('Discharge')]}>
          <Text style={styles.btnTxt}>DISCHARGE</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => clickHandler('Death')}
          style={[styles.btn, getButtonStyle('Death')]}>
          <Text style={styles.btnTxt}>DEATH</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => clickHandler('Dama')}
          style={[styles.btn, getButtonStyle('Dama')]}>
          <Text style={styles.btnTxt}>DAMA</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => clickHandler('Home')}
          style={[styles.btn, getButtonStyle('Home')]}>
          <Text style={styles.btnTxt}>HOME</Text>
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => clickHandler('Transfer')}
          style={[styles.btn, getButtonStyle('Transfer')]}>
          <Text style={styles.btnTxt}>TRANSFER</Text>
        </Button>
      </View>
      <View style={[styles.legend, {marginBottom: 10}]}>
        <View style={styles.legend}>
          <FontAwesome6
            name="arrow-right-from-bracket"
            size={18}
            color="#127359"
          />
          <Text>DISCHARGE</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="xmark" size={18} color="red" />
          <Text>DEATH</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="cloud-arrow-up" size={18} color="blue" />
          <Text>DAMA</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="cloud-arrow-up" size={18} color="#cc66ff" />
          <Text>TRANSFER</Text>
        </View>
        <View style={styles.legend}>
          <FontAwesome6 name="house" size={16} color="#127359" />
          <Text>WENT HOME</Text>
        </View>
      </View>
      {/* Selected List */}
      {selectedButton === 'Admitted' ? (
        <Eadtpatientadmitted />
      ) : selectedButton === 'Discharge' ? (
        <Eadtpatientdischarge />
      ) : selectedButton === 'Death' ? (
        <Eadtpatientdeath />
      ) : selectedButton === 'Dama' ? (
        <Eadtpatientdama />
      ) : selectedButton === 'Home' ? (
        <Eadtpatienthome />
      ) : selectedButton === 'Transfer' ? (
        <Eadtpatienttransfer />
      ) : null}

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
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
    padding: '0px 20px',
    marginHorizontal: 14,
  },
  btn: {
    // backgroundColor: 'blue', // Set your default color here
  },
  selectedBtn: {
    backgroundColor: '#3fe067', // Set your selected color here
  },
});
