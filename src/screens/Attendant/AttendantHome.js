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
import expenses from '../../images/expenses.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
//images

import attendence from '../../images/calendar.png';
import UserContext from '../../components/Context/Context';
import {Appbar, Button, Menu} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AttendantHome = () => {
  const navigation = useNavigation();

  const {userData, setIsLoggedIn} = useContext(UserContext);

  const _handleMore = () => {
    setVisible(true);
  };
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
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
          // marginBottom: -60,
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: '#ebebeb',
        }}>
        <Image source={medayuLogo} alt="MedAyu" style={styles.img2} />
        <Appbar.Content
          title={userData?.name}
          titleStyle={{fontSize: 18, marginLeft: 10}}
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
              logoutHandler();
            }}
            title="Logout"
          />

          {/* <Menu.Item onPress={() => {}} title="Item 2" /> */}
        </Menu>
      </View>
      <SafeAreaView style={styles.container}>
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

          <View style={styles.contentDiv}>
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => navigation.navigate('HrModal')}>
              <Image source={attendence} style={styles.img} />
              <Text style={styles.contentText}>HR</Text>
            </TouchableOpacity>
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
      </SafeAreaView>
    </>
  );
};

export default AttendantHome;

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
    height: 55,
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
  img2: {
    resizeMode: 'contain',
    width: 55,
    height: 55,
    marginLeft: 6,
  },
});
