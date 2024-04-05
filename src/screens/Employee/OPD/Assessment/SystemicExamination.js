import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import UserContext from '../../../../components/Context/Context';
import axios from 'axios';
import api from '../../../../../api.json';
const SystemicExamination = () => {
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;

  const [checkedValues, setCheckedValues] = useState({
    eye: '',
    ears: '',
    nose: '',
    oralcavity: '',
    tounge: '',
    scalp: '',
    throat: '',
    rate: '',
    rhythm_depth: '',
    chest_movement: '',
    breath_sound: '',
    pulse_rhythm: '',
    pluse_amplitude: '',
    pulse_rate: '',
    neck_vein_engorged: '',
    edema: '',
    chest_wall: '',
    presence_of_any: '',
    palpation: '',
    abdomen_shape: '',
    liver: '',
    spleen: '',
    pr_examination: '',
    abdominal_sound: '',
    genitalia: '',
    breast: '',
    nipple: '',
    motor_power: '',
    rom: '',
    cordination: '',
    gait: '',
    ecg_input: '',
    gcs_e: '',
    gcs_v: '',
    gcs_v2: '',
    gcs_score: '',
    vision: '',
    vision_right: '',
    vision_left: '',
    speech: '',
    speech_right: '',
    speech_left: '',
    hearing: '',
    hearing_left: '',
    hearing_right: '',
    pressure_ulcer_stage1: '',
    pressure_ulcer_stage2: '',
    pressure_ulcer_stage3: '',
    pressure_ulcer_stage4: '',
    pressure_ulcer_unstable: '',
    pressure_ulcer_deep_tissue_injury: '',
  });

  //backHandler ...
  useEffect(() => {
    const backAction = () => {
      navigation.replace('GeneralHistory');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleCheckboxToggle = (name, value) => {
    setCheckedValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigation = useNavigation();
  //
  const tableHead1 = ['EENT'];
  const tableData = [
    {
      id: 1,
      label: 'Eyes',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('eye', newValue)}
            value={checkedValues.eye}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 2,
      label: 'Ears',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('ears', newValue)}
            value={checkedValues.ears}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Nose',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('nose', newValue)}
            value={checkedValues.nose}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'Oral Cavity',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('oralcavity', newValue)
            }
            value={checkedValues.oralcavity}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 5,
      label: 'Tounge',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('tounge', newValue)}
            value={checkedValues.tounge}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 6,
      label: 'Scalp & Hair',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('scalp', newValue)}
            value={checkedValues.scalp}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 7,
      label: 'Throat',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('throat', newValue)}
            value={checkedValues.throat}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
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
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('rate', newValue)}
            value={checkedValues.rate}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="eupnea" />
                <Text>Eupnea</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="tachynea" />
                <Text>Tachypnea</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="bradypnea" />
                <Text>Bradypnea</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="apnea" />
                <Text>Apnea</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 2,
      label: 'Rhythm/Depth',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('rhythm_depth', newValue)
            }
            value={checkedValues.rhythm_depth}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="regular" />
                <Text>Regular</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="irregular" />
                <Text>Irregular</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="deep" />
                <Text>Deep</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="shallow" />
                <Text>Shallow</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Chest Movement',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('chest_movement', newValue)
            }
            value={checkedValues.chest_movement}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="symmetrical" />
                <Text>Symmetrical</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="asymmetrical" />
                <Text>Asymmetrical</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'Breath Sound',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('breath_sound', newValue)
            }
            value={checkedValues.breath_sound}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="wheeze" />
                <Text>Wheeze</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="rhonchi" />
                <Text>Rhonchi</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="crepitation" />
                <Text>Crepitation</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="other" />
                <Text>Other</Text>
              </View>
            </View>
          </RadioButton.Group>
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
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('pulse_rhythm', newValue)
            }
            value={checkedValues.pulse_rhythm}>
            <View style={styles.radioBtn}>
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
    {
      id: 2,
      label: 'Pulse Amplitude',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('pluse_amplitude', newValue)
            }
            value={checkedValues.pluse_amplitude}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="bounding" />
                <Text>Bounding</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="decreased" />
                <Text>Decreased</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Pulse Rate',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('pulse_rate', newValue)
            }
            value={checkedValues.pulse_rate}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="tachycardia" />
                <Text>Tachycardia</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="bradycardia" />
                <Text>Bradycardia</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'Neck Vein Engorged',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('neck_vein_engorged', newValue)
            }
            value={checkedValues.neck_vein_engorged}>
            <View style={styles.radioBtn}>
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
    {
      id: 5,
      label: 'Edema',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('edema', newValue)}
            value={checkedValues.edema}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="yes" />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="no_pitting" />
                <Text>No Pitting</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 6,
      label: 'Chest wall',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('chest_wall', newValue)
            }
            value={checkedValues.chest_wall}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 7,
      label: 'Heart Sound',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('heart_sound', newValue)
            }
            value={checkedValues.heart_sound}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="wheeze" />
                <Text>Wheeze</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="rhonchi" />
                <Text>Rhonchi</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="crepitation" />
                <Text>Crepitation</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="other" />
                <Text>Other</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
  ];
  const tableData3_1 = [
    {
      id: 1,
      label: 'ECG',
      radio1: (
        <>
          <View style={{padding: 10}}>
            <TextInput
              mode="flat"
              value={checkedValues.ecg_input}
              multiline
              onChangeText={newValue =>
                handleCheckboxToggle('ecg_input', newValue)
              }
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
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('abdomen_shape', newValue)
            }
            value={checkedValues.abdomen_shape}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="distended" />
                <Text>Distended</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 2,
      label: 'Presence of any',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('presence_of_any', newValue)
            }
            value={checkedValues.presence_of_any}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="scars" />
                <Text>Scars</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="swelling" />
                <Text>Swelling</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="distended_vessels" />
                <Text>Distended Vessels</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="none" />
                <Text>None</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Palpation',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('palpation', newValue)
            }
            value={checkedValues.palpation}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="soft" />
                <Text>Soft</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="tender" />
                <Text>Tender</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'Liver',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('liver', newValue)}
            value={checkedValues.liver}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="palpable" />
                <Text>Palpable</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="non_palpable" />
                <Text>Non Palpable</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 5,
      label: 'Spleen',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('spleen', newValue)}
            value={checkedValues.spleen}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="palpable" />
                <Text>Palpable</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="non_palpable" />
                <Text>Non Palpable</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 6,
      label: 'Abdominal Sound',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('abdominal_sound', newValue)
            }
            value={checkedValues.abdominal_sound}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 7,
      label: 'PR Examination',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('pr_examination', newValue)
            }
            value={checkedValues.pr_examination}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
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
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('genitalia', newValue)
            }
            value={checkedValues.genitalia}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 2,
      label: 'Breast',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('breast', newValue)}
            value={checkedValues.breast}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Nipple',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('nipple', newValue)}
            value={checkedValues.nipple}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
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
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('any_deformity', newValue)
            }
            value={checkedValues.any_deformity}>
            <View style={styles.radioBtn}>
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
    {
      id: 2,
      label: 'Motor Power',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('motor_power', newValue)
            }
            value={checkedValues.motor_power}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'ROM',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('rom', newValue)}
            value={checkedValues.rom}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'Cordination',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('cordination', newValue)
            }
            value={checkedValues.cordination}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 5,
      label: 'Gait',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('gait', newValue)}
            value={checkedValues.gait}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
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
                  value={checkedValues.gcs_e}
                  multiline
                  onChangeText={newValue =>
                    handleCheckboxToggle('gcs_e', newValue)
                  }
                />
              </View>
            </View>
            <View style={styles.radioBtn}>
              <Text style={styles.radioText}>V</Text>
              <View style={{padding: 10}}>
                <TextInput
                  mode="flat"
                  value={checkedValues.gcs_v}
                  multiline
                  onChangeText={newValue =>
                    handleCheckboxToggle('gcs_v', newValue)
                  }
                />
              </View>
            </View>
            <View style={styles.radioBtn}>
              <Text style={styles.radioText}>V</Text>
              <View style={{padding: 10}}>
                <TextInput
                  mode="flat"
                  value={checkedValues.gcs_v2}
                  multiline
                  onChangeText={newValue =>
                    handleCheckboxToggle('gcs_v2', newValue)
                  }
                />
              </View>
            </View>
            <View style={styles.radioBtn}>
              <Text style={styles.radioText}>Score</Text>
              <View style={{padding: 10}}>
                <TextInput
                  mode="flat"
                  value={checkedValues.gcs_score}
                  multiline
                  onChangeText={newValue =>
                    handleCheckboxToggle('gcs_score', newValue)
                  }
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
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('vision', newValue)}
            value={checkedValues.vision}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View>
                <View style={styles.radioBtn}>
                  <RadioButton value="impaired" />
                  <Text>Impaired</Text>
                </View>
                <View style={styles.radioBtn}>
                  <Checkbox
                    status={
                      checkedValues.vision_right ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'vision_right',
                        !checkedValues.vision_right,
                      )
                    }
                  />
                  <Text>Right</Text>
                </View>
                <View style={styles.radioBtn}>
                  <Checkbox
                    status={checkedValues.vision_left ? 'checked' : 'unchecked'}
                    onPress={() =>
                      handleCheckboxToggle(
                        'vision_left',
                        !checkedValues.vision_left,
                      )
                    }
                  />
                  <Text>Left</Text>
                </View>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Hearing',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('hearing', newValue)
            }
            value={checkedValues.hearing}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View>
                <View style={styles.radioBtn}>
                  <RadioButton value="impaired" />
                  <Text>Impaired</Text>
                </View>
                <View style={styles.radioBtn}>
                  <Checkbox
                    status={
                      checkedValues.hearing_right ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hearing_right',
                        !checkedValues.hearing_right,
                      )
                    }
                  />
                  <Text>Right</Text>
                </View>
                <View style={styles.radioBtn}>
                  <Checkbox
                    status={
                      checkedValues.hearing_left ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hearing_left',
                        !checkedValues.hearing_left,
                      )
                    }
                  />
                  <Text>Left</Text>
                </View>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'Speech',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('speech', newValue)}
            value={checkedValues.speech}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View>
                <View style={styles.radioBtn}>
                  <RadioButton value="impaired" />
                  <Text>Impaired</Text>
                </View>
                <View style={styles.radioBtn}>
                  <Checkbox
                    status={
                      checkedValues.speech_right ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'speech_right',
                        !checkedValues.speech_right,
                      )
                    }
                  />
                  <Text>Right</Text>
                </View>
                <View style={styles.radioBtn}>
                  <Checkbox
                    status={checkedValues.speech_left ? 'checked' : 'unchecked'}
                    onPress={() =>
                      handleCheckboxToggle(
                        'speech_left',
                        !checkedValues.speech_left,
                      )
                    }
                  />
                  <Text>Left</Text>
                </View>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 5,
      label: 'Sensations',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('sensation', newValue)
            }
            value={checkedValues.sensation}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 6,
      label: 'Reflexes',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('reflexes', newValue)
            }
            value={checkedValues.reflexes}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abnormal" />
                <Text>Abnormal</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 7,
      label: 'Memory',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('memory', newValue)}
            value={checkedValues.memory}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="loss" />
                <Text>Loss</Text>
              </View>
            </View>
          </RadioButton.Group>
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
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('dermal_assessment', newValue)
            }
            value={checkedValues.dermal_assessment}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="normal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="abrasion" />
                <Text>Abrasion</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="burn" />
                <Text>Burn</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="contusion" />
                <Text>Contusion</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="dermatitis" />
                <Text>Dermatitis</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="ecchymosis" />
                <Text>Ecchymosis</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="hematoma" />
                <Text>Hematoma</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="laceration" />
                <Text>Laceration</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="mass" />
                <Text>Mass</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="petechiae" />
                <Text>Petechiae</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="rash" />
                <Text>Rash</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="suture" />
                <Text>Suture</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="other" />
                <Text>Other</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 2,
      label: 'Color',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('color', newValue)}
            value={checkedValues.color}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="nornal" />
                <Text>Normal</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="pale" />
                <Text>Pale</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="jaundice" />
                <Text>Jaundice</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="cyanosis" />
                <Text>Cyanosis</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="pink" />
                <Text>Pink</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 3,
      label: 'Turgor',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue => handleCheckboxToggle('turgor', newValue)}
            value={checkedValues.turgor}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="good" />
                <Text>Good</Text>
              </View>
              <View style={styles.radioBtn}>
                <RadioButton value="poor" />
                <Text>Poor</Text>
              </View>
            </View>
          </RadioButton.Group>
        </>
      ),
    },
    {
      id: 4,
      label: 'Pressure Ulcer',
      radio1: (
        <>
          <RadioButton.Group
            onValueChange={newValue =>
              handleCheckboxToggle('pressure_ulcer', newValue)
            }
            value={checkedValues.pressure_ulcer}>
            <View style={styles.radioBtn}>
              <View style={styles.radioBtn}>
                <RadioButton value="no" />
                <Text style={styles.radioText}>No</Text>
              </View>
            </View>
          </RadioButton.Group>
          <View style={styles.radioBtn}>
            <View style={styles.radioBtn}>
              <Checkbox
                status={
                  checkedValues.pressure_ulcer_stage1 ? 'checked' : 'unchecked'
                }
                onPress={() =>
                  handleCheckboxToggle(
                    'pressure_ulcer_stage1',
                    !checkedValues.pressure_ulcer_stage1,
                  )
                }
              />
              <Text style={styles.checkBoxText}>
                Stage 1: intact skin with non-blanch able redness of location
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                status={
                  checkedValues.pressure_ulcer_stage2 ? 'checked' : 'unchecked'
                }
                onPress={() =>
                  handleCheckboxToggle(
                    'pressure_ulcer_stage2',
                    !checkedValues.pressure_ulcer_stage2,
                  )
                }
              />
              <Text style={styles.checkBoxText}>
                Stage 2: skin loss: abrasion, blister or shallow crater
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                status={
                  checkedValues.pressure_ulcer_stage3 ? 'checked' : 'unchecked'
                }
                onPress={() =>
                  handleCheckboxToggle(
                    'pressure_ulcer_stage3',
                    !checkedValues.pressure_ulcer_stage3,
                  )
                }
              />
              <Text style={styles.checkBoxText}>
                Stage 3: Shallow/deep crater: not extend down through underlying
                fascia
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                status={
                  checkedValues.pressure_ulcer_stage4 ? 'checked' : 'unchecked'
                }
                onPress={() =>
                  handleCheckboxToggle(
                    'pressure_ulcer_stage4',
                    !checkedValues.pressure_ulcer_stage4,
                  )
                }
              />
              <Text style={styles.checkBoxText}>
                Stage 4: Deep crater: exposed bone, tendon or muscle
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                status={
                  checkedValues.pressure_ulcer_unstable
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() =>
                  handleCheckboxToggle(
                    'pressure_ulcer_unstable',
                    !checkedValues.pressure_ulcer_unstable,
                  )
                }
              />
              <Text style={styles.checkBoxText}>
                Unstageble: Slough (yellow, gray, green or brown) or eschar
                wound bed
              </Text>
            </View>
            <View style={styles.radioBtn}>
              <Checkbox
                status={
                  checkedValues.pressure_ulcer_deep_tissue_injury
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() =>
                  handleCheckboxToggle(
                    'pressure_ulcer_deep_tissue_injury',
                    !checkedValues.pressure_ulcer_deep_tissue_injury,
                  )
                }
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

  //  submit handler ....
  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: hospital_id,
      patient_id: patient_id,
      reception_id: reception_id,
      appoint_id: appoint_id,
      uhid: uhid,
      api_type: 'OPD-SYSTEMIC-EXAMINATION',
      opdsystemicexaminationhistoryarray: [checkedValues],
    };
    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            setCheckedValues({});
            navigation.navigate('OpdDiagnosis');
          } else {
            console.error(`${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const [opdAssessment, setOpdAssessment] = useState([]);
  const keys3 = ['Eyes', 'Ears', 'Nose', 'Oral Cavity', 'Date / Time'];
  const [widthArr2, setWidthArr2] = useState([]);
  useEffect(() => {
    setWidthArr2([120, 120, 150, 120, 120, ...Array(keys3.length).fill(2)]);
  }, []);
  useEffect(() => {
    FetchMobileOpdAssessment();
    return () => {};
  }, [hospital_id, patient_id, reception_id]);
  //list of FetchMobileOpdAssessment....
  const FetchMobileOpdAssessment = async () => {
    try {
      await axios
        .post(`${api.baseurl}/FetchMobileOpdAssessment`, {
          hospital_id: hospital_id,
          reception_id: reception_id,
          patient_id: patient_id,
          appoint_id: appoint_id,
          api_type: 'OPD-SYSTEMIC-EXAMINATION',
          uhid: uhid,
          mobilenumber: mobilenumber,
        })
        .then(res => {
          setOpdAssessment(res.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* Appbar header */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('GeneralExamination');
          }}
        />
        <Appbar.Content
          title="Systemic Examination "
          style={styles.appbar_title}
        />
      </Appbar.Header>
      {/* section 1 */}
      <ScrollView vertical style={styles.container}>
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
            onPress={() => navigation.replace('GeneralExamination')}>
            Previous
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => submitTreatmenthandler()}>
            Save & Next
          </Button>

          <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('OpdDiagnosis')}>
            Skip
          </Button>
        </View>
        {opdAssessment?.length > 0 && (
          <View style={[styles.categorySelection]}>
            <ScrollView horizontal={true} style={{padding: 10}}>
              <View style={{height: 'auto', maxHeight: 400}}>
                <Table
                  borderStyle={{
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <Row
                    data={keys3}
                    widthArr={widthArr2}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                </Table>
                <ScrollView vertical={true} style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                    <Rows
                      // data={tableData}
                      data={opdAssessment.map(row => [
                        row.eye,
                        row.ears,
                        `${row.nose}`,
                        row.oralcavity,
                        `${row.opd_date} / ${row.opd_time}`,
                      ])}
                      widthArr={widthArr2}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
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
    marginTop: 10,
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
