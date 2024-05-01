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
} from 'react-native';
import {Appbar} from 'react-native-paper';
import question from '../../../images/question.png';
import ipdopd from '../../../images/ipd.png';
import medicine from '../../../images/panchakarma.png';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {Table, Row, Rows} from 'react-native-table-component';

const DashboardHomePage = () => {
  const navigation = useNavigation();
  const {userData, setDashboardpatientListData} = useContext(UserContext);
  const {hospital_id, _id} = userData;
  const [count, setCount] = useState([]);
  const [departwiseData, setDepartwiseData] = useState([]);

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

  const _body = {
    hospital_id: hospital_id,
    reception_id: _id,
    fromdate: new Date().toISOString().slice(0, 10),
    todate: new Date().toISOString().slice(0, 10),
  };

  // fetch ShowMobileTodaysOIPECount ......
  useEffect(() => {
    const fetchOIPECount = async () => {
      try {
        await axios
          .post(`${api.baseurl}/ShowMobileTodaysOIPECount`, _body)
          .then(response => {
            const {status, message} = response.data;
            if (status === true) {
              setCount(response.data);
            } else {
              Alert.alert('Response Error !', `${message}`);
            }
          });
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
        await axios
          .post(`${api.baseurl}/FetchMobileDepartmentwiseDashboarddata`, {
            hospital_id: hospital_id,
            reception_id: _id,
            fromdate: new Date().toISOString().slice(0, 10),
            todate: new Date().toISOString().slice(0, 10),
          })
          .then(response => {
            const {status, message} = response?.data;
            if (status === true) {
              const data = response.data.data;
              setDepartwiseData(data);
              // data?.map(item => {
              //   return [
              //     item.deptname,
              //     item.opdcount,
              //     item.waiting_count,
              //     item.consulted_count,
              //     item.cancelcount,
              //   ];
              // }),
            } else {
              Alert.alert('Response Error !', `${message}`);
            }
          });
      } catch (error) {
        Alert.alert('Error !!', `${error}`);
      }
    };

    FetchMobileDepartmentwiseDashboarddata();
  }, []);

  const tableHead = [
    'DEPARTMENT',
    'APPOINTMENT',
    'WAITING',
    'CONSULTED',
    'CANCELLED',
  ];
  const [widthArr2, setWidthArr2] = useState([]);
  const [widthArr3, setWidthArr3] = useState([]);
  useEffect(() => {
    setWidthArr2([90, 60, 60, 76, 76, ...Array(tableHead.length).fill(1)]);
    setWidthArr3([90, 60, 60, 76, 76, ...Array(departwiseData.length).fill(1)]);
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
  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 2,
          borderBottomColor: '#ebebeb',
        }}>
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
              <Text style={styles.contentText}>PANCHAKARMA</Text>
              <Text style={styles.contentText}>{count?.panchakarmacount}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentItem}>
            <Image source={question} style={styles.img} />
            <View>
              <Text style={styles.contentText}>INQUIRY</Text>
              <Text style={styles.contentText}>{count?.enquirycount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tableDiv}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.headtext2}>Department Wise Patients</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{height: 'auto', maxHeight: 400}}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Row
                  data={tableHead}
                  widthArr={widthArr2}
                  style={styles.head}
                  textStyle={styles.headtext}
                />
              </Table>
              <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
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
                          <Text style={styles.text}>{item.waiting_count}</Text>
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
      </SafeAreaView>
    </>
  );
};

export default DashboardHomePage;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#ffffff',
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
    // marginVertical: 14,
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
});
