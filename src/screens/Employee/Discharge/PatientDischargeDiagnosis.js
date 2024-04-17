import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Searchbar,
  RadioButton,
  List,
  TextInput,
  Button,
  Snackbar,
  DataTable,
  Portal,
  Dialog,
  Appbar,
} from 'react-native-paper';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {Table, Row, Rows} from 'react-native-table-component';
import {useNavigation} from '@react-navigation/native';

const PatientDischargeDiagnosis = ({route}) => {
  const navigation = useNavigation();
  const _patientid = route?.params?.patient_id;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState({});
  const [checked, setChecked] = useState('');
  const [searchDiagnosisData, setSearchDiagnosisData] = useState([]);
  const [visibleList, setVisibleList] = useState(false);
  //table content ....
  const [tableData, setTableData] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  const keys = [
    'Sr.No',
    'Diagnosis',
    'Diagnosis Type',
    'Entry By',
    'Date/Time',
  ];

  // to set width of table ......
  useEffect(() => {
    // Set a specific width for the 'Sr.No' column, and the same width for the rest
    setWidthArr([32, ...Array(keys.length - 1).fill(170)]);
  }, []);

  const {userData} = useContext(UserContext);
  const {hospital_id, _id} = userData;

  useEffect(() => {
    if (searchQuery != '') search_Diagnosis_data();
  }, [searchQuery]);

  //   search_Mobile_Diagnosis_data ......
  const search_Diagnosis_data = async () => {
    try {
      await axios
        .post(`${api.baseurl}/search_Mobile_Diagnosis_data`, {
          text: searchQuery,
          hospital_id: hospital_id,
        })
        .then(res => {
          if (res.data.status === false) {
            console.error('data not received');
          } else {
            const data = res.data.data;
            setSearchDiagnosisData(data);
            setVisibleList(true);
            setSelectedDiagnosis([]);
            return data;
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  let ILLNESSNAME = selectedDiagnosis?.illnessname;
  let ILLNESSID = selectedDiagnosis?.illness_id;

  const [visible1, setVisible1] = useState(false);
  const [visibleMsg, setVisibleMsg] = useState(false);
  //add mobile diagnosis ....
  const AddMobileDiagnosis = async () => {
    try {
      // Validate if searchQuery is empty
      if (!searchQuery.trim()) {
        setVisible1(true);
        return;
      }
      await axios
        .post(`${api.baseurl}/AddMobileDiagnosis`, {
          reception_id: _id,
          hospital_id: hospital_id,
          patient_id: _patientid,
          illnessname: ILLNESSNAME,
          illness_id: ILLNESSID,
          diagnosis_type: checked,
        })
        .then(res => {
          if (res.data.status === false) {
          } else {
            setVisibleMsg(true);
            FetchMobileDiagnosis();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchMobileDiagnosis();
  }, [_patientid]);
  //add mobile diagnosis ....
  const FetchMobileDiagnosis = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileDiagnosis`, {
          reception_id: _id,
          hospital_id: hospital_id,
          patient_id: _patientid,
        })
        .then(res => {
          if (res.data.status === false) {
            console.error('Data Not Received');
          } else {
            const data = res.data.data;
            const dataArray = data.map((res, index) => [
              index + 1,
              res.illnessname,
              res.diagnosis_type,
              res.name,
              `${res.diagnosis_date} / ${res.diagnosis_time}`,
            ]);
            setTableData(dataArray);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const submithandler = () => {
    AddMobileDiagnosis();
    setSearchQuery('');
    setSelectedDiagnosis({});
    setChecked('');
  };
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('PatientDischargeHistory');
          }}
        />
        <Appbar.Content title="Diagnosis" />
      </Appbar.Header>
      <View style={styles.container}>
        {visibleMsg && (
          <Portal>
            <Dialog visible={visibleMsg}>
              <Dialog.Title>Success</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">Diagnosis Data Inserted </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setVisibleMsg(false)}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}

        <View style={styles.card}>
          <View style={styles.search}>
            <Text style={styles.searchTxt}>Diagnosis</Text>
            <TextInput
              mode="view"
              placeholder="Search"
              style={{height: 40}}
              onChangeText={setSearchQuery}
              value={
                selectedDiagnosis?.illnessname
                  ? selectedDiagnosis?.illnessname
                  : searchQuery
              }
              right={
                <TextInput.Icon
                  icon="account-search"
                  onPress={() => search_Diagnosis_data()}
                  size={30}
                />
              }
              error={visible1}
              helperText={visible1 ? 'Input is required.' : ''}
              editable={true} // Set editable to true
            />
            <ScrollView
              style={{zIndex: 1}} // Set a higher zIndex for the ScrollView
              vertical={true}>
              {visibleList && (
                <View>
                  {searchDiagnosisData?.map(res => (
                    <List.Item
                      style={styles.listView}
                      title={res?.illnessname}
                      key={res?.illness_id}
                      onPress={() => {
                        setSelectedDiagnosis({
                          illnessname: res.illnessname,
                          illness_id: res.illness_id,
                        });
                        setVisibleList(false);
                      }}
                    />
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
          <View style={styles.search}>
            <Text style={styles.searchTxt}>Diagnosis Type</Text>
            <View style={styles.radioViews}>
              <View style={styles.radioView}>
                <Text style={styles.radioTxt}>Provisional</Text>
                <RadioButton
                  value="provisional"
                  status={checked === 'provisional' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('provisional')}
                />
              </View>
              <View style={styles.radioView}>
                <Text style={styles.radioTxt}>Final</Text>
                <RadioButton
                  value="final"
                  status={checked === 'final' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('final')}
                />
              </View>
            </View>
          </View>
          <View style={styles.btn}>
            <Button mode="contained" onPress={() => submithandler()}>
              Save
            </Button>
          </View>
          <ScrollView horizontal={true} style={{padding: 10}}>
            <View style={{height: 400}}>
              <Table
                borderStyle={{
                  borderWidth: 1,
                  borderColor: 'gray',
                }}>
                <Row
                  data={keys}
                  widthArr={widthArr}
                  style={styles.head}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView
                vertical
                style={styles.dataWrapper}
                nestedScrollEnabled={true}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                  <Rows
                    data={tableData}
                    widthArr={widthArr}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default PatientDischargeDiagnosis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  searchTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  radioViews: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    width: 100,
    alignSelf: 'center',
  },
  table: {
    marginHorizontal: 14,
    borderWidth: 0.8,
    borderColor: '#000',
    borderRadius: 6,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'left', color: 'black', marginLeft: 10, fontSize: 12},
  dataWrapper: {marginTop: -1},
  row: {height: 45},
  listView: {
    backgroundColor: '#ede8ed',
    overflow: 'visible',
  },
});
