import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {Appbar, Button, RadioButton, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
const SystemicExamination = () => {
  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('GeneralHistory');
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
  //
  const tableHead1 = ['EENT'];
  const tableData = [
    {
      id: 1,
      label: 'Eyes',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,
      label: 'Ears',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'Nose',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 4,
      label: 'Oral Cavity',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 5,
      label: 'Tounge',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 6,
      label: 'Scalp & Hair',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 7,
      label: 'Throat',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
  ];
  //
  const tableHead2 = ['Respiratory Examination'];
  const tableData2 = [
    {
      id: 1,
      label: 'Rate',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Eupnea</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Tachypnea</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Bradypnea</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Apnea</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,
      label: 'Rhythm/Depth',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Regular</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text>Irregular</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Deep' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Deep')}
              />
              <Text>Deep</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Shallow' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Shallow')}
              />
              <Text>Shallow</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'Chest Movement',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Symmetrical' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Symmetrical')}
              />
              <Text>Symmetrical</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Asymmetrical' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Asymmetrical')}
              />
              <Text>Asymmetrical</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 4,
      label: 'Breath Sound',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Wheeze' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Wheeze')}
              />
              <Text>Wheeze</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Rhonchi' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Rhonchi')}
              />
              <Text>Rhonchi</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Crepitation' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Crepitation')}
              />
              <Text>Crepitation</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Other' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Other')}
              />
              <Text>Other</Text>
            </View>
          </View>
        </>
      ),
    },
  ];

  //
  const tableHead3 = ['Cardiovascular Examination'];
  const tableData3 = [
    {
      id: 1,
      label: 'Pulse Rhythm',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Regular' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Regular')}
              />
              <Text>Regular</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Irregular' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Irregular')}
              />
              <Text>Irregular</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,
      label: 'Pulse Amplitude',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Bounding' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Bounding')}
              />
              <Text>Bounding</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Decreased' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Decreased')}
              />
              <Text>Decreased</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'Pulse Rate',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Tachycardia' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Tachycardia')}
              />
              <Text>Tachycardia</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Bradycardia' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Bradycardia')}
              />
              <Text>Bradycardia</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 4,
      label: 'Neck Vein Engorged',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Yes')}
              />
              <Text>Yes</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'No' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('No')}
              />
              <Text>No</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 5,
      label: 'Edema',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Yes')}
              />
              <Text>Yes</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'No Pitting' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('No Pitting')}
              />
              <Text>No Pitting</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 6,
      label: 'Chest wall',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 7,
      label: 'Heart Sound',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Wheeze' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Wheeze')}
              />
              <Text>Wheeze</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Rhonchi' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Rhonchi')}
              />
              <Text>Rhonchi</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Crepitation' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Crepitation')}
              />
              <Text>Crepitation</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Other' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Other')}
              />
              <Text>Other</Text>
            </View>
          </View>
        </>
      ),
    },
  ];
  const [ecgText, setEcgText] = useState('');
  const tableData3_1 = [
    {
      id: 1,
      label: 'ECG',
      radio1: (
        <>
          <View style={{padding: 10}}>
            <TextInput
              mode="flat"
              value={ecgText}
              multiline
              onChangeText={ecgText => setEcgText(ecgText)}
            />
          </View>
        </>
      ),
    },
  ];

  //
  const tableHead4 = ['Gastrointestinal Examination'];
  const tableData4 = [
    {
      id: 1,
      label: 'Abdomen Shape',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Distended' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Distended')}
              />
              <Text>Distended</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,
      label: 'Presence of any',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Scars' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Scars')}
              />
              <Text>Scars</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Swelling' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Swelling')}
              />
              <Text>Swelling</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={
                  checked === 'Distended Vessels' ? 'checked' : 'unchecked'
                }
                onPress={() => setChecked('Distended Vessels')}
              />
              <Text>Distended Vessels</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'None' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('None')}
              />
              <Text>None</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'Palpation',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Soft' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Soft')}
              />
              <Text>Soft</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Tender' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Tender')}
              />
              <Text>Tender</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 4,
      label: 'Liver',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Palpable')}
              />
              <Text>Palpable</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text>Non Palpable</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 5,
      label: 'Spleen',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Palpable')}
              />
              <Text>Palpable</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text>Non Palpable</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 6,
      label: 'Abdominal Sound',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 7,
      label: 'PR Examination',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
  ];

  //
  const tableHead5 = ['Genitourinary Examination'];
  const tableData5 = [
    {
      id: 1,
      label: 'Genitalia',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,
      label: 'Breast',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'Nipple',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
  ];
  //
  const tableHead6 = ['Musculoskeletal Examination'];
  const tableData6 = [
    {
      id: 1,
      label: 'Any Deformity',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Yes')}
              />
              <Text>Yes</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'No' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('No')}
              />
              <Text>No</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,
      label: 'Motor Power',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'ROM',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 4,
      label: 'Cordination',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 5,
      label: 'Gait',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Normal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Normal')}
              />
              <Text>Normal</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abnormal')}
              />
              <Text>Abnormal</Text>
            </View>
          </View>
        </>
      ),
    },
  ];
  const _tableData = tableData?.map(item => {
    return [item.label, item.radio1];
  });
  const _tableData2 = tableData2?.map(item => {
    return [item.label, item.radio1];
  });
  const _tableData3 = tableData3?.map(item => {
    return [item.label, item.radio1];
  });
  const _tableData3_1 = tableData3_1?.map(item => {
    return [item.label, item.radio1];
  });
  const _tableData4 = tableData4?.map(item => {
    return [item.label, item.radio1];
  });
  const _tableData5 = tableData5?.map(item => {
    return [item.label, item.radio1];
  });
  const _tableData6 = tableData6?.map(item => {
    return [item.label, item.radio1];
  });
  const [widthArr, setWidthArr] = useState([]);
  const [headwidthArr, setheadWidthArr] = useState([]);

  useEffect(() => {
    setheadWidthArr([
      340,
      ...Array(
        tableHead1.length - 1,
        tableHead2.length - 1,
        tableHead3.length - 1,
        tableHead4.length - 1,
        tableHead5.length - 1,
        tableHead6.length - 1,
      ).fill(0),
    ]);
    setWidthArr([
      100,
      238,
      ...Array(
        _tableData.length - 1,
        _tableData2.length - 1,
        _tableData3.length - 1,
        _tableData4.length - 1,
        _tableData5.length - 1,
        _tableData6.length - 1,
      ).fill(0),
    ]);
  }, []);
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('GeneralExamination');
          }}
        />
        <Appbar.Content
          title="Systemic Examination "
          style={styles.appbar_title}
        />
      </Appbar.Header>
      {/* section 1 */}
      <View style={styles.container}>
        <ScrollView vertical={true}>
          <View style={styles.tableDiv}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead1}
                widthArr={headwidthArr}
                style={styles.head}
                textStyle={styles.headtext}
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
          {/*  */}
          <View style={styles.tableDiv}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead2}
                widthArr={headwidthArr}
                style={styles.head}
                textStyle={styles.headtext}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData2}
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
          {/*  */}
          <View style={styles.tableDiv}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead3}
                widthArr={headwidthArr}
                style={styles.head}
                textStyle={styles.headtext}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData3}
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
                <Rows
                  data={_tableData3_1}
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
          {/*  */}
          <View style={styles.tableDiv}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead4}
                widthArr={headwidthArr}
                style={styles.head}
                textStyle={styles.headtext}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData4}
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
          {/*  */}

          <View style={styles.tableDiv}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead5}
                widthArr={headwidthArr}
                style={styles.head}
                textStyle={styles.headtext}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData5}
                  widthArr={widthArr}
                  style={[styles.row]}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
          {/*  */}
          <View style={styles.tableDiv}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead6}
                widthArr={headwidthArr}
                style={styles.head}
                textStyle={styles.headtext}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData6}
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
            onPress={() => navigation.navigate('GeneralHistory')}>
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

export default SystemicExamination;

const styles = StyleSheet.create({
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
  submitbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tableDiv: {
    marginBottom: 10,
  },
});
