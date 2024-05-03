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
import medayuLogo from '../../images/medayu.jpeg';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
//images
// import doctorImg from '../../images/doctor.png';
// import medImg from '../../images/medicines.png';
// import healthImg from '../../images/medical-record.png';
// import labtestsImg from '../../images/labtests.png';

//images
import pr from '../../images/pr.png';
import ss from '../../images/sss.png';
import attendence from '../../images/calendar.png';
import expenses from '../../images/expenses.png';
import UserContext from '../../components/Context/Context';
import Ehome from '../Employee/Ehome';
import {Appbar, Button, Menu} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();

  const {userData, setIsLoggedIn, setPatientSelectedValue} =
    useContext(UserContext);

  const {role} = userData;

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
  const logoutHandler = async () => {
    // Clear user token from AsyncStorage
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigation.navigate('LoginPage');
  };

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
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: '#ebebeb',
        }}>
        <Image source={medayuLogo} alt="MedAyu" style={styles.img2} />
        <Appbar.Content
          title={
            <>
              <Text style={styles.titleText}>{userData?.name}</Text>
              <Text style={[styles.titleText, {fontSize: 14}]}>
                {userData?.role}
              </Text>
            </>
          }
        />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <View
        style={{
          position: 'absolute',
          right: 3,
          top: 60,
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}></Button>}>
          <Menu.Item
            dense
            leadingIcon="logout"
            onPress={() => {
              navigation.navigate('LoginPage'), logoutHandler();
            }}
            title="Logout"
          />

          {/* <Menu.Item onPress={() => {}} title="Item 2" /> */}
        </Menu>
      </View>
      <SafeAreaView style={styles.container}>
        {role === 'Receptionist' ? (
          <>
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
            {/* <View style={styles.contentDiv}>
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
          </View> */}
            <View style={styles.contentDiv}>
              <TouchableOpacity
                style={styles.contentItem}
                onPress={() => navigation.navigate('DashboardHomePage')}>
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
                  navigation.navigate('QRScanner'),
                    setPatientSelectedValue('1');
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

            <View style={styles.contentDiv}>
              <TouchableOpacity
                style={styles.contentItem}
                onPress={() => {
                  navigation.navigate('QRScanner'),
                    setPatientSelectedValue('3');
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
            </View>
            <View style={styles.contentDiv}>
              <TouchableOpacity
                style={styles.contentItem}
                onPress={() => {
                  navigation.navigate('Expenses');
                }}>
                <Image source={expenses} style={styles.img} />
                <Text style={styles.contentText}>Expenses</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : role === 'Doctor' ? (
          <Ehome />
        ) : null}
      </SafeAreaView>
    </>
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
    width: 90,
  },
  uNamee: {fontSize: 17, fontWeight: '600', color: '#127359'},
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
    marginVertical: 8,
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
  titleText: {
    fontSize: 16,
    color: '#127359',
    fontWeight: '600',
  },
});
