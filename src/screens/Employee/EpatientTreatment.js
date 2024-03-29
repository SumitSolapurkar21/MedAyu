import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Dialog, List, Portal, TextInput} from 'react-native-paper';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';
import DateTimePicker from 'react-native-ui-datepicker';
import {useNavigation} from '@react-navigation/native';

const EpatientTreatment = () => {
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

  const [visibleMsg, setVisibleMsg] = useState(false);

  const hideDialog = () => {
    setVisibleMsg(false);
    navigation.navigate('EpatientTreatmentHistory');
  };

  const {patientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;

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
    const updatedTemp = [...temp];
    updatedTemp[index].dateValues = date; // Update the dateValues property in the temp array
    updatedTemp[index].activestatus = true;
    setTemp(updatedTemp);
    setShowCalender(false); // Hide the calendar after selecting a date
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
  //submit handler ....
  const submitTreatmenthandler = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileTreatment`, {
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
          dateadd: currentdate,
          timeadd: currenttime,
          medicineprescriptionarray: temp,
        })
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            setVisibleMsg(true);
            setTemp([]);
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* success popup ... */}
      <Portal>
        <Dialog visible={visibleMsg}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Treatment Is Added Successfully !</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* success popup end .... */}
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
      <Text style={styles.heading}>Treatments</Text>
      <TextInput
        mode="outlined"
        label="Drug Code"
        placeholder="Search Drug Code ..."
        style={[styles.input, {marginHorizontal: 14}]}
        value={
          selectedDrugCode?.drugcode ? selectedDrugCode?.drugcode : searchInput
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
            {drugCode?.map(res => (
              <List.Item
                style={styles.listView}
                title={res?.drugname}
                key={res?.drugcode}
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
          onPress={() => submitTreatmenthandler()}>
          Save
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate('EpatientTreatmentHistory')}>
          History
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate('EpatientTreatmentPrescription')}>
          Prescription
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EpatientTreatment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    //     backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingLeft: 0,
    height: 35,
    width: 210,
    maxWidth: 220,
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
    flexDirection: 'row',
    padding: 5,
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
});
