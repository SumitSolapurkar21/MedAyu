import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import medayuLogo from '../../images/medayu.jpeg';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import DateTimeAppointment from '../../components/DateTimeAppointment';
import {SelectList} from 'react-native-dropdown-select-list';
import {useNavigation} from '@react-navigation/native';

import successIcon from '../../images/success.gif';
import MsgPopup from '../../components/MsgPopup/MsgPopup';

const Eappointment = () => {
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    department: '',
    doctor: '',
  });
  const [msgPopup, setMsgPopup] = useState(false);

  const department_data = [{key: '1', value: 'Panchakarma'}];
  const doctor_data = [{key: '1', value: 'Pranay Parihar'}];

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    const errors = {};

    if (Object.keys(errors).length === 0) {
      console.log('Form data:', formData);
      // Reset the form fields
      setFormData([]);
    }
    setMsgPopup(true);
    setBackdropOpacity(0.5);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerHeader}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>Hi Sumit</Text>
        </View>
        <View style={styles.hrcontent}>
          <TouchableOpacity>
            <FontAwesome name="bell" size={22} color="#127359" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <FontAwesome name="user" size={22} color="#127359" />
          </TouchableOpacity>
        </View>
      </View>

      <MsgPopup
        msgPopup={msgPopup}
        setMsgPopup={setMsgPopup}
        backdropOpacity={backdropOpacity}
      />

      <View style={styles.main}>
        <View style={styles.selection}>
          <Text
            style={{
              marginVertical: 8,
              fontWeight: '600',
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
            }}>
            Add Appointments
          </Text>

          <View style={styles.fields}>
            <Text style={styles.fieldText}>Department</Text>
            <SelectList
              setSelected={val => handleInputChange('department', val)}
              data={department_data}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
          <View style={styles.fields}>
            <Text style={styles.fieldText}>Doctor</Text>
            <SelectList
              setSelected={val => handleInputChange('doctor', val)}
              data={doctor_data}
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
        </View>
      </View>

      <DateTimeAppointment />

      <TouchableOpacity style={styles.formSubmit} onPress={handleSubmit}>
        <Text style={styles.formSubmitTest}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Eappointment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  outerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hlcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 6,
  },
  uName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#127359',
  },
  hrcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 16,
  },
  img: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  selection: {
    marginHorizontal: 16,
    marginVertical: 10,
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
  formSubmit: {
    backgroundColor: 'orange',
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 10,
    borderRadius: 6,
  },

  formSubmitTest: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
  },
});
