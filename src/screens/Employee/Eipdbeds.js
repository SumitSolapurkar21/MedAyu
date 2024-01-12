import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Table, Row, Rows} from 'react-native-table-component';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import UserContext from '../../components/Context/Context';
import axios from 'axios';
import api from '../../../api.json';

const Eipdbeds = () => {
  const {userData} = useContext(UserContext);
  const {_id, hospital_id} = userData?.data[0];
  //table content ....
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  const renderBedIcons = () => {
    // Your logic for rendering bed icons goes here
    return [
      <View style={styles.bedSelection} key="bedIcons">
        <TouchableOpacity
          key={1}
          style={{marginHorizontal: 6}}
          onPress={() => console.log('pressed')}>
          <FontAwesome6 name="bed" size={22} color="#127359" />
        </TouchableOpacity>
        <TouchableOpacity
          key={2}
          style={{marginHorizontal: 6}}
          onPress={() => console.log('pressed')}>
          <FontAwesome6 name="bed" size={22} color="#127359" />
        </TouchableOpacity>
        <TouchableOpacity
          key={3}
          style={{marginHorizontal: 6}}
          onPress={() => console.log('pressed')}>
          <FontAwesome6 name="bed" size={22} color="#127359" />
        </TouchableOpacity>
      </View>,
    ];
  };
  const keys = ['Category', 'Total Bed Status'];
  const tableValues = [['General Room', renderBedIcons()]];

  useEffect(() => {
    setWidthArr(Array(keys.length).fill(170));
  }, []);

  useEffect(() => {
    CheckRoomBedStatusMobile();
  }, [_id, hospital_id]);

  const CheckRoomBedStatusMobile = async () => {
    await axios
      .post(`${api.baseurl}/CheckRoomBedStatusMobile`, {
        reception_id: _id,
        hospital_id: hospital_id,
      })
      .then(res => {
        console.log('bed_status res : ', JSON.stringify(res.data.data));
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bedLegend}>
        <View style={[styles.legend, {marginBottom: 10}]}>
          <View style={styles.legend}>
            <FontAwesome6 name="bed" size={20} color="#018433" />
            <Text>AVAILABLE</Text>
          </View>
          <View style={styles.legend}>
            <FontAwesome6 name="bed" size={20} color="#Fe0bd1" />
            <Text>OCCUPIED</Text>
          </View>
          <View style={styles.legend}>
            <FontAwesome6 name="bed" size={20} color="red" />
            <Text>BOOKED</Text>
          </View>
          <View style={styles.legend}>
            <FontAwesome6 name="bed" size={20} color="#1a0099" />
            <Text>UNDER MAINTAINCE</Text>
          </View>
          <View style={styles.legend}>
            <FontAwesome6 name="bed" size={20} color="#fef616" />
            <Text>DIRTY</Text>
          </View>
        </View>
      </View>
      <View style={styles.bedTable}>
        <ScrollView horizontal={true}>
          <View>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: 'gray',
              }}>
              <Row
                data={keys}
                widthArr={widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={tableValues}
                  widthArr={widthArr}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.button}>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Eipdbeds;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
    padding: '0px 20px',
    marginHorizontal: 14,
  },
  bedLegend: {
    marginVertical: 10,
  },
  bedTable: {marginHorizontal: 14},
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'center', color: 'black'},
  dataWrapper: {marginTop: -1},
  row: {height: 50},
  bedSelection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //     gap:
  },
  button: {
    marginHorizontal: 14,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 12,
  },
});
