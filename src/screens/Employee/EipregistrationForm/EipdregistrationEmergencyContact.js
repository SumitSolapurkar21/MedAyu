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
import api from '../../../../api.json';
import axios from 'axios';
import DropDown from 'react-native-paper-dropdown';
import UserContext from '../../../components/Context/Context';
import {IpdRegistrationNavigation} from '../OPD/Assessment/OpdpageNavigation';
import {Appbar} from 'react-native-paper';

const EipdregistrationEmergencyContact = () => {
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {_id, hospital_id} = userData;
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
  const navigation = useNavigation();
  const [p_relation, setP_relation] = useState('');
  const [showRelation, setShowRelation] = useState(false);
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('EipdregistrationInsurance');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //relation....
  let relation = [
    {
      label: 'Father',
      value: 'Father',
    },
    {
      label: 'Mother',
      value: 'Mother',
    },
    {
      label: 'Son',
      value: 'Son',
    },
    {
      label: 'Daughter',
      value: 'Daughter',
    },
    {
      label: 'Husband',
      value: 'Husband',
    },
    {
      label: 'Wife',
      value: 'Wife',
    },
    {
      label: 'Guardian',
      value: 'Guardian',
    },
  ];
  //form data ....
  const [formData, setFormData] = useState({
    nameofrelatives: '',
    relation: '',
    mobilenumber: '',
    altmobilenumber: '',
    emailid: '',
  });
  //input handler ....
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };
  //submit handler.....
  const addEmergencyContactData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'EmergencyContact',
          nameofrelatives: formData.nameofrelatives,
          relation: p_relation,
          mobilenumber: formData.mobilenumber,
          altmobilenumber: formData.altmobilenumber,
          emailid: formData.emailid,
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
            navigation.replace('EipdregistrationIdentification');
            return true;
          }}
        />
        <Appbar.Content title="Emergency Contact" titleStyle={{fontSize: 20}} />
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
              <Text style={styles.mainHeadText}>EmergencyContact</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Name of Relatives</Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Name of Relatives"
                  value={formData.nameofrelatives}
                  onChangeText={text =>
                    handleInputChange('nameofrelatives', text)
                  }
                />
              </View>
              <View style={styles.formGroup}>
                <DropDown
                  label={'Relation'}
                  mode={'outlined'}
                  visible={showRelation}
                  showDropDown={() => setShowRelation(true)}
                  onDismiss={() => setShowRelation(false)}
                  value={p_relation}
                  setValue={setP_relation}
                  list={relation?.map(res => ({
                    label: res.label,
                    value: res.value,
                  }))}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Mobile Number </Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Mobile Number"
                  value={formData.mobilenumber}
                  onChangeText={text => handleInputChange('mobilenumber', text)}
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Alternate Mobile Number </Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Alternate Mobile Number"
                  value={formData.altmobilenumber}
                  onChangeText={text =>
                    handleInputChange('altmobilenumber', text)
                  }
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email ID </Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Email ID"
                  value={formData.emailid}
                  onChangeText={text => handleInputChange('emailid', text)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.formGrpButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EipdregistrationInsurance')}>
            <Text style={[styles.formButton, {backgroundColor: '#ebc934'}]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Epatientconsentform'),
                addEmergencyContactData();
            }}>
            <Text style={[styles.formButton, {backgroundColor: '#04e004'}]}>
              Save & Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Epatientconsentform')}>
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

export default EipdregistrationEmergencyContact;

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
