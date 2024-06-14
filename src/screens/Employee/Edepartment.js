import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';
import api from '../../../api.json';
import axios from 'axios';
import ayu from '../../images/ayurveda.png';
import {Appbar, Button, Menu} from 'react-native-paper';

const Edepartment = () => {
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
  const {userData, scannedPatientsData} = useContext(UserContext);
  const {patient_id} = scannedPatientsData;
  const navigation = useNavigation();
  const [departmentData, setDepartmentData] = useState([]);

  //   Get Department Data ...
  let reception_id = userData._id;
  useEffect(() => {
    const departmentData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/FetchReceptionDepartmentDeopdown`, {
            reception_id: userData._id,
          })
          .then(res => {
            const dpt_data = res.data.data;
            setDepartmentData(dpt_data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (reception_id !== '') departmentData();
  }, [reception_id]);
  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: '#ebebeb',
        }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title="Department"
          titleStyle={{fontSize: 18, marginLeft: 10}}
        />
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
            leadingIcon="home"
            onPress={() => {
              navigation.navigate('Home'), closeMenu();
            }}
            title="Home"
          />
        </Menu>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.selection}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: 'black',
              }}>
              Select Department
            </Text>
          </View>
          <View style={styles.selection}>
            <View style={styles.contentItem}>
              {departmentData?.map((res, index) => (
                <TouchableOpacity
                  key={index + 1}
                  style={styles.selectDiv}
                  onPress={() =>
                    navigation.navigate('Edoctors', {
                      department_id: res.depart_id,
                      patient_id: patient_id,
                    })
                  }>
                  <Image source={ayu} alt="DoctorImg" style={styles.img} />
                  <Text style={styles.uName}>{res.deptname}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Edepartment;

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
    width: 35,
    height: 35,
  },
  selection: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  content: {
    //     marginHorizontal: 6,
  },
  contentItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
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
    width: '49%',
  },
  uName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#127359',
    flexWrap: 'wrap',
    width: 100,
  },
});
