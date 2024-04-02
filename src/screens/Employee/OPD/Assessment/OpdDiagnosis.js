import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  RadioButton,
  List,
  TextInput,
  Button,
  Snackbar,
  Appbar,
} from 'react-native-paper';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import {Table, Row, Rows} from 'react-native-table-component';
import {useNavigation} from '@react-navigation/native';

const OpdDiagnosis = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState({});
  const [checked, setChecked] = useState('');
  const [visible, setVisible] = useState(false);
  const [searchDiagnosisData, setSearchDiagnosisData] = useState([]);
  const [visibleList, setVisibleList] = useState(false);

  const [widthArr, setWidthArr] = useState([]);
  const [diagnosisArray, setDiagnosisArray] = useState([]);

  const keys = [
    'Sr.No',
    'Diagnosis',
    'Diagnosis Type',
    // 'Entry By',
    'Date/Time',
  ];

  // to set width of table ......
  useEffect(() => {
    // Set a specific width for the 'Sr.No' column, and the same width for the rest
    setWidthArr([60, ...Array(keys.length - 1).fill(170)]);
  }, []);

  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id} = scannedPatientsData;

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

  //add mobile diagnosis ....
  const AddMobileDiagnosis = async () => {
    try {
      // Validate if searchQuery is empty
      if (!searchQuery.trim()) {
        setVisible1(true);
        return;
      }

      const opddiagnosishistoryarray = {
        reception_id: reception_id,
        hospital_id: hospital_id,
        patient_id: patient_id,
        api_type: 'OPD-DIAGNOSIS',
        appoint_id: appoint_id,
        opddiagnosishistoryarray: diagnosisArray,
      };
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, opddiagnosishistoryarray)
        .then(res => {
          if (res.data.status === false) {
            const message = res.data;
            console.error(message);
          } else {
            setSearchQuery('');
            setSelectedDiagnosis({});
            setChecked('');
            setDiagnosisArray([]);
            navigation.navigate('OpdInvestigation');
            // FetchMobileDiagnosis();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentdate = `${year}-${month}-${day}`;

  // current time .....
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const currenttime = `${hours}:${minutes}`;

  const submithandler = () => {
    const _data = [
      {
        illnessname: ILLNESSNAME,
        illness_id: ILLNESSID,
        diagnosis_type: checked,
        adddate: currentdate,
        addtime: currenttime,
        api_type: 'OPD-DIAGNOSIS',
        uhid: uhid,
        appoint_id: appoint_id,
      },
    ];
    setDiagnosisArray(prev => [...prev, ..._data]);

    // AddMobileDiagnosis();
    // setSearchQuery('');
    // setSelectedDiagnosis({});
    // setChecked('');
  };

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('SystemicExamination');
          }}
        />
        <Appbar.Content title="OPD Diagnosis" style={styles.appbar_title} />
      </Appbar.Header>
      <View style={styles.container}>
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
              Add
            </Button>
          </View>
          <ScrollView horizontal={true} style={{padding: 10}}>
            <View style={{height: 350}}>
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
                    // data={tableData}
                    data={diagnosisArray?.map((row, index) => [
                      index + 1,
                      row.illnessname,
                      row.diagnosis_type,
                      `${row.adddate} / ${row.addtime}`,
                      // row.time,
                      // row.frequency,
                    ])}
                    widthArr={widthArr}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('SystemicExamination')}>
            Previous
          </Button>
          <Button mode="contained" onPress={() => AddMobileDiagnosis()}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdInvestigation')}>
            Skip
          </Button>
        </View>
      </View>
    </>
  );
};

export default OpdDiagnosis;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  text: {textAlign: 'center', color: 'black'},
  dataWrapper: {marginTop: -1},
  row: {height: 50},
  listView: {
    backgroundColor: '#ede8ed',
    overflow: 'visible',
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
