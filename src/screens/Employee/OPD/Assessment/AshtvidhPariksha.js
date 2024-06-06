import {ScrollView, StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {OpdAyurvedicNavigation} from './OpdpageNavigation';
import {Appbar, Checkbox, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';

const AshtvidhPariksha = () => {
  //
  const {patientsData, scannedPatientsData, waitingListData, userData} =
    useContext(UserContext);
  const {hospital_id, patient_id, reception_id, uhid} = patientsData;
  const {appoint_id, mobilenumber} = scannedPatientsData;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
  const navigation = useNavigation();

  //

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

  //

  const [checkedValues, setCheckedValues] = useState({
    nadi_vega: '',
    character: '',
    bala: '',
    gati: '',
    mutra_vega: '',
    varna: '',
    sparsha: '',
    matra: '',
    gandha: '',
    mala_vega: '',
    samhanan: '',
    mala_varna: '',
    jivha_varna: '',
    jivha_sparsh: '',
    jivha_mukhaswada: '',
    prakashsangya: '',
    netra_drishtimandala: '',
    netra_mukhaswada: '',
    shabda: '',
    drishtimandala: '',
    mukhaswada: '',
  });

  const handleCheckboxToggle = (key, value) => {
    setCheckedValues(prevState => {
      const newValue = prevState[key].includes(value)
        ? prevState[key].filter(item => item !== value) // Remove value if already selected
        : [...prevState[key], value]; // Add value if not selected
      return {
        ...prevState,
        [key]: newValue,
      };
    });
  };

  //
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
            return true;
          }}
        />
        <Appbar.Content title="Ashtvidh Pariksha" titleStyle={{fontSize: 20}} />
        <Appbar.Action
          icon="account-details"
          size={30}
          onPress={() => openMenu()}
        />
      </Appbar.Header>
      <OpdAyurvedicNavigation
        closeMenu={closeMenu}
        openMenu={openMenu}
        _handleMore={_handleMore}
        visible={visible}
      />
      <ScrollView vertical style={styles.container}>
        {/* nadi */}
        <View style={styles.containerDiv}>
          <View style={styles.title}>
            <Text style={styles.text}>Nadit</Text>
          </View>
          <View>
            <Text style={styles.label}>Vega</Text>
            <View style={styles.body}></View>
          </View>
          <Divider />
          {/*  */}
          <View style={styles.body}>
            <Text style={styles.label}>Character</Text>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="regular"
                status={
                  checkedValues.character === 'regular'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('character', 'regular')}
              />
              <Text>Regular</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="irregular"
                status={
                  checkedValues.character === 'irregular'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('character', 'irregular')}
              />
              <Text>Irregular</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Bala</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="pravaram"
                status={
                  checkedValues.bala.includes('pravaram')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'pravaram')}
              />
              <Text>Pravaram</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="madhyam"
                status={
                  checkedValues.bala.includes('madhyam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'madhyam')}
              />
              <Text>Madhyam</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>Heenam</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Gati</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="sarpa"
                status={
                  checkedValues.gati.includes('sarpa') ? 'checked' : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('gati', 'sarpa')}
              />
              <Text>Sarpa</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="manduka"
                status={
                  checkedValues.gati.includes('manduka')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('gati', 'manduka')}
              />
              <Text>Manduka</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="hamsa"
                status={
                  checkedValues.gati.includes('hamsa') ? 'checked' : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('gati', 'hamsa')}
              />
              <Text>Hamsa</Text>
            </View>
          </View>
        </View>

        {/* Mutra */}
        <View style={styles.containerDiv}>
          <View style={styles.title}>
            <Text style={styles.text}>Mutra</Text>
          </View>
          <Text style={styles.label}>Vega</Text>
          <View style={styles.body}></View>
          <Divider />
          {/*  */}
          <Text style={styles.label}>Varna</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="pandu"
                status={
                  checkedValues.varna.includes('pandu')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('varna', 'pandu')}
              />
              <Text>Pandu</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="rakta"
                status={
                  checkedValues.varna.includes('rakta')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('varna', 'rakta')}
              />
              <Text>Rakta</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="pita"
                status={
                  checkedValues.varna.includes('pita') ? 'checked' : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('varna', 'pita')}
              />
              <Text>Pita</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="aruna"
                status={
                  checkedValues.varna.includes('aruna')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('varna', 'aruna')}
              />
              <Text>Aruna</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Sparsha</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Gati</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
        </View>

        {/* Mala */}
        <View style={styles.containerDiv}>
          <View style={styles.title}>
            <Text style={styles.text}>Mala</Text>
          </View>
          <Text style={styles.label}>Vega</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
          {/*  */}
          <Text style={styles.label}>Character</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Bala</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Gati</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
        </View>

        {/* Jivha */}
        <View style={styles.containerDiv}>
          <View style={styles.title}>
            <Text style={styles.text}>Jivha</Text>
          </View>
          <Text style={styles.label}>Vega</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
          {/*  */}
          <Text style={styles.label}>Character</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Bala</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.label}>Gati</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
        </View>

        {/* Netra */}
        <View style={styles.containerDiv}>
          <View style={styles.title}>
            <Text style={styles.text}>Nadit</Text>
          </View>
          <Text style={styles.label}>Vega</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          {/*  */}
          <Text style={styles.label}>Character</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Text style={styles.label}>Bala</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Text style={styles.label}>Gati</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerDiv}>
          <View style={styles.title}>
            <Text style={styles.text}>Nadit</Text>
          </View>
          <Text style={styles.label}>Vega</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          {/*  */}
          <Text style={styles.label}>Character</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Text style={styles.label}>Bala</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
          <Text style={styles.label}>Gati</Text>
          <View style={styles.body}>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
            <View style={styles.checkboxDiv}>
              <Checkbox
                value="heenam"
                status={
                  checkedValues.bala.includes('heenam')
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleCheckboxToggle('bala', 'heenam')}
              />
              <Text>PHYSICAL THERAPY</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AshtvidhPariksha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerDiv: {borderColor: 'black', borderWidth: 1, marginBottom: 10},
  title: {
    backgroundColor: '#80aaff',
    padding: 8,
    borderBottomWidth: 1,
  },
  text: {textAlign: 'left', color: '#ffffff', fontSize: 18},
  checkboxDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    padding: 8,
    color: 'red',
    fontSize: 18,
  },
});
