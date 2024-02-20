import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import api from '../../../../api.json';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import UserContext from '../../../components/Context/Context';

const EipdregistrationInsurance = () => {
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {_id, hospital_id} = userData?.data[0];
  const {patient_id} = scannedPatientsData;
  const navigation = useNavigation();
  const [datePicker, setDatePicker] = useState(false);
  const [datePicker2, setDatePicker2] = useState(false);

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
  //form data ....
  const [formData, setFormData] = useState({
    insurancecompany: '',
    tpacompany: '',
    nameofpolicyholder: '',
    policynumber: '',
    validfrom: '',
    validto: '',
    suminsured: '',
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
      validto: Dateformat2,
    });
    hideDatePicker2();
  };
  //submit handler.....
  const addInsuranceData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'Insurance',
          insurancecompany: formData.insurancecompany,
          tpacompany: formData.tpacompany,
          nameofpolicyholder: formData.nameofpolicyholder,
          policynumber: formData.policynumber,
          validfrom: formData.validfrom,
          validto: formData.validto,
          reception_id: _id,
          hospital_id: hospital_id,
          patient_id: patient_id,
          suminsured: formData.suminsured,
        })
        .then(res => {
          return res;
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
            <Text style={styles.mainHeadText}>Insurance</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Insurance Company</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Insurance Company"
                value={formData.insurancecompany}
                onChangeText={text =>
                  handleInputChange('insurancecompany', text)
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>TPA Company </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="TPA Company"
                value={formData.tpacompany}
                onChangeText={text => handleInputChange('tpacompany', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name of Policy Holder </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Name of Policy Holder"
                value={formData.nameofpolicyholder}
                onChangeText={text =>
                  handleInputChange('nameofpolicyholder', text)
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Policy Number </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Policy Number"
                value={formData.policynumber}
                onChangeText={text => handleInputChange('policynumber', text)}
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
              <Text style={styles.formLabel}>Valid To </Text>
              <TouchableOpacity onPress={datePickerHandler2}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: 'green',
                    borderBottomWidth: 2,
                  }}>
                  <Text style={{padding: 10, flex: 1}}>{formData.validto}</Text>
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
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Sum Insured </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Sum Insured"
                value={formData.suminsured}
                onChangeText={text => handleInputChange('suminsured', text)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formGrpButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationIdentification')}>
          <Text style={[styles.formButton, {backgroundColor: '#ebc934'}]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EipdregistrationEmergencyContact'),
              addInsuranceData();
          }}>
          <Text style={[styles.formButton, {backgroundColor: '#04e004'}]}>
            Save & Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EipdregistrationEmergencyContact')
          }>
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

export default EipdregistrationInsurance;

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
