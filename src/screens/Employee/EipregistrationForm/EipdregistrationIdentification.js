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
import DropDown from 'react-native-paper-dropdown';
import UserContext from '../../../components/Context/Context';
import {Appbar} from 'react-native-paper';
import {IpdRegistrationNavigation} from '../OPD/Assessment/OpdpageNavigation';

const EipdregistrationIdentification = () => {
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {_id, hospital_id} = userData;
  const {patient_id} = scannedPatientsData;
  const navigation = useNavigation();
  const [datePicker, setDatePicker] = useState(false);
  const [datePicker2, setDatePicker2] = useState(false);
  const [showPhotoid_dd, setPhotoid_dd] = useState(false);
  const [p_photoid, setP_photoid] = useState('');
  const [authority, setAuthority] = useState(null);
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('EipdregistrationSocioeconomics');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //photo id type array .....
  let p_photoid_type = [
    {
      label: 'Aadhaar Card',
      value: 'Aadhaar Card',
    },
    {
      label: 'Passport',
      value: 'Passport',
    },
    {
      label: 'Driving License',
      value: 'Driving License',
    },
    {
      label: 'Election Commission ID Card',
      value: 'Election Commission ID Card',
    },
    {
      label: 'Ration Card',
      value: 'Ration Card',
    },
    {
      label: 'Pan Card',
      value: 'Pan Card',
    },
    {
      label: 'Kissan Passbook',
      value: 'Kissan Passbook',
    },
    {
      label: 'Others',
      value: 'Others',
    },
  ];

  // useEffect to update authority when p_photoid changes
  useEffect(() => {
    // Define the authority based on p_photoid
    const selectedAuthority =
      p_photoid === 'Aadhaar Card'
        ? 'Unique Identification Authority Of India'
        : p_photoid === 'Passport'
        ? 'The Ministry Of External Affairs'
        : p_photoid === 'Driving License'
        ? 'Ministry Of Road Transport'
        : p_photoid === 'Election Commission ID Card'
        ? 'The Election Commission ID Card'
        : p_photoid === 'Ration Card'
        ? 'Sub-Divisional Controller Of Food and Supplies'
        : p_photoid === 'Pan Card'
        ? 'The Income Tax Department'
        : p_photoid === 'Kissan Passbook'
        ? 'Kissan Passbook'
        : p_photoid === 'Others'
        ? 'Others'
        : null;

    // Update the state with the calculated authority
    setAuthority(selectedAuthority);
  }, [p_photoid]);

  //form data ....
  const [formData, setFormData] = useState({
    photoidtype: p_photoid,
    occupation: '',
    issuingauthoritydetail: authority,
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
    const data = {
      role: 'Identification',
      photoidtype: p_photoid,
      issuingauthoritydetail: authority,
      fullname: formData.fullname,
      idnumber: formData.idnumber,
      validfrom: formData.validfrom,
      validtill: formData.validtill,
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'Identification',
          photoidtype: p_photoid,
          issuingauthoritydetail: authority,
          fullname: formData.fullname,
          idnumber: formData.idnumber,
          validfrom: formData.validfrom,
          validtill: formData.validtill,
          reception_id: _id,
          hospital_id: hospital_id,
          patient_id: patient_id,
        })
        .then(res => {
          return res;
        });
    } catch (error) {
      console.error(error);
    }
  };
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('EipdregistrationSocioeconomics');
            return true;
          }}
        />
        <Appbar.Content title="Indetification" titleStyle={{fontSize: 20}} />
        <Appbar.Action
          icon="account-details"
          size={30}
          onPress={() => openMenu()}
        />
      </Appbar.Header>
      <IpdRegistrationNavigation
        closeMenu={closeMenu}
        openMenu={openMenu}
        _handleMore={_handleMore}
        visible={visible}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView vertical>
          <View style={styles.main}>
            <View style={styles.mainHead}>
              <Text style={styles.mainHeadText}>Identification</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <DropDown
                  label={'Photo ID Type'}
                  mode={'outlined'}
                  visible={showPhotoid_dd}
                  showDropDown={() => setPhotoid_dd(true)}
                  onDismiss={() => setPhotoid_dd(false)}
                  value={p_photoid}
                  setValue={setP_photoid}
                  list={p_photoid_type?.map((res, index) => ({
                    label: res.label,
                    value: res.value,
                    key: index.toString(),
                  }))}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Issuing Authority Detail </Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Issuing Authority Detail"
                  value={authority}
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
            onPress={() =>
              navigation.navigate('EipdregistrationSocioeconomics')
            }>
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
    </>
  );
};

export default EipdregistrationIdentification;

const styles = StyleSheet.create({
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
