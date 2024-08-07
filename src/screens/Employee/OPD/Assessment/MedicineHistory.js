import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Card, List, TextInput } from 'react-native-paper';
import api from '../../../../../api.json';
import DateTimePicker from 'react-native-ui-datepicker';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../../../components/Context/Context';
import { IconButton, MD3Colors } from 'react-native-paper';
import { OpdpageNavigation } from './OpdpageNavigation';

const MedicineHistory = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [drugCode, setDrugCode] = useState('');
  const [selectedDrugCode, setSelectedDrugCode] = useState('');
  const [visibleList, setVisibleList] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [dateValues, setDateValues] = useState([]);
  const [datePickerIndex, setDatePickerIndex] = useState([]);

  const { patientsData, scannedPatientsData, waitingListData, userData } =
    useContext(UserContext);
  const { hospital_id, patient_id, reception_id, uhid } = patientsData;
  const { appoint_id, mobilenumber } = scannedPatientsData;

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('FamilyHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (searchInput !== '') searchInputHandler();
  }, [searchInput]);

  useEffect(() => {
    // Update temp array when selectedDrugCode changes
    if (selectedDrugCode !== '') {
      const filteredData = selectedData.filter(
        res => res.drugcode === selectedDrugCode.drugcode,
      );
      setTemp(prevData => [...filteredData, ...prevData]);
    }
  }, [selectedDrugCode, selectedData]);

  const searchInputHandler = async () => {
    try {
      const response = await axios.post(
        `${api.baseurl}/search_prescription_data`,
        {
          hospital_id: userData?.hospital_id,
          patient_id: patient_id,
          reception_id: userData?._id,
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

  const resetHandler = () => {
    setSearchInput('');
    setSelectedDrugCode('');
    //     setTemp([]);
    setVisibleList(false);
  };
  const Themes = [{ mainColor: '#F5803E', activeTextColor: '#fff' }];

  const calenderHandler = index => {
    setShowCalender(true);
    setDatePickerIndex(index); // Set the index of the date field for which the calendar is being opened
  };

  const handleDateChange = async (date, index) => {
    const [_dateformat] = date.split(' ');
    const updatedTemp = [...temp];
    updatedTemp[index].activestatus = true;
    updatedTemp[index].dateValues = _dateformat; // Store the selected date in the temp array
    const updatedDateValues = [...dateValues];
    updatedDateValues[index] = _dateformat;
    setDateValues(updatedDateValues);

    // updatedTemp[index].treatment_status = p_category;
    try {
      await axios
        .post(`${api.baseurl}/GetMobiledatedetails`, {
          date: _dateformat,
        })
        .then(res => {
          // const updatedTemp = [...temp];
          updatedTemp[index] = {
            ...updatedTemp[index],
            days: res.data.days.toString(),
            months: res.data.month.toString(),
            years: res.data.year.toString(),
          };
          setTemp(updatedTemp);

          setShowCalender(false);
        });
    } catch (error) {
      Alert.alert('Error !!', `${error}`);
    }
  };

  //submit handler ....
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: patient_id,
      reception_id: userData?._id,
      appoint_id: waitingListData?.appoint_id || appoint_id,
      uhid: uhid,
      api_type: 'OPD-MEDICINE-HISTORY',
      opdmedicinehistoryarray: temp,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const { status, message } = res.data;
          if (status === true) {
            setTemp([]);
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
  }, [hospital_id, patient_id, reception_id]);

  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: userData?.hospital_id,
          reception_id: userData?._id,
          patient_id: patient_id,
          appoint_id: waitingListData?.appoint_id || appoint_id,
          api_type: 'OPD-MEDICINE-HISTORY',
          uhid: uhid,
          mobilenumber: waitingListData?.mobilenumber || mobilenumber,
        })
        .then(res => {
          const DATA = JSON.stringify(res.data.data);
          const parsedData = JSON.parse(DATA);
          const filteredData = parsedData.filter(item =>
            Object.values(item).some(
              value => Array.isArray(value) && value.length > 0,
            ),
          );
          const filteredString = JSON.stringify(filteredData);
          const parsedData2 = JSON.parse(filteredString);
          setOpdAssessment(parsedData2);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // remove selected data handler ....
  const _removeSelectedDataHandler = _id => {
    // Filter out data with the specified id
    const updatedSelectedRow = temp?.filter(row => row.prescription_id !== _id);
    setTemp(updatedSelectedRow);
  };

  const displayData = opdAssessment.map((item, index) => (
    <ScrollView showsVerticalScrollIndicator={false} vertical style={{ maxHeight: '100%' }} key={index}>
      {Object.entries(item).map(([key, value]) => (
        <Card style={styles.card} key={key} >
          {Array.isArray(value) ? (
            <Text style={{ lineHeight: 20, width: 300 }}>{value.join('\n')}</Text>
          ) : null}
        </Card>
      ))}
    </ScrollView>
  ));

  const _handleMore = () => {
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('FamilyHistory');
          }}
        />
        <Appbar.Content title="Medicine History" />
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

      <View style={styles.container}>
        {showCalender && (
          <View style={styles.datePickerContainer}>
            <View style={styles.datePicker}>
              <DateTimePicker
                mode="date"
                headerButtonColor={Themes[0]?.mainColor}
                selectedItemColor={Themes[0]?.mainColor}
                selectedTextStyle={{
                  fontWeight: 'bold',
                  color: Themes[0]?.activeTextColor,
                }}
                value={dateValues[datePickerIndex]} // Use separate state variable for each date field
                onValueChange={date => handleDateChange(date, datePickerIndex)} // Pass the index to identify which date field is being modified
              />
            </View>
          </View>
        )}

        <View style={styles.searchInput}>
          <Text style={styles.heading}>Medicine History</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

            <TextInput
              mode="outlined"
              label="Medicine Name"
              placeholder="Medicine Name"
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
            <Button
              mode="contained"
              style={[styles.btn]}
              onPress={() => resetHandler()}>
              Add More
            </Button>
          </View>
          <ScrollView
            style={{
              zIndex: 1,
              marginHorizontal: 0,
              maxHeight: 200,
            }} // Set a higher zIndex for the ScrollView
            vertical={true}>
            {visibleList && (
              <View>
                {drugCode?.map((res, index) => (
                  <List.Item
                    style={styles.listView}
                    title={res?.drugname}
                    key={index + 1}
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
        </View>

        <View>
          <ScrollView style={{ maxHeight: 280 }}>
            <View>
              <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                style={styles.inputGroup}>
                {temp?.map((res, index) => {
                  return (
                    <View style={styles.card} key={index + 1}>
                      <View style={styles.cardContentDiv}>
                        <Text style={[styles.label, { width: 200 }]}>
                          Drug Name : &nbsp; {res.drugname}
                        </Text>
                        <IconButton
                          icon="trash-can"
                          iconColor={MD3Colors.error50}
                          size={20}
                          onPress={() =>
                            _removeSelectedDataHandler(res?.prescription_id)
                          }
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
                      <View style={styles.cardContent}>
                        <Text style={styles.label}>Years : </Text>
                        <TextInput
                          mode="flat"
                          style={[styles.input2]}
                          value={res.years}
                          onChangeText={text => {
                            const updatedTemp = [...temp];
                            updatedTemp[index].years = text;
                            setTemp(updatedTemp);
                          }}
                          editable={true}
                        />
                      </View>
                      <View style={styles.cardContent}>
                        <Text style={styles.label}>Months : </Text>
                        <TextInput
                          mode="flat"
                          style={[styles.input2]}
                          value={res.months}
                          onChangeText={text => {
                            const updatedTemp = [...temp];
                            updatedTemp[index].months = text;
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
                          value={res.days}
                          onChangeText={text => {
                            const updatedTemp = [...temp];
                            updatedTemp[index].days = text;
                            setTemp(updatedTemp);
                          }}
                          editable={true}
                        />
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
        </View>


        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.replace('FamilyHistory')}>
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
            onPress={() => navigation.navigate('PersonalHistory')}>
            Next / Skip
          </Button>
        </View>


        <ScrollView vertical showsVerticalScrollIndicator={false} style={{ maxHeight: temp?.length > 0 ? 180 : '85%' }}  >{displayData}</ScrollView>
      </View>
    </>
  );
};

export default MedicineHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 10,
  },
  inputGroup: {
    marginHorizontal: 14,
    // maxHeight: '100%',
  },
  input: {
    marginBottom: 8,
    width: 200,
  },
  input2: {
    backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingLeft: 0,
    height: 35,
    width: 210,
    maxWidth: 220,
  },

  btn: {
    marginVertical: 12,

  },
  listView: {
    backgroundColor: '#ede8ed',
    marginBottom: 2,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  card: {
    borderWidth: 0.7,
    borderRadius: 6,
    marginBottom: 10,
    marginRight: 6,
    padding: 10,
    marginHorizontal: 12
  },
  cardContent: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    color: 'black',
    width: 100,
  },
  para: {
    fontWeight: '600',
    flexWrap: 'wrap',
    width: 225,
    maxWidth: 225,
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
    shadowOffset: { width: 10, height: 10 },
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: "center",
    gap: 10,
    padding: 6,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginHorizontal: 6,
    width: '200%',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  head: { height: 40, backgroundColor: '#80aaff' },
  text: { textAlign: 'center', color: 'black', padding: 2 },
  row: { height: 'auto' },

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
  },
  cardtext2: {
    fontWeight: '600',
    flexWrap: 'wrap',
    // width: 100,
  },
  cardBodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardContentDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchInput: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
});
