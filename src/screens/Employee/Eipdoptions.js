import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import React, {useContext, useEffect, useState} from 'react';
import vital from '../../images/vital.png';
import admission from '../../images/admission.png';
import adt from '../../images/adt.png';
import diagnosis from '../../images/diagnosis.png';
import treatment from '../../images/treatment.png';

import attendence from '../../images/calendar.png';

import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';

const Eipdoptions = () => {
  const navigation = useNavigation();

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('EpatientDetails');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const {
    setPatientsData,
    scannedPatientsData,
    userData,
    setOpdServices,
    setPatientSelectedValue,
  } = useContext(UserContext);

  const {uhid, patient_id} = scannedPatientsData;
  const {_id, hospital_id} = userData;

  useEffect(() => {
    setPatientsData({
      uhid: uhid,
      patient_id: patient_id,
      reception_id: _id,
      hospital_id: hospital_id,
    });
  }, []);

  useEffect(() => {
    const _fetchservicetype = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchServiceType`, {
            hospital_id: hospital_id,
          })
          .then(res => {
            setOpdServices(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (hospital_id !== '' || undefined || null) _fetchservicetype();
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
          onPress={() => navigation.navigate('Epatientadt')}>
          <Image source={adt} alt="adt" style={styles.img} />
          <Text style={styles.uName}>A-D-T</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('Eipdbeds')}>
          <Image source={adt} alt="beds" style={styles.img} />
          <Text style={styles.uName}>Beds</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardSelection}>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('EpatientDiagnosis')}>
          <Image source={diagnosis} alt="diagnosis" style={styles.img} />
          <Text style={styles.uName}>Diagnosis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('EpatientPresentComplaint')}>
          <Image source={treatment} alt="treatment" style={styles.img} />
          <Text style={styles.uName}>Complaint</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardSelection}>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('EpatientTreatment')}>
          <Image source={diagnosis} alt="diagnosis" style={styles.img} />
          <Text style={styles.uName}>Treatement</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('Prepostprocedure')}>
          <Image source={diagnosis} alt="diagnosis" style={styles.img} />
          <Text style={styles.uName}>Procedure</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardSelection}>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => {
            navigation.navigate('DischargeScanner'),
              setPatientSelectedValue('3');
          }}>
          <Image source={attendence} alt="diagnosis" style={styles.img} />
          <Text style={styles.uName}>Discharge Initiate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('PatientDischargeSummary')}>
          <Image source={attendence} alt="diagnosis" style={styles.img} />
          <Text style={styles.uName}>Discharge Summary</Text>
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
    fontSize: 13,
    fontWeight: '600',
    color: '#127359',
    flexWrap: 'wrap',
    width: 100,
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
    marginTop: 16,
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
