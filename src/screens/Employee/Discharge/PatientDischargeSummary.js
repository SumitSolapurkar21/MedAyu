import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';

const PatientDischargeSummary = () => {
  const navigation = useNavigation();
  const {userData} = useContext(UserContext);

  const {_id, hospital_id} = userData.data[0];

  useEffect(() => {
    const _SeeDischargeSummaryList = async () => {
      try {
        await axios
          .post(`${api.baseurl}/SeeDischargeSummaryList`, {
            hospital_id: hospital_id,
            reception_id: _id,
          })
          .then(res => {
            console.log('res : ', res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    _SeeDischargeSummaryList();
  }, [_id, hospital_id]);
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('EpatientDetails');
          }}
        />
        <Appbar.Content
          title="Discharge Summary "
          style={styles.appbar_title}
        />
      </Appbar.Header>
      {/* section 1 */}
      <View style={styles.container}></View>
    </>
  );
};

export default PatientDischargeSummary;

const styles = StyleSheet.create({
  appbar_title: {
    fontSize: 10,
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 10,
  },
});
