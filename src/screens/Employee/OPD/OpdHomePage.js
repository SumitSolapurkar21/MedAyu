import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import billHistory from '../../../images/billHistory.png';
import consultPdf from '../../../images/pdf.png';
import UserContext from '../../../components/Context/Context';
import {GeneratePdf} from '../Dashboard/PdfReport';

const OpdHomePage = () => {
  const {scannedPatientsData, userData} = useContext(UserContext);

  const navigation = useNavigation();

  const consultPdfData = {
    appoint_id: scannedPatientsData?.appoint_id,
    mobilenumber: scannedPatientsData?.mobilenumber,
    uhid: scannedPatientsData?.uhid,
    patient_id: scannedPatientsData?.patient_id,
    role: userData?.role,
    hospital_id: userData?.hospital_id,
    reception_id: userData?._id,
  };

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('EpatientDetails');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // generate pdf handler ...
  const generatePdfHandler = () => {
    GeneratePdf(consultPdfData);
  };
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('EpatientDetails');
          }}
        />
        <Appbar.Content title="OPD" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.cardSelection}>
          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => navigation.navigate('OpdComplaints')}>
            <Image source={billHistory} alt="billHistory" style={styles.img} />
            <Text style={styles.uName}>Initial Assessment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => navigation.navigate('Prakruti')}>
            <Image source={billHistory} alt="billHistory" style={styles.img} />
            <Text style={styles.uName}>Ayurvedic Assessment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectDiv}
            onPress={() => generatePdfHandler()}>
            <Image source={consultPdf} alt="billHistory" style={styles.img} />
            <Text style={styles.uName}>Consultant PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OpdHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardSelection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 10,
    flexWrap: 'wrap',
  },
  selectDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 5,
    borderRadius: 6,
    padding: 10,
    width: '47%',
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  uName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#127359',
    flexWrap: 'wrap',
    width: 90,
  },
});
