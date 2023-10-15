import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useContext} from 'react';
import medayuLogo from '../../images/medayu.jpeg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
//images
import doctorImg from '../../images/doctor.png';
import medImg from '../../images/medicines.png';
import healthImg from '../../images/medical-record.png';
import labtestsImg from '../../images/labtests.png';
import UserContext from '../../components/Context/Context';
import Ehome from '../Employee/Ehome';

const Home = () => {
  const navigation = useNavigation();

  const {userData} = useContext(UserContext);
  const {role} = userData;
  return (
    <SafeAreaView style={styles.container}>
      {userData === '9' ? (
        <>
          <View style={styles.outerHeader}>
            <View style={styles.hlcontent}>
              <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
              <Text style={styles.uName}>Hi Sumit</Text>
            </View>
            <View style={styles.hrcontent}>
              <TouchableOpacity>
                <FontAwesome name="shopping-cart" size={22} color="#127359" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="bell" size={22} color="#127359" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginPage')}>
                <FontAwesome name="user" size={22} color="#127359" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchDiv}>
            <FontAwesome6
              name="magnifying-glass"
              color="#127359"
              size={18}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchtext}
              placeholder="Search for Medicines, Doctors, Lab Tests"
              placeholderTextColor="#127359"
            />
          </View>
          <View style={styles.contentDiv}>
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => navigation.navigate('Consult')}>
              <Image source={doctorImg} style={styles.img} />
              <Text style={styles.contentText}>Doctor Consult</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => navigation.navigate('Medicines')}>
              <Image source={medImg} style={styles.img} />
              <Text style={styles.contentText}>Medicines</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentDiv}>
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => navigation.navigate('Tests')}>
              <Image source={labtestsImg} style={styles.img} />
              <Text style={styles.contentText}>Lab Tests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => navigation.navigate('HealthRecords')}>
              <Image source={healthImg} style={styles.img} />
              <Text style={styles.contentText}>Health Records</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : role === 'Receptionist' ? (
        <Ehome />
      ) : null}
    </SafeAreaView>
  );
};

export default Home;

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
  searchDiv: {
    marginHorizontal: 12,
    marginVertical: 12,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {marginHorizontal: 10},
  searchtext: {
    fontSize: 14,
    color: '#127359',
    fontWeight: '600',
    width: '90%',
  },
  contentDiv: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 14,
    justifyContent: 'space-between',
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 6,
    width: '48%',
    padding: 6,
    height: 75,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  contentText: {
    textAlign: 'left',
    width: 95,
    fontSize: 14,
    color: '#127359',
    fontWeight: '600',
  },
});
