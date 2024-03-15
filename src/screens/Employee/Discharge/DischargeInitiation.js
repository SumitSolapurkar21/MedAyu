import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Appbar, Button, Card, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-ui-datepicker';
import DropDown from 'react-native-paper-dropdown';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';

const DischargeInitiation = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [dischargeTypeDropdownValue, setDischargeTypeDropdownValue] =
    useState(null);
  const [showDischargeType, setDischargeType] = useState(false);
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {firstname, patientage, patientgender, uhid, ipno, ip_id} =
    scannedPatientsData;
  const {_id, hospital_id} = userData.data[0];

  let _dischargetype = [
    {
      label: 'Cured',
      value: 'Cured',
    },
    {
      label: 'Expired',
      value: 'Expired',
    },
    {
      label: 'Transferred',
      value: 'Transferred',
    },
    {
      label: 'DAMA Discharge against Medical Advice',
      value: 'Dama',
    },
    {
      label: 'LAMA Leave against Medical Advice',
      value: 'Lama',
    },
    {
      label: 'Absconded',
      value: 'Absconded',
    },
  ];

  //update handler :
  const _updateDischargeInitiated = async () => {
    try {
      await axios
        .post(`${api.baseurl}/UpdateDischargeInitiated`, {
          hospital_id: hospital_id,
          reception_id: _id,
          ip_id: ip_id,
          ip_no: ipno,
          patient_status: dischargeTypeDropdownValue,
        })
        .then(res => {
          const {status, message} = res.data;
          status === true
            ? navigation.navigate('Ehome')
            : console.warn(message);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const _dropdownFunction = () => {
    return (
      <>
        <View style={{width: '50%'}}>
          <DropDown
            mode={'outlined'}
            placeholder="Select"
            style={styles.dropdown}
            visible={showDischargeType}
            showDropDown={() => setDischargeType(true)}
            onDismiss={() => setDischargeType(false)}
            value={dischargeTypeDropdownValue}
            setValue={setDischargeTypeDropdownValue}
            list={_dischargetype?.map(res => ({
              label: res.label,
              value: res.value,
            }))}
          />
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
            navigation.navigate('QRScanner');
          }}
        />
        <Appbar.Content
          title="Discharge Initiation "
          style={styles.appbar_title}
        />
      </Appbar.Header>

      {/* section 1 */}
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.cardtitle}>Discharge</Text>
          </View>
          <View style={[styles.formDiv]}>
            <Text style={styles.formLabel}>UHID</Text>
            <Text style={styles.formLabel2}>{uhid} </Text>
          </View>
          <View style={styles.formDiv}>
            <Text style={styles.formLabel}>IP No.</Text>
            <Text style={styles.formLabel2}>{ipno} </Text>
          </View>
          <View style={[styles.formDiv]}>
            <Text style={styles.formLabel}>Patient Name</Text>
            <Text style={styles.formLabel2}>{firstname} </Text>
          </View>
          <View style={styles.formDiv}>
            <Text style={styles.formLabel}>Age / Sex </Text>
            <Text style={styles.formLabel2}>
              {patientage + '/' + patientgender}
            </Text>
          </View>
          <View style={styles.formDiv}>
            <Text style={styles.formLabel}>Discharge Status </Text>
            <Text style={styles.formLabel2}>Initiated </Text>
          </View>
          <View style={[styles.formDiv]}>
            <Text style={styles.formLabel}>Discharge Type </Text>
            {_dropdownFunction()}
          </View>
          <View style={styles.Grpbtn}>
            <Button mode="contained" onPress={_updateDischargeInitiated}>
              Update
            </Button>
            <Button
              mode="contained"
              onPress={() => setDischargeTypeDropdownValue(null)}
              style={{backgroundColor: 'grey'}}>
              Reset
            </Button>
          </View>
        </Card>
      </View>
    </>
  );
};

export default DischargeInitiation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 10,
  },
  appbar_title: {
    fontSize: 10,
  },
  header: {
    backgroundColor: '#8803fc',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  formDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    flexWrap: 'wrap',
    // width: 80,
  },
  formLabel2: {
    textAlign: 'left',
    width: 150,
    fontSize: 15,
    fontWeight: '600',
  },

  datePickerContainer: {
    alignItems: 'center',
    flex: 1,
    top: 100,
    zIndex: 10,
  },
  datePicker: {
    width: 300,
    height: 330,
    backgroundColor: '#d1e8ff',
    padding: 10,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: '#e6e8eb',
    shadowOpacity: 0.2,
    shadowOffset: {width: 10, height: 10},
  },
  Grpbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 12,
  },
  card: {
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  cardtitle: {
    fontWeight: '600',
    padding: 10,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  itemSelected: {
    textAlign: 'center',
  },
});
