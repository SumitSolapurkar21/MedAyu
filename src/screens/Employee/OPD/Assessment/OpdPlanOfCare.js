import React, {useContext, useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Checkbox, Button} from 'react-native-paper';
import {Table, Row, Rows} from 'react-native-table-component';

const OpdPlanOfCare = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState('');
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('OpdInvestigation');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //
  const tableHead8 = ['Plan of Care'];
  const tableData8 = [
    {
      id: 1,

      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'PREVENTIVE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('PREVENTIVE')}
              />
              <Text>PREVENTIVE</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'CURATIVE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('CURATIVE')}
              />
              <Text>CURATIVE</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'SUPPORTIVE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('SUPPORTIVE')}
              />
              <Text>SUPPORTIVE</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'REHABILITATIVE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('REHABILITATIVE')}
              />
              <Text>REHABILITATIVE</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'PALLATIVE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('PALLATIVE')}
              />
              <Text>PALLATIVE</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'EOL CARE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('EOL CARE')}
              />
              <Text>EOL CARE</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,

      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <Text>THERPAY PLAN : </Text>
              <Checkbox
                value="None"
                status={checked === 'MEDICNE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('MEDICNE')}
              />
              <Text>MEDICNE</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'SURGERY' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('SURGERY')}
              />
              <Text>SURGERY</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'PROCEDURE' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('PROCEDURE')}
              />
              <Text>PROCEDURE</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'PHYSIOTHERAPY' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('PHYSIOTHERAPY')}
              />
              <Text>PHYSIOTHERAPY</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'DIET THERAPY' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('DIET THERAPY')}
              />
              <Text>DIET THERAPY</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={
                  checked === 'OCCUPATIONAL THERAPY' ? 'checked' : 'unchecked'
                }
                onPress={() => setChecked('OCCUPATIONAL THERAPY')}
              />
              <Text>OCCUPATIONAL THERAPY</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'COUNSELLING' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('COUNSELLING')}
              />
              <Text>COUNSELLING</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={
                  checked === 'PHYSICAL THERAPY' ? 'checked' : 'unchecked'
                }
                onPress={() => setChecked('PHYSICAL THERAPY')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'OTHER' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('OTHER')}
              />
              <Text>OTHER</Text>
            </View>
          </View>
        </>
      ),
    },
  ];
  const _tableData8 = tableData8?.map(item => {
    return [item.radio1];
  });
  const [widthArr, setWidthArr] = useState([]);
  const [headwidthArr, setheadWidthArr] = useState([]);
  useEffect(() => {
    setheadWidthArr([340, ...Array(tableHead8.length - 1).fill(0)]);
    setWidthArr([338, ...Array(_tableData8.length - 1).fill(0)]);
  }, []);
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('OpdInvestigation');
          }}
        />
        <Appbar.Content title="OPD Plan oF Care" style={styles.appbar_title} />
      </Appbar.Header>
      <View style={styles.container}>
        {/*  */}
        <View style={styles.tableDiv}>
          <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
            <Row
              data={tableHead8}
              widthArr={headwidthArr}
              style={styles.head}
              textStyle={styles.headtext}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Rows
                data={_tableData8}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
            </Table>
          </ScrollView>
        </View>

        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdDiagnosis')}>
            Previous
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdTreatment')}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('OpdTreatment')}>
            Skip
          </Button>
        </View>
      </View>
    </>
  );
};

export default OpdPlanOfCare;

const styles = StyleSheet.create({
  submitbutton: {
    flexDirection: 'row',
    gap: 10,
    bottom: 10,
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  headtext: {
    textAlign: 'left',
    color: 'white',
    fontSize: 18,
    marginLeft: 6,
    fontWeight: '600',
  },
  text: {textAlign: 'left', color: 'black', fontSize: 14, marginLeft: 6},
  dataWrapper: {marginTop: -1},
  row: {
    height: 'auto',
  },
  cellText: {
    fontSize: 11,
    color: '#071bf5',
    marginLeft: 6,
  },
  tableDiv: {
    marginBottom: 10,
  },
  radioText: {
    marginLeft: 8,
  },
  checkBoxText: {
    flexWrap: 'wrap',
    width: 200,
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
