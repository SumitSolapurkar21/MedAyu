import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Dialog,
  IconButton,
  List,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import UserContext from '../../components/Context/Context';
import api from '../../../api.json';
import axios from 'axios';
import DateTimePicker from 'react-native-ui-datepicker';
import {useNavigation} from '@react-navigation/native';

const EpatientTreatmentPrescriptionEdit = ({route}) => {
  const navigation = useNavigation();
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const {prescription_id} = route.params;
  const [prescriptionArrayData, setPrescriptionArrayData] = useState(null);
  const [showCalender, setShowCalender] = useState(false);
  const [temp, setTemp] = useState([]); // State to store filtered data
  const [datePickerIndex, setDatePickerIndex] = useState([]);
  const [dateValues, setDateValues] = useState([]);
  useEffect(() => {
    const patientTreatmentPrescriptionDataRes = async () => {
      try {
        await axios
          .post(`${api.baseurl}/EditMobilePrescription`, {
            prescription_id: prescription_id,
          })
          .then(res => {
            //   console.log('res: ', res.data.data);
            //   const {medicineprescriptionarray, ...otherData} = res.data;
            //   //   setPrescriptionArrayData(medicineprescriptionarray);
            setTemp(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    patientTreatmentPrescriptionDataRes();
  }, [hospital_id, patient_id, reception_id]);

  //   const handleInputChange = (index, key, value) => {
  //     const updatedPrescriptions = [...prescriptionArrayData];
  //     updatedPrescriptions[index][key] = value;
  //     updatedPrescriptions[dateValues] = value;
  //     setPrescriptionArrayData(updatedPrescriptions);
  //   };
  // Update dateValues state based on the date picker
  const handleDateChange = (date, index) => {
    const updatedTemp = [...temp];
    updatedTemp[index].dateValues = date; // Update the dateValues property in the temp array
    setTemp(updatedTemp);
    setShowCalender(false); // Hide the calendar after selecting a date
  };

  const Themes = [{mainColor: '#F5803E', activeTextColor: '#fff'}];

  const calenderHandler = index => {
    setShowCalender(true);
    setDatePickerIndex(index);
  };

  // submit handler .....
  const _editMobilePrescription = async () => {
    await axios
      .post(`${api.baseurl}/UpdateMobilePrescription`, {
        prescription_id: prescription_id,
        medicineprescriptionarray: temp,
      })
      .then(res => {
        const {status} = res.data;
        if (status === true) {
          navigation.navigate('EpatientTreatmentPrescription');
        }
      });
  };
  return (
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
      <ScrollView>
        {/* {prescriptionArrayData?.map((res, i) => {
          return (
            <View style={styles.containerHead} key={res.prescription_id}>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Drug Code : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.drugcode}
                  onChangeText={text => handleInputChange(i, 'drugcode', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Drug Name : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.drugname}
                  onChangeText={text => handleInputChange(i, 'drugname', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Brand Name : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.brandname}
                  onChangeText={text => handleInputChange(i, 'brandname', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Dose : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.dose}
                  onChangeText={text => handleInputChange(i, 'dose', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Instruction : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.anupan}
                  onChangeText={text => handleInputChange(i, 'anupan', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Route : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.route}
                  onChangeText={text => handleInputChange(i, 'route', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Schedule : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.schedule}
                  onChangeText={text => handleInputChange(i, 'schedule', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Days : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  editable={true}
                  value={res.duration}
                  onChangeText={text => handleInputChange(i, 'duration', text)}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>From Date : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={_datevalue[i]} // Update this line
                  onChangeText={text =>
                    handleInputChange(i, 'dateValues', text)
                  }
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      onPress={() => calenderHandler(i)}
                    />
                  }
                />
              </View>
            </View>
          );
        })} */}
        {temp.map((res, index) => {
          return (
            <View style={styles.containerHead} key={res.prescription_id}>
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
                  //    multiline
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
      </ScrollView>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => _editMobilePrescription()}>
        Update
      </Button>
    </View>
  );
};

export default EpatientTreatmentPrescriptionEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerHead: {
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 6,
  },
  cardContent: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '30%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  input2: {
    //     paddingTop: 0,
    //     paddingLeft: 0,
    height: 35,
    width: 210,
    maxWidth: 220,
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
});
