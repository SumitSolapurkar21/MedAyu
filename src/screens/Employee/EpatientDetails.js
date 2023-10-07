import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import medayuLogo from '../../images/medayu.jpeg';
import doctorImg from '../../images/doctor.png';
import ipd from '../../images/ipd.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const EpatientDetails = () => {
  const navigation = useNavigation();

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
      <View style={styles.card}>
        <View style={[styles.cardContent, {backgroundColor: '#afcafa'}]}>
          <Text style={styles.cardlabel}>Patient Name</Text>
          <Text style={styles.cardData}>Sumit Solapurkar</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardlabel}>UHID No.</Text>
          <Text style={styles.cardData}>1149961450</Text>
        </View>
        <View style={[styles.cardContent, {backgroundColor: '#afcafa'}]}>
          <Text style={styles.cardlabel}>Mobile No.</Text>
          <Text style={styles.cardData}>9822179090</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardlabel}>Gender / Age</Text>
          <Text style={styles.cardData}>Male / 23</Text>
        </View>
      </View>
      
      <View style={styles.cardSelection}>
        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('Eappointment')}>
          <Image source={doctorImg} alt="DoctorImg" style={styles.img} />
          <Text style={styles.uName}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectDiv}
          onPress={() => navigation.navigate('Eipdregistration')}>
          <Image source={ipd} alt="IPD" style={styles.img} />
          <Text style={styles.uName}>IPD</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EpatientDetails;

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
  card: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 8,
    borderRadius: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  cardlabel: {
    width: 120,
    fontSize: 16,
    fontWeight: '600',
  },
  cardData: {
    fontSize: 14,
    fontWeight: '600',
    color: '#127359',
  },
  cardSelection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 20,
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
});
