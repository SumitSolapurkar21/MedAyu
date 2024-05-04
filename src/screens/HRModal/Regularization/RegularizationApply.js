import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Appbar,
  Button,
  Card,
  DefaultTheme,
  Divider,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import api from '../../../../api.json';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
//image ...
import user from '../../../images/user.png';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';

const RegularizationApply = () => {
  const navigation = useNavigation();
  const {userData} = useContext(UserContext);
  const [value, setValue] = useState('apply');
  const [isFocus, setIsFocus] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isToTimePickerVisible, setToTimePickerVisibility] = useState(false);

  const reason = [
    {
      label: 'Early Out',
      value: 'Early Out',
    },
    {
      label: 'Late In',
      value: 'Late In',
    },
    {
      label: 'Miss Swipes',
      value: 'Miss Swipes',
    },
  ];
  //   form inputs....
  const [submittedformData, setsubmittedFormData] = useState({
    remark: '',
    date: '',
    fromtime: '',
    totime: '',
    reason: '',
  });

  const inputHandlers = (fieldName, value) => {
    setsubmittedFormData({
      ...submittedformData,
      [fieldName]: value,
    });
  };
  //due date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //due from time
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  //due to time
  const showToTimePicker = () => {
    setToTimePickerVisibility(true);
  };
  const hideToTimePicker = () => {
    setToTimePickerVisibility(false);
  };
  // Function for handling Date
  const handleDate = date => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    const Dateformat = `${year}-${month}-${day}`;
    setsubmittedFormData({
      ...submittedformData,
      date: Dateformat,
    });
    hideDatePicker();
  };

  // Function for handling Date
  const handleTime = time => {
    const dt = new Date(time);
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    const Timeformat = `${hours}:${minutes}`;

    setsubmittedFormData({
      ...submittedformData,
      fromtime: Timeformat,
    });
    hideTimePicker();
  };

  // Function for handling Date
  const handleToTime = time => {
    const dt = new Date(time);
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    const Timeformat = `${hours}:${minutes}`;

    setsubmittedFormData({
      ...submittedformData,
      totime: Timeformat,
    });
    hideToTimePicker();
  };

  // AddMobileEmpRegularized .....

  const AddMobileEmpRegularized = async () => {
    const body = {
      hospital_id: userData?.hospital_id,
      reception_id: userData?._id,
      regularized_reason: submittedformData?.reason.value,
      regularized_remarks: submittedformData?.remark,
      regularized_date: submittedformData?.date,
      fromtime: submittedformData?.fromtime,
      totime: submittedformData?.totime,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileEmpRegularized`, body)
        .then(response => {
          const {message, status} = response.data;
          if (status === true) {
            setsubmittedFormData([]);
            Alert.alert('Success !!', 'Regularization Applied ');
          } else {
            Alert.alert('Error !!', message);
          }
        });
    } catch (error) {
      Alert.alert('Error !!', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Apply Regularization</Text>
        </View>
        <Divider style={{marginVertical: 20}} />
        <View style={styles.cardContent}>
          <Text style={styles.label}>Regularization Date : </Text>
          <TouchableOpacity>
            <TextInput
              dense
              placeholder="DD-MM-YYYY"
              value={submittedformData.date}
              right={
                <TextInput.Icon
                  icon="calendar-month"
                  onPress={showDatePicker}
                />
              }
              editable={false}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDate}
            onCancel={hideDatePicker}
          />
        </View>

        <Card style={{marginVertical: 10}}>
          <Card.Content>
            <View style={styles.cardContent2}>
              <Image source={user} style={styles.img} />
              <Text style={styles.label}>{userData?.name}</Text>
            </View>
            <Divider style={{marginVertical: 10}} />
            <View style={styles.cardContent3}>
              <Text style={styles.label}>Remark</Text>
              <TextInput
                dense
                placeholder="Remark"
                value={submittedformData.remark}
                onChangeText={text => inputHandlers('remark', text)}
              />
            </View>
            <Divider style={{marginVertical: 10}} />

            <View style={{flexDirection: 'row'}}>
              <View style={[styles.secTablehead, {width: '20%'}]}>
                <Text style={styles.secTableheadText}>DATE</Text>
              </View>
              <View style={styles.secTablehead}>
                <Text style={styles.secTableheadText}>FROM</Text>
              </View>
              <View style={styles.secTablehead}>
                <Text style={styles.secTableheadText}>TO</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.contenthead, {width: '20%'}]}>
                <Text style={styles.contentheadText}>
                  {submittedformData.date}
                </Text>
              </View>
              <View style={[styles.contenthead]}>
                <TouchableOpacity>
                  <TextInput
                    contentStyle={{paddingLeft: 10}}
                    dense
                    placeholder="- : -"
                    value={submittedformData.fromtime}
                    right={
                      <TextInput.Icon
                        icon="clock-time-eight-outline"
                        onPress={showTimePicker}
                      />
                    }
                    editable={false}
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTime}
                  onCancel={hideTimePicker}
                />
              </View>
              <View style={[styles.contenthead]}>
                <TouchableOpacity>
                  <TextInput
                    contentStyle={{paddingLeft: 10}}
                    dense
                    placeholder="- : -"
                    value={submittedformData.totime}
                    right={
                      <TextInput.Icon
                        icon="clock-time-eight-outline"
                        onPress={showToTimePicker}
                      />
                    }
                    editable={false}
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isToTimePickerVisible}
                  mode="time"
                  onConfirm={handleToTime}
                  onCancel={hideToTimePicker}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Reason</Text>
              <Dropdown
                mode={'outlined'}
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={reason?.map(res => ({
                  label: res.label,
                  value: res.value,
                }))}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : '...'}
                searchPlaceholder="Search..."
                value={submittedformData.reason}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  inputHandlers('reason', item);

                  setIsFocus(false);
                }}
              />
            </View>
            <View style={styles.btngroup}>
              <Button mode="contained" onPress={AddMobileEmpRegularized}>
                Apply
              </Button>
              <Button
                mode="contained"
                onPress={() => navigation.replace('HrModal')}>
                Cancel
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

export default RegularizationApply;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    marginTop: 16,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  formGroup: {
    marginVertical: 10,
  },

  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 6,
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
  label: {
    fontWeight: '600',
    color: 'black',
    fontSize: 14,
    marginBottom: 6,
  },
  cardContent2: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  secTablehead: {
    backgroundColor: '#80aaff',
    width: '40%',
    borderWidth: 0.2,
    padding: 8,
  },
  secTableheadText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },

  contenthead: {
    width: '40%',
    borderWidth: 0.2,
    padding: 8,
  },
  contentheadText: {
    fontSize: 12,
    color: 'black',
  },
  btngroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
});
