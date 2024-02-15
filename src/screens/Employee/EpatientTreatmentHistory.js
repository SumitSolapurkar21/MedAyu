import React, {useContext, useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon, Switch} from 'react-native-paper';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';

const EpatientTreatmentHistory = () => {
  const {patientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [switchStates, setSwitchStates] = useState({});
  const navigation = useNavigation();
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Eipdoptions');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const onToggleSwitch = (uniqueid, currentStatus) => {
    const newSwitchStates = {...switchStates};
    newSwitchStates[uniqueid] = !currentStatus;
    setSwitchStates(newSwitchStates);

    // Make the API call or perform any desired action here
    // console.log('Prescription ID:', {uniqueid: uniqueid});
    // console.log('New Status:', {
    //   uniqueid: uniqueid,
    //   activestatus: newSwitchStates[uniqueid],
    // });

    try {
      axios
        .post(`${api.baseurl}/AddTreatmentStatus`, {
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
          uniqueid: uniqueid,
          activestatus: newSwitchStates[uniqueid],
        })
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            // setVisibleMsg(true);
            _fetchtreatmenthistory();
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.warn(error);
    }
  };
  //get patient treatment history ......
  useEffect(() => {
    _fetchtreatmenthistory();
  }, [hospital_id, patient_id, reception_id]);

  const _fetchtreatmenthistory = async () => {
    try {
      const res = await axios.post(`${api.baseurl}/GetMobileTreatmentHistory`, {
        hospital_id: hospital_id,
        patient_id: patient_id,
        reception_id: reception_id,
      });

      const {status, message, data} = res.data;
      if (status === true) {
        setTreatmentHistory(data);
        // Initialize switch states for each item
        const initialSwitchStates = {};
        data.forEach(item => {
          initialSwitchStates[item.uniqueid] = item.activestatus; // Set switch state based on activestatus
        });
        setSwitchStates(initialSwitchStates);
      } else {
        console.error(`${message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item}) => (
    <ScrollView
      horizontal
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
      }}>
      <View
        style={{
          width: 150,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.drugname}</Text>
      </View>
      <View
        style={{
          width: 200,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.drugcode}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.dose}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.dateadd}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.todate}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.noofdays}</Text>
      </View>
      <View
        style={{
          width: 60,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        {item.activestatus ? (
          <Switch
            value={switchStates[item.uniqueid]}
            onValueChange={() =>
              onToggleSwitch(item.uniqueid, switchStates[item.uniqueid])
            }
          />
        ) : (
          <Icon name="check" size={60} color="green" />
        )}
      </View>
    </ScrollView>
  );

  const renderHeader = () => (
    <ScrollView
      horizontal
      style={{
        flexDirection: 'row',
        maxHeight: 50,
        borderBottomWidth: 1,
        borderColor: 'black',
      }}>
      <View
        style={{
          width: 150,
          backgroundColor: 'lightpink',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Drug Name</Text>
      </View>
      <View
        style={{
          width: 200,
          backgroundColor: 'lavender',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Drug Code</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lightyellow',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Dose</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lightpink',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>From</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lavender',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>To</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lavender',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Duration(Days)</Text>
      </View>
      <View
        style={{
          width: 60,
          backgroundColor: 'lightyellow',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Status</Text>
      </View>
    </ScrollView>
  );

  return (
    <>
      <ScrollView horizontal>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {renderHeader()}
          <FlatList
            data={treatmentHistory}
            renderItem={renderItem}
            keyExtractor={item => item.uniqueid}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default EpatientTreatmentHistory;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    color: 'black',
  },
  cellText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
    color: 'black',
  },
});
