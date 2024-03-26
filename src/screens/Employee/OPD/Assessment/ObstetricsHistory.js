import {BackHandler, StyleSheet, Text, View} from 'react-native';
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

const ObstetricsHistory = () => {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const [temp, setTemp] = useState([]);
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('PersonalHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('PersonalHistory');
          }}
        />
        <Appbar.Content title="Obstetrics History" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.card2}>
            <View style={styles.cardContent}>
              <Text style={styles.label}>G : </Text>
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
            <View style={styles.cardContent}>
              <Text style={styles.label}>P : </Text>
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
            <View style={styles.cardContent}>
              <Text style={styles.label}>L : </Text>
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
            <View style={styles.cardContent}>
              <Text style={styles.label}>A : </Text>
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
            <View style={styles.cardContent}>
              <Text style={styles.label}>D : </Text>
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
          </View>
          <Divider />
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>Pregnant : </Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
          </RadioButton.Group>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>
                Breast Feeding :{' '}
              </Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
          </RadioButton.Group>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>
                Planing to Conceive :{' '}
              </Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
          </RadioButton.Group>
          <Divider />
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {width: 200}]}>Contraception :</Text>
              <View style={styles.radioBtn}>
                <View style={styles.radioBtn}>
                  <Text>Yes</Text>
                  <RadioButton value="yes" />
                </View>
                <View style={styles.radioBtn}>
                  <Text>No</Text>
                  <RadioButton value="no" />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 60,
                }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={styles.label}>Pill</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 90,
                }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={styles.label}>Injuction</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 90,
                }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={styles.label}>Other</Text>
                {/* <TextInput
                value={text}
                placeholder="other ...."
                onChangeText={text => setText(text)}
              /> */}
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.submitbutton}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('PersonalHistory')}>
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
            onPress={() => navigation.navigate('MenstrualHistory')}>
            Skip
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ObstetricsHistory;

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
    flexDirection: 'column',
    padding: 5,
    width: '33%',
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
});
