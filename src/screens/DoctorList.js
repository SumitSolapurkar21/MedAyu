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
import {useNavigation} from '@react-navigation/native';
import doctorm from '../images/doctorm.png';
import doctorf from '../images/doctorf.png';

const DoctorList = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
          <FontAwesome6
            name="arrow-left-long"
            color="#127359"
            size={28}
            onPress={() => navigation.navigate('Consult')}
          />
          <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
            Doctors List
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <FontAwesome6 name="location-dot" color="#127359" size={16} />
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
        <View style={styles.card}>
          <View style={styles.innerCard}>
            <View style={styles.cardItem1}>
              <Image source={doctorm} alt="doctorM" style={styles.img} />
            </View>
            <View style={styles.cardItem2}>
              <Text style={styles.doctorName}>Dr. Dhanraj Gahukar</Text>
              <Text style={styles.doctorEdu}>
                GENERAL PHYSICIAN / INTERNAL MEDICINE
              </Text>
              <Text style={styles.doctorExp}>20 Years Exp.</Text>
              <Text style={styles.doctorDeg}>MBBS,DNB(Medicine),MNAMS</Text>
              <Text style={styles.doctorAmt}>
                You pay &nbsp;<Text style={{color: '#127359'}}>Rs.700</Text>
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.doctorLan}>
              <FontAwesome6 name="head-side-cough" color="#127359" size={14} />
              &nbsp;&nbsp;English, Hindi, Marathi
            </Text>
            <Text style={styles.doctorAdd}>
              <FontAwesome6 name="location-dot" color="#127359" size={14} />
              &nbsp;&nbsp;SD Hospital, Nagpur
            </Text>
          </View>
          <View style={styles.cardButton}>
            <Text
              style={{
                fontSize: 12,
                backgroundColor: 'orange',
                padding: 5,
                fontWeight: '600',
                color: '#127359',
                height: 40,
                borderRadius: 6,
              }}>
              <FontAwesome6 name="video" color="#127359" size={14} />
              &nbsp;&nbsp;Book Digital Consult
            </Text>
            <Text
              style={{
                fontSize: 12,
                backgroundColor: '#127359',
                padding: 5,
                color: '#ffffff',
                fontWeight: '600',
                borderRadius: 6,
              }}>
              <FontAwesome6 name="hospital" color="#ffffff" size={14} />
              &nbsp;&nbsp;Book Hospital Visit
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}>
            <View style={styles.cardItem1}>
              <Image source={doctorf} alt="doctorf" style={styles.img} />
            </View>
            <View style={styles.cardItem2}>
              <Text style={styles.doctorName}>Dr. Ujwala Gahukar</Text>
              <Text style={styles.doctorEdu}>GYNAECOLOGIST</Text>
              <Text style={styles.doctorExp}>10 Years Exp.</Text>
              <Text style={styles.doctorDeg}>MBBS,DNB(Medicine),MNAMS</Text>
              <Text style={styles.doctorAmt}>
                You pay &nbsp;<Text style={{color: '#127359'}}>Rs.500</Text>
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.doctorLan}>
              <FontAwesome6 name="head-side-cough" color="#127359" size={14} />
              &nbsp;&nbsp;English, Hindi, Marathi
            </Text>
            <Text style={styles.doctorAdd}>
              <FontAwesome6 name="location-dot" color="#127359" size={14} />
              &nbsp;&nbsp;SD Hospital, Nagpur
            </Text>
          </View>
          <View style={styles.cardButton}>
            <Text
              style={{
                fontSize: 12,
                backgroundColor: 'orange',
                padding: 5,
                fontWeight: '600',
                color: '#127359',
                height: 40,
                borderRadius: 6,
              }}>
              <FontAwesome6 name="video" color="#127359" size={14} />
              &nbsp;&nbsp;Book Digital Consult
            </Text>
            <Text
              style={{
                fontSize: 12,
                backgroundColor: '#127359',
                padding: 5,
                color: '#ffffff',
                fontWeight: '600',
                borderRadius: 6,
              }}>
              <FontAwesome6 name="hospital" color="#ffffff" size={14} />
              &nbsp;&nbsp;Book Hospital Visit
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}>
            <View style={styles.cardItem1}>
              <Image source={doctorm} alt="doctorm" style={styles.img} />
            </View>
            <View style={styles.cardItem2}>
              <Text style={styles.doctorName}>Dr. Vedprakash Gahukar</Text>
              <Text style={styles.doctorEdu}>PANCHAKARMA THERAPHYST</Text>
              <Text style={styles.doctorExp}>12 Years Exp.</Text>
              <Text style={styles.doctorDeg}>MBBS,DNB(Medicine),MNAMS</Text>
              <Text style={styles.doctorAmt}>
                You pay &nbsp;<Text style={{color: '#127359'}}>Rs.600</Text>
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.doctorLan}>
              <FontAwesome6 name="head-side-cough" color="#127359" size={14} />
              &nbsp;&nbsp;English, Hindi, Marathi
            </Text>
            <Text style={styles.doctorAdd}>
              <FontAwesome6 name="location-dot" color="#127359" size={14} />
              &nbsp;&nbsp;SD Hospital, Nagpur
            </Text>
          </View>
          <View style={styles.cardButton}>
            <Text
              style={{
                fontSize: 12,
                backgroundColor: 'orange',
                padding: 5,
                fontWeight: '600',
                color: '#127359',
                height: 40,
                borderRadius: 6,
              }}>
              <FontAwesome6 name="video" color="#127359" size={14} />
              &nbsp;&nbsp;Book Digital Consult
            </Text>
            <Text
              style={{
                fontSize: 12,
                backgroundColor: '#127359',
                padding: 5,
                color: '#ffffff',
                fontWeight: '600',
                borderRadius: 6,
              }}>
              <FontAwesome6 name="hospital" color="#ffffff" size={14} />
              &nbsp;&nbsp;Book Hospital Visit
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorList;

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
  img: {
    resizeMode: 'contain',
    width: 85,
    height: 100,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    padding: 10,
    borderRadius: 10,
  },
  innerCard: {
    flexDirection: 'row',
    gap: 16,
  },
  cardItem2: {
    width: '75%',
  },
  doctorName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  doctorEdu: {
    color: '#127359',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
  },
  doctorExp: {
    color: '#127359',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
  },
  doctorDeg: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
  },
  doctorAmt: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 8,
  },
  doctorLan: {
    color: '#127359',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
  },
  doctorAdd: {
    color: '#127359',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
  },
  cardButton: {
    flexDirection: 'row',
    gap: 5,
  },
});
