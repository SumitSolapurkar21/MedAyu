import React, {useState, useRef, useContext} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {Text, Checkbox, Button, TextInput} from 'react-native-paper';
import SignatureScreen from 'react-native-signature-canvas';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import api from '../../../../api.json';
import axios from 'axios';
import UserContext from '../../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';

const Epatientconsentform = () => {
  const navigation = useNavigation();
  const {scannedPatientsData, userData} = useContext(UserContext);
  const {_id, hospital_id} = userData?.data[0];
  const {patient_id} = scannedPatientsData;
  const ref = useRef();
  const [isBloodTransfusionChecked, setBloodTransfusionChecked] =
    useState(true);
  const [patientName, setPatientName] = useState('');

  const [consent1Checked, setConsent1Checked] = useState(true);
  const [consent2Checked, setConsent2Checked] = useState(true);
  const [consent3Checked, setConsent3Checked] = useState(true);
  const [consent4Checked, setConsent4Checked] = useState(true);
  const [consent5Checked, setConsent5Checked] = useState(true);
  const [consent6Checked, setConsent6Checked] = useState(true);
  const [consent7Checked, setConsent7Checked] = useState(true);
  const [consent8Checked, setConsent8Checked] = useState(true);
  const [consent9Checked, setConsent9Checked] = useState(true);
  const [consent10Checked, setConsent10Checked] = useState(true);
  const [p_signature, setSignature] = useState('');
  // Add more state variables for additional checkboxes as needed

  const handleBloodTransfusionCheck = () => {
    setBloodTransfusionChecked(!isBloodTransfusionChecked);
  };

  const handleOK = signature => {
    setSignature(signature);
  };
  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  //   const handleSubmit = signature => {
  //     ref.current.readSignature();

  //     // Handle form submission here
  //     // You can access form data using state variables (patientName, patientSignature, parentSignature, isBloodTransfusionChecked, consent1Checked, consent2Checked, ...)
  //     console.log('Form submitted:', {
  //       patientName,
  //       isBloodTransfusionChecked,
  //       consent1Checked,
  //       consent2Checked,
  //       p_signature: p_signature,
  //     });
  //   };
  //submit handler.....
  const addConsentData = async () => {
    try {
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'Consentform',
          patientsignature: p_signature,
          reception_id: _id,
          hospital_id: hospital_id,
          patient_id: patient_id,
        })
        .then(res => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>General Consent Form</Text>

        <Text style={styles.txt}>
          Please read the information carefully and tick the following to
          indicate you have understood and agree with the information provided
          to you. Any specific concerns should be discussed with your doctor or
          Therapist performing the procedure prior to signing the consent form.
        </Text>

        <Checkbox.Item
          status={consent1Checked ? 'checked' : 'unchecked'}
          label={`I or __________________________________ (acting on my behalf) recognise that I have a condition requiring health care services and do hereby give consent to the rendering of such care and services, which may include medical treatment, routine diagnostic procedures, laboratory testing or any other procedure or services as doctors or staff of SAMADHAN hospital/clinic consider to be necessary and appropriate.`}
          onPress={() => setConsent1Checked(!consent1Checked)}
          style={styles.checkboxItem}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          labelStyle={{textAlign: 'justify'}}
          label={`The Doctor/Interpreter has explained to me to my full knowledge in my own language about my medical condition, investigations required, treatment and procedures planned, the duration of treatment, do’s & don’ts during the treatment procedure, the risk associated with the treatment procedure, the possible outcome, the services available at the hospital, and the approximate cost of the treatment.`}
          status={consent2Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent2Checked(!consent2Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`The doctor also explained the relevant treatment options that are available to me and associated risks, including the risks/outcomes of not having the procedure. I have had an opportunity to discuss and clarify any concerns with the doctor. I understand that the result/outcome of the treatment/procedure cannot be guaranteed.`}
          status={consent3Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent3Checked(!consent3Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I understand that if life-threatening events happen during the procedure/hospitalisation, I will be treated accordingly and may be transferred to other hospital as per policy, if deemed necessary.`}
          status={consent4Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent4Checked(!consent4Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`If a staff member is exposed to my blood, I consent to a sample of blood being collected and tested for infectious diseases. I understand that I will be informed if the sample is tested, and that I will be given the results of the tests.`}
          status={consent5Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent5Checked(!consent5Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I agree for my medical record to be accessed by staff involved in my clinical care and authorise to release medical information to the third parties identified to determine benefits payable. I understand that photographs, video, digital or any other images may be recorded to document and assist in my clinical care or education or research or as required by third parties/authorities and I consent to this. `}
          status={consent6Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent6Checked(!consent6Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I understand that my medical records are maintained and retained with hospital as per government guidelines, from commencement of treatment after which complete record may not be available. `}
          status={consent7Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent7Checked(!consent7Checked)}
        />
        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I understand that my medical records are maintained and retained with hospital as per government guidelines, from commencement of treatment after which complete record may not be available. `}
          status={consent8Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent8Checked(!consent8Checked)}
        />
        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I understand that my medical records are maintained and retained with hospital as per government guidelines, from commencement of treatment after which complete record may not be available. `}
          status={consent9Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent9Checked(!consent9Checked)}
        />
        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I understand that my medical records are maintained and retained with hospital as per government guidelines, from commencement of treatment after which complete record may not be available. `}
          status={consent10Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent10Checked(!consent10Checked)}
        />

        {/* Add more Checkbox.Item components for additional points as needed */}

        <Text style={styles.header}>Patient's Information</Text>
        <TextInput
          label="Full Name"
          value={patientName}
          onChangeText={text => setPatientName(text)}
          style={styles.input}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label="I consent to a blood transfusion, if needed"
          status={isBloodTransfusionChecked ? 'checked' : 'unchecked'}
          onPress={handleBloodTransfusionCheck}
        />

        <Text style={[styles.txt, {marginBottom: 20}]}>
          I______________________________________________gender________aged________years,
          here by consent to undergo treatment at SAMADHAN HOSPITAL, NAGPUR
          (MANAGED BY MEDYAU HEALTHCARE LLP) for my ailment. I agree to undergo
          the treatment and abide by the instructions given to me by the
          treating doctor.
        </Text>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#ffffff',
        }}>
        <View style={styles.signatureContainer}>
          <SignatureScreen ref={ref} onOK={handleOK} />
          <TouchableOpacity onPress={handleClear} style={styles.clearSign}>
            <FontAwesome6 name="trash" size={16} color="red" />
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            addConsentData(),
              handleConfirm(),
              navigation.navigate('Eipdoptions');
          }}
          style={styles.button}>
          Submit
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  signatureContainer: {
    height: 140,
    marginHorizontal: 20,
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    width: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  txt: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 26,
    marginHorizontal: 10,
  },
  clearSign: {
    position: 'absolute',
    padding: 10,
    right: 0,
    bottom: 0,
  },
  checkboxItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    textAlign: 'justify',
    gap: 10,
    //     flexWrap: 'wrap',
  },
});

export default Epatientconsentform;
