import React, {useContext, useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Switch} from 'react-native-paper';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';

const Preprecedureprescription = () => {
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const [procedureHistory, setProcedureHistory] = useState([]);
  const [switchStates, setSwitchStates] = useState({});
  const navigation = useNavigation();

  //get patient treatment history ......
  useEffect(() => {
    _fetchprocedurehistory();
  }, [hospital_id, patient_id, reception_id]);
  const _fetchprocedurehistory = async () => {
    try {
      const res = await axios.post(`${api.baseurl}/GetPreprocedureHistory`, {
        hospital_id: hospital_id,
        patient_id: patient_id,
        reception_id: reception_id,
      });

      const {status, message, data} = res.data;
      if (status === true) {
        setProcedureHistory(data);
        console.log('data : ', JSON.stringify(data));
      } else {
        console.error(`${message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Patient Detail... */}
      <View style={styles.card}>
        <View style={styles.main}>
          <View style={styles.pDetail}>
            <Text style={styles.pData}>{scannedPatientsData?.firstname}</Text>
          </View>

          <View style={styles.pDetail}>
            <Text
              style={[
                styles.pData,
                {fontWeight: 'normal', textAlign: 'right'},
              ]}>
              <FontAwesome6 name="phone" color="#1669f0" size={11} />
              &nbsp;
              {scannedPatientsData?.mobilenumber}
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.cardGrpBtn}
            onPress={() =>
              ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
            }>
            <FontAwesome6 name="bell" color="#1669f0" size={16} />
            <Text style={styles.cardGrpTxt}>Send Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardGrpBtn}
            onPress={() =>
              ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
            }>
            <FontAwesome6 name="list-alt" color="#1669f0" size={16} />
            <Text style={styles.cardGrpTxt}>Send Statement</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Procedure Prescription</Text>
      </View>
      <ScrollView vertical style={styles.treatmentpresciptionDiv}>
        {procedureHistory?.map((res, i) => {
          return (
            <View style={[styles.card, {marginVertical: 6}]} key={res.uniqueid}>
              <View>
                <Text
                  style={[
                    styles.pData,
                    {fontSize: 16, padding: 8, color: '#1669f0'},
                  ]}>
                  Prescription
                </Text>
              </View>
              <View style={styles.cardBody}>
                <View>
                  <Text style={styles.pData}>
                    Procedure Name : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.procedurename}</Text>
                  </Text>
                  <Text style={styles.pData}>
                    Duration : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.proceduretime}</Text>
                  </Text>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      gap: 100,
                    }}> */}
                  <Text style={styles.pData}>
                    Start Date : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.proceduredate}</Text>
                  </Text>
                  <Text style={styles.pData}>
                    Days : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.proceduredays}</Text>
                  </Text>
                  {/* </View> */}
                </View>
              </View>
              <View style={styles.cardFooter2}>
                <View style={styles.grpShare}>
                  <TouchableOpacity
                  // onPress={() => {
                  //   handlePdfIconClick(res._id);
                  // }}
                  >
                    <FontAwesome6 name="file-pdf" color="#1669f0" size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                  // onPress={() => {
                  //   sharePdfhandler(res._id);
                  // }}
                  >
                    <FontAwesome6 name="share" color="#1669f0" size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate('EpatientTreatmentPrescriptionEdit', {
                  //     prescription_id: res._id,
                  //   })
                  // }
                  >
                    <FontAwesome6
                      name="pen-to-square"
                      color="#1669f0"
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Preprecedureprescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 10,
  },
  headerTxt: {
    fontWeight: 'bold',
    marginHorizontal: 8,
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  main: {
    borderBottomWidth: 1,
    borderBottomColor: '#edeef0',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#02fa23',
  },
  pData: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 12,
  },
  cardGrpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardGrpTxt: {
    color: '#1669f0',
  },
  treatmentpresciptionDiv: {
    maxHeight: 500,
  },
  pDetail: {
    padding: 12,
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center',
  },
  cardFooter2: {
    padding: 8,
    alignSelf: 'flex-end',
  },
  pData1: {
    fontWeight: '600',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //     padding: 8,
    marginHorizontal: 8,
  },
  grpShare: {
    flexDirection: 'row',
    gap: 14,
  },
});
