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
import UserContext from '../../components/Context/Context';
//images
import pr from '../../images/pr.png';
import ss from '../../images/sss.png';

const Ehome = () => {
  const navigation = useNavigation();
  const {userData} = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerHeader}>
        <View style={styles.hlcontent}>
          <Image source={medayuLogo} alt="MedAyu" style={styles.img} />
          <Text style={styles.uName}>Hi {userData.username} </Text>
        </View>
        <View style={styles.hrcontent}>
          {/* <TouchableOpacity>
            <FontAwesome name="shopping-cart" size={22} color="#127359" />
          </TouchableOpacity> */}
          <TouchableOpacity>
            <FontAwesome name="bell" size={22} color="#127359" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
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
          onPress={() => navigation.navigate('EpatientRegistration')}>
          <Image source={pr} style={styles.img} />
          <Text style={styles.contentText}>Patient Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentItem}
          onPress={() => navigation.navigate('QRScanner')}>
          <Image source={ss} style={styles.img} />
          <Text style={styles.contentText}>Search Patient</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Ehome;

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
