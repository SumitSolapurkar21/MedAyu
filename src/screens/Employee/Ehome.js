import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
//images
import pr from '../../images/pr.png';
import ss from '../../images/sss.png';
import attendence from '../../images/calendar.png';
import expenses from '../../images/expenses.png';

const Ehome = () => {
  // ........ //
  const navigation = useNavigation();

  const {setPatientSelectedValue, userData} = useContext(UserContext);


  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Are you sure you want to Exit App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
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
            onPress={() => navigation.replace('DashboardHomePage')}>
            <Image source={pr} style={styles.img} />
            <Text style={styles.contentText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigation.navigate('EpatientRegistration')}>
            <Image source={pr} style={styles.img} />
            <Text style={styles.contentText}>Patient Registration</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentDiv}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('QRScanner'), setPatientSelectedValue('1');
            }}>
            <Image source={ss} style={styles.img} />
            <Text style={styles.contentText}>Search Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('HrModal');
            }}>
            <Image source={attendence} style={styles.img} />
            <Text style={styles.contentText}>HR</Text>
          </TouchableOpacity>
        </View>

        {/*  */}
        {/* <View style={styles.contentDiv}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('QRScanner'), setPatientSelectedValue('3');
            }}>
            <Image source={attendence} style={styles.img} />
            <Text style={styles.contentText}>Discharge Initiate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('PatientDischargeSummary');
            }}>
            <Image source={attendence} style={styles.img} />
            <Text style={styles.contentText}>Discharge Summary</Text>
          </TouchableOpacity>
        </View> */}
        {/*  */}

        <View style={styles.contentDiv}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('Expenses');
            }}>
            <Image source={expenses} style={styles.img} />
            <Text style={styles.contentText}>Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('CalenderComponent');
            }}>
            <Image source={expenses} style={styles.img} />
            <Text style={styles.contentText}>Calender</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Ehome;

const styles = StyleSheet.create({
  container: {
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
    width: 35,
    height: 35,
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
    marginTop: 12,
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
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  contentText: {
    flexWrap: 'wrap',
    width: 100,
    fontSize: 12,
    color: '#127359',
    fontWeight: '600',
  },
  img2: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
    marginLeft: 6,
  },
});
