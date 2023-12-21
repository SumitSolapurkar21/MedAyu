import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../api.json';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDown from 'react-native-paper-dropdown';

const EipdregistrationIdentification = () => {
  const navigation = useNavigation();
  const [datePicker, setDatePicker] = useState(false);
  const [datePicker2, setDatePicker2] = useState(false);
  //form data ....
  const [formData, setFormData] = useState({
    photoidtype: '',
    occupation: '',
    issuingauthoritydetail: '',
    fullname: '',
    idnumber: '',
    validfrom: '',
    validtill: '',
  });
  //input handler ....
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };
  // Date
  const datePickerHandler = () => {
    setDatePicker(!datePicker);
  };
  const hideDatePicker = () => {
    setDatePicker(!datePicker);
  };
  //till date...
  const datePickerHandler2 = () => {
    setDatePicker2(!datePicker2);
  };
  const hideDatePicker2 = () => {
    setDatePicker2(!datePicker2);
  };
  // Function for handling Date
  const handleDate = date => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    // const Dateformat = `${year}-${month}-${day}`;
    const Dateformat = `${day}-${month}-${year}`;
    setFormData({
      ...formData,
      validfrom: Dateformat,
    });
    hideDatePicker();
  };
  const handleDate2 = date => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    // const Dateformat = `${year}-${month}-${day}`;
    const Dateformat2 = `${day}-${month}-${year}`;
    setFormData({
      ...formData,
      validtill: Dateformat2,
    });
    hideDatePicker2();
  };
  //submit handler.....
  const addIdentificationData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'Identification',
          photoidtype: formData.photoidtype,
          issuingauthoritydetail: formData.issuingauthoritydetail,
          fullname: formData.fullname,
          idnumber: formData.idnumber,
          validfrom: formData.validfrom,
          validtill: formData.validtill,
        })
        .then(res => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical>
        <View style={styles.main}>
          <View style={styles.mainHead}>
            <Text style={styles.mainHeadText}>Identification</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Photo Id Type</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Photo Id Type"
                value={formData.photoidtype}
                onChangeText={text => handleInputChange('photoidtype', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Issuing Authority Detail </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Issuing Authority Detail"
                value={formData.issuingauthoritydetail}
                onChangeText={text =>
                  handleInputChange('issuingauthoritydetail', text)
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Full Name </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Full Name"
                value={formData.fullname}
                onChangeText={text => handleInputChange('fullname', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>ID Number </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="ID Number"
                value={formData.idnumber}
                onChangeText={text => handleInputChange('idnumber', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Valid From </Text>
              <TouchableOpacity onPress={datePickerHandler}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: 'green',
                    borderBottomWidth: 2,
                  }}>
                  <Text style={{padding: 10, flex: 1}}>
                    {formData.validfrom}
                  </Text>
                  <FontAwesome6 name="calendar-days" color="red" size={22} />
                </View>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={datePicker}
                mode="date"
                onConfirm={handleDate}
                onCancel={hideDatePicker}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Valid Till </Text>
              <TouchableOpacity onPress={datePickerHandler2}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: 'green',
                    borderBottomWidth: 2,
                  }}>
                  <Text style={{padding: 10, flex: 1}}>
                    {formData.validtill}
                  </Text>
                  <FontAwesome6 name="calendar-days" color="red" size={22} />
                </View>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={datePicker2}
                mode="date"
                onConfirm={handleDate2}
                onCancel={hideDatePicker2}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formGrpButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationSocioeconomics')}>
          <Text style={[styles.formButton, {backgroundColor: '#ebc934'}]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EipdregistrationInsurance'),
              addIdentificationData();
          }}>
          <Text style={[styles.formButton, {backgroundColor: '#04e004'}]}>
            Save & Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationInsurance')}>
          <Text
            style={[
              styles.formButton,
              {backgroundColor: '#049be0', width: 100},
            ]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EipdregistrationIdentification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
  main: {
    marginHorizontal: 20,
  },
  mainHead: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffb836',
    paddingBottom: 10,
    marginBottom: 30,
  },
  mainHeadText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36abff',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    color: '#127359',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
  },
  formGrpButton: {
    flexDirection: 'row',
    marginVertical: 16,
    alignSelf: 'center',
    columnGap: 10,
  },
  formButton: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 4,
    textAlign: 'center',
  },
});
