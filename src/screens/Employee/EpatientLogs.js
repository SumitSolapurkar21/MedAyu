import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Card} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';

const EpatientLogs = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [historyArray, setHistoryArray] = useState([]);
  const {userData, scannedPatientsData} = useContext(UserContext);
  const {uhid, patient_id} = scannedPatientsData;

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

  const OverallMobilePatientHistory = async () => {
    try {
      await axios
        .post(`${api.baseurl}/OverallMobilePatientHistory`, {
          hospital_id: userData?.hospital_id,
          reception_id: userData?._id,
          patient_id: patient_id,
          role: userData?.role,
          uhid: uhid,
        })
        .then(response => {
          const {HistoryArray, status, message} = response.data;
          if (status === true) {
            setHistoryArray(HistoryArray);
          } else {
            Alert.alert('Error !!', `${message}`);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };

  useEffect(() => {
    OverallMobilePatientHistory();
  }, []);
  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: '#ebebeb',
        }}>
        <Appbar.BackAction
          onPress={() => navigation.replace('EpatientDetails')}
        />
        <Appbar.Content title={'Logs'} />
      </Appbar.Header>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {historyArray.length > 0 &&
            historyArray?.map((res, index) => {
              return (
                <Card style={styles.card} key={index + 1}>
                  <Card.Content>
                    <View style={styles.content}>
                      {/* <Text variant="titleLarge" style={styles.text}>
                      Date / Time :
                    </Text> */}
                      <Text variant="bodyMedium" style={styles.text}>
                        {res.datetime}
                      </Text>
                    </View>
                    <View style={styles.content}>
                      {/* <Text variant="titleLarge" style={styles.text}>
                      Text :
                    </Text> */}
                      <Text variant="bodyMedium">{res.text}</Text>
                    </View>
                  </Card.Content>
                </Card>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default EpatientLogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontWeight: '600',
  },
});
