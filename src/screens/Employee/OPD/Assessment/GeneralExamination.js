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
import {Appbar, RadioButton, Button} from 'react-native-paper';

const GeneralExamination = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('OpdVitals');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const _data = [
    {
      id: 1,
      label: 'Pallor',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={[styles.radioBtn, {marginHorizontal: 6}]}>
              <View style={styles.radioBtn}>
                <RadioButton value="present" />
                <Text>Present</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="absent" />
                <Text>Absent</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 2,
      label: 'Cyanosis',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={[styles.radioBtn, {marginHorizontal: 6}]}>
              <View style={styles.radioBtn}>
                <RadioButton value="present" />
                <Text>Present</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="absent" />
                <Text>Absent</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Icterus',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={[styles.radioBtn, {marginHorizontal: 6}]}>
              <View style={styles.radioBtn}>
                <RadioButton value="present" />
                <Text>Present</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="absent" />
                <Text>Absent</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'LN',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={[styles.radioBtn, {marginHorizontal: 6}]}>
              <View style={styles.radioBtn}>
                <RadioButton value="present" />
                <Text>Present</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="absent" />
                <Text>Absent</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 5,
      label: 'Odema',
      content: (
        <>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={[styles.radioBtn, {marginHorizontal: 6}]}>
              <View style={styles.radioBtn}>
                <RadioButton value="present" />
                <Text>Present</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="absent" />
                <Text>Absent</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const renderItem = ({item}) => (
    <ScrollView
      horizontal
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'black',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderTopWidth: 1,
          borderColor: 'black',
        }}>
        <Text style={styles.cellLabel}>{item.label}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderColor: 'black',
        }}>
        <View style={styles.cellText}>{item.content}</View>
      </View>
    </ScrollView>
  );
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('OpdVitals');
          }}
        />
        <Appbar.Content title="General Examination" />
      </Appbar.Header>
      <ScrollView horizontal>
        <View style={{padding: 10}}>
          <FlatList
            data={_data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      {/* Group Buttons .....  */}
      <View style={styles.submitbutton}>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate('OpdVitals')}>
          Previous
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate('SystemicExamination')}>
          Save & Next
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate('SystemicExamination')}>
          Skip
        </Button>
      </View>
    </>
  );
};

export default GeneralExamination;

const styles = StyleSheet.create({
  cellLabel: {
    fontSize: 16,
    padding: 5,
    color: 'black',
    width: 150,
    marginTop: 6,
  },
  cellText: {
    fontSize: 16,
    padding: 5,
    color: 'black',
    //     width: '100%',
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10,
  },
});
