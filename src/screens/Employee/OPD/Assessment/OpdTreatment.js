import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, BackHandler} from 'react-native';
import {Appbar, Button, Card, List, TextInput} from 'react-native-paper';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import DateTimePicker from 'react-native-ui-datepicker';
import {useNavigation} from '@react-navigation/native';
import {IconButton, MD3Colors} from 'react-native-paper';

const OpdTreatment = () => {
  const {patientsData, scannedPatientsData, waitingListData} =
    useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('OpdPlanOfCare');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [drugCode, setDrugCode] = useState('');
  const [selectedDrugCode, setSelectedDrugCode] = useState('');
  const [visibleList, setVisibleList] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [dateValues] = useState([]);
  const [datePickerIndex, setDatePickerIndex] = useState([]);

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
          reception_id: reception_id,
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
    //     setVisibleList(false);
  };
  const Themes = [{mainColor: '#F5803E', activeTextColor: '#fff'}];

  const calenderHandler = index => {
    setShowCalender(true);
    setDatePickerIndex(index); // Set the index of the date field for which the calendar is being opened
  };

  const handleDateChange = (date, index) => {
    const [_dateformat] = date.split(' ');
    const updatedTemp = [...temp];
    updatedTemp[index].dateValues = _dateformat; // Update the dateValues property in the temp array
    updatedTemp[index].activestatus = true;
    setTemp(updatedTemp);
    setShowCalender(false); // Hide the calendar after selecting a date
  };

  //submit handler ....
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: hospital_id,
      patient_id: patient_id,
      reception_id: reception_id,
      appoint_id: appoint_id,
      uhid: uhid,
      api_type: 'OPD-TREATMENT',
      opdtreatmenthistoryarray: temp,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
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
          hospital_id: hospital_id,
          reception_id: reception_id,
          patient_id: patient_id,
          appoint_id: appoint_id,
          api_type: 'OPD-TREATMENT',
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

  // remove selected data handler ....
  const _removeSelectedDataHandler = _id => {
    // Filter out data with the specified id
    const updatedSelectedRow = temp?.filter(row => row.prescription_id !== _id);
    setTemp(updatedSelectedRow);
  };

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('OpdPlanOfCare');
          }}
        />
        <Appbar.Content title="Treatment" style={styles.appbar_title} />
      </Appbar.Header>
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
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>OPD Treatments</Text>
        <TextInput
          mode="outlined"
          label="Drug Code"
          placeholder="Search Drug Code ..."
          style={[styles.input, {marginHorizontal: 14}]}
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
            marginHorizontal: 14,
            maxHeight: drugCode.length > 0 && visibleList ? 200 : 0,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.inputGroup}>
          {temp.map((res, index) => {
            return (
              <View style={styles.card} key={index + 1}>
                <View style={styles.cardContentDiv}>
                  <Text style={[styles.label, {width: 200, marginLeft: 10}]}>
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
          })}

          <Button
            mode="contained"
            style={[styles.btn, {alignSelf: 'flex-start'}]}
            onPress={() => resetHandler()}>
            Add More
          </Button>
        </ScrollView>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.replace('OpdPlanOfCare')}>
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
            onPress={() => navigation.navigate('OpdProcedure')}>
            Next / Skip
          </Button>
        </View>

        {opdAssessment.length > 0 &&
          opdAssessment?.map((row, index) => {
            return (
              <Card style={styles.card2} key={index + 1}>
                <Card.Content>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Drugcode :
                      </Text>
                      <Text variant="titleLarge" style={styles.cardtext2}>
                        {row?.drugcode}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Drugname :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.drugname}
                    </Text>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Brandname :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.brandname}
                    </Text>
                  </View>
                  <View style={styles.cardBodyHead}>
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Dose :
                      </Text>
                      <Text variant="titleLarge" style={[styles.cardtext2]}>
                        {row?.dose}
                      </Text>
                    </View>
                    <View style={[styles.cardBody, {gap: 8}]}>
                      <Text variant="titleLarge" style={styles.cardtext}>
                        Route :
                      </Text>
                      <Text variant="titleLarge" style={[styles.cardtext2]}>
                        {row?.route}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Anupan :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.anupan}
                    </Text>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      Schedule :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.schedule}
                    </Text>
                  </View>
                  <View style={[styles.cardBody, {gap: 8}]}>
                    <Text variant="titleLarge" style={styles.cardtext}>
                      From Date :
                    </Text>
                    <Text variant="titleLarge" style={[styles.cardtext2]}>
                      {row?.dateValues}
                    </Text>
                  </View>

                  {/* <View style={styles.cardBodyHead}> */}

                  <View style={[styles.cardBody, {gap: 10, width: 'auto'}]}>
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

export default OpdTreatment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontWeight: '600',
    fontSize: 18,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  inputGroup: {
    marginHorizontal: 14,
    gap: 4,
  },
  input: {
    marginBottom: 8,
  },
  input2: {
    paddingTop: 0,
    paddingLeft: 0,
    height: 45,
    width: '100%',
  },
  addButton: {
    marginVertical: 10,
    marginHorizontal: 14,
    alignSelf: 'flex-end',
  },
  btn: {
    marginVertical: 12,
    alignSelf: 'center',
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
  },
  cardContent: {
    flexDirection: 'column',
    padding: 12,
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
    shadowOffset: {width: 10, height: 10},
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'center', color: 'black', padding: 2},
  row: {height: 'auto'},

  card2: {
    marginHorizontal: 14,
    marginVertical: 10,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cardtext: {
    fontWeight: '600',
    color: 'black',
    width: 80,
  },
  cardtext2: {
    fontWeight: '600',
    flexWrap: 'wrap',
    width: 230,
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
});
