import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import {
  Appbar,
  Button,
  Dialog,
  List,
  Portal,
  TextInput,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {Table, Row, Rows} from 'react-native-table-component';
import DateTimePicker from 'react-native-ui-datepicker';

const PatientDischargeTreatment = ({route}) => {
  const {userData} = useContext(UserContext);
  const patient_id = route?.params?.patient_id;
  const {_id, hospital_id} = userData.data[0];
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const navigation = useNavigation();
  //table content ....
  const [tableData, setTableData] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  const [visible, setVisible] = useState(false);

  const Themes = [{mainColor: '#F5803E', activeTextColor: '#fff'}];
  const [showCalender, setShowCalender] = useState(false);
  const [dateValues, setDateValues] = useState([]);
  const [datePickerIndex, setDatePickerIndex] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [temp, setTemp] = useState([]);
  const [drugCode, setDrugCode] = useState('');
  const [selectedDrugCode, setSelectedDrugCode] = useState('');
  const [visibleList, setVisibleList] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const hideDialog = () => setVisible(false);

  const keys = [
    'Sr.No',
    'Drug Name',
    'Drug Code',
    'Dosage',
    'Frequency',
    'Dose',
    'Duration (Days)',
    'Date / Time',
  ];

  // to set width of table ......
  useEffect(() => {
    // Set a specific width for the 'Sr.No' column, and the same width for the rest
    setWidthArr([
      32,
      120,
      120,
      120,
      120,
      120,
      120,
      120,
      ...Array(keys.length - 1).fill(1),
    ]);
  }, []);

  //get patient treatment history ......
  useEffect(() => {
    _fetchtreatmenthistory();
  }, [hospital_id, patient_id, _id]);

  const _fetchtreatmenthistory = async () => {
    try {
      const res = await axios.post(`${api.baseurl}/GetMobileTreatmentHistory`, {
        hospital_id: hospital_id,
        patient_id: patient_id,
        reception_id: _id,
      });

      const {status, message, data} = res.data;
      if (status === true) {
        setTreatmentHistory(data);
        const dataArray = data.map((res, index) => [
          index + 1,
          res.drugname,
          res.drugcode,
          res.dosage,
          res.frequency,
          res.dose,
          res.duration,
          `${res.dateadd} / ${res.timeadd}`,
        ]);
        setTableData(dataArray);
      } else {
        console.error(`${message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //calender .....
  const calenderHandler = index => {
    setShowCalender(true);
    setDatePickerIndex(index);
  };

  const handleDateChange = (date, index) => {
    const updatedTemp = [...temp];
    updatedTemp[index].dateValues = date;
    updatedTemp[index].activestatus = true;
    setTemp(updatedTemp);
    setShowCalender(false);
  };

  //currrent date  .....
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentdate = `${year}-${month}-${day}`;

  // current time .....
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const currenttime = `${hours}:${minutes}`;

  const _calender = () => {
    return (
      <>
        {showCalender && (
          <View style={styles.datePickerContainer}>
            <View style={styles.datePicker}>
              <DateTimePicker
                mode="calender"
                headerButtonColor={Themes[0]?.mainColor}
                selectedItemColor={Themes[0]?.mainColor}
                selectedTextStyle={{
                  fontWeight: 'bold',
                  color: Themes[0]?.activeTextColor,
                }}
                value={dateValues[datePickerIndex]}
                onValueChange={date => handleDateChange(date, datePickerIndex)}
              />
            </View>
          </View>
        )}
      </>
    );
  };
  const resetHandler = () => {
    setSearchInput('');
    setSelectedDrugCode('');
    setTemp([]);
    setVisibleList(false);
  };
  useEffect(() => {
    if (searchInput !== '') searchInputHandler();
  }, [searchInput]);

  useEffect(() => {
    // Update temp array when selectedDrugCode changes
    if (selectedDrugCode !== '') {
      const filteredData = selectedData.filter(
        res => res.drugcode === selectedDrugCode.drugcode,
      );
      setTemp(prevData => [...prevData, ...filteredData]);
    }
  }, [selectedDrugCode, selectedData]);

  const searchInputHandler = async () => {
    try {
      const response = await axios.post(
        `${api.baseurl}/search_prescription_data`,
        {
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: _id,
          text: searchInput,
        },
      );

      const _drugCode = response.data.data.map(res => ({
        drugcode: res.drugcode,
        drugname: res.drugname,
      }));

      setDrugCode(_drugCode);
      setSelectedData(response.data.data);
      setVisibleList(true);
    } catch (error) {
      console.error(error);
    }
  };

  const _treatmentForm = () => {
    return (
      <>
        <Text style={styles.heading}>Treatments</Text>
        <TextInput
          mode="flat"
          placeholder="Search Drug Code ..."
          style={[styles.input]}
          value={
            selectedDrugCode?.drugcode
              ? selectedDrugCode?.drugcode
              : searchInput
          }
          onChangeText={text => {
            setSearchInput(text), setSelectedDrugCode('');
          }}
          right={<TextInput.Icon icon="close" onPress={() => resetHandler()} />}
        />
        <ScrollView
          style={{
            zIndex: 1,
            maxHeight: drugCode.length > 0 && visibleList ? 200 : 0,
          }} // Set a higher zIndex for the ScrollView
          vertical={true}>
          {visibleList && (
            <View>
              {drugCode?.map((res, index) => (
                <List.Item
                  style={styles.listView}
                  title={res?.drugname}
                  key={res?.drugcode + index}
                  onPress={() => {
                    setSelectedDrugCode({
                      drugcode: res.drugcode,
                      drugname: res.drugname,
                    });
                    setVisibleList(false);
                  }}
                />
              ))}
            </View>
          )}
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.inputGroup}>
          {temp.length > 0 ? (
            temp.map((res, index) => {
              return (
                <View style={styles.card} key={index}>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Drug Code : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.drugcode}
                      onChangeText={text => {
                        // Update the value in temp array
                        const updatedTemp = [...temp];
                        updatedTemp[index].drugcode = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Drug Name : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.drugname}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].drugname = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Brand Name : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.brandname}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].brandname = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Dose : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.dose}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].dose = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Instruction : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.anupan}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].anupan = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Route : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.route}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].route = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Schedule : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.schedule}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].schedule = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>Days : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={res.duration}
                      onChangeText={text => {
                        const updatedTemp = [...temp];
                        updatedTemp[index].duration = text;
                        setTemp(updatedTemp);
                      }}
                      editable={true}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.label}>From Date : </Text>
                    <TextInput
                      mode="flat"
                      style={[styles.input2]}
                      value={temp[index].dateValues}
                      editable={false}
                      right={
                        <TextInput.Icon
                          icon="calendar"
                          onPress={() => calenderHandler(index)}
                        />
                      }
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <>
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Drug Code : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Drug Name : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Brand Name : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Dose : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Instruction : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Route : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Schedule : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>Days : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={true}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.label}>From Date : </Text>
                  <TextInput
                    mode="flat"
                    style={[styles.input2]}
                    value={''}
                    editable={false}
                  />
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </>
    );
  };

  //submit handler ....
  const submitTreatmenthandler = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileTreatment`, {
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: _id,
          dateadd: currentdate,
          timeadd: currenttime,
          medicineprescriptionarray: temp,
        })
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            setTemp([]);
            _fetchtreatmenthistory();
            setVisible(false);
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const _treatmentFormPopup = () => {
    return (
      <>
        <Portal style={styles.portal}>
          <Dialog visible={visible} onDismiss={hideDialog} style={styles.top}>
            <Dialog.Content>
              {_calender()}
              {_treatmentForm()}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setVisible(false), resetHandler();
                }}>
                Cancel
              </Button>
              <Button onPress={() => submitTreatmenthandler()}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>
    );
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
        <Appbar.Content
          title="Discharge Treatment History "
          titleStyle={styles.appbar_title}
        />
      </Appbar.Header>

      <View style={styles.container}>
        {_treatmentFormPopup()}
        <View style={styles.btn}>
          <Button
            mode="contained"
            style={{alignSelf: 'flex-end'}}
            onPress={() => setVisible(true)}>
            Add Treatment
          </Button>
        </View>
        <ScrollView horizontal={true} style={{padding: 10}}>
          <View style={{height: 580}}>
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
    </>
  );
};

export default PatientDischargeTreatment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  btn: {
    marginTop: 12,
    marginHorizontal: 8,
  },
  top: {
    borderRadius: 6,
  },
  datePickerContainer: {
    alignItems: 'center',
    flex: 1,
    top: 100,
    zIndex: 11,
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
    zIndex: 11,
  },
  input: {
    marginBottom: 8,
  },
  listView: {
    backgroundColor: '#ede8ed',
    marginBottom: 2,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  inputGroup: {
    gap: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 5,
  },
  label: {
    fontWeight: '600',
    color: 'black',
    width: 100,
  },
  input2: {
    paddingTop: 0,
    paddingLeft: 0,
    height: 35,
    width: 150,
    maxWidth: 155,
  },
});
