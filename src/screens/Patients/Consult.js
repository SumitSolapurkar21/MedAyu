import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import GP from '../../images/GP.png';
import SS from '../../images/SS.png';
import CS from '../../images/CS.png';
import neo from '../../images/neo.jpeg';
import ent from '../../images/ent.png';
import cardi from '../../images/cardi.webp';
import gast from '../../images/gast.jpg';
import psy from '../../images/psy.png';
import gyn from '../../images/gyn.png';

import {useNavigation} from '@react-navigation/native';

const Consult = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
          <FontAwesome6
            name="arrow-left-long"
            color="#127359"
            size={28}
            onPress={() => navigation.navigate('Home')}
          />
          <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
            Doctor Consult
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <FontAwesome6 name="location-dot" color="#127359" size={18} />
          <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
            Nagpur
          </Text>
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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.contentItem}>
          <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
            Specialties For Digital Consult
          </Text>
        </View>
        <View style={styles.contentItem}>
          <TouchableOpacity
            style={styles.innercontentItem}
            onPress={() => navigation.navigate('DoctorList')}>
            <Image source={GP} alt="GP" style={styles.img} />
            <Text style={styles.itemText}>General Physician</Text>
          </TouchableOpacity>
          <View style={styles.innercontentItem}>
            <Image source={SS} alt="SS" style={styles.img} />
            <Text style={styles.itemText}>Skin Specialist</Text>
          </View>
          <View style={styles.innercontentItem}>
            <Image source={CS} alt="CS" style={styles.img} />
            <Text style={styles.itemText}>Child Specialist</Text>
          </View>
        </View>
        <View style={styles.contentItem}>
          <View style={styles.innercontentItem}>
            <Image source={neo} alt="GP" style={styles.img} />
            <Text style={styles.itemText}>Neurology</Text>
          </View>
          <View style={styles.innercontentItem}>
            <Image source={ent} alt="ENT" style={styles.img} />
            <Text style={styles.itemText}>Ears Nose Throat</Text>
          </View>
          <View style={styles.innercontentItem}>
            <Image source={cardi} alt="cardi" style={styles.img} />
            <Text style={styles.itemText}>Cardiology</Text>
          </View>
        </View>
        <View style={styles.contentItem}>
          <View style={styles.innercontentItem}>
            <Image source={gast} alt="Gast" style={styles.img} />
            <Text style={styles.itemText}>Gastroenterology/ GI Medicine</Text>
          </View>
          <View style={styles.innercontentItem}>
            <Image source={psy} alt="psy" style={styles.img} />
            <Text style={styles.itemText}>Psychiatry</Text>
          </View>
          <View style={styles.innercontentItem}>
            <Image source={gyn} alt="gyn" style={styles.img} />
            <Text style={styles.itemText}>Obstetrics & Gynaecology</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Consult;

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
  },
  searchDiv: {
    marginHorizontal: 12,
    marginVertical: 20,
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
  content: {
    marginHorizontal: 16,
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 0,
    marginVertical: 10,
  },
  innercontentItem: {
    borderColor: '#127359',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 8,
    width: '33%',
    height: 'auto',
    padding: 2,
  },
  itemText: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  img: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
});
