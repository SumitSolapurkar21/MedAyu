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
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import UserContext from '../../../components/Context/Context';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import api from '../../../../api.json';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {TextInput} from 'react-native-paper';

const EipregistrationProfile = () => {
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {_id, hospital_id} = userData?.data[0];
  const {
    firstname,
    mobilenumber,
    patientage,
    patientgender,
    uhid,
    patientaddress,
    patientdob,
    patientlanguage,
    patientmartial,
    patientnationality,
    registerdate,
    appoint_id,
    patient_id,
  } = scannedPatientsData;

  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [cityData, setCityData] = useState([]);
  const [datePicker, setDatePicker] = useState(false);
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
  // current data ...
  let today = new Date();
  // let currentDate =
  //   today.getDate().toString().padStart(2, '0') +
  //   '-' +
  //   (today.getMonth() + 1).toString().padStart(2, '0') +
  //   '-' +
  //   today.getFullYear();
  let currentDate =
    today.getFullYear() +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    today.getDate().toString().padStart(2, '0');

  //current time ...
  const dt = new Date();
  const hours = dt.getHours().toString().padStart(2, '0');
  const minutes = dt.getMinutes().toString().padStart(2, '0');
  const admissiontime = `${hours}.${minutes}`;

  //navigation .....
  const navigation = useNavigation();

  //country....
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

  //form data ....
  const [formData, setFormData] = useState({
    // patientcategory: 'New',
    firstname: firstname,
    patientgender: patientgender,
    patientmartial: patientmartial,
    mobilenumber: mobilenumber,
    patientdob: patientdob,
    patientage: patientage,
    city: '',
    patientnationality: patientnationality,
    patientlanguage: patientlanguage,
    patientaddress: patientaddress,
    patientemail: '',
    patientprofession: '',
    flatno: '',
    building_village: '',
    road_street: '',
    area: '',
    pincode: '',
    landlineno: '',
    whatsappno: '',
  });
  // Date
  const datePickerHandler = () => {
    setDatePicker(!datePicker);
  };
  const hideDatePicker = () => {
    setDatePicker(!datePicker);
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
      patientdob: Dateformat,
    });
    hideDatePicker();
  };
  //input handler ....
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  //submit profile handler.....
  // const _profiledata = {
  //   registerdate: registerdate,
  //   admissiondata: currentDate,
  //   admissiontime: admissiontime,
  //   uhidno: uhid,
  //   opno: appoint_id,
  //   firstname: formData.firstname,
  //   patientgender: formData.patientgender,
  //   patientmartial: formData.patientmartial,
  //   mobilenumber: formData.mobilenumber,
  //   patientdob: formData.patientdob,
  //   patientage: formData.patientage,
  //   country: selectedCountry[1],
  //   state: selectedState[1],
  //   city: formData.city,
  //   patientnationality: formData.patientnationality,
  //   patientlanguage: formData.patientlanguage,
  //   patientaddress: formData.patientaddress,
  //   patientemail: formData.patientemail,
  //   patientprofession: formData.patientprofession,
  //   flatno: formData.flatno,
  //   building_village: formData.building_village,
  //   road_street: formData.road_street,
  //   area: formData.area,
  //   pincode: formData.pincode,
  //   landlineno: formData.landlineno,
  //   whatsappno: formData.whatsappno,
  // };
  const addProfileData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'Profile',
          registerdate: registerdate,
          admissiondata: currentDate,
          admissiontime: admissiontime,
          uhidno: uhid,
          opno: appoint_id,
          firstname: formData.firstname,
          patientgender: formData.patientgender,
          patientmartial: formData.patientmartial,
          mobilenumber: formData.mobilenumber,
          patientdob: formData.patientdob,
          patientage: formData.patientage,
          country: selectedCountry[1],
          state: selectedState[1],
          city: formData.city,
          patientnationality: formData.patientnationality,
          patientlanguage: formData.patientlanguage,
          patientaddress: formData.patientaddress,
          patientemail: formData.patientemail,
          patientprofession: formData.patientprofession,
          flatno: formData.flatno,
          building_village: formData.building_village,
          road_street: formData.road_street,
          area: formData.area,
          pincode: formData.pincode,
          landlineno: formData.landlineno,
          whatsappno: formData.whatsappno,
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical>
        <View style={styles.main}>
          <View style={styles.mainHead}>
            <Text style={styles.mainHeadText}>Profile</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Registered Date</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Registered Date"
                value={registerdate}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Admission Date </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Admission Date"
                value={currentDate}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Admission Time </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Admission Time"
                value={admissiontime}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>UHID No </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="UHID"
                value={uhid}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>OP No </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="OP"
                value={appoint_id}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Full Name </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Full Name"
                value={formData.firstname}
                onChangeText={text => handleInputChange('firstname', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Gender </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Gender"
                value={formData.patientgender}
                onChangeText={text => handleInputChange('patientgender', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Mobile Number </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Mobile Number"
                value={formData.mobilenumber}
                maxLength={10}
                onChangeText={text => handleInputChange('mobilenumber', text)}
              />
            </View>
            <View style={styles.formGroup}>
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
                    <Text style={{padding: 10, flex: 1}}>
                      {formData.patientdob}
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
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Age </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Age"
                value={formData.patientage}
                onChangeText={text => handleInputChange('patientage', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Martial Status </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Martial Status"
                value={formData.patientmartial}
                onChangeText={text => handleInputChange('patientmartial', text)}
              />
            </View>
            <View style={styles.formGroup}>
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
            <View style={styles.formGroup}>
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
            <View style={styles.formGroup}>
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
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Nationality </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Nationality"
                value={formData.patientnationality}
                onChangeText={text =>
                  handleInputChange('patientnationality', text)
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Mother Tounge </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Mother Tounge"
                value={formData.patientlanguage}
                onChangeText={text =>
                  handleInputChange('patientlanguage', text)
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Email"
                value={formData.patientemail}
                onChangeText={text => handleInputChange('patientemail', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Address </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Address"
                value={formData.patientaddress}
                onChangeText={text => handleInputChange('patientaddress', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Profession </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Profession"
                value={formData.patientprofession}
                onChangeText={text =>
                  handleInputChange('patientprofession', text)
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Flat / Door / Block No. </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Flat / Door / Block No."
                value={formData.flatno}
                onChangeText={text => handleInputChange('flatno', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>
                Name of Primises / Building / Village{' '}
              </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Name of Primises / Building / Village"
                value={formData.building_village}
                onChangeText={text =>
                  handleInputChange('building_village', text)
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Road / Street / Post-Office </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Road / Street / Post-Office"
                value={formData.road_street}
                onChangeText={text => handleInputChange('road_street', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Area / Locality </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Area / Locality"
                value={formData.area}
                onChangeText={text => handleInputChange('area', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Pin Code </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Pin Code"
                value={formData.pincode}
                onChangeText={text => handleInputChange('pincode', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>LandLine No. </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Landline No."
                value={formData.landlineno}
                onChangeText={text => handleInputChange('landlineno', text)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Whatsapp No </Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Whatsapp"
                value={formData.whatsappno}
                onChangeText={text => handleInputChange('whatsappno', text)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formGrpButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EipdregistrationSocioeconomics'),
              addProfileData();
          }}>
          <Text style={[styles.formButton, {backgroundColor: '#ebc934'}]}>
            Save & Next
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('EipdregistrationSocioeconomics')}>
          <Text
            style={[
              styles.formButton,
              {backgroundColor: '#049be0', width: 100},
            ]}>
            Skip
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default EipregistrationProfile;

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
