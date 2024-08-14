import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../api.json';
import { Table, Row, Rows } from 'react-native-table-component';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Eadtpatientdeath = () => {
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
  useEffect(() => {
    dischargeList();
  }, []);

  const dischargeList = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchWebActionStatus`, {
          reception_id: _id,
          hospital_id: hospital_id,
          patient_status: 'Death',
        })
        .then(res => {
          const keys = [
            'NAME',
            'UHID',
            'IP NO',
            'REG.DATE',
            'DEPARTMENT',
            'DOCTOR',
            'ROOM NO',
            'BED NO',
            'DURATION',
            'STATUS',
          ];
          setTableHead(keys);
          if (res.data.data?.length > 0) {
            const values = res.data.data.map(item => [
              `${item.firstname}`, // Combine DATE and TIME
              item.patientuniqueno,
              item.ipno,
              item.registerdate,
              item.deptname,
              item.doctorname,
              item.room_no,
              item.bedno,
              item.valid_dayss,
              item.patient_status,

              ...Object.values(item).filter(
                (_, index) =>
                  index !== keys.indexOf('firstname') &&
                  index !== keys.indexOf('patientuniqueno') &&
                  index !== keys.indexOf('ipno') &&
                  index !== keys.indexOf('registerdate') &&
                  index !== keys.indexOf('deptname') &&
                  index !== keys.indexOf('doctorname') &&
                  index !== keys.indexOf('room_no') &&
                  index !== keys.indexOf('bedno') &&
                  index !== keys.indexOf('valid_dayss') &&
                  index !== keys.indexOf('patient_status'),
              ),
            ]);

            setWidthArr(Array(keys?.length).fill(170));
            setTableData(values);
          } else {
            setWidthArr(Array(keys?.length).fill(170));
            setTableData([['Data Not Available']]);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  //for date and time :

  const [showIndicator, setShowIndicator] = React.useState(false);

  return (
    <View style={styles.container}>
      {showIndicator && (
        <View style={styles.active}>
          <ActivityIndicator animating={true} color={'red'} size={'large'} />
        </View>
      )}

      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: 'gray' }}>
            <Row
              data={tableHead}
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
  );
};

export default Eadtpatientdeath;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  head: { height: 40, backgroundColor: '#80aaff' },
  text: { textAlign: 'center', color: 'black' },
  dataWrapper: { marginTop: -1 },
  row: { height: 50 },
  cardSelection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignContent: 'center',
  },
  contentTxt: {
    fontWeight: '600',
    color: 'black',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  active: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },
});
