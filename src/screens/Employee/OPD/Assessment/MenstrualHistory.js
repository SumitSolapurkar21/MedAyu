import {BackHandler, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Appbar,
  Divider,
  TextInput,
  RadioButton,
  Button,
  Checkbox,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';

const MenstrualHistory = () => {
  const tableHead1 = [
    {
      key: 1,
      label: 'Menarche',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 6,
              alignItems: 'center',
            }}>
            <Text style={[styles.label, {width: 'auto'}]}>Age : </Text>
            <TextInput
              mode="flat"
              style={[styles.input2]}
              value={'1'}
              onChangeText={text => {
                const updatedTemp = [...temp];
                setTemp(updatedTemp);
              }}
              editable={true}
            />
          </View>
        </>
      ),
    },
  ];
  const tableHead2 = [
    {
      key: 2,
      label: 'LMP',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 6,
            }}>
            <TextInput
              mode="flat"
              style={[styles.input2, {width: '100%'}]}
              value={'1'}
              onChangeText={text => {
                const updatedTemp = [...temp];
                setTemp(updatedTemp);
              }}
              editable={true}
            />
          </View>
        </>
      ),
    },
  ];
  const tableHead3 = [
    {
      key: 3,
      label: 'Periods',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View
              style={[
                styles.radioBtn,
                {marginHorizontal: 6, flexWrap: 'wrap'},
              ]}>
              <View style={styles.radioBtn}>
                <RadioButton value="regular" />
                <Text>Regular</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="irregular" />
                <Text>Irregular</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const tableHead4 = [
    {
      key: 4,
      label: 'Duration in days',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 6,
            }}>
            <TextInput
              mode="flat"
              style={[styles.input2, {width: '100%'}]}
              value={'1'}
              onChangeText={text => {
                const updatedTemp = [...temp];
                setTemp(updatedTemp);
              }}
              editable={true}
            />
          </View>
        </>
      ),
    },
  ];
  const tableHead5 = [
    {
      key: 5,
      label: 'Quality of Blood Flow',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View
              style={[
                styles.radioBtn,
                {flexWrap: 'wrap', marginHorizontal: 6},
              ]}>
              <View style={styles.radioBtn}>
                <RadioButton value="Scanty" />
                <Text>Scanty</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="Mod" />
                <Text>Mod</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="Heavy" />
                <Text>Heavy</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const tableHead6 = [
    {
      key: 6,
      label: ' Pain during cycle',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={[styles.radioBtn, {marginHorizontal: 6}]}>
              <View style={styles.radioBtn}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="no" />
                <Text>No</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const tableHead7 = [
    {
      key: 7,
      label: 'Menopause',
      content: (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 6,
              alignItems: 'center',
            }}>
            <Text style={[styles.label, {width: 'auto'}]}>Age : </Text>
            <TextInput
              mode="flat"
              style={[styles.input2]}
              value={'1'}
              onChangeText={text => {
                const updatedTemp = [...temp];
                setTemp(updatedTemp);
              }}
              editable={true}
            />
          </View>
        </>
      ),
    },
  ];
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const [temp, setTemp] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('ObstetricsHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setWidthArr([166, 166, ...Array(tableHead1.length - 1).fill(0)]);
  }, []);
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('ObstetricsHistory');
          }}
        />
        <Appbar.Content title="Menstrual History" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <ScrollView vertical={true}>
          <View>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: 'gray',
              }}>
              <Rows
                data={tableHead1?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead2?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead3?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead4?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead5?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead6?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
              <Rows
                data={tableHead7?.map(item => {
                  return [item.label, item.content];
                })}
                widthArr={widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
            </Table>
          </View>
        </ScrollView>
        {/* Group Buttons .....  */}
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('ObstetricsHistory')}>
            Previous
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('MenstrualHistory')}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('OpdVitals')}>
            Skip
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MenstrualHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  card: {
    borderWidth: 0.7,
    borderRadius: 6,
    marginBottom: 10,
    padding: 6,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 5,
    //     width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    //     marginHorizontal: 6,
  },
  label: {
    fontWeight: '600',
    color: 'black',
    width: 100,
  },
  card2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  input2: {
    height: 40,
    width: '60%',
    backgroundColor: 'white',
  },
  head: {height: 40, backgroundColor: '#80aaff'},
  text: {
    textAlign: 'left',
    color: 'black',
    fontSize: 14,
    marginLeft: 6,
    backgroundColor: '#ffffff',
  },
  dataWrapper: {marginTop: -1},
  row: {
    height: 'auto',
    backgroundColor: '#ffffff',
    minHeight: 55,
  },
  cellText: {
    fontSize: 11,
    color: '#071bf5',
    marginLeft: 6,
  },
});
