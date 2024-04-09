import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import UserContext from '../../components/Context/Context';
//images

import attendence from '../../images/calendar.png';
import {Appbar} from 'react-native-paper';

const HrModal = () => {
  const navigation = useNavigation();
  const {userData, setPatientSelectedValue} = useContext(UserContext);

  // handler navigator .....
  const _navigateHandler = () => {
    if (userData?.role === 'Receptionist') {
      navigation.navigate('QRScanner');
      setPatientSelectedValue('2');
    } else {
      navigation.navigate('QRScanner');
    }
  };
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('Ehome');
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
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Ehome');
          }}
        />
        <Appbar.Content title="HR" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.contentDiv}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => _navigateHandler()}>
            <Image source={attendence} style={styles.img} />
            <Text style={styles.contentText}>Attendence</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('Regularization');
            }}>
            <Image source={attendence} style={styles.img} />
            <Text style={styles.contentText}>Regularization</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => {
              navigation.navigate('LeaveHomePage');
            }}>
            <Image source={attendence} style={styles.img} />
            <Text style={styles.contentText}>Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default HrModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  contentDiv: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
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
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  contentText: {
    flexWrap: 'wrap',
    width: 100,
    fontSize: 14,
    color: '#127359',
    fontWeight: '600',
  },
});
