import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  RadioButton,
  List,
  TextInput,
  Button,
  Appbar,
  Card,
  SegmentedButtons,
  DefaultTheme,
} from 'react-native-paper';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
import { OpdpageNavigation } from './OpdpageNavigation';

const OpdDiagnosis = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState({});
  const [checked, setChecked] = useState('');
  const [searchDiagnosisData, setSearchDiagnosisData] = useState([]);
  const [visibleList, setVisibleList] = useState(false);
  const [value, setValue] = useState('Medical');

  const [widthArr, setWidthArr] = useState([]);
  const [diagnosisArray, setDiagnosisArray] = useState([]);

  const keys = [
    'Sr.No',
    'ICD Code',
    'Diagnosis',
    'Diagnosis Type',
    'Date/Time',
    'Action',
  ];

  // to set width of table ......
  useEffect(() => {
    // Set a specific width for the 'Sr.No' column, and the same width for the rest
    setWidthArr([60, ...Array(keys.length - 1).fill(110)]);
  }, []);

  const { patientsData, scannedPatientsData, waitingListData, userData } =
    useContext(UserContext);
  const { hospital_id, patient_id, reception_id, uhid } = patientsData;
  const { appoint_id, mobilenumber } = scannedPatientsData;

  useEffect(() => {
    if (searchQuery != '') search_Diagnosis_data();
  }, [searchQuery]);

  //   search_Mobile_Diagnosis_data ......
  const search_Diagnosis_data = async () => {
    try {
      await axios
        .post(`${api.baseurl}/search_Mobile_Diagnosis_data`, {
          text: searchQuery,
          hospital_id: userData?.hospital_id,
          reception_id: userData?._id,
          type: value,
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
  let icdcode = selectedDiagnosis?.icdcode;

  const [visible1, setVisible1] = useState(false);

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('SystemicExamination');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //add mobile diagnosis ....
  const AddMobileDiagnosis = async () => {
    try {
      // Validate if searchQuery is empty
      if (!searchQuery.trim()) {
        setVisible1(true);
        return;
      }

      const opddiagnosishistoryarray = {
        reception_id: userData?._id,
        hospital_id: userData?.hospital_id,
        patient_id: patient_id,
        api_type: 'OPD-DIAGNOSIS',
        appoint_id: waitingListData?.appoint_id || appoint_id,
        opddiagnosishistoryarray: diagnosisArray,
        type: value,
        icdcode: icdcode,
      };

      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, opddiagnosishistoryarray)
        .then(res => {
          if (res.data.status === false) {
            Alert.alert('Error', `${res.data.message}`);
          } else {
            setSearchQuery('');
            setSelectedDiagnosis({});
            setChecked('');
            setDiagnosisArray([]);
            FetchMobileOpdAssessment();
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
        appoint_id: waitingListData?.appoint_id || appoint_id,
        type: value,
        icdcode: icdcode,
      },
    ];
    setDiagnosisArray(prev => [...prev, ..._data]);
  };
  const [opdAssessment, setOpdAssessment] = useState([]);

  useEffect(() => {
    FetchMobileOpdAssessment();
  }, [hospital_id, patient_id, reception_id, value]);
  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: userData?.hospital_id,
          reception_id: userData?._id,
          patient_id: patient_id,
          appoint_id: waitingListData?.appoint_id || appoint_id,
          api_type: 'OPD-DIAGNOSIS',
          uhid: uhid,
          mobilenumber: waitingListData?.mobilenumber || mobilenumber,
          type: value,
        })
        .then(res => {
          setOpdAssessment(res.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // remove selected data handler ....
  const _removeSelectedDataHandler = _id => {
    // Filter out data with the specified id
    const updatedSelectedRow = diagnosisArray?.filter(
      row => row.illness_id !== _id,
    );
    setDiagnosisArray(updatedSelectedRow);
  };

  const _handleMore = () => {
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const theme = {
    ...DefaultTheme,
    roundness: 0, // Set roundness to 0 to remove borderRadius
  };

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('SystemicExamination');
          }}
        />
        <Appbar.Content title="Diagnosis" style={styles.appbar_title} />
        <Appbar.Action
          icon="account-details"
          size={30}
          onPress={() => openMenu()}
        />
      </Appbar.Header>
      <OpdpageNavigation
        closeMenu={closeMenu}
        openMenu={openMenu}
        _handleMore={_handleMore}
        visible={visible}
      />
      <SegmentedButtons
        style={{ padding: 10 }}
        theme={theme}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'Medical',
            label: 'Medical',
          },
          {
            value: 'Ayurvedic',
            label: 'Ayurvedic',
          },
        ]}
      />
      <ScrollView vertical style={styles.container}>
        <View style={styles.cardd}>
          <View style={styles.search}>
            <Text style={styles.searchTxt}>Diagnosis</Text>
            <TextInput
              mode="view"
              placeholder="Search"
              style={{ height: 40 }}
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
              style={{ zIndex: 1 }} // Set a higher zIndex for the ScrollView
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
                          icdcode: res.icdcode,
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
          <ScrollView horizontal={true} style={{ padding: 10 }}>
            <View style={{ height: 'auto' }}>
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
                <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                  <Rows
                    // data={tableData}
                    data={diagnosisArray?.map((row, index) => [
                      index + 1,
                      row.icdcode,
                      row.illnessname,
                      row.diagnosis_type,
                      `${row.adddate} / ${row.addtime}`,
                      <IconButton
                        icon="trash-can"
                        iconColor={MD3Colors.error50}
                        size={20}
                        onPress={() =>
                          _removeSelectedDataHandler(row?.illness_id)
                        }
                      />,
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
            onPress={() => navigation.replace('SystemicExamination')}>
            Previous
          </Button>
          <Button mode="contained" onPress={() => AddMobileDiagnosis()}>
            Submit
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdInvestigation')}>
            Next / Skip
          </Button>
        </View>

        {opdAssessment.length > 0 &&
          opdAssessment?.map((row, index) => {
            return (
              <Card style={styles.card2} key={index + 1}>
                <Card.Content>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, { gap: 8 }]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        ICD Code :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.icdcode}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, { gap: 8 }]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Illness :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.illnessname}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, { gap: 8 }]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Diagnosis Type :
                      </Text>
                      <Text variant="titleLarge" style={[styles.cardtext2]}>
                        {row?.diagnosis_type}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={styles.cardBodyHead}> */}

                  <View style={[styles.cardBody, { gap: 10, width: 'auto' }]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Date / Time :
                    </Text>
                    <Text variant="titleLarge" style={styles.cardtext2}>
                      {row.opd_date} / {row.opd_time}
                    </Text>
                  </View>
                  {/* </View> */}
                </Card.Content>
              </Card>
            );
          })}
      </ScrollView>
    </>
  );
};

export default OpdDiagnosis;
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
  head: { height: 40, backgroundColor: '#80aaff' },
  text: { textAlign: 'left', color: 'black', marginLeft: 8 },
  dataWrapper: { marginTop: -1 },
  row: { height: 50 },
  listView: {
    backgroundColor: '#ede8ed',
    overflow: 'visible',
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  card2: {
    marginHorizontal: 12,
    marginVertical: 10,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // width: 140,
  },
  cardtext: {
    fontWeight: '600',
    color: 'black',
    width: 90,
  },
  cardtext2: {
    fontWeight: '600',
    flexWrap: 'wrap',
    width: 300,
  },
  cardBodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
