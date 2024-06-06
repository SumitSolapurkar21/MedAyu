import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import successIcon from '../../images/success.gif';
import UserContext from '../../components/Context/Context';
import api from '../../../api.json';
import axios from 'axios';

const EpatientRegistration = () => {
  const navigation = useNavigation();
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const {userData} = useContext(UserContext);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [msgPopup, setMsgPopup] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(0);

  //form data
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [cityData, setCityData] = useState([]);
  const [message, setMessage] = useState('');

  const [departmentData, setDepartmentData] = useState([]);
  const [consultDoctorData, setConsultDoctorData] = useState([]);
  const [doctorRoomData, setDoctorRoomData] = useState('');

  const [selectedTime, setSelectedTime] = useState('');
  const [timeslotArray, setTimeSlotArray] = useState([]);

  const [timeSlotPopup, setTimeSlotPopup] = useState(false);

  const Gender_data = [
    {key: 'Male', value: 'Male'},
    {key: 'Female', value: 'Female'},
  ];

  const nationality_data = [{key: 'Indian', value: 'Indian'}];

  const motherTounge_data = [
    {key: 'Marathi', value: 'Marathi'},
    {key: 'Hindi', value: 'Hindi'},
    {key: 'English', value: 'English'},
  ];
  const [formData, setFormData] = useState({
    patientcategory: 'New',
    firstname: '',
    patientgender: '',
    patientmartial: '',
    mobilenumber: '',
    patientdob: '',
    patientage: '',
    // country: '',
    // state: '',
    city: '',
    patientnationality: '',
    patientlanguage: '',
    patientaddress: '',
    depart_id: '',
    doctor_id: '',
    // roomno: '',
    app_date: '',
    slot_id: '',
    purpose: '',
    referal: '',
    remarks: '',
  });

  useEffect(() => {
    const countryData = async () => {
      try {
        await axios.post(`${api.baseurl}/getCountry`).then(res => {
          const c_data = res.data.data;
          let c_array = c_data.map(res => {
            return {name: res.name, code: res.code};
          });
          setCountryData(c_array);
        });
      } catch (error) {
        console.error('Server Not Response for country : ', error);
      }
    };
    countryData();
  }, []);

  let c_code = selectedCountry[0];

  useEffect(() => {
    const stateData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchState`, {code: c_code})
          .then(res => {
            const s_data = res.data.data;

            let s_array = s_data.map(res => {
              return {
                statename: res.statename,
                iso: res.iso,
                countryCode: res.countryCode,
              };
            });

            setStateData(s_array);
          });
      } catch (error) {
        console.error('Server Not Response for state: ', error);
      }
    };
    if (c_code) stateData();
  }, [c_code]);

  let s_code = selectedState[0];

  useEffect(() => {
    if (s_code != '') {
      const cityData = async () => {
        try {
          await axios
            .post(`${api.baseurl}/FetchCitys`, {
              countryCode: c_code,
              iso: s_code,
            })
            .then(res => {
              const city_data = res.data.data;
              let city_array = city_data.map(res => {
                return {
                  cityname: res.cityname,
                };
              });

              setCityData(city_array);
            });
        } catch (error) {
          console.error(
            'Server Not Response for city. Status Code:',
            error.response.status,
            'Error Message:',
            error.message,
          );
        }
      };
      if (s_code) cityData();
    }
  }, [s_code]);

  let reception_id = userData._id;
  useEffect(() => {
    const departmentData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchReceptionDepartmentDeopdown`, {
            reception_id: userData._id,
          })
          .then(res => {
            const dpt_data = res.data.data;
            setDepartmentData(dpt_data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (reception_id !== '') departmentData();
  }, [reception_id]);

  let department_id = formData.depart_id;
  useEffect(() => {
    const consultDoctorData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/DoctorAccDepartmentinAppmtRecpt`, {
            depart_id: department_id,
          })
          .then(res => {
            const consultDoctor_data = res.data.data;
            setConsultDoctorData(consultDoctor_data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (department_id !== '') consultDoctorData();
  }, [department_id]);

  let doctor_id = formData.doctor_id;
  useEffect(() => {
    const doctorRoomData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/GetroomnoAccDoctor`, {
            doctor_id: doctor_id,
          })
          .then(res => {
            const doctorRoomdata = res.data.data;
            setDoctorRoomData(doctorRoomdata);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (doctor_id !== '') {
      doctorRoomData();
    }
  }, [doctor_id]);

  //time slot array .....
  const timeSlot = async () => {
    await axios
      .post(`${api.baseurl}/GetSchedulerForMobile`, {
        reception_id: reception_id,
        hospital_id: userData.hospital_id,
        doctor_id: doctor_id,
        mydate: formData.app_date,
      })
      .then(res => {
        setTimeSlotArray(res.data.data);
        return res.data.data;
      });
  };

  //dob
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Date
  const datePickerHandler = () => {
    setDatePicker(!datePicker);
  };

  // Function for handling DOB
  const handleDOB = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    const Dateformat = x1[2] + '-' + x1[1] + '-' + x1[0];
    setFormData({
      ...formData,
      patientdob: Dateformat,
    });
    hideDatePicker();
  };

  // Function for handling Date
  const handleDate = date => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    const Dateformat = `${year}-${month}-${day}`;
    setFormData({
      ...formData,
      app_date: Dateformat,
    });
    hideDatePicker();
  };

  // Function for handling Time
  const handleTime = time => {
    const dt = new Date(time);
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    const Timeformat = `${hours}.${minutes}`;
    setFormData({
      ...formData,
      slot_id: Timeformat,
    });
    hideDatePicker();
  };

  const handleInputChange = (fieldName, value) => {
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: '',
    }));
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const [validationErrors, setValidationErrors] = useState({
    departmentName: '',
    consultDoctor: '',
    date: '',
    appointmentTime: '',
  });

  const handleSubmit = async () => {
    const errors = {};

    if (!formData.depart_id) {
      errors.depart_id = 'Please select a department.';
    }
    if (!formData.doctor_id) {
      errors.doctor_id = 'Please select a consult doctor.';
    }
    if (formData.date === 'Select Date') {
      errors.date = 'Please select a date.';
    }
    if (formData.slot_id === 'Select Time') {
      errors.slot_id = 'Please select an appointment time.';
    }

    setValidationErrors(errors);

    try {
      await axios
        .post(`${api.baseurl}/AddReceptionOutPatientForMobile`, {
          reception_id: userData._id,
          patientcategory: 'New',
          firstname: formData.firstname,
          patientgender: formData.patientgender,
          patientmartial: 'Single',
          mobilenumber: formData.mobilenumber,
          patientdob: formData.patientdob,
          patientage: formData.patientage,
          country: selectedCountry[1],
          state: selectedState[1],
          cityname: formData.city,
          patientnationality: formData.patientnationality,
          patientlanguage: formData.patientlanguage,
          patientaddress: formData.patientaddress,
          depart_id: formData.depart_id,
          doctor_id: formData.doctor_id,
          app_date: formData.app_date,
          slot_id: selectedTime,
          roomno: doctorRoomData,
        })
        .then(res => {
          const formRes = res.data;
          setMessage(formRes.message);
          return formRes;
        });
      setMsgPopup(true);
      setBackdropOpacity(0.5);
      setFormData([]);
    } catch (error) {
      console.error('Data Not Submitted', error);
    }
  };

  const openTimeSlotPopup = () => {
    setTimeSlotPopup(true);
    setBackdropOpacity(0.5);
  };

  const closeTimeSlotPopup = () => {
    setTimeSlotPopup(false);
    setBackdropOpacity(0);
  };

  useEffect(() => {
    if (formData.app_date !== '') timeSlot();
  }, [formData.app_date]);

  // Function to group timeslots into rows of 3
  const groupTimeslotsIntoRows = (timeslots, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < timeslots.length; i += itemsPerRow) {
      rows.push(timeslots.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  // Group timeslots into rows of 3
  const timeslotRows = groupTimeslotsIntoRows(timeslotArray, 3);

  return (
    <SafeAreaView style={styles.container}>
      {msgPopup && (
        <>
          <View style={styles.modal}>
            <View style={styles.modalBody}>
              <Image
                source={successIcon}
                alt="successIcon"
                style={styles.img}
              />
              <Text style={styles.modalText}>{message}</Text>
              <TouchableOpacity style={styles.modalBtn}>
                <Text
                  style={styles.modalBtnText}
                  onPress={() => {
                    setMsgPopup(false);
                    navigation.navigate('Home');
                  }}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {msgPopup && (
        <View
          style={[
            styles.backdrop,
            {backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`, zIndex: 1},
          ]}
        />
      )}

      {timeSlotPopup && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={timeSlotPopup}
          onRequestClose={closeTimeSlotPopup}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}>
                <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                  Select Time Slot
                </Text>
                <FontAwesome6
                  name="xmark"
                  color="red"
                  size={24}
                  onPress={closeTimeSlotPopup}
                />
              </View>
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                <View style={styles.div}>
                  {timeslotRows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.timeSlotBox}>
                      {row.map((timeslot, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.datess1,
                            {
                              backgroundColor:
                                timeslot.timestatus === 'true' ||
                                timeslot.timeSlot === selectedTime
                                  ? '#03b1fc'
                                  : 'white',
                              borderColor:
                                timeslot.timestatus === 'true'
                                  ? '#03b1fc'
                                  : '#03b1fc',
                            },
                          ]}
                          onPress={() => {
                            setSelectedTime(timeslot.timeSlot),
                              closeTimeSlotPopup();
                          }}>
                          <Text
                            style={[
                              styles.dateText,
                              {
                                color:
                                  timeslot.timestatus === 'true' ||
                                  timeslot.timeSlot === selectedTime
                                    ? 'white'
                                    : '#03b1fc',
                              },
                            ]}>
                            {timeslot.timeSlot}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>FULLNAME</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="FULLNAME"
            value={formData.firstname}
            onChangeText={text => handleInputChange('firstname', text)}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>GENDER</Text>
          <SelectList
            setSelected={val => handleInputChange('patientgender', val)}
            data={Gender_data}
            search={false}
            boxStyles={styles.selectBox}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>MOBILE NUMBER</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="MOBILE NUMBER"
            keyboardType="numeric"
            maxLength={10}
            value={formData.mobilenumber}
            onChangeText={text => handleInputChange('mobilenumber', text)}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>DATE OF BIRTH</Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: 'green',
              borderBottomWidth: 2,
            }}>
            <Text style={{padding: 10, flex: 1}}>{formData.patientdob}</Text>
            <FontAwesome6 name="calendar-days" color="red" size={22} />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDOB}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>AGE</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="AGE"
            value={formData.patientage}
            onChangeText={text => handleInputChange('patientage', text)}
          />
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>COUNTRY</Text>
            <SelectList
              setSelected={val => {
                setSelectedCountry(val);
                handleInputChange('country', val);
              }}
              data={countryData.map(res => ({
                key: [res.code, res.name],
                value: res.name,
              }))}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>STATE</Text>
            <SelectList
              setSelected={value => {
                handleInputChange('state', value), setSelectedState(value);
              }}
              data={stateData.map(res => ({
                key: [res.iso, res.statename],
                value: res.statename,
              }))}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>

        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>CITY</Text>
            <SelectList
              setSelected={val => handleInputChange('city', val)}
              data={cityData.map(res => ({
                value: res.cityname,
              }))}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>NATIONALITY</Text>
            <SelectList
              setSelected={val => handleInputChange('patientnationality', val)}
              data={nationality_data}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>MOTHER TOUNGE</Text>
            <SelectList
              setSelected={val => handleInputChange('patientlanguage', val)}
              data={motherTounge_data}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>ADDRESS</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="ADDRESS"
            value={formData.patientaddress}
            onChangeText={text => handleInputChange('patientaddress', text)}
          />
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>DEPARTMENT</Text>
            <SelectList
              setSelected={val => handleInputChange('depart_id', val)}
              data={departmentData.map(res => ({
                key: res.depart_id,
                value: res.deptname,
              }))}
              search={false}
              boxStyles={styles.selectBox}
            />
            {validationErrors.departmentName && (
              <Text style={styles.validationError}>
                {validationErrors.departmentName}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>CONSULT DOCTOR</Text>
            <SelectList
              setSelected={val => handleInputChange('doctor_id', val)}
              data={consultDoctorData.map(res => ({
                key: res._id,
                value: res.name,
              }))}
              search={false}
              boxStyles={styles.selectBox}
            />
            {validationErrors.consultDoctor && (
              <Text style={styles.validationError}>
                {validationErrors.consultDoctor}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>Room No </Text>
            <TextInput
              style={styles.fieldInput}
              placeholder="Room No"
              value={doctorRoomData}
              // onChangeText={text => handleInputChange('roomno', text)}
              readOnly
            />
          </View>
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>DATE</Text>
          <TouchableOpacity onPress={datePickerHandler}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'green',
                borderBottomWidth: 2,
              }}>
              <Text style={{padding: 10, flex: 1}}>{formData.app_date}</Text>
              <FontAwesome6 name="calendar-days" color="red" size={22} />
            </View>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={datePicker}
            mode="date"
            onConfirm={handleDate}
            onCancel={hideDatePicker}
          />
          {validationErrors.date && (
            <Text style={styles.validationError}>{validationErrors.date}</Text>
          )}
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>APPOINTMENT TIME</Text>
          <TouchableOpacity
            onChangeText={() =>
              setFormData({
                ...formData,
                slot_id: selectedTime,
              })
            }
            onPress={() => {
              openTimeSlotPopup();
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: 'green',
              borderBottomWidth: 2,
            }}>
            <Text style={{padding: 10, fontSize: 14, flex: 1}}>
              {selectedTime.toString()}
            </Text>
            <FontAwesome6 name="clock" color="red" size={22} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.formSubmit} onPress={handleSubmit}>
        <Text style={styles.formSubmitTest}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EpatientRegistration;

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  content: {
    marginHorizontal: 20,
  },
  fields: {
    marginVertical: 6,
  },
  fieldText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#127359',
  },
  fieldInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
  },
  selectBox: {
    borderBottomColor: '#127359',
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 0,
  },
  formSubmit: {
    backgroundColor: 'orange',
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 10,
    borderRadius: 6,
  },
  validationError: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },

  formSubmitTest: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
  },
  modal: {
    flex: 1,
    backgroundColor: 'red',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
  },
  modalBody: {
    backgroundColor: '#ffffff',
    width: 220,
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#127359',
  },
  modalBtn: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 6,
    marginVertical: 10,
    width: 60,
  },
  modalBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  timeSlotBox: {
    // flexDirection: 'row',
    // gap: 10,
    padding: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '88%',
    maxHeight: 480,
  },
  modalCloseText: {
    color: 'blue',
    fontSize: 18,
  },
  datess1: {
    height: 40,
    width: 80,
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: '#03b1fc',
    borderWidth: 2,
    marginBottom: 8,
  },
  dateText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#03b1fc',
  },

  timeHeading: {
    fontWeight: '600',
    fontSize: 12,
    // textAlign: 'center',
  },
});
