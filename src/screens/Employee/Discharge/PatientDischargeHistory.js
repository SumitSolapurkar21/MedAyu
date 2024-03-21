import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import dischargepatient from '../../../images/dischargepatient.png';
import summary from '../../../images/summary.png';
import {Image} from 'react-native';
import {ToastNotification} from '../../../components/ToastNotification/ToastNotification';

const PatientDischargeHistory = () => {
  const {userData, selectedPatientMobileNumber} = useContext(UserContext);
  const {_id, hospital_id} = userData.data[0];
  const [patientDetails, setPatientDetails] = useState(null);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  // patientDetailBySearchInput ....
  useEffect(() => {
    const patientDetailBySearchInput = async () => {
      try {
        if (selectedPatientMobileNumber !== '')
          await axios
            .post(`${api.baseurl}/ScanQrForMobile`, {
              inputvalue: selectedPatientMobileNumber,
              reception_id: _id,
              hospital_id: hospital_id,
              type: 'SEARCH',
            })
            .then(res => {
              const _data = res.data;
              if (res.data.status === true) {
                console.log(_data);
                setPatientDetails(_data);
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
    patientDetailBySearchInput();
  }, [selectedPatientMobileNumber]);

  // patient details .......
  const _patientDetails = () => {
    return (
      <>
        <View style={styles.card}>
          <View style={[styles.cardContent, {backgroundColor: '#afcafa'}]}>
            <Text style={styles.cardlabel}>Patient Name</Text>
            <Text style={styles.cardData}>{patientDetails?.firstname}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardlabel}>UHID No.</Text>
            <Text style={styles.cardData}>{patientDetails?.uhid}</Text>
          </View>
          <View style={[styles.cardContent, {backgroundColor: '#afcafa'}]}>
            <Text style={styles.cardlabel}>Mobile No.</Text>
            <Text style={styles.cardData}>{patientDetails?.mobilenumber}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardlabel}>Gender / Age</Text>
            <Text style={styles.cardData}>
              {patientDetails?.patientgender} / {patientDetails?.patientage}
            </Text>
          </View>
        </View>
      </>
    );
  };

  const _toggleNotification = subtitle => {
    setVisible(!visible);
    return ToastNotification(visible, setVisible, subtitle);
  };

  //selection box ...
  const _selectionBox = () => {
    return (
      <>
        <View style={styles.contentDiv}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() =>
              navigation.navigate('PatientDischargeDiagnosis', {
                patient_id: patientDetails?.patient_id,
              })
            }>
            <Image source={dischargepatient} style={styles.img} />
            <Text style={styles.contentText}>View Diagnosis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() =>
              navigation.navigate('PatientDischargeTreatment', {
                patient_id: patientDetails?.patient_id,
              })
            }>
            <Image source={summary} style={styles.img} />
            <Text style={styles.contentText}>View Treatment History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() =>
              navigation.navigate('PatientDischargeInvestigation', {
                patient_id: patientDetails?.patient_id,
              })
            }>
            <Image source={summary} style={styles.img} />
            <Text style={styles.contentText}>View Investigation History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() =>
              navigation.navigate('ConditionAtAdmission', {
                patient_id: patientDetails?.patient_id,
                ip_no: patientDetails?.ipno,
              })
            }>
            <Image source={summary} style={styles.img} />
            <Text style={styles.contentText}>Condition at Admission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() =>
              navigation.navigate('ConditionAtDischarge', {
                patient_id: patientDetails?.patient_id,
                ip_no: patientDetails?.ipno,
              })
            }>
            <Image source={summary} style={styles.img} />
            <Text style={styles.contentText}>Condition at Discharge</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('PatientDischargeSummary');
          }}
        />
        <Appbar.Content
          title="Discharge History "
          style={styles.appbar_title}
        />
      </Appbar.Header>
      <View style={styles.container}>
        {ToastNotification(visible, setVisible)}

        {/* section 1 */}
        {_patientDetails()}
        {_selectionBox()}
      </View>
    </>
  );
};

export default PatientDischargeHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: 12,
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
    flexWrap: 'wrap',
    width: 200,
  },
  contentDiv: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 6,
    width: '48%',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
    paddingVertical: 12,
  },
  contentText: {
    flexWrap: 'wrap',
    width: 100,
    fontSize: 14,
    color: '#127359',
    fontWeight: '600',
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    marginLeft: 4,
  },
});
