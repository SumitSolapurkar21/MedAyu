import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import api from '../../../api.json';
import axios from 'axios';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ToastAndroid} from 'react-native';
import {Appbar, Button, Menu} from 'react-native-paper';

const Edoctors = ({route}) => {
  const {department_id, patient_id} = route.params;
  const navigation = useNavigation();
  const [doctorData, setDoctorData] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
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

  // Get Doctor Data ...
  useEffect(() => {
    const doctorData = async () => {
      try {
        await axios
          .post(`${api.baseurl}/DoctorAccDepartmentinAppmtRecpt`, {
            depart_id: department_id,
          })
          .then(res => {
            const doct_data = res.data.data;
            setDoctorData(doct_data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (department_id !== '') doctorData();
  }, [department_id]);

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
          title="Doctor"
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
                marginVertical: 2,
                fontWeight: '600',
                fontSize: 16,
                color: 'black',
              }}>
              Select Doctor
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {doctorData?.map(res => (
            <View style={styles.card} key={res._id}>
              <View style={styles.innerCard}>
                <View style={styles.cardItem1}>
                  <Image
                    src={res.profilephoto}
                    alt="doctorPic"
                    style={[
                      styles.img,
                      {resizeMode: 'contain', width: 85, height: 100},
                    ]}
                  />
                </View>
                <View style={styles.cardItem2}>
                  <Text style={styles.doctorName}>{res.name}</Text>
                  <Text style={styles.doctorEdu}>{res.education}</Text>
                  <Text style={styles.doctorExp}>{res.experience}</Text>
                  <Text style={styles.doctorDeg}>{res.specialization}</Text>
                  <Text style={styles.doctorAmt}>
                    You pay &nbsp;
                    <Text style={{color: '#127359'}}>{res.fees}</Text>
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.doctorLan}>
                  <FontAwesome6 name="video" size={14} color="#127359" />
                  &nbsp;&nbsp;{res.language}
                </Text>
                <Text style={styles.doctorAdd}>
                  <FontAwesome6 name="location-dot" color="#127359" size={14} />
                  &nbsp;&nbsp;{res.address}
                </Text>
              </View>
              <View style={styles.cardButton}>
                <TouchableOpacity
                  style={styles.btnO}
                  onPress={() =>
                    ToastAndroid.show(
                      'Comming Soon',
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                    )
                  }>
                  <Text
                    style={[
                      styles.btn,
                      {color: 'white', backgroundColor: 'orange'},
                    ]}>
                    <FontAwesome6 name="video" color="#ffffff" size={14} />
                    &nbsp;&nbsp;Digital Consult
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnO}
                  onPress={() =>
                    navigation.navigate('Eappointment', {
                      department_id,
                      patient_id,
                      doctor_id: res._id,
                    })
                  }>
                  <Text
                    style={[
                      styles.btn,
                      {
                        backgroundColor: '#127359',
                        color: '#ffffff',
                      },
                    ]}>
                    <FontAwesome6 name="hospital" color="#ffffff" size={14} />
                    &nbsp;&nbsp;Book Hospital Visit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Edoctors;

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
  selection: {
    marginHorizontal: 16,
    marginVertical: 10,
  },

  contentItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
    alignContent: 'center',
  },
  innercontentItem: {
    borderColor: '#127359',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 8,
    width: '30%',
    height: 'auto',
    padding: 5,
  },
  itemText: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
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
    gap: 2,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    fontSize: 12,
    padding: 12,
    fontWeight: '600',
    borderRadius: 6,
    textAlign: 'center',
  },
  btnO: {
    width: '50%',
  },
});
