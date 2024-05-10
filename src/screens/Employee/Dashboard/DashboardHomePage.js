import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import question from '../../../images/question.png';
import ipdopd from '../../../images/ipd.png';
import medicine from '../../../images/panchakarma.png';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {Table, Row, Rows} from 'react-native-table-component';

const {width: screenWidth} = Dimensions.get('window');

const DashboardHomePage = () => {
  const navigation = useNavigation();
  const {userData, setDashboardpatientListData} = useContext(UserContext);
  const {hospital_id, _id} = userData;
  const [count, setCount] = useState([]);
  const [departwiseData, setDepartwiseData] = useState([]);
  const [widthArr2, setWidthArr2] = useState([]);
  const [widthArr3, setWidthArr3] = useState([]);

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const tableHead = [
    'DEPARTMENT',
    'APPOINTMENT',
    'WAITING',
    'CONSULTED',
    'CANCELLED',
  ];
  useEffect(() => {
    setWidthArr2([
      screenWidth * 0.28,
      screenWidth * 0.18,
      screenWidth * 0.21,
      screenWidth * 0.21,
      screenWidth * 0.21,
    ]);
  }, []);

  useEffect(() => {
    setWidthArr3([
      screenWidth * 0.28,
      screenWidth * 0.18,
      screenWidth * 0.21,
      screenWidth * 0.21,
      screenWidth * 0.21,
    ]);
  }, [departwiseData]);

  // fetch ShowMobileTodaysOIPECount ......
  useEffect(() => {
    const fetchOIPECount = async () => {
      try {
        const response = await axios.post(
          `${api.baseurl}/ShowMobileTodaysOIPECount`,
          {
            hospital_id: hospital_id,
            reception_id: _id,
            fromdate: new Date().toISOString().slice(0, 10),
            todate: new Date().toISOString().slice(0, 10),
            role: userData?.role,
          },
        );
        const {status, message} = response.data;
        if (status === true) {
          setCount(response.data);
        } else {
          Alert.alert('Response Error !', `${message}`);
        }
      } catch (error) {
        Alert.alert('Error !!', `${error}`);
      }
    };

    fetchOIPECount();
  }, []);

  // fetch FetchMobileDepartmentwiseDashboarddata ......
  useEffect(() => {
    const FetchMobileDepartmentwiseDashboarddata = async () => {
      try {
        const response = await axios.post(
          `${api.baseurl}/FetchMobileDepartmentwiseDashboarddata`,
          {
            hospital_id: hospital_id,
            reception_id: _id,
            fromdate: new Date().toISOString().slice(0, 10),
            todate: new Date().toISOString().slice(0, 10),
            role: userData?.role,
          },
        );
        const {status, message, data} = response.data;
        if (status === true) {
          setDepartwiseData(data);
        } else {
          Alert.alert('Response Error !', `${message}`);
        }
      } catch (error) {
        Alert.alert('Error !!', `${error}`);
      }
    };

    FetchMobileDepartmentwiseDashboarddata();
  }, []);

  // nxt page handler ...
  const pageHandler = (id, status) => {
    const _body2 = {
      hospital_id: hospital_id,
      reception_id: _id,
      fromdate: new Date().toISOString().slice(0, 10),
      todate: new Date().toISOString().slice(0, 10),
      status: status,
      depart_id: id,
    };
    setDashboardpatientListData(_body2);
    navigation.navigate('Listofpatients');
  };
  // nxt page handler ...
  const pageHandler2 = (role, status) => {
    const _body2 = {
      hospital_id: hospital_id,
      reception_id: _id,
      fromdate: new Date().toISOString().slice(0, 10),
      todate: new Date().toISOString().slice(0, 10),
      role: role,
      status: status,
    };
    setDashboardpatientListData(_body2);
    navigation.navigate('Listofpatients');
  };
  const item = () => (
    <>
      <View style={{padding: 14}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.secTablehead}>
            <Text style={styles.secTableheadText}>CATEGORY</Text>
          </View>
          <View style={styles.secTablehead}>
            <Text style={styles.secTableheadText}>NO. OF PATIENTS</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.contenthead}>
            <Text style={styles.contentheadText}>APPOINTMENT</Text>
          </View>
          <TouchableOpacity
            style={styles.contenthead}
            onPress={() => pageHandler2(userData?.role, 'Confirmed')}>
            <Text style={[styles.contentheadText, {textAlign: 'center'}]}>
              {departwiseData[0]?.opdcount}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.contenthead}>
            <Text style={styles.contentheadText}>WAITING</Text>
          </View>
          <TouchableOpacity
            style={styles.contenthead}
            onPress={() => pageHandler2(userData?.role, 'Waiting')}>
            <Text style={[styles.contentheadText, {textAlign: 'center'}]}>
              {departwiseData[0]?.waiting_count}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.contenthead}>
            <Text style={styles.contentheadText}>CONSULTED</Text>
          </View>
          <TouchableOpacity
            style={styles.contenthead}
            onPress={() => pageHandler2(userData?.role, 'Consulted')}>
            <Text style={[styles.contentheadText, {textAlign: 'center'}]}>
              {departwiseData[0]?.consulted_count}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.contenthead}>
            <Text style={styles.contentheadText}>CANCELLED</Text>
          </View>
          <TouchableOpacity
            style={styles.contenthead}
            onPress={() => pageHandler2(userData?.role, 'Cancelled')}>
            <Text style={[styles.contentheadText, {textAlign: 'center'}]}>
              {departwiseData[0]?.cancelcount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title={'Dashboard'} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentDiv}>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={ipdopd} style={styles.img} />
            <View>
              <Text style={styles.contentText}>OPD</Text>
              <Text style={styles.contentText}>
                {count?.todaysdoctor_count}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={ipdopd} style={styles.img} />
            <View>
              <Text style={styles.contentText}>IPD</Text>
              <Text style={styles.contentText}>{count?.ipdcount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.contentDiv}>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={medicine} style={styles.img} />
            <View>
              <Text style={styles.contentText}>PROCEDURE</Text>
              <Text style={styles.contentText}>{count?.panchakarmacount}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem}>
            <Image source={question} style={styles.img} />
            <View>
              <Text style={styles.contentText}>ENQUIRY</Text>
              <Text style={styles.contentText}>{count?.enquirycount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {userData?.role === 'Receptionist' ? (
          <View style={styles.tableDiv}>
            <View style={{marginVertical: 10}}>
              <Text style={styles.headtext2}>Department Wise Patients</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flex: 1}}>
                <ScrollView horizontal>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Row
                      data={tableHead}
                      widthArr={widthArr2}
                      style={styles.head}
                      textStyle={styles.headtext}
                    />
                    <Rows
                      data={departwiseData?.map(item => {
                        return [
                          item.deptname,
                          <TouchableOpacity
                            onPress={() =>
                              pageHandler(item.depart_id, 'Confirmed')
                            }>
                            <Text style={styles.text}>{item.opdcount}</Text>
                          </TouchableOpacity>,
                          <TouchableOpacity
                            onPress={() =>
                              pageHandler(item.depart_id, 'Waiting')
                            }>
                            <Text style={styles.text}>
                              {item.waiting_count}
                            </Text>
                          </TouchableOpacity>,
                          <TouchableOpacity
                            onPress={() =>
                              pageHandler(item.depart_id, 'Consulted')
                            }>
                            <Text style={styles.text}>
                              {item.consulted_count}
                            </Text>
                          </TouchableOpacity>,
                          <TouchableOpacity
                            onPress={() =>
                              pageHandler(item.depart_id, 'Cancelled')
                            }>
                            <Text style={styles.text}>{item.cancelcount}</Text>
                          </TouchableOpacity>,
                        ];
                      })}
                      widthArr={widthArr3}
                      style={[styles.row]}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        ) : userData?.role === 'Doctor' ? (
          item()
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default DashboardHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
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
  head: {height: 40, backgroundColor: '#80aaff'},
  headtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600',
  },
  tableDiv: {
    padding: 10,
  },
  text: {textAlign: 'center', color: 'black', fontSize: 13},
  row: {
    height: 50,
  },
  headtext2: {
    fontSize: 16,
    color: '#127359',
    fontWeight: '600',
  },
  secTablehead: {
    backgroundColor: '#80aaff',
    width: '50%',
    borderWidth: 0.2,
    padding: 8,
  },
  secTableheadText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  contenthead: {
    width: '50%',
    borderWidth: 0.2,
    padding: 8,
  },
  contentheadText: {
    fontSize: 12,
    color: 'black',
  },
});
