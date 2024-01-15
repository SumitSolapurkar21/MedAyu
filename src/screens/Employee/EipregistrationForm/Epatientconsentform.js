import React, {useState, useRef, useContext, useEffect} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {
  Text,
  Checkbox,
  Button,
  TextInput,
  Portal,
  Dialog,
} from 'react-native-paper';
import SignatureScreen from 'react-native-signature-canvas';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import api from '../../../../api.json';
import axios from 'axios';
import UserContext from '../../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';

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

  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
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
  // Add more state variables for additional checkboxes as needed

  const handleOK = signature => {
    //     setSignature(signature);
    addConsentData(signature);
  };
  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  // current data ...
  let today = new Date();
  let currentDate =
    today.getDate().toString().padStart(2, '0') +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getFullYear();

  //current time ...
  const dt = new Date();
  const hours = dt.getHours().toString().padStart(2, '0');
  const minutes = dt.getMinutes().toString().padStart(2, '0');
  const currenttime = `${hours}.${minutes}`;
  //submit handler.....
  const addConsentData = async signature => {
    const sign = signature;
    let currentIndexString = await AsyncStorage.getItem('currentIndex');
    // Increment the index
    let index = parseInt(currentIndexString, 10) || 0;

    index++;
    // Store the updated index in local storage
    AsyncStorage.setItem('currentIndex', index.toString());

    const fileData = {
      filetype: sign.split(';')[0], // "image/png"
      // encoding: sign.split(';')[1], // "base64"
      filename: `PS${index}.png`,
      filesize: 4127,
      base64: sign.split(',')[1], // "iVBORw0KGgoAAAANSUhEUgAAA64AAA"
    };

    try {
      const data = {
        role: 'Consentform',
        file: fileData,
        reception_id: _id,
        hospital_id: hospital_id,
        patient_id: patient_id,
      };
      await axios
        .post(`${api.baseurl}/AddMobileIPD`, {
          role: 'Consentform',
          file: fileData,
          reception_id: _id,
          hospital_id: hospital_id,
          patient_id: patient_id,
        })
        .then(res => {
          if (res.data.status === true) {
            AsyncStorage.setItem('currentIndex', index.toString());
            setVisible(true);
          } else {
            console.error('Something went wrong');
          }
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
          label={`I agree to pay all hospital charges in full and acknowledge financial responsibility for insurance deductible coinsurance or failure for any reason of any insurance carrier to pay the hospital charges in full when rendered.`}
          status={consent7Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent7Checked(!consent7Checked)}
        />
        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I understand that I have the right to change my mind at any time before the procedure is undertaken including after I have signed this form. I understand that I must inform my doctor if this occurs.`}
          status={consent8Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent8Checked(!consent8Checked)}
        />
        <Checkbox.Item
          style={styles.checkboxItem}
          label={`I consent to a blood transfusion, if needed Yes No (please tick appropriate box)`}
          status={consent9Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent9Checked(!consent9Checked)}
        />

        <Text style={[styles.txt]}>
          I______________________________________________gender________aged________years,here
          by consent to undergo treatment at MedAyu HOSPITAL, Bhopal, for my
          ailment. I agree to undergo the treatment and abide by the
          instructions given to me by the treating doctor.
        </Text>

        <View style={styles.grpTxt}>
          <Text style={styles.grptxt}>
            Date/Time :&nbsp;
            <Text style={{fontWeight: 'normal'}}>
              {currentDate} / {currenttime}
            </Text>
          </Text>
          <Text style={styles.grptxt}>
            Relationship : <Text style={{fontWeight: 'normal'}}></Text>
          </Text>
        </View>
        <Text style={[styles.txt]}>
          (Parent/guardian signature in case Patient age is below 18 years or
          PATIENT’S REPRESENTATIVE / SURROGATE if patient is unable to give
          consent because …………………………………………………………………………………………)
        </Text>
        <Text style={styles.header}>Interpreter’s declaration</Text>
        <Text style={[styles.txt]}>
          I declare that I have interpreted the dialogue between the patient and
          health practitioner to the best of my ability.
        </Text>
        <View style={[styles.grpTxt, {marginBottom: 30}]}>
          <Text style={styles.grptxt}>Interpreter’s signature</Text>
          <Text style={styles.grptxt}>
            Date :&nbsp;
            <Text style={{fontWeight: 'normal'}}>{currentDate}</Text>
          </Text>
          <Text style={styles.grptxt}>
            Full Name :&nbsp;<Text style={{fontWeight: 'normal'}}>Sumit </Text>
          </Text>
        </View>

        {/* Hindi */}
        <Text style={styles.header}>सहमति पत्र</Text>

        <Text style={styles.txt}>
          कृपया जानकारी को ध्यानपूर्वक पढ़ें और यह दर्शाने के लिए निम्नलिखित पर
          निशान लगाएं कि आप समझ गए हैं और आपको प्रदान की गई जानकारी से सहमत हैं।
          सहमति पत्र पर हस्ताक्षर करने से पहले चिकित्सक के साथ सभी मुद्दों पर
          चर्चा अवश्य कर लें।
        </Text>

        <Checkbox.Item
          status={consent1Checked ? 'checked' : 'unchecked'}
          label={`मैं मानता/मानती हूं कि मुझे स्वास्थ्य देखभाल सेवाओं की आवश्यकता है जिसमें चिकित्सा उपचार प्रयोगशाला परीक्षण या कोई अन्य प्रक्रिया या सेवाएं शामिल हो सकती है। मैं मेडायु अस्पताल के डॉक्टर या कर्मचारी जो चिकित्सा सेवा आवश्यक एवं उचित समझें, ऐसी देखभाल और सेवाएं प्रदान करने के लिए मैं सहमति देता/ देती हूं ।`}
          onPress={() => setConsent1Checked(!consent1Checked)}
          style={styles.checkboxItem}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          labelStyle={{textAlign: 'justify'}}
          label={`डॉक्टर/व्याख्याकार ने मुझे मेरी स्थिति, आवश्यक जांच, नियोजित उपचार और प्रक्रियाओं, उपचार की अवधि,उपचार प्रक्रिया के दौरान क्या करें और क्या न करें, उपचार से जुड़े जोखिम एवं फायदे, संभावित परिणाम के बारे में मेरी अपनी भाषा में समझाया गया है। अस्पताल में उपलब्ध सेवाएँ और उपचार की अनुमानित लागत की पूरी जानकारी दी है।।`}
          status={consent2Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent2Checked(!consent2Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`डॉक्टर ने मेरे लिए उपलब्ध प्रासंगिक उपचार विकल्पों और संबंधित जोखिमों के बारे में भी बताया, जिसमें प्रक्रिया न करने के जोखिम/परिणाम भी शामिल हैं। मुझे डॉक्टर के साथ सभी मुद्दों पर चर्चा करने और उन्हे स्पष्ट करने का अवसर मिला है। मैं समझता हूं कि उपचार/प्रक्रिया के परिणाम की गारंटी नहीं दी जा सकती।`}
          status={consent3Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent3Checked(!consent3Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`मैं समझता हूं कि यदि प्रक्रिया/अस्पताल में भर्ती होने के दौरान जीवन-घातक घटनाएं घटती हैं, तो मेरा तदनुसार इलाज किया जाएगा और यदि आवश्यक समझा जाए तो अन्य अस्पताल में स्थानांतरित किया जा सकता है।`}
          status={consent4Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent4Checked(!consent4Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`यदि कोई स्टाफ सदस्य मेरे रक्त के संपर्क में आता है, तो मैं रक्त का नमूना एकत्र करने और संक्रामक रोगों के लिए परीक्षण करने के लिए सहमति देता/देती हूं। मैं समझता/ती हूं कि यदि नमूने का परीक्षण किया जाता है तो मुझे सूचित किया जाएगा और मुझे परीक्षण के परिणाम दिए जाएंगे।`}
          status={consent5Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent5Checked(!consent5Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`मैं अपने मेडिकल रिकॉर्ड को मेरी देखभाल में शामिल कर्मचारियों द्वारा एक्सेस करने के लिए सहमत हूं और देय लाभों को निर्धारित करने के लिए बीमा कंपनी को मेडिकल जानकारी जारी करने के लिए अधिकृत करता/ती हूं। मेरे बिमारी से संबंधित जानकारी, तस्वीरें, वीडियो, डिजिटल या कोई अन्य छवि का उपयोग संशोधन एवं प्रकाशन के किये जाने से मुझे कोई आपत्ती नाही है। मेरे बिमारी की जानकारी बीमा कंपनी / प्राधिकरणों की आवश्यकता के अनुसार रिकॉर्ड की जा सकती है और मैं इसके लिए सहमति देता देती हूं।`}
          status={consent6Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent6Checked(!consent6Checked)}
        />

        <Checkbox.Item
          style={styles.checkboxItem}
          label={`मैं अस्पताल के सभी शुल्कों का पूरा भुगतान करने के लिए सहमत हूं और बीमा कटौती या किसी भी कारण से भी बीमा कंपनी द्वारा अस्पताल के शुल्क का पूरा भुगतान ना करने पे, मैं वित्तीय जिम्मेदारी स्वीकार करता हूं।`}
          status={consent7Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent7Checked(!consent7Checked)}
        />
        <Checkbox.Item
          style={styles.checkboxItem}
          label={`मैं समझता हूं कि इस फॉर्म पर हस्ताक्षर करने के बाद और प्रक्रिया शुरू होने से पहले मुझे किसी भी समय अपना मन बदलने का अधिकार है। मैं समझता/ती हूं कि यदि ऐसा होता है तो मुझे अपने डॉक्टर को सूचित करना होगा।`}
          status={consent8Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent8Checked(!consent8Checked)}
        />
        <Checkbox.Item
          style={styles.checkboxItem}
          label={`यदि आवश्यकता हो तो मैं रक्त-आधान के लिए सहमति देता/देती हूँ हाँ नहीं (कृपया उपयुक्त बॉक्स पर टिक करें)`}
          status={consent9Checked ? 'checked' : 'unchecked'}
          onPress={() => setConsent9Checked(!consent9Checked)}
        />

        <Text style={[styles.txt]}>
          मैं_____________________________________________लिंग________आयु________वर्ष,
          अपने पुरे होशो हवास एवं जागरूकता से, बिना किसी जबरदस्ती के, अपनी
          बीमारी के लिए मेडायु अस्पताल, भोपाल में इलाज कराने के लिए सह सहमति से
          यहां आया हूं। मैं इलाज करने वाले डॉक्टर द्वारा मुझे दिए गए निर्देशों
          का पालन करने के लिए सहमत हूं।अस्पताल में इलाज के दौरान अप्रत्याशित
          घटना होने पर मैं डॉक्टर, अस्पताल या उसके कर्मचारी को दोषी नहीं
          ठहराऊंगा ।
        </Text>

        <View style={styles.grpTxt}>
          <Text style={styles.grptxt}>
            दिनांक/समय : &nbsp;
            <Text style={{fontWeight: 'normal'}}>
              {currentDate} / {currenttime}
            </Text>
          </Text>
          <Text style={styles.grptxt}>
            रुग्ण के साथ संबंध : <Text style={{fontWeight: 'normal'}}></Text>
          </Text>
        </View>
        <Text style={[styles.txt]}>
          रुग्ण /रिश्तेदार का पूरा नाम …………………………………………………..………… रुग्ण के साथ
          संबंध …………………………. (यदि रोगी की आयु 18 वर्ष से कम है तो
          माता-पिता/अभिभावक के हस्ताक्षर / यदी रुग्ण स्वयं सहमती देने के योग्य न
          हो तो रिश्तेदार / प्रतिनिधी का नाम ) स्वयं सहमती देने के योग्य न होने
          का कारण………………………………………………………………………………………………………..
        </Text>
        <Text style={styles.header}>व्याख्याकार घोषणा`</Text>
        <Text style={[styles.txt]}>
          मैं प्रमाणित करता/ करती हूं कि मैंने अपनी सर्वोत्तम क्षमता से मरीज़ और
          डॉक्टर के बीच संवाद की व्याख्या की है ।
        </Text>
        <View style={[styles.grpTxt, {marginBottom: 30}]}>
          <Text style={styles.grptxt}>व्याख्याकार के हस्ताक्षर : </Text>
          <Text style={styles.grptxt}>
            दिनांक/समय :&nbsp;
            <Text style={{fontWeight: 'normal'}}>{currentDate}</Text>
          </Text>
          <Text style={styles.grptxt}>
            व्याख्याकार का पूरा नाम :&nbsp;
            <Text style={{fontWeight: 'normal'}}>Sumit </Text>
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: '#ffffff',
        }}>
        <View style={styles.signatureContainer}>
          <SignatureScreen
            ref={ref}
            onOK={handleOK}
            backgroundColor={'white'}
          />
          <TouchableOpacity onPress={handleClear} style={styles.clearSign}>
            <FontAwesome6 name="trash" size={16} color="red" />
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            handleConfirm();
          }}
          style={styles.button}>
          Submit
        </Button>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="check-all" />
          <Dialog.Title style={styles.title}>Success !</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Patient Registered Successfully!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Cancel</Button>
            <Button onPress={() => navigation.navigate('Eipdoptions')}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  title: {
    textAlign: 'center',
  },
  grpTxt: {
    marginHorizontal: 10,
    marginBottom: 8,
    marginTop: 10,
  },
  grptxt: {
    fontWeight: 'bold',
    marginVertical: 2,
  },
});

export default Epatientconsentform;
