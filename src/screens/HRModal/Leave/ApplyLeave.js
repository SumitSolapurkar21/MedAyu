import {ScrollView, StyleSheet, Text, View, Snackbar} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';

const ApplyLeave = () => {
  const {userData} = useContext(UserContext);
  const [selectedLeaveType, setSelectedLeaveType] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showCalender2, setShowCalender2] = useState(false);
  const Themes = [{mainColor: '#F5803E', activeTextColor: '#fff'}];
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const [temp, setTemp] = useState({
    leavetype: '', // Initialize with an empty string
    leavebalances: '',
    noofdays: '',
    leavefrom_date: '',
    leaveto_date: '',
    leavereason: '',
    user_id: userData?._id,
    hospital_id: userData?.hospital_id,
  });
  useEffect(() => {
    // Update leavetype whenever selectedLeaveType changes
    setTemp(prevState => ({
      ...prevState,
      leavetype: selectedLeaveType?.value || '', // Set to selectedLeaveType.value or an empty string if not available
    }));
  }, [selectedLeaveType]);

  const leaveType = [
    {
      key: 'EARNED LEAVE',
      value: 'EARNED LEAVE',
    },
    {
      key: 'CASUAL LEAVE',
      value: 'CASUAL LEAVE',
    },
    {
      key: 'RESTRICTED LEAVE',
      value: 'RESTRICTED LEAVE',
    },
    {
      key: 'SPECIAL SICK LEAVE',
      value: 'SPECIAL SICK LEAVE',
    },
    {
      key: 'COMP OFF',
      value: 'COMP OFF',
    },
    {
      key: 'LOSS OF PAY',
      value: 'LOSS OF PAY',
    },
    {
      key: 'PATERNITY LEAVE',
      value: 'PATERNITY LEAVE',
    },
    {
      key: 'OUTDOOR DUTY',
      value: 'OUTDOOR DUTY',
    },
  ];

  useEffect(() => {
    if (temp?.leavefrom_date !== '') setShowCalender(false);
  }, [temp?.leavefrom_date]);
  useEffect(() => {
    if (temp?.leaveto_date !== '') setShowCalender2(false);
  }, [temp?.leaveto_date]);

  const handleInputToggle = (name, value) => {
    setTemp(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const _fromDate = temp?.leavefrom_date;
    const [_fromDateFormat] = _fromDate?.split(' ') || [''];
    const fromDate = new Date(_fromDateFormat);

    const _toDate = temp?.leaveto_date;
    const [_toDateFormat] = _toDate?.split(' ') || [''];
    const toDate = new Date(_toDateFormat);

    const differenceInTime = toDate.getTime() - fromDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    // Round down the result to get the integer number of days
    const numberOfDays = Math.floor(differenceInDays);
    setTemp(prevState => ({
      ...prevState,
      noofdays: numberOfDays.toString(),
      leavefrom_date: _fromDateFormat,
      leaveto_date: _toDateFormat, // Set to selectedLeaveType.value or an empty string if not available
    }));
  }, [temp?.leavefrom_date, temp?.leaveto_date]);

  //   snakebar
  const _applyLeaveHandler = async () => {
    try {
      await axios.post(`${api.baseurl}/AddMobileLeave`, temp).then(res => {
        const {status, message} = res.data;
        if (status === true) {
          setVisible(true);
          setTemp([]);
          setSelectedLeaveType([]);
        } else {
          console.error(message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* from date */}
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
              value={temp?.leavefrom_date}
              onValueChange={date => handleInputToggle('leavefrom_date', date)}
            />
          </View>
        </View>
      )}

      {/* to date */}
      {showCalender2 && (
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
              value={temp?.leaveto_date}
              onValueChange={date => handleInputToggle('leaveto_date', date)}
            />
          </View>
        </View>
      )}

      <View style={styles.container}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Leave</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Leave Applied Successfully !!</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Text style={styles.heading}>Apply Leave</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.inputGroup}>
          <View style={styles.card}>
            <View style={styles.formGroup}>
              <Text style={styles.text}>Leave Type</Text>
              <View style={{width: '100%'}}>
                <Dropdown
                  mode={'outlined'}
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={leaveType?.map(res => ({
                    label: res.key,
                    value: res.value,
                  }))}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select' : '...'}
                  searchPlaceholder="Search..."
                  value={selectedLeaveType}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setIsFocus(false);
                    setSelectedLeaveType(item);
                  }}
                />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.text}>Leave Balances </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp?.leavebalances}
                onChangeText={newValue =>
                  handleInputToggle('leavebalances', newValue)
                }
                editable={true}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.text}>From Date </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp?.leavefrom_date}
                editable={false}
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => setShowCalender(true)}
                  />
                }
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.text}>To Date </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp?.leaveto_date}
                editable={false}
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => setShowCalender2(true)}
                  />
                }
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.text}>No of Days </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={isNaN(temp.noofdays) ? '' : temp.noofdays}
                onChangeText={newValue =>
                  handleInputToggle('noofdays', newValue)
                }
                editable={true}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.text}>Reason </Text>
              <TextInput
                mode="flat"
                style={[styles.input2]}
                value={temp?.leavereason}
                onChangeText={newValue =>
                  handleInputToggle('leavereason', newValue)
                }
                editable={true}
              />
            </View>
          </View>

          <Button
            mode="contained"
            style={[styles.btn]}
            onPress={() => _applyLeaveHandler()}>
            Save
          </Button>
        </ScrollView>
      </View>
    </>
  );
};

export default ApplyLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 10,
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
    height: 50,
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
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  cardContent: {
    flexDirection: 'column',
    padding: 5,
    gap: 6,
  },
  btn: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  datePickerContainer: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    top: '20%',
  },
  datePicker: {
    width: 330,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
  },
});
