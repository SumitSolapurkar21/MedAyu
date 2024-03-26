import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {Appbar, Button, RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';

const PersonalHistory = () => {
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MedicineHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const navigation = useNavigation();
  const [checked, setChecked] = useState('');
  const tableHead = ['SrNo.', 'Habit', 'None', 'Light', 'Moderate', 'Heavy'];
  const tableData = [
    {
      id: 1,
      label: 'Tea',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 2,
      label: 'Coffee',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 3,
      label: 'Tobacco / Kharra',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 4,
      label: 'Smoking',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 5,
      label: 'Alcohol',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 6,
      label: 'Drugs',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 7,
      label: 'Exercise',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 8,
      label: 'Soft Drinks',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
    {
      id: 9,
      label: 'Salty Food',
      radio1: (
        <RadioButton
          value="None"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      ),
      radio2: (
        <RadioButton
          value="Light"
          status={checked === 'Light' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Light')}
        />
      ),
      radio3: (
        <RadioButton
          value="Moderate"
          status={checked === 'Moderate' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Moderate')}
        />
      ),
      radio4: (
        <RadioButton
          value="Heavy"
          status={checked === 'Heavy' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Heavy')}
        />
      ),
    },
  ];

  const _tableData = tableData?.map(item => {
    return [
      item.id,
      item.label,
      item.radio1,
      item.radio2,
      item.radio3,
      item.radio4,
    ];
  });
  const [widthArr, setWidthArr] = useState([]);

  useEffect(() => {
    setWidthArr([
      25,
      100,
      53,
      53,
      53,
      53,
      ...Array(tableHead.length - 1).fill(0),
    ]);
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
        <Appbar.Content title="Personal History " style={styles.appbar_title} />
      </Appbar.Header>
      {/* section 1 */}
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData}
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('MedicineHistory')}>
            Previous
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('FamilyHistory')}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('ObstetricsHistory')}>
            Skip
          </Button>
        </View>
      </View>
    </>
  );
};

export default PersonalHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {textAlign: 'left', color: 'black', fontSize: 11, marginLeft: 6},
  dataWrapper: {marginTop: -1},
  row: {
    height: 50,
  },
  cellText: {
    fontSize: 11,
    color: '#071bf5',
    marginLeft: 6,
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  
});
