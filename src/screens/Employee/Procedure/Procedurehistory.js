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
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';

const Procedurehistory = () => {
  const {patientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const [procedureHistory, setProcedureHistory] = useState([]);
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
        <Text style={styles.cellText}>{item.procedurename}</Text>
      </View>
      <View
        style={{
          width: 200,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.procedureamount}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.proceduretime}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.procedureinstruction}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.proceduredays}</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>{item.proceduredate}</Text>
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
          width: 150,
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellText}>
          {item.procedurekit?.map(drug => `${drug.drugname}`).join(', ')}
        </Text>
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
        <Text style={styles.headerText}>Procedure Name</Text>
      </View>
      <View
        style={{
          width: 200,
          backgroundColor: 'lavender',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Amount</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lightyellow',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Time</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lightpink',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Instruction</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lavender',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Days</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lavender',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Start Date</Text>
      </View>
      <View
        style={{
          width: 100,
          backgroundColor: 'lavender',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>End Date</Text>
      </View>
      <View
        style={{
          width: 150,
          backgroundColor: 'lightyellow',
          borderRightWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.headerText}>Kit</Text>
      </View>
    </ScrollView>
  );
  return (
    <>
      <ScrollView horizontal>
        <View style={{padding: 10}}>
          {renderHeader()}
          <FlatList
            data={procedureHistory}
            renderItem={renderItem}
            keyExtractor={item => item.uniqueid}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Procedurehistory;

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
