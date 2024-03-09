import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import api from '../../../../api.json';
import axios from 'axios';
// import DateTimePicker from 'react-native-ui-datepicker';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../../components/Context/Context';
import DateTimePicker from 'react-native-ui-datepicker';

const Editprocedure = ({route}) => {
  const navigation = useNavigation();
  const {patientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const {preprocedure_id, procedureType} = route.params;
  const [panchakarmaprocedurearray, setPanchakarmaprocedurearray] = useState(
    [],
  );
  //date states ....
  const [showCalender, setShowCalender] = useState(false);
  const [dateValues, setDateValues] = useState([]);
  const [dateValues2, setDateValues2] = useState([]);
  const [datePickerIndex, setDatePickerIndex] = useState([]);
  const [showToCalender, setShowToCalender] = useState(false);
  const [toDatePickerIndex, setToDatePickerIndex] = useState([]);

  const calenderHandler = index => {
    setShowCalender(true);
    setDatePickerIndex(index); // Set the index of the date field for which the calendar is being opened
  };

  const ToDateCalenderHandler = index => {
    setShowToCalender(true);
    setToDatePickerIndex(index); // Set the index of the date field for which the calendar is being opened
  };

  const handleProcedureDaysChange = (days, index) => {
    const updatedTemp = [...panchakarmaprocedurearray];

    // Ensure the days input is a valid number
    const numberOfDays = parseInt(days, 10);
    if (!isNaN(numberOfDays)) {
      // Get the existing "From Date"
      const fromDate = new Date(updatedTemp[index].proceduredate);

      // Calculate the new "To Date"
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + numberOfDays);

      // Update the "To Date" and the "Procedure Days"
      updatedTemp[index].proceduretodate = `${toDate.getFullYear()}-${(
        toDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${toDate.getDate().toString().padStart(2, '0')}`;

      updatedTemp[index].proceduredays = days;
    }

    setPanchakarmaprocedurearray(updatedTemp);
  };

  const handleDateChange = (date, index) => {
    // Split the string into date and time parts
    const [_dateformat] = date.split(' ');
    const updatedTemp = [...panchakarmaprocedurearray];
    updatedTemp[index].proceduredate = _dateformat;
    // Get the number of days from the procedure
    const numberOfDays = parseInt(updatedTemp[index].proceduredays, 10);

    // If the number of days is valid, calculate the "To Date"
    if (!isNaN(numberOfDays)) {
      const toDate = new Date(date);
      // Set time components to zero to remove time
      toDate.setHours(0, 0, 0, 0);
      toDate.setDate(toDate.getDate() + numberOfDays);

      // Update the "To Date" and calculate the difference in days
      updatedTemp[index].proceduretodate = `${toDate.getFullYear()}-${(
        toDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${toDate.getDate().toString().padStart(2, '0')}`;

      // Calculate the difference in days between "From Date" and "To Date"
      const differenceInTime = toDate.getTime() - new Date(date).getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      const _differenceInDays = Math.round(differenceInDays);

      // Update the number of days in the procedure state
      updatedTemp[index].proceduredays = _differenceInDays.toString();
    }

    setPanchakarmaprocedurearray(updatedTemp);
    setShowCalender(false); // Hide the calendar after selecting a date
  };

  const handleToDateChange = (date, index) => {
    const [_dateformat] = date.split(' ');
    const updatedTemp = [...panchakarmaprocedurearray];
    updatedTemp[index].proceduretodate = _dateformat;

    // Calculate the difference in days between From Date and To Date
    const fromDate = new Date(updatedTemp[index].proceduredate);
    const toDate = new Date(_dateformat);
    const differenceInTime = toDate.getTime() - fromDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const _differenceInDays = Math.round(differenceInDays);

    // Update the number of days in the procedure state
    updatedTemp[index].proceduredays = _differenceInDays.toString();

    setPanchakarmaprocedurearray(updatedTemp);
    setShowToCalender(false); // Hide the calendar after selecting a date
  };

  // patientPreprocedurePrescriptionDataRes handler ....
  useEffect(() => {
    const patientPreprocedurePrescriptionDataRes = async () => {
      try {
        await axios
          .post(`${api.baseurl}/GeneratePreprocedurenotes`, {
            hospital_id: hospital_id,
            patient_id: patient_id,
            reception_id: reception_id,
            preprocedure_id: preprocedure_id,
          })
          .then(res => {
            //   setTemp(res.data);
            const {panchakarmaprocedurearray} = res.data;
            setPanchakarmaprocedurearray(panchakarmaprocedurearray);
          });
      } catch (error) {
        console.error(error);
      }
    };
    patientPreprocedurePrescriptionDataRes();
  }, [hospital_id, patient_id, reception_id]);

  //   post procedure form
  const _form = () => {
    return (
      <>
        {panchakarmaprocedurearray?.map((res, index) => {
          return (
            <View style={styles.containerHead} key={res.uniqueid}>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Name </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedurename}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].procedurename = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Amount : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedureamount}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].procedureamount = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Time : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.proceduretime}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].proceduretime = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Kit : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedurekit
                    ?.map(drug => `${drug.drugname}`)
                    .join(', ')}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Instruction : </Text>
                <TextInput
                  mode="flat"
                  //    multiline
                  style={[styles.input2]}
                  value={res.procedureinstruction}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].procedureinstruction = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Days : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.proceduredays}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].proceduredays = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                    handleProcedureDaysChange(text, index);
                  }}
                  editable={true}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.label}>From Date : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={
                    panchakarmaprocedurearray[index].proceduredate === ''
                      ? res.proceduredate
                      : panchakarmaprocedurearray[index].proceduredate
                  }
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
                <Text style={styles.label}>To Date : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={
                    panchakarmaprocedurearray[index].proceduretodate === ''
                      ? res.proceduretodate
                      : panchakarmaprocedurearray[index].proceduretodate
                  }
                  editable={false}
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      onPress={() => ToDateCalenderHandler(index)}
                    />
                  }
                />
              </View>
              <View style={[styles.cardContent]}>
                <Text style={styles.label}>Post Instruction : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.postinstruction}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].postinstruction = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Advice : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.advice}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].advice = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
            </View>
          );
        })}
      </>
    );
  };
  const Themes = [{mainColor: '#F5803E', activeTextColor: '#fff'}];
  // submit handler .....
  const _updatePostProcedureData = async () => {
    await axios
      .post(`${api.baseurl}/UpdatePostProcedureData`, {
        preprocedure_id: preprocedure_id,
        hospital_id: hospital_id,
        patient_id: patient_id,
        reception_id: reception_id,
        panchakarmaprocedurearray: panchakarmaprocedurearray,
      })
      .then(res => {
        const {status} = res.data;
        if (status === true) {
          if (procedureType === 'Pre') {
            navigation.replace('ProcedureContent');
          } else if (procedureType === 'Post') {
            navigation.replace('Preprecedureprescription', {
              _preprocedurevalue: 'Schedule Procedure',
            });
          }
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
              value={dateValues[datePickerIndex] || new Date()} // Use separate state variable for each date field
              onValueChange={date => handleDateChange(date, datePickerIndex)} // Pass the index to identify which date field is being modified
            />
          </View>
        </View>
      )}
      {showToCalender && (
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
              value={dateValues2[toDatePickerIndex] || new Date()} // Use separate state variable for each date field
              onValueChange={date =>
                handleToDateChange(date, toDatePickerIndex)
              } // Pass the index to identify which date field is being modified
            />
          </View>
        </View>
      )}
      <ScrollView>{_form()}</ScrollView>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => _updatePostProcedureData()}>
        Update
      </Button>
    </View>
  );
};

export default Editprocedure;

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
    flexWrap: 'wrap',
    width: 100,
  },
  input2: {
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
