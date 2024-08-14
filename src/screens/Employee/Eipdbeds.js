import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Table, Row, Rows } from 'react-native-table-component';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import UserContext from '../../components/Context/Context';
import axios from 'axios';
import api from '../../../api.json';
import { useNavigation } from '@react-navigation/native';

const Eipdbeds = () => {
  const { userData } = useContext(UserContext);
  const { _id, hospital_id } = userData;
  const navigation = useNavigation();
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
  //table content ....
  const [tableData, setTableData] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const keys = ['Category', 'Total Bed Status'];

  // to set width of table ......
  useEffect(() => {
    setWidthArr(Array(keys?.length).fill(170));
  }, []);

  useEffect(() => {
    CheckRoomBedStatusMobile();
  }, [_id, hospital_id]);

  // bed status api ......
  const CheckRoomBedStatusMobile = async () => {
    await axios
      .post(`${api.baseurl}/CheckRoomBedStatusMobile`, {
        reception_id: _id,
        hospital_id: hospital_id,
      })
      .then(res => {
        const bedData = res.data.data.map(item => [
          item.roomname,
          renderBedIcons(item.roomDataArray),
        ]);
        setTableData(bedData);
      });
  };

  //bed status color .......
  const bedStatusColors = {
    EMPTY: '#018433',
    OCCUPIED: '#Fe0bd1',
    BOOKED: 'red',
    MAINTAINCE: '#1a0099',
    DIRTY: '#fef616',
  };

  //bed status wise color .....
  const getBedColor = bedStatus => bedStatusColors[bedStatus];

  //on click bed status data ......
  const onClickStatus = res => {
    setSelectedBed(res);
    setIsClicked(!isClicked);
  };

  //render icons .....
  const renderBedIcons = bedDataArray => {
    return bedDataArray.map(res => (
      <View style={styles.bedSelection} key={res.bed_id}>
        {res.bed_status === 'EMPTY' ? (
          <TouchableOpacity
            style={{ marginLeft: 6 }}
            key={res.bed_id}
            onPress={() => onClickStatus(res)}>
            <FontAwesome6
              name="bed"
              size={22}
              color={getBedColor(res.bed_status)}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ marginLeft: 6 }}>
            <FontAwesome6
              name="bed"
              size={22}
              color={getBedColor(res.bed_status)}
            />
          </View>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bedLegend}>
        <View style={[styles.legend, { marginBottom: 10 }]}>
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
              <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
                <Rows
                  data={tableData}
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
  bedTable: { marginHorizontal: 14 },
  head: { height: 40, backgroundColor: '#80aaff' },
  text: { textAlign: 'center', color: 'black' },
  dataWrapper: { marginTop: -1 },
  row: { height: 50 },
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
  color: {
    color: 'red',
  },
});
