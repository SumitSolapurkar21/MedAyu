import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {Appbar, Button, RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';

const PersonalHistory = () => {
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id} = scannedPatientsData;
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MedicineHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const navigation = useNavigation();
  const tableHead = ['SrNo.', 'Habit', 'None', 'Light', 'Moderate', 'Heavy'];

  const [tableData, setTableData] = useState([
    {
      id: 1,
      label: 'Tea',
      options: [
        {value: 'tea_none', label: 'None'},
        {value: 'tea_light', label: 'Light'},
        {value: 'tea_moderate', label: 'Moderate'},
        {value: 'tea_heavy', label: 'Heavy'},
      ],
      checked: 'tea_none',
    },
    {
      id: 2,
      label: 'Coffee',
      options: [
        {value: 'coffee_none', label: 'None'},
        {value: 'coffee_light', label: 'Light'},
        {value: 'coffee_moderate', label: 'Moderate'},
        {value: 'coffee_heavy', label: 'Heavy'},
      ],
      checked: 'coffee_none',
    },
    {
      id: 3,
      label: 'Tobacco /Kharra',
      options: [
        {value: 'tobaco_none', label: 'None'},
        {value: 'tobaco_light', label: 'Light'},
        {value: 'tobaco_moderate', label: 'Moderate'},
        {value: 'tobaco_heavy', label: 'Heavy'},
      ],
      checked: 'tobaco_none',
    },
    {
      id: 4,
      label: 'Smoking',
      options: [
        {value: 'smoking_none', label: 'None'},
        {value: 'smoking_light', label: 'Light'},
        {value: 'smoking_moderate', label: 'Moderate'},
        {value: 'smoking_heavy', label: 'Heavy'},
      ],
      checked: 'smoking_none',
    },
    {
      id: 5,
      label: 'Alcohol',
      options: [
        {value: 'alcohol_none', label: 'None'},
        {value: 'alcohol_light', label: 'Light'},
        {value: 'alcohol_moderate', label: 'Moderate'},
        {value: 'alcohol_heavy', label: 'Heavy'},
      ],
      checked: 'alcohol_none',
    },
    {
      id: 6,
      label: 'Drugs',
      options: [
        {value: 'drugs_none', label: 'None'},
        {value: 'drugs_light', label: 'Light'},
        {value: 'drugs_moderate', label: 'Moderate'},
        {value: 'drugs_heavy', label: 'Heavy'},
      ],
      checked: 'drugs_none',
    },
    {
      id: 7,
      label: 'Exercise',
      options: [
        {value: 'excercise_none', label: 'None'},
        {value: 'excercise_light', label: 'Light'},
        {value: 'excercise_moderate', label: 'Moderate'},
        {value: 'excercise_heavy', label: 'Heavy'},
      ],
      checked: 'excercise_none',
    },
    {
      id: 8,
      label: 'Soft Drink',
      options: [
        {value: 'soft_none', label: 'None'},
        {value: 'soft_light', label: 'Light'},
        {value: 'soft_moderate', label: 'Moderate'},
        {value: 'soft_heavy', label: 'Heavy'},
      ],
      checked: 'soft_none',
    },
    {
      id: 9,
      label: 'Salty food',
      options: [
        {value: 'salty_none', label: 'None'},
        {value: 'salty_light', label: 'Light'},
        {value: 'salty_moderate', label: 'Moderate'},
        {value: 'salty_heavy', label: 'Heavy'},
      ],
      checked: 'salty_none',
    },
  ]);

  const handleRadioChange = (itemId, value) => {
    const updatedTableData = tableData.map(item => {
      if (item.id === itemId) {
        return {...item, checked: value};
      }
      return item;
    });
    setTableData(updatedTableData);
  };

  const personalHistory_data = JSON.stringify(tableData);
  const parsedData = JSON.parse(personalHistory_data);

  const _filterData = parsedData.map(item => {
    return {
      id: item.id,
      label: item.label,
      checked: item.checked,
    };
  });

  const _tableData = tableData?.map(item => {
    const rowData = [item.id, item.label];
    item.options.forEach(option => {
      rowData.push(
        <RadioButton
          key={option.value}
          value={option.value}
          status={item.checked === option.value ? 'checked' : 'unchecked'}
          onPress={() => handleRadioChange(item.id, option.value)}
        />,
      );
    });
    return rowData;
  });

  const [widthArr, setWidthArr] = useState([]);

  useEffect(() => {
    setWidthArr([
      25,
      90,
      53,
      53,
      63,
      53,
      ...Array(tableHead.length - 1).fill(0),
    ]);
  }, []);

  //  submit handler ....
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: hospital_id,
      patient_id: patient_id,
      reception_id: reception_id,
      appoint_id: appoint_id,
      uhid: uhid,
      api_type: 'OPD-PERSONAL-HISTORY',
      opdpersonalhistoryarray: _filterData,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            navigation.navigate('ObstetricsHistory');
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('MedicineHistory');
          }}
        />
        <Appbar.Content title="Personal History " style={styles.appbar_title} />
      </Appbar.Header>
      {/* section 1 */}
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData}
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('MedicineHistory')}>
            Previous
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => submitTreatmenthandler()}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('ObstetricsHistory')}>
            Skip
          </Button>
        </View>
      </View>
    </>
  );
};

export default PersonalHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'left', color: 'black', fontSize: 11, marginLeft: 6},
  dataWrapper: {marginTop: -1},
  row: {
    height: 50,
  },
  cellText: {
    fontSize: 11,
    color: '#071bf5',
    marginLeft: 6,
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
