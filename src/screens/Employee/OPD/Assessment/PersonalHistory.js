import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {Appbar, Button, Card, RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';

const PersonalHistory = () => {
  const {patientsData, scannedPatientsData, waitingListData} =
    useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;
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
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 2,
      label: 'Coffee',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 3,
      label: 'Tobacco',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 4,
      label: 'Smoking',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 5,
      label: 'Alcohol',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 6,
      label: 'Drugs',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 7,
      label: 'Exercise',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 8,
      label: 'SoftDrink',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
    },
    {
      id: 9,
      label: 'Saltyfood',
      options: [
        {value: 'none', label: 'None'},
        {value: 'light', label: 'Light'},
        {value: 'moderate', label: 'Moderate'},
        {value: 'heavy', label: 'Heavy'},
      ],
      checked: 'none',
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
      label: item.label,
      checked: item.checked,
    };
  });
  const singleObject = {};
  _filterData.forEach(item => {
    singleObject[item.label] = item.checked;
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
      opdpersonalhistoryarray: [singleObject],
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            FetchMobileOpdAssessment();
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const [opdAssessment, setOpdAssessment] = useState([]);

  useEffect(() => {
    FetchMobileOpdAssessment();
    return () => {};
  }, [hospital_id, patient_id, reception_id]);
  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: hospital_id,
          reception_id: reception_id,
          patient_id: patient_id,
          appoint_id: appoint_id,
          api_type: 'OPD-PERSONAL-HISTORY',
          uhid: uhid,
          mobilenumber: mobilenumber || waitingListData?.mobilenumber,
        })
        .then(res => {
          setOpdAssessment(res.data.data);
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
      <ScrollView style={styles.container}>
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
            onPress={() => navigation.replace('MedicineHistory')}>
            Previous
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => submitTreatmenthandler()}>
            Submit
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('ObstetricsHistory')}>
            Next / Skip
          </Button>
        </View>
        {opdAssessment?.map((row, index) => {
          return (
            <Card style={styles.card2} key={index + 1}>
              <Card.Content key={index + 1}>
                <View style={styles.cardBodyHead}>
                  {row.opd_date && row.opd_time && (
                    <View style={[styles.cardBody, {gap: 10, width: 'auto'}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Date / Time :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row.opd_date} / {row.opd_time}
                      </Text>
                    </View>
                  )}
                  {row.Alcohol !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Alcohol :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Alcohol}
                      </Text>
                    </View>
                  )}
                  {row.Coffee !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Coffee :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Coffee}
                      </Text>
                    </View>
                  )}
                  {row.Drugs !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Drugs :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Drugs}
                      </Text>
                    </View>
                  )}
                  {row.Exercise !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Exercise :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Exercise}
                      </Text>
                    </View>
                  )}
                  {row.Saltyfood !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Salty food :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Saltyfood}
                      </Text>
                    </View>
                  )}
                  {row.SoftDrink !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Soft Drink :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.SoftDrink}
                      </Text>
                    </View>
                  )}
                  {row.Smoking !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Smoking :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Smoking}
                      </Text>
                    </View>
                  )}
                  {row.Tea !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Tea :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Tea}
                      </Text>
                    </View>
                  )}
                  {row.Tobacco !== 'none' && (
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Tobacco/Kharra :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.Tobacco}
                      </Text>
                    </View>
                  )}
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
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
    marginTop: 10,
  },
  card2: {
    marginTop: 10,
    marginHorizontal: 14,
    marginBottom: 10,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 150,
  },
  cardtext: {
    fontWeight: '600',
    color: 'black',
    width: 120,
  },
  cardtext2: {
    fontWeight: '600',
    flexWrap: 'wrap',
    textTransform: 'capitalize',
  },
  cardBodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
