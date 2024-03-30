import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Appbar,
  Button,
  Dialog,
  List,
  Portal,
  TextInput,
} from 'react-native-paper';
import api from '../../../../../api.json';
import DateTimePicker from 'react-native-ui-datepicker';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../../../components/Context/Context';
import {Dropdown} from 'react-native-element-dropdown';

const FamilyHistory = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [illnessCode, setIllnessCode] = useState('');
  const [selectedIllnessCode, setSelectedIllnessCode] = useState('');
  const [visibleList, setVisibleList] = useState(false);
  const [illnessSelectedData, setIllnessSelectedData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [dateValues] = useState([]);
  const [datePickerIndex, setDatePickerIndex] = useState([]);

  const [isFocus2, setIsFocus2] = useState(false);

  const [p_category, setP_category] = useState('');

  const [visibleMsg, setVisibleMsg] = useState(false);

  const hideDialog = () => {
    setVisibleMsg(false);
    navigation.navigate('EpatientTreatmentHistory');
  };

  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id} = scannedPatientsData;

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('OpdPastHistory');
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
    // Update temp array when selectedIllnessCode changes
    if (selectedIllnessCode !== '') {
      const filteredData = illnessSelectedData.filter(
        res => res.illness_id === selectedIllnessCode.illness_id,
      );
      setTemp(prevData => [...prevData, ...filteredData]);
    }
  }, [selectedIllnessCode, illnessSelectedData]);

  const searchInputHandler = async () => {
    try {
      const response = await axios.post(
        `${api.baseurl}/search_opd_past_history`,
        {
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
          text: searchInput,
        },
      );
      const _illnessCode = response.data.data.map(res => ({
        illness_id: res.illness_id,
        illnessname: res.illnessname,
      }));

      setIllnessCode(_illnessCode);
      setIllnessSelectedData(response.data.data);
      setVisibleList(true);
    } catch (error) {
      console.error(error);
    }
  };

  const resetHandler = () => {
    setSearchInput('');
    setSelectedIllnessCode('');
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
    updatedTemp[index].dateValues = _dateformat;
    updatedTemp[index].activestatus = true;

    // Convert selectedDate to Date object
    const selectedDate = new Date(_dateformat);
    const currentDate = new Date();
    const yearDifference =
      currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDifference =
      currentDate.getMonth() - selectedDate.getMonth() + yearDifference * 12;

    // Calculate day difference considering only the current month
    const firstDayOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const lastDayOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const firstDayDifference =
      Math.floor((lastDayOfCurrentMonth - selectedDate) / (1000 * 3600 * 24)) +
      1;
    const lastDayDifference = Math.floor(
      (currentDate - firstDayOfCurrentMonth) / (1000 * 3600 * 24),
    );

    const dayDifference = Math.min(lastDayDifference, firstDayDifference);

    updatedTemp[index].days = dayDifference.toString();
    updatedTemp[index].months = monthDifference.toString();
    updatedTemp[index].years = yearDifference.toString();
    updatedTemp[index].treatment_status = p_category;

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
      api_type: 'OPD-FAMILY-HISTORY',
      opdfamilyhistoryarray: temp,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            navigation.navigate('MedicineHistory');
            //         setVisibleMsg(true);
            setTemp([]);
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  let data = [
    {label: '--Select--', value: ''},
    {label: 'Mother', value: 'Mother'},
    {label: 'Father', value: 'Father'},
    {label: 'Brother', value: 'Brother'},
    {label: 'Niece', value: 'Niece'},
    {label: 'Nephew', value: 'Nephew'},
    {label: 'Sister', value: 'Sister'},
    {label: 'Spouse', value: 'Spouse'},
    {label: 'Elder Brother', value: 'Elder Brother'},
    {label: 'Elder Sister', value: 'Elder Sister'},
    {label: 'Younger Brother', value: 'Younger Brother'},
    {label: 'Younger Sister', value: 'Younger Sister'},
    {label: 'Son', value: 'Son'},
    {label: 'Daughter', value: 'Daughter'},
    {label: 'Husband', value: 'Husband'},
    {label: 'Wife', value: 'Wife'},
    {label: 'Fiancé Or Fiancée', value: 'Fiancé Or Fiancée'},
    {label: 'Aunt', value: 'Aunt'},
    {label: 'Uncle', value: 'Uncle'},
    {label: 'Guest', value: 'Guest'},
    {label: 'Teacher', value: 'Teacher'},
    {label: 'Step Brother', value: 'Step Brother'},
    {label: 'Customer', value: 'Customer'},
    {label: 'Landlord', value: 'Landlord'},
    {label: 'Friend', value: 'Friend'},
    {label: 'Lover', value: 'Lover'},
    {label: 'Girlfriend', value: 'Girlfriend'},
    {label: 'Boyfriend', value: 'Boyfriend'},
    {label: 'Client', value: 'Client'},
    {label: 'Patient', value: 'Patient'},
    {label: 'Step Sister', value: 'Step Sister'},
    {label: 'Step Mother', value: 'Step Mother'},
    {label: 'Step Father', value: 'Step Father'},
    {label: 'Step Son', value: 'Step Son'},
    {label: 'Step Daughter', value: 'Step Daughter'},
    {
      label: 'Grandfather (Father Of Mother)',
      value: 'Grandfather (Father Of Mother)',
    },
    {
      label: 'Grandmother (Mother Of Mother)',
      value: 'Grandmother (Mother Of Mother)',
    },
    {label: 'Relative', value: 'Relative'},
    {label: 'Own', value: 'Own'},
    {label: 'Maternal-Grandfather', value: 'Maternal-Grandfather'},
    {label: 'Maternal-Grandmother', value: 'Maternal-Grandmother'},
    {
      label: 'Grandfather (Father Of Father)',
      value: 'Grandfather (Father Of Father)',
    },
    {
      label: 'Grandmother (Mother Of Father)',
      value: 'Grandmother (Mother Of Father)',
    },
    {label: 'Adopted Daughter', value: 'Adopted Daughter'},
    {label: 'Adopted Son', value: 'Adopted Son'},
    {
      label: 'Son’s Wife (Daughter In Law)',
      value: 'Son’s Wife (Daughter In Law)',
    },
    {
      label: 'Daughter’s Husband (Son In Law)',
      value: 'Daughter’s Husband (Son In Law)',
    },
    {label: 'Son’s Son (Grandson)', value: 'Son’s Son (Grandson)'},
    {
      label: 'Son’s Daughter (Grand Daughter)',
      value: 'Son’s Daughter (Grand Daughter)',
    },
    {label: 'Daughter’s Son', value: 'Daughter’s Son'},
    {label: 'Daughter’s Daughter', value: 'Daughter’s Daughter'},
    {
      label: 'Husband Sister (sister In Law)',
      value: 'Husband Sister (sister In Law)',
    },
    {label: 'Father’s Sister', value: 'Father’s Sister'},
    {label: 'Elder Sister Husband', value: 'Elder Sister Husband'},
    {label: 'Younger Sister Husband', value: 'Younger Sister Husband'},
    {
      label: 'Husband Elder Brother (Brother In Law)',
      value: 'Husband Elder Brother (Brother In Law)',
    },
    {label: 'Husband Younger Brother', value: 'Husband Younger Brother'},
    {label: 'Elder Brother’s Wife', value: 'Elder Brother’s Wife'},
    {label: 'Younger Brothers Wife', value: 'Younger Brothers Wife'},
    {
      label: 'Wife’s Sister (Sister in Law)',
      value: 'Wife’s Sister (Sister in Law)',
    },
    {label: 'Wife’s Elder Brother', value: 'Wife’s Elder Brother'},
    {label: 'Wife’s Younger Brother', value: 'Wife’s Younger Brother'},
    {label: 'Younger Sister Husband', value: 'Younger Sister Husband'},
    {
      label: 'Husband’s Elder Brother (Brother In Law)',
      value: 'Husband’s Elder Brother (Brother In Law)',
    },
    {label: 'Wife’s Brother Wife', value: 'Wife’s Brother Wife'},
    {label: 'Husband Younger Brother', value: 'Husband Younger Brother'},
    {label: 'Husband’s Sister’s Husband', value: 'Husband’s Sister’s Husband'},
    {label: 'Wife’s Sister’s Husband', value: 'Wife’s Sister’s Husband'},
    {
      label: 'Husband’s Elder Brother’s Wife',
      value: 'Husband’s Elder Brother’s Wife',
    },
    {
      label: 'Husband’s Younger Brother’s Wife',
      value: 'Husband’s Younger Brother’s Wife',
    },
    {
      label: 'Father’s Brother’s Son (Cousin)',
      value: 'Father’s Brother’s Son (Cousin)',
    },
    {
      label: 'Fathers Brother’s Daughter (Cousin)',
      value: 'Fathers Brother’s Daughter (Cousin)',
    },
    {
      label: 'Father’s Sister’s Son (Cousin)',
      value: 'Father’s Sister’s Son (Cousin)',
    },
    {
      label: 'Father’s Sister’s Daughter (Cousin)',
      value: 'Father’s Sister’s Daughter (Cousin)',
    },
    {
      label: 'Mother’s Brother’s Son (Cousin)',
      value: 'Mother’s Brother’s Son (Cousin)',
    },
    {
      label: 'Mother’s Brother’s Daughter (Cousin)',
      value: 'Mother’s Brother’s Daughter (Cousin)',
    },
    {
      label: 'Mother’s Sister’s Son (Cousin)',
      value: 'Mother’s Sister’s Son (Cousin)',
    },
    {
      label: 'Mother’s Sister’s Daughter (Cousin)',
      value: 'Mother’s Sister’s Daughter (Cousin)',
    },
    {
      label: 'Spouse’s Mother (Mother In Law)',
      value: 'Spouse’s Mother (Mother In Law)',
    },
    {
      label: 'Spouse’s Father (Father In Law)',
      value: 'Spouse’s Father (Father In Law)',
    },
    {
      label: 'Father’s Younger Brother (Uncle)',
      value: 'Father’s Younger Brother (Uncle)',
    },
    {
      label: 'Father’s Elder Brother (Uncle)',
      value: 'Father’s Elder Brother (Uncle)',
    },
    {
      label: 'Father’s Younger Brother’s Wife (Aunt)',
      value: 'Father’s Younger Brother’s Wife (Aunt)',
    },
    {label: 'Mother’s Brother', value: 'Mother’s Brother'},
    {label: 'Mother’s Younger Sister', value: 'Mother’s Younger Sister'},
    {
      label: 'Mother’s Younger Sister’s Husband',
      value: 'Mother’s Younger Sister’s Husband',
    },
    {
      label: 'Mother’s Elder Sister’s Husband (Uncle)',
      value: 'Mother’s Elder Sister’s Husband (Uncle)',
    },
    {
      label: 'Mother’s Elder Sister (Aunt)',
      value: 'Mother’s Elder Sister (Aunt)',
    },
    {label: 'Mother’s Brother Wife', value: 'Mother’s Brother Wife'},
    {label: 'Mistress', value: 'Mistress'},
    {label: 'Concubine / Keep Mistress', value: 'Concubine / Keep Mistress'},
    {label: 'Pupil', value: 'Pupil'},
    {label: 'Disciple', value: 'Disciple'},
    {label: 'Preceptor', value: 'Preceptor'},
    {label: 'Tenant', value: 'Tenant'},
  ];

  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('OpdPastHistory');
          }}
        />
        <Appbar.Content title="OPD Family History" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
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
                value={dateValues[datePickerIndex]}
                onValueChange={date => handleDateChange(date, datePickerIndex)}
              />
            </View>
          </View>
        )}

        <Text style={styles.heading}>Family History</Text>
        <TextInput
          mode="outlined"
          label="Diseases"
          placeholder="Search Diseases ..."
          style={[styles.input, {marginHorizontal: 14}]}
          value={
            selectedIllnessCode?.illnessname
              ? selectedIllnessCode?.illnessname
              : searchInput
          }
          onChangeText={text => {
            setSearchInput(text), setSelectedIllnessCode('');
          }}
          right={<TextInput.Icon icon="close" onPress={() => resetHandler()} />}
        />
        <ScrollView
          style={{
            zIndex: 1,
            marginHorizontal: 14,
            maxHeight: illnessCode.length > 0 && visibleList ? 200 : 0,
          }} // Set a higher zIndex for the ScrollView
          vertical={true}>
          {visibleList && (
            <View>
              {illnessCode?.map(res => (
                <List.Item
                  style={styles.listView}
                  title={res?.illnessname}
                  key={res?.illness_id}
                  onPress={() => {
                    setSelectedIllnessCode({
                      illness_id: res.illness_id,
                      illnessname: res.illnessname,
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
                <View style={styles.cardContent}>
                  <Text style={[styles.label, {width: '200%'}]}>Relation</Text>
                  <View>
                    <Dropdown
                      mode={'outlined'}
                      style={[styles.dropdown, {borderColor: 'blue'}]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={data?.map(res => ({
                        label: res.label,
                        value: res.value,
                      }))}
                      //   search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus2 ? 'Select' : '...'}
                      //   searchPlaceholder="Search..."
                      value={res.treatment_status}
                      onFocus={() => setIsFocus2(true)}
                      onBlur={() => setIsFocus2(false)}
                      onChange={item => {
                        setP_category(item.value);
                        //     updateSelectedCategoryData(item.value);
                        setIsFocus2(false);
                        const updatedTemp = [...temp];
                        updatedTemp[index].treatment_status = item.value;
                        setTemp(updatedTemp);
                      }}
                    />
                  </View>
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

        {/* submit handlers */}
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('OpdPastHistory')}>
            Previous
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => submitTreatmenthandler()}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('MedicineHistory')}>
            Skip
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default FamilyHistory;

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
    //     backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingLeft: 0,
    height: 35,
    width: '100%',
    //     maxWidth: 220,
  },
  addButton: {
    marginVertical: 10,
    marginHorizontal: 14,
    alignSelf: 'flex-end',
  },
  btn: {
    marginVertical: 12,
    //     alignSelf: 'center',
  },
  listView: {
    backgroundColor: '#ede8ed',
    marginBottom: 2,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0.7,
    borderRadius: 6,
    marginBottom: 10,
    padding: 6,
  },
  cardContent: {
    flexDirection: 'column',
    padding: 5,
    width: '50%',
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
});
