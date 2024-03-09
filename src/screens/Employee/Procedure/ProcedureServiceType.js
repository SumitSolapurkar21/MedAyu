import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import DateTimePicker from 'react-native-ui-datepicker';
// import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  SegmentedButtons,
  DefaultTheme,
  TextInput,
  List,
} from 'react-native-paper';
import {Button} from 'react-native-paper';

const ProcedureServiceType = ({route}) => {
  const [_serviceItemArray, _setServiceItemArray] = useState([]);
  const [selectionValue, setSelectionValue] = useState('Single');
  const {patientsData, selectserviceCategory} = useContext(UserContext);
  const {servicetype_id, categoryname, category_id} = selectserviceCategory;
  const {hospital_id, patient_id, reception_id} = patientsData;
  const [searchInput, setSearchInput] = useState('');
  const [_searchProcedure, _setSearchProcedure] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [visibleList, setVisibleList] = useState(false);
  const [temp, setTemp] = useState([]);
  const [selectedProcedureCode, setSelectedProcedureCode] = useState('');
  const [selectedProcedureDataCode, setSelectedProcedureDataCode] =
    useState('');
  const [_category, _setCategory] = useState(null);
  const navigation = useNavigation();

  //date states .....
  const [showCalender, setShowCalender] = useState(false);
  const [dateValues, setDateValues] = useState([]);
  const [dateValues2, setDateValues2] = useState([]);
  const [datePickerIndex, setDatePickerIndex] = useState([]);
  const [showToCalender, setShowToCalender] = useState(false);
  const [toDatePickerIndex, setToDatePickerIndex] = useState([]);

  // fetch service items .....
  useEffect(() => {
    const _fetchserviceitem = async () => {
      try {
        await axios
          .post(`${api.baseurl}/getserviceitemaccboth`, {
            hospital_id: hospital_id,
            servicetype_id: servicetype_id,
            servicecategory_id: category_id,
          })
          .then(res => {
            _setServiceItemArray(res.data.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (category_id !== '' || undefined || null) _fetchserviceitem();
  }, [servicetype_id, categoryname, category_id]);

  useEffect(() => {
    const _GetPanchakarmaCategoryMobile = async () => {
      try {
        await axios
          .post(`${api.baseurl}/GetPanchakarmaCategoryMobile`, {
            hospital_id: hospital_id,
          })
          .then(res => {
            const {status, message} = res.data;
            if (status === true) {
              _setCategory(res.data.data);
              //     setSelectionValue(
              //       res.data.data.length > 0 ? res.data.data[0].category_id : null,
              //     );
            } else {
              console.error(message);
            }
          });
      } catch (error) {
        console.error(error);
      }
    };

    _GetPanchakarmaCategoryMobile();
  }, [hospital_id]);

  //dropdown for procedure type .....
  const _dropdowndata = [
    {
      label: 'Single',
      value: 'Single',
    },
    {
      label: 'Combo',
      value: 'Combo',
    },
    {
      label: 'Prototype',
      value: 'Prototype',
    },
  ];
  const theme = {
    ...DefaultTheme,
    roundness: 0, // Set roundness to 0 to remove borderRadius
  };

  //search input handler ...
  useEffect(() => {
    const searchInputHandler = async () => {
      try {
        await axios
          .post(`${api.baseurl}/SearchPanchakarmaProcedureMobile`, {
            hospital_id: hospital_id,
            category_id: category_id,
            procedure_id: servicetype_id,
            text: searchInput,
          })
          .then(res => {
            const _procedurename = res.data.data.map(res => ({
              procedure_id: res.procedure_id,
              procedurename: res.procedurename,
            }));
            setSelectedProcedureCode(_procedurename);
            setSelectedProcedure(res.data.data);
            setVisibleList(true);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (searchInput !== '') searchInputHandler();
  }, [searchInput]);

  useEffect(() => {
    // Update temp array when selectedDrugCode changes
    if (selectedProcedureDataCode !== '') {
      const filteredData = selectedProcedure?.filter(
        res => res.procedure_id === selectedProcedureDataCode?.procedure_id,
      );
      setTemp(prevData => [...prevData, ...filteredData]); // Concatenate with existing data
    }
  }, [selectedProcedureDataCode, selectedProcedure]);

  const resetHandler = () => {
    setSearchInput('');
    setSelectedProcedureDataCode('');
  };
  const Themes = [{mainColor: '#F5803E', activeTextColor: '#fff'}];

  const calenderHandler = index => {
    setShowCalender(true);
    setDatePickerIndex(index); // Set the index of the date field for which the calendar is being opened
  };

  const ToDateCalenderHandler = index => {
    setShowToCalender(true);
    setToDatePickerIndex(index); // Set the index of the date field for which the calendar is being opened
  };

  const handleProcedureDaysChange = (days, index) => {
    // const [_dateformat] = date.split(' ');
    const updatedTemp = [...temp];

    // Ensure the days input is a valid number
    const numberOfDays = parseInt(days, 10);
    if (!isNaN(numberOfDays)) {
      // Get the existing "From Date"
      const fromDate = new Date(updatedTemp[index].proceduredate);

      // Calculate the new "To Date"
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + numberOfDays);

      // Set time components to zero to remove time
      toDate.setHours(0, 0, 0, 0);

      // Update the "To Date" and the "Procedure Days"
      updatedTemp[index].proceduretodate = `${toDate.getFullYear()}-${(
        toDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${toDate.getDate().toString().padStart(2, '0')}`;

      updatedTemp[index].proceduredays = days;
    }

    setTemp(updatedTemp);
  };

  const handleDateChange = (date, index) => {
    // Split the string into date and time parts
    const [_dateformat] = date.split(' ');

    const updatedTemp = [...temp];
    updatedTemp[index].proceduredate = _dateformat;
    updatedTemp[index].activestatus = true;
    updatedTemp[index].postinstruction = '';
    updatedTemp[index].advice = '';
    // Get the number of days from the procedure
    const numberOfDays = parseInt(updatedTemp[index].proceduredays, 10);

    // If the number of days is valid, calculate the "To Date"
    if (!isNaN(numberOfDays)) {
      const toDate = new Date(_dateformat);
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
      const differenceInTime =
        toDate.getTime() - new Date(_dateformat).getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      const _differenceInDays = Math.round(differenceInDays);

      // Update the number of days in the procedure state
      updatedTemp[index].proceduredays = _differenceInDays.toString();
    }

    setTemp(updatedTemp);
    setShowCalender(false); // Hide the calendar after selecting a date
  };

  const handleToDateChange = (date, index) => {
    // Split the string into date and time parts
    const [_dateformat] = date.split(' ');

    const updatedTemp = [...temp];
    updatedTemp[index].proceduretodate = _dateformat;

    // Calculate the difference in days between From Date and To Date
    const fromDate = new Date(updatedTemp[index].proceduredate);
    const toDate = new Date(_dateformat);
    const differenceInTime = toDate.getTime() - fromDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const _differenceInDays = Math.round(differenceInDays);

    // Update the number of days in the procedure state
    updatedTemp[index].proceduredays = _differenceInDays.toString();

    setTemp(updatedTemp);
    setShowToCalender(false); // Hide the calendar after selecting a date
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
  //submit AddPanchakarmaProcedure ....
  const addpanchakarmaprocedure = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddPanchakarmaProcedure`, {
          panchakarmaprocedurearray: temp,
          patient_id: patient_id,
          hospital_id: hospital_id,
          reception_id: reception_id,
          dateadd: currentdate,
          timeadd: currenttime,
          servicetype_id: servicetype_id,
          servicecategory_id: category_id,
        })
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            console.warn(message);
            navigation.navigate('ProcedureContent');
          } else {
            console.error(message);
          }
        });
    } catch (error) {
      console.error(error);
      navigation.navigate('ProcedureContent');
    }
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
      <View style={styles.categoryTabs}>
        {/* <ScrollView horizontal style={styles.categoryTabs}> */}
        {_dropdowndata ? (
          <SegmentedButtons
            theme={theme}
            style={styles.segmentBtn}
            value={selectionValue}
            onValueChange={setSelectionValue}
            buttons={_dropdowndata.map(res => ({
              label: res.label,
              value: res.value,
            }))}
          />
        ) : (
          <Text>Loading...</Text>
        )}
        {/* </ScrollView> */}
      </View>
      <View style={styles.searchInput}>
        <Text style={styles.heading}>{categoryname} PROCEDURE</Text>
        <TextInput
          mode="outlined"
          label="Procedure"
          placeholder="Search Procedure ..."
          value={
            selectedProcedureDataCode?.procedurename
              ? selectedProcedureDataCode?.procedurename
              : searchInput
          }
          onChangeText={text => {
            setSearchInput(text);
          }}
          right={<TextInput.Icon icon="close" onPress={() => resetHandler()} />}
        />
        <ScrollView style={[styles.listDropdown, {}]} vertical={true}>
          {visibleList && (
            <View>
              {selectedProcedureCode?.map(res => (
                <List.Item
                  style={styles.listView}
                  title={res?.procedurename}
                  key={res?.procedure_id}
                  onPress={() => {
                    setSelectedProcedureDataCode({
                      procedure_id: res.procedure_id,
                      procedurename: res.procedurename,
                    });
                    setVisibleList(false);
                  }}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.inputGroup}>
        {temp.map((res, index) => {
          return (
            <View style={styles.card} key={index}>
              <View style={styles.cardContent}>
                <Text style={styles.label}> Name : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedurename}
                  onChangeText={text => {
                    const updatedTemp = [...temp];
                    updatedTemp[index].procedurename = text;
                    setTemp(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}> Amount : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedureamount}
                  onChangeText={text => {
                    const updatedTemp = [...temp];
                    updatedTemp[index].procedureamount = text;
                    setTemp(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}> Time : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.proceduretime}
                  onChangeText={text => {
                    const updatedTemp = [...temp];
                    updatedTemp[index].proceduretime = text;
                    setTemp(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}> KIT : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  //    value={res.procedurekit
                  //      .map(drug => `${drug.drugname}: ${drug.qty}`)
                  //      .join(', ')}
                  value={res.procedurekit
                    ?.map(drug => `${drug.drugname}`)
                    .join(', ')}
                  onChangeText={text => {
                    const updatedTemp = [...temp];
                    updatedTemp[index].procedurekit = text;
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
                  value={res.procedureinstruction}
                  onChangeText={text => {
                    const updatedTemp = [...temp];
                    updatedTemp[index].procedureinstruction = text;
                    setTemp(updatedTemp);
                  }}
                  editable={true}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.label}> Day's : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.proceduredays}
                  onChangeText={text => {
                    const updatedTemp = [...temp];
                    updatedTemp[index].proceduredays = text || '';
                    setTemp(updatedTemp);
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
                  value={temp[index].proceduredate}
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
                  value={temp[index].proceduretodate}
                  editable={false}
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      onPress={() => ToDateCalenderHandler(index)}
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
      <View style={styles.btnGrp}>
        <Button
          mode="contained"
          style={[styles.btn]}
          onPress={() => addpanchakarmaprocedure()}>
          Save
        </Button>
        <Button
          mode="contained"
          style={[styles.btn]}
          onPress={() =>
            navigation.navigate('Procedurehistory', {
              servicetype_id: servicetype_id,
              servicecategory_id: category_id,
            })
          }>
          History
        </Button>

        <Button
          mode="contained"
          style={[styles.btn]}
          onPress={() =>
            navigation.navigate('Preprecedureprescription', {
              _preprocedurevalue: `${categoryname} Procedure`,
              procedureType: 'Pre',
              servicetype_id: servicetype_id,
              servicecategory_id: category_id,
              categoryname: categoryname,
            })
          }>
          Prescription
        </Button>
      </View>
    </View>
  );
};

export default ProcedureServiceType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  categoryTabs: {
    padding: 10,
    paddingBottom: 20,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginHorizontal: 6,
  },
  dropdownCategory: {
    marginHorizontal: 12,
    marginBottom: 14,
  },
  heading: {
    color: 'black',
    marginBottom: 4,
    fontWeight: '600',
  },
  searchInput: {
    marginHorizontal: 12,
  },
  listView: {
    backgroundColor: '#ede8ed',
    marginBottom: 2,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  input2: {
    //     backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingLeft: 0,
    height: 35,
    width: 210,
    maxWidth: 220,
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
  inputGroup: {
    marginHorizontal: 14,
    gap: 4,
    //     marginTop: 6,
  },
  card: {
    borderWidth: 0.7,
    borderRadius: 6,
    marginBottom: 10,
  },
  btn: {
    //     marginTop: 6,
    // alignSelf: 'center',
  },
  listDropdown: {
    zIndex: 1,
    maxHeight: 200,
    marginVertical: 10,
  },
  btnGrp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
    gap: 6,
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
