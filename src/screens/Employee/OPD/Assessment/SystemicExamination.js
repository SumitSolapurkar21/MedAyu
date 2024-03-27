import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {
  Appbar,
  Button,
  RadioButton,
  TextInput,
  Checkbox,
} from 'react-native-paper';
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
  const [checked1, setChecked1] = useState(false);
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
  //
  const tableHead7 = ['Neurological Examination'];
  const tableData7 = [
    {
      id: 1,
      label: 'GCS',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <Text style={styles.radioText}>E</Text>
              <View style={{padding: 10}}>
                <TextInput
                  mode="flat"
                  value={ecgText}
                  multiline
                  onChangeText={ecgText => setEcgText(ecgText)}
                />
              </View>
            </View>
            <View style={styles.radioBtn}>
              <Text style={styles.radioText}>V</Text>
              <View style={{padding: 10}}>
                <TextInput
                  mode="flat"
                  value={ecgText}
                  multiline
                  onChangeText={ecgText => setEcgText(ecgText)}
                />
              </View>
            </View>
            <View style={styles.radioBtn}>
              <Text style={styles.radioText}>V</Text>
              <View style={{padding: 10}}>
                <TextInput
                  mode="flat"
                  value={ecgText}
                  multiline
                  onChangeText={ecgText => setEcgText(ecgText)}
                />
              </View>
            </View>
            <View style={styles.radioBtn}>
              <Text style={styles.radioText}>Score</Text>
              <View style={{padding: 10}}>
                <TextInput
                  mode="flat"
                  value={ecgText}
                  multiline
                  onChangeText={ecgText => setEcgText(ecgText)}
                />
              </View>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 2,
      label: 'Vision',
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
            <View>
              <View style={styles.radioBtn}>
                <RadioButton
                  value="None"
                  status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Abnormal')}
                />
                <Text>Impaired</Text>
              </View>
              <View style={styles.radioBtn}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text>Right</Text>
              </View>
              <View style={styles.radioBtn}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text>Right</Text>
              </View>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'Hearing',
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
            <View>
              <View style={styles.radioBtn}>
                <RadioButton
                  value="None"
                  status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Abnormal')}
                />
                <Text>Impaired</Text>
              </View>
              <View style={styles.radioBtn}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text>Right</Text>
              </View>
              <View style={styles.radioBtn}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text>Right</Text>
              </View>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 4,
      label: 'Speech',
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
            <View>
              <View style={styles.radioBtn}>
                <RadioButton
                  value="None"
                  status={checked === 'Abnormal' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Abnormal')}
                />
                <Text>Impaired</Text>
              </View>
              <View style={styles.radioBtn}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text>Right</Text>
              </View>
              <View style={styles.radioBtn}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text>Right</Text>
              </View>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 5,
      label: 'Sensations',
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
      id: 6,
      label: 'Reflexes',
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
      label: 'Memory',
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
                status={checked === 'Loss' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Loss')}
              />
              <Text>Loss</Text>
            </View>
          </View>
        </>
      ),
    },
  ];

  //
  const tableHead8 = ['Skin Examination'];
  const tableData8 = [
    {
      id: 1,
      label: 'Dermal Assessment',
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
                status={checked === 'Abrasion' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Abrasion')}
              />
              <Text>Abrasion</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Burn' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Burn')}
              />
              <Text>Burn</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Contusion' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Contusion')}
              />
              <Text>Contusion</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Dermatitis' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Dermatitis')}
              />
              <Text>Dermatitis</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Ecchymosis' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Ecchymosis')}
              />
              <Text>Ecchymosis</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Hematoma' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Hematoma')}
              />
              <Text>Hematoma</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Laceration' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Laceration')}
              />
              <Text>Laceration</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Mass' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Mass')}
              />
              <Text>Mass</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Petechiae' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Petechiae')}
              />
              <Text>Petechiae</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Rash' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Rash')}
              />
              <Text>Rash</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Suture' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Suture')}
              />
              <Text>Suture</Text>
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
    {
      id: 2,
      label: 'Color',
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
                status={checked === 'Pale' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Pale')}
              />
              <Text>Pale</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Jaundice' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Jaundice')}
              />
              <Text>Jaundice</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Cyanosis' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Cyanosis')}
              />
              <Text>Cyanosis</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Pink' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Pink')}
              />
              <Text>Pink</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 3,
      label: 'Turgor',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Good' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Good')}
              />
              <Text>Good</Text>
            </View>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'Poor' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Poor')}
              />
              <Text>Poor</Text>
            </View>
          </View>
        </>
      ),
    },
    {
      id: 4,
      label: 'Pressure Ulcer',
      radio1: (
        <>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <RadioButton
                value="None"
                status={checked === 'No' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('No')}
              />
              <Text style={styles.radioText}>No</Text>
            </View>
          </View>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text style={styles.checkBoxText}>
                Stage 1: intact skin with non-blanch able redness of location
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text style={styles.checkBoxText}>
                Stage 2: skin loss: abrasion, blister or shallow crater
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text style={styles.checkBoxText}>
                Stage 3: Shallow/deep crater: not extend down through underlying
                fascia
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text style={styles.checkBoxText}>
                Stage 4: Deep crater: exposed bone, tendon or muscle
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text style={styles.checkBoxText}>
                Unstageble: Slough (yellow, gray, green or brown) or eschar
                wound bed
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                value="None"
                status={checked === 'Non Palpable' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Non Palpable')}
              />
              <Text style={styles.checkBoxText}>Deep tissue injury</Text>
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
  const _tableData7 = tableData7?.map(item => {
    return [item.label, item.radio1];
  });
  const _tableData8 = tableData8?.map(item => {
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
        tableHead7.length - 1,
        tableHead8.length - 1,
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
        _tableData7.length - 1,
        _tableData8.length - 1,
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
          {/*  */}
          <View style={styles.tableDiv}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
              <Row
                data={tableHead7}
                widthArr={headwidthArr}
                style={styles.head}
                textStyle={styles.headtext}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Rows
                  data={_tableData7}
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
            onPress={() => navigation.navigate('OpdDiagnosis')}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('OpdDiagnosis')}>
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
  radioText: {
    marginLeft: 8,
  },
  checkBoxText: {
    flexWrap: 'wrap',
    width: 200,
  },
});
