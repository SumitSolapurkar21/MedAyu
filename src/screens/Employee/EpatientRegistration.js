import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import successIcon from '../../images/success.gif';
// import DateTimePicker from '@react-native-community/datetimepicker';

const EpatientRegistration = () => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [appTimePicker, setAppTimePicker] = useState(false);
  const [msgPopup, setMsgPopup] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(0);

  const Gender_data = [
    {key: '1', value: 'Male'},
    {key: '2', value: 'Female'},
  ];
  const country_data = [{key: '1', value: 'India'}];
  const state_data = [{key: '1', value: 'Maharashtra'}];
  const city_data = [{key: '1', value: 'Nagpur'}];
  const nationality_data = [{key: '1', value: 'Indian'}];
  const department_data = [{key: '1', value: 'OPT'}];
  const consultDoctor = [{key: '1', value: 'Pranay Parihar'}];
  const motherTounge_data = [
    {key: '1', value: 'Marathi'},
    {key: '2', value: 'Hindi'},
  ];
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    mobileNumber: '',
    dateOfBirth: 'Select DOB',
    age: '',
    country: '',
    state: '',
    city: '',
    nationality: '',
    address: '',
    consultDoctor: '',
    date: 'Select Date',
    appointmentTime: 'Select Time',
    purpose: '',
    referal: '',
    remarks: '',
  });

  //dob
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Date
  const datePickerHandler = () => {
    setDatePicker(true);
  };

  //appointment time picker
  const appTimePickerHandler = () => {
    setAppTimePicker(true);
  };

  const handleConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    const Dateformat = x1[2] + '-' + x1[1] + '-' + x1[0];
    setFormData({
      ...formData,
      dateOfBirth: Dateformat,
      date: Dateformat,
      appointmentTime: dt.toLocaleTimeString(),
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
  const handleSubmit = () => {
    const errors = {};

    if (!formData.departmentName) {
      errors.departmentName = 'Please select a department.';
    }
    if (!formData.consultDoctor) {
      errors.consultDoctor = 'Please select a consult doctor.';
    }
    if (formData.date === 'Select Date') {
      errors.date = 'Please select a date.';
    }
    if (formData.appointmentTime === 'Select Time') {
      errors.appointmentTime = 'Please select an appointment time.';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Form data:', formData);
      // Reset the form fields
      setFormData({
        fullName: '',
        gender: '',
        mobileNumber: '',
        dateOfBirth: 'Select DOB',
        age: '',
        country: '',
        state: '',
        city: '',
        nationality: '',
        address: '',
        consultDoctor: '',
        date: 'Select Date',
        appointmentTime: 'Select Time',
        purpose: '',
        referal: '',
        remarks: '',
      });

      setMsgPopup(true);
      setBackdropOpacity(0.5);
    }
  };

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
              <Text style={styles.modalText}>
                Patient Registered Successfully
              </Text>
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

      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
          <FontAwesome6
            name="arrow-left-long"
            color="#127359"
            size={28}
            onPress={() => navigation.navigate('Home')}
          />
          <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
            Patient Registration
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <FontAwesome6 name="location-dot" color="#127359" size={18} />
          <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
            Nagpur
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>FULLNAME</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="FULLNAME"
            value={formData.fullName}
            onChangeText={text => handleInputChange('fullName', text)}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>GENDER</Text>
          <SelectList
            setSelected={val => handleInputChange('gender', val)}
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
            value={formData.mobileNumber}
            onChangeText={text => handleInputChange('mobileNumber', text)}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>DATE OF BIRTH</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={[styles.fieldInput, {padding: 12}]}>
              {formData.dateOfBirth}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>AGE</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="AGE"
            value={formData.age}
            onChangeText={text => handleInputChange('age', text)}
          />
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>COUNTRY</Text>
            <SelectList
              setSelected={val => handleInputChange('country', val)}
              data={country_data}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>STATE</Text>
            <SelectList
              setSelected={val => handleInputChange('state', val)}
              data={state_data}
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
              data={city_data}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>NATIONALITY</Text>
            <SelectList
              setSelected={val => handleInputChange('nationality', val)}
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
              setSelected={val => handleInputChange('motherTounge', val)}
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
            value={formData.address}
            onChangeText={text => handleInputChange('address', text)}
          />
        </View>
        <View style={styles.fields}>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>DEPARTMENT</Text>
            <SelectList
              setSelected={val => handleInputChange('departmentName', val)}
              data={department_data}
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
              setSelected={val => handleInputChange('consultDoctor', val)}
              data={consultDoctor}
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
          <Text style={styles.fieldText}>DATE</Text>
          <TouchableOpacity onPress={datePickerHandler}>
            <Text style={[styles.fieldInput, {padding: 12}]}>
              {formData.date}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={datePicker}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {validationErrors.date && (
            <Text style={styles.validationError}>{validationErrors.date}</Text>
          )}
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>APPOINTMENT TIME</Text>
          <TouchableOpacity onPress={appTimePickerHandler}>
            <Text style={[styles.fieldInput, {padding: 12}]}>
              {formData.appointmentTime}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={appTimePicker}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {validationErrors.appointmentTime && (
            <Text style={styles.validationError}>
              {validationErrors.appointmentTime}
            </Text>
          )}
        </View>

        <View style={styles.fields}>
          <Text style={styles.fieldText}>PERPOSE</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="PERPOSE"
            value={formData.perpose}
            onChangeText={text => handleInputChange('perpose', text)}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>REFERAL</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="REFERAL"
            value={formData.referal}
            onChangeText={text => handleInputChange('referal', text)}
          />
        </View>
        <View style={styles.fields}>
          <Text style={styles.fieldText}>REMARKS</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="REMARKS"
            value={formData.remarks}
            onChangeText={text => handleInputChange('remarks', text)}
          />
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
  container: {
    // backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    //     borderBottomWidth: 2,
    paddingBottom: 16,
    //     borderBottomColor: '#127359',
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
});
