import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { OpdAyurvedicNavigation } from './OpdpageNavigation';
import { Appbar, Checkbox, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import api from '../../../../../api.json';
import UserContext from '../../../../components/Context/Context';

const Prakruti = () => {
  //
  const { scannedPatientsData, waitingListData, userData } =
    useContext(UserContext);
  const { appoint_id } = scannedPatientsData;

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _handleMore = () => {
    setVisible(true);
  };
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

  const [checkedValues, setCheckedValues] = useState({
    body_weight_and_frame: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    skin: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    fingernails: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    hair: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    forehead: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    eyes: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    lips: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    thirst: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    excretions: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    voice_and_speech: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    working_style: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    mental_makeup: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    temperament: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    relationships: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    weather_preferences: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    money_matters: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    memory: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    sleep: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
    vatta_pitta_kapha: [],
    dreams: [
      {
        vatta: [],
        pitta: [],
        kapha: [],
      },
    ],
  });

  const [collapsedSections, setCollapsedSections] = useState({
    body_weight_and_frame: true,
    thirst: true,
    excretions: true,
    voice_and_speech: true,
    working_style: true,
    mental_makeup: true,
    temperament: true,
    skin: true,
    fingernails: true,
    hair: true,
    forehead: true,
    eyes: true,
    lips: true,
    relationships: true,
    weather_preferences: true,
    money_matters: true,
    memory: true,
    sleep: true,

    dreams: true,
  });

  //
  const toggleSection = section => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleCheckboxToggle = (key, dosha, value) => {
    setCheckedValues(prevState => {
      if (typeof prevState[key] === 'string') {
        // For text input updates
        return {
          ...prevState,
          [key]: value,
        };
      } else {
        const newState = { ...prevState };
        const itemIndex = 0; // Assuming you always modify the first item in the array

        if (newState[key] && newState[key][itemIndex]) {
          const currentDoshaValues = newState[key][itemIndex][dosha] || [];
          const newDoshaValues = currentDoshaValues.includes(value)
            ? currentDoshaValues.filter(item => item !== value) // Remove value if already selected
            : [...currentDoshaValues, value]; // Add value if not selected

          newState[key][itemIndex][dosha] = newDoshaValues;
        }

        return newState;
      }
    });
  };
  const icon_up = (
    <FontAwesome6
      name="caret-up"
      color="#ffffff"
      size={24}
      style={styles.searchIcon}
    />
  );
  const icon_down = (
    <FontAwesome6
      name="caret-down"
      color="#ffffff"
      size={24}
      style={styles.searchIcon}
    />
  );

  const resetHandler = () => {
    setCheckedValues({
      body_weight_and_frame: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      skin: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      fingernails: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      hair: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      forehead: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      eyes: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      lips: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      thirst: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      excretions: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      voice_and_speech: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      working_style: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      mental_makeup: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      temperament: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      relationships: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      weather_preferences: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      money_matters: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      memory: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      sleep: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      vatta_pitta_kapha: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
      dreams: [
        {
          vatta: [],
          pitta: [],
          kapha: [],
        },
      ],
    });
  };

  const submitTreatmenthandler = async () => {
    const _body = {
      hospital_id: userData?.hospital_id,
      patient_id: waitingListData?.newpatient_id,
      mobilenumber: waitingListData?.mobilenumber,
      reception_id: userData?._id,
      appoint_id: waitingListData?.appoint_id || appoint_id,
      uhid: waitingListData?.uhid,
      api_type: 'Prakruti',
      opdprakrutihistoryarray: [checkedValues],
    };

    try {
      await axios
        .post(`${api.baseurl}/AddMobileOpdAssessment`, _body)
        .then(res => {
          const { status, message } = res.data;
          if (status === true) {
            resetHandler();
            Alert.alert('Success', `${message}`);
          } else {
            Alert.alert('Error', `${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  //
  // Function to calculate counts dynamically
  const getDoshaCounts = () => {
    // Initialize counts
    let doshaCounts = [
      { dosha: 'vata', count: 0 },
      { dosha: 'pitta', count: 0 },
      { dosha: 'kapha', count: 0 },
    ];

    // Iterate over each key in checkedValues
    Object.keys(checkedValues).forEach(key => {
      checkedValues[key].forEach(item => {
        doshaCounts[0].count += item.vatta.length;
        doshaCounts[1].count += item.pitta.length;
        doshaCounts[2].count += item.kapha.length;
      });
    });

    // Sort doshaCounts array in ascending order based on count
    doshaCounts.sort((a, b) => b.count - a.count);
    // Return counts as an object
    return doshaCounts;
  };

  // Usage:
  const doshaCounts = getDoshaCounts();

  const DisplayDoshaCounts = () => {
    // Format doshaCounts into the desired string format
    const filteredCounts = doshaCounts.filter(dosha => dosha.count !== 0);
    const displayText = filteredCounts?.map(dosha => dosha.dosha).join(' - ');

    return (
      <View style={styles.containerDiv}>
        <View style={styles.body}>
          <View style={[styles.inputDiv, { marginVertical: 10, padding: 10 }]}>
            <Text style={styles.countText}>{displayText}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
            return true;
          }}
        />
        <Appbar.Content title="Prakruti" titleStyle={{ fontSize: 20 }} />
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
      {/* section */}
      <ScrollView vertical style={styles.container}>
        {/* body_weight_and_frame  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('body_weight_and_frame')}>
            <Text style={styles.text}>Body Weight and Frame</Text>
            <Text style={styles.text}>
              {!collapsedSections.body_weight_and_frame ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.body_weight_and_frame && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="lean"
                    status={
                      checkedValues.body_weight_and_frame[0]?.vatta.includes(
                        'lean',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'vatta',
                        'lean',
                      )
                    }
                  />
                  <Text style={styles.text3}>Lean</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="light weight"
                    status={
                      checkedValues.body_weight_and_frame[0]?.vatta.includes(
                        'light weight',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'vatta',
                        'light weight',
                      )
                    }
                  />
                  <Text style={styles.text3}>light weight</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value=" can not gain weight easily but can shed it rapidly"
                    status={
                      checkedValues.body_weight_and_frame[0]?.vatta.includes(
                        ' can not gain weight easily but can shed it rapidly',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'vatta',
                        ' can not gain weight easily but can shed it rapidly',
                      )
                    }
                  />
                  <Text style={styles.text3}>
                    can not gain weight easily but can shed it rapidly
                  </Text>
                </View>
                {/* <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="VATA PRAKRUTI"
                    status={
                      checkedValues.body_weight_and_frame[0]?.vatta.includes(
                        'VATA PRAKRUTI',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'vatta',
                        'VATA PRAKRUTI',
                      )
                    }
                  />
                  <Text style={styles.text3}>VATA PRAKRUTI</Text>
                </View> */}
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value=" well proportioned frame"
                    status={
                      checkedValues.body_weight_and_frame[0]?.pitta.includes(
                        'well proportioned frame',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'pitta',
                        'well proportioned frame',
                      )
                    }
                  />
                  <Text style={styles.text3}> well proportioned frame</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="average weight"
                    status={
                      checkedValues.body_weight_and_frame[0]?.pitta.includes(
                        'average weight',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'pitta',
                        'average weight',
                      )
                    }
                  />
                  <Text style={styles.text3}>average weight</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value=" can gain as well as shed weight easily"
                    status={
                      checkedValues.body_weight_and_frame[0]?.pitta.includes(
                        ' can gain as well as shed weight easily',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'pitta',
                        ' can gain as well as shed weight easily',
                      )
                    }
                  />
                  <Text style={styles.text3}> can gain as well as shed weight easily</Text>
                </View>
                {/* <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="PITTA PRAKRUTI"
                    status={
                      checkedValues.body_weight_and_frame[0]?.pitta.includes(
                        'PITTA PRAKRUTI',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'pitta',
                        'PITTA PRAKRUTI',
                      )
                    }
                  />
                  <Text style={styles.text3}>PITTA PRAKRUTI</Text>
                </View> */}
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="board and robust frame"
                    status={
                      checkedValues.body_weight_and_frame[0]?.kapha.includes(
                        'board and robust frame',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'kapha',
                        'board and robust frame',
                      )
                    }
                  />
                  <Text style={styles.text3}>board and robust frame</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="heavy bodied"
                    status={
                      checkedValues.body_weight_and_frame[0]?.kapha.includes(
                        'heavy bodied',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'kapha',
                        'heavy bodied',
                      )
                    }
                  />
                  <Text style={styles.text3}>heavy bodied</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="can gain weight easily but can not shed it as fast"
                    status={
                      checkedValues.body_weight_and_frame[0]?.kapha.includes(
                        'can gain weight easily but can not shed it as fast',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'kapha',
                        'can gain weight easily but can not shed it as fast',
                      )
                    }
                  />
                  <Text style={styles.text3}>
                    can gain weight easily but can not shed it as fast
                  </Text>
                </View>
                {/* <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="KAPHA PRAKRUTI"
                    status={
                      checkedValues.body_weight_and_frame[0]?.kapha.includes(
                        'KAPHA PRAKRUTI',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'body_weight_and_frame',
                        'kapha',
                        'KAPHA PRAKRUTI',
                      )
                    }
                  />
                  <Text style={styles.text3}>KAPHA PRAKRUTI</Text>
                </View> */}
              </View>
            </>
          )}
        </View>

        {/* skin */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('skin')}>
            <Text style={styles.text}>Skin</Text>
            <Text style={styles.text}>
              {!collapsedSections.skin ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.skin && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dry,rough to touch"
                    status={
                      checkedValues.skin[0].vatta.includes('dry,rough to touch')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'skin',
                        'vatta',
                        'dry,rough to touch',
                      )
                    }
                  />
                  <Text style={styles.text3}>dry,rough to touch</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dull,darkish skin"
                    status={
                      checkedValues.skin[0].vatta.includes('dull,darkish skin')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('skin', 'vatta', 'dull,darkish skin')
                    }
                  />
                  <Text style={styles.text3}>dull,darkish skin</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="soft,oily,warm to touch"
                    status={
                      checkedValues.skin[0].pitta.includes(
                        'soft,oily,warm to touch',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'skin',
                        'pitta',
                        'soft,oily,warm to touch',
                      )
                    }
                  />
                  <Text style={styles.text3}>soft,oily,warm to touch</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="glowing skin ,wether fair or dark"
                    status={
                      checkedValues.skin[0].pitta.includes(
                        'glowing skin ,wether fair or dark',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'skin',
                        'pitta',
                        'glowing skin ,wether fair or dark',
                      )
                    }
                  />
                  <Text style={styles.text3}>golwing skin ,wether fair or dark</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="thick,supple,cool to touch"
                    status={
                      checkedValues.skin[0].kapha.includes(
                        'thick,supple,cool to touch',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'skin',
                        'kapha',
                        'thick,supple,cool to touch',
                      )
                    }
                  />
                  <Text style={styles.text3}>thick,supple,cool to touch</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pale skin, whitish complexion"
                    status={
                      checkedValues.skin[0].kapha.includes(
                        'pale skin, whitish complexion',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'skin',
                        'kapha',
                        'pale skin, whitish complexion',
                      )
                    }
                  />
                  <Text style={styles.text3}>pale skin, whitish complexion</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* fingernails  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('fingernails')}>
            <Text style={styles.text}>Fingernails</Text>
            <Text style={styles.text}>
              {!collapsedSections.fingernails ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.fingernails && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="rough and brittle"
                    status={
                      checkedValues.fingernails[0].vatta.includes(
                        'rough and brittle',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'fingernails',
                        'vatta',
                        'rough and brittle',
                      )
                    }
                  />
                  <Text style={styles.text3}>rough and brittle</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="small"
                    status={
                      checkedValues.fingernails[0].vatta.includes('small')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'vatta', 'small')
                    }
                  />
                  <Text style={styles.text3}>small</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dull in colour"
                    status={
                      checkedValues.fingernails[0].vatta.includes(
                        'dull in colour',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'fingernails',
                        'vatta',
                        'dull in colour',
                      )
                    }
                  />
                  <Text style={styles.text3}>dull in colour</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="tough"
                    status={
                      checkedValues.fingernails[0].pitta.includes('tough')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'pitta', 'tough')
                    }
                  />
                  <Text style={styles.text3}>tough</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium"
                    status={
                      checkedValues.fingernails[0].pitta.includes('medium')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'pitta', 'medium')
                    }
                  />
                  <Text style={styles.text3}>medium</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pinkish in colour"
                    status={
                      checkedValues.fingernails[0].pitta.includes(
                        'pinkish in colour',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'fingernails',
                        'pitta',
                        'pinkish in colour',
                      )
                    }
                  />
                  <Text style={styles.text3}>pinkish in colour</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="smooth"
                    status={
                      checkedValues.fingernails[0].kapha.includes('smooth')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('fingernails', 'kapha', 'smooth')
                    }
                  />
                  <Text style={styles.text3}>smooth</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large and wide"
                    status={
                      checkedValues.fingernails[0].kapha.includes(
                        'large and wide',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'fingernails',
                        'kapha',
                        'large and wide',
                      )
                    }
                  />
                  <Text style={styles.text3}>large and wide</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Whitish in color"
                    status={
                      checkedValues.fingernails[0].kapha.includes(
                        'Whitish in color',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'fingernails',
                        'kapha',
                        'Whitish in color',
                      )
                    }
                  />
                  <Text style={styles.text3}>Whitish in color</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* hair   */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('hair')}>
            <Text style={styles.text}>Hair</Text>
            <Text style={styles.text}>
              {!collapsedSections.hair ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>
          {!collapsedSections.hair && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dry and coarse"
                    status={
                      checkedValues.hair[0].vatta.includes('dry and coarse')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'vatta', 'dry and coarse')
                    }
                  />
                  <Text style={styles.text3}>dry and coarse</Text>
                </View>

                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="curly or difficult to manage , prone to split ends"
                    status={
                      checkedValues.hair[0].vatta.includes(
                        'curly or difficult to manage , prone to split ends',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hair',
                        'vatta',
                        'curly or difficult to manage , prone to split ends',
                      )
                    }
                  />
                  <Text style={styles.text3}>
                    curly or difficult to manage , prone to split ends
                  </Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dark brown to black"
                    status={
                      checkedValues.hair[0].vatta.includes(
                        'dark brown to black',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hair',
                        'vatta',
                        'dark brown to black',
                      )
                    }
                  />
                  <Text style={styles.text3}>dark brown to black</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="smooth and fine"
                    status={
                      checkedValues.hair[0].pitta.includes('smooth and fine')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'pitta', 'smooth and fine')
                    }
                  />
                  <Text style={styles.text3}>smooth and fine</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="spare,lending towards early greying or balding"
                    status={
                      checkedValues.hair[0].pitta.includes(
                        'spare,lending towards early greying or balding',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hair',
                        'pitta',
                        'spare,lending towards early greying or balding',
                      )
                    }
                  />
                  <Text style={styles.text3}>spare,lending towards early greying or balding</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="light to auburn"
                    status={
                      checkedValues.hair[0].pitta.includes('light to auburn')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'pitta', 'light to auburn')
                    }
                  />
                  <Text style={styles.text3}>light to auburn</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dark brown to black"
                    status={
                      checkedValues.hair[0].pitta.includes(
                        'dark brown to black',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hair',
                        'pitta',
                        'dark brown to black',
                      )
                    }
                  />
                  <Text style={styles.text3}>dark brown to black</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="silky and lustrous"
                    status={
                      checkedValues.hair[0].kapha.includes('silky and lustrous')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'hair',
                        'kapha',
                        'silky and lustrous',
                      )
                    }
                  />
                  <Text style={styles.text3}>silky and lustrous</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="thick"
                    status={
                      checkedValues.hair[0].kapha.includes('thick')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'kapha', 'thick')
                    }
                  />
                  <Text style={styles.text3}>thick</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium to brown"
                    status={
                      checkedValues.hair[0].kapha.includes('medium to brown')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('hair', 'kapha', 'medium to brown')
                    }
                  />
                  <Text style={styles.text3}>medium to brown</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* forehead */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('forehead')}>
            <Text style={styles.text}>Forehead</Text>
            <Text style={styles.text}>
              {!collapsedSections.forehead ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.forehead && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="small"
                    status={
                      checkedValues.forehead[0].vatta.includes('small')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('forehead', 'vatta', 'small')
                    }
                  />
                  <Text style={styles.text3}>small</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium"
                    status={
                      checkedValues.forehead[0].pitta.includes('medium')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('forehead', 'pitta', 'medium')
                    }
                  />
                  <Text style={styles.text3}>medium</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large"
                    status={
                      checkedValues.forehead[0].kapha.includes('large')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('forehead', 'kapha', 'large')
                    }
                  />
                  <Text style={styles.text3}>large</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* eyes */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('eyes')}>
            <Text style={styles.text}>Eyes</Text>
            <Text style={styles.text}>
              {!collapsedSections.eyes ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.eyes && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="small and active"
                    status={
                      checkedValues.eyes[0].vatta.includes('small and active')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'vatta', 'small and active')
                    }
                  />
                  <Text style={styles.text3}>small and active</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="brown to dark brown pupils"
                    status={
                      checkedValues.eyes[0].vatta.includes(
                        'brown to dark brown pupils',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'vatta',
                        'brown to dark brown pupils',
                      )
                    }
                  />
                  <Text style={styles.text3}>brown to dark brown pupils</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dull sclerae"
                    status={
                      checkedValues.eyes[0].vatta.includes('dull sclerae')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'vatta', 'dull sclerae')
                    }
                  />
                  <Text style={styles.text3}>dull sclerae</Text>
                </View>

              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sharp and penetrating"
                    status={
                      checkedValues.eyes[0].pitta.includes(
                        'sharp and penetrating',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'pitta',
                        'sharp and penetrating',
                      )
                    }
                  />
                  <Text style={styles.text3}>sharp and penetrating</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="light pupils could be brown,green or gray"
                    status={
                      checkedValues.eyes[0].pitta.includes(
                        'light pupils could be brown,green or gray',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'pitta',
                        'light pupils could be brown,green or gray',
                      )
                    }
                  />
                  <Text style={styles.text3}>light pupils could be brown,green or gray</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="yellowish sclerae"
                    status={
                      checkedValues.eyes[0].pitta.includes('yellowish sclerae')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'pitta', 'yellowish sclerae')
                    }
                  />
                  <Text style={styles.text3}>yellowish sclerae</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium in size"
                    status={
                      checkedValues.eyes[0].pitta.includes('medium in size')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'pitta', 'medium in size')
                    }
                  />
                  <Text style={styles.text3}>medium in size</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="moist"
                    status={
                      checkedValues.eyes[0].kapha.includes('moist')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('eyes', 'kapha', 'moist')
                    }
                  />
                  <Text style={styles.text3}>moist</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large and attractive with thick lashes"
                    status={
                      checkedValues.eyes[0].kapha.includes(
                        'large and attractive with thick lashes',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'kapha',
                        'large and attractive with thick lashes',
                      )
                    }
                  />
                  <Text style={styles.text3}>large and attractive with thick lashes</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="bright blue or black pupils"
                    status={
                      checkedValues.eyes[0].kapha.includes(
                        'bright blue or black pupils',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'kapha',
                        'bright blue or black pupils',
                      )
                    }
                  />
                  <Text style={styles.text3}>bright blue or black pupils</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="clear white sclerae"
                    status={
                      checkedValues.eyes[0].kapha.includes(
                        'clear white sclerae',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'eyes',
                        'kapha',
                        'clear white sclerae',
                      )
                    }
                  />
                  <Text style={styles.text3}>dry</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* lips */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('lips')}>
            <Text style={styles.text}>Lips</Text>
            <Text style={styles.text}>
              {!collapsedSections.lips ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.lips && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="thin"
                    status={
                      checkedValues.lips[0].vatta.includes('thin')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'vatta', 'thin')
                    }
                  />
                  <Text style={styles.text3}>thin</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="darkish in colour"
                    status={
                      checkedValues.lips[0].vatta.includes('darkish in colour')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'vatta', 'darkish in colour')
                    }
                  />
                  <Text style={styles.text3}>darkish in colour</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="medium"
                    status={
                      checkedValues.lips[0].pitta.includes('medium')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'pitta', 'medium')
                    }
                  />
                  <Text style={styles.text3}>medium</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pinkish in colour"
                    status={
                      checkedValues.lips[0].pitta.includes('pinkish in colour')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'pitta', 'pinkish in colour')
                    }
                  />
                  <Text style={styles.text3}>pinkish in colour</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="large"
                    status={
                      checkedValues.lips[0].kapha.includes('large')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'kapha', 'large')
                    }
                  />
                  <Text style={styles.text3}>large</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="pale in colur"
                    status={
                      checkedValues.lips[0].kapha.includes('pale in colur')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('lips', 'kapha', 'pale in colur')
                    }
                  />
                  <Text style={styles.text3}>pale in colur</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* temperament  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('temperament')}>
            <Text style={styles.text}>Temperament</Text>
            <Text style={styles.text}>
              {!collapsedSections.temperament ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.temperament && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Insecure and impatient"
                    status={
                      checkedValues.temperament[0].vatta.includes(
                        'Insecure and impatient',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'vatta',
                        'Insecure and impatient',
                      )
                    }
                  />
                  <Text style={styles.text3}>Insecure and impatient</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="hardly ever content,always searching"
                    status={
                      checkedValues.temperament[0].vatta.includes(
                        'hardly ever content,always searching',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'vatta',
                        'hardly ever content,always searching',
                      )
                    }
                  />
                  <Text style={styles.text3}>hardly ever content,always searching</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="quick in emotional reactions and outbursts"
                    status={
                      checkedValues.temperament[0].vatta.includes(
                        'quick in emotional reactions and outbursts',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'vatta',
                        'quick in emotional reactions and outbursts',
                      )
                    }
                  />
                  <Text style={styles.text3}>quick in emotional reactions and outbursts</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="aggressive and impatient"
                    status={
                      checkedValues.temperament[0].pitta.includes(
                        'aggressive and impatient',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'pitta',
                        'aggressive and impatient',
                      )
                    }
                  />
                  <Text style={styles.text3}>aggressive and impatient</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dominating and cynical"
                    status={
                      checkedValues.temperament[0].pitta.includes(
                        'dominating and cynical',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'pitta',
                        'dominating and cynical',
                      )
                    }
                  />
                  <Text style={styles.text3}>dominating and cynical</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="intense emotions of like or dislike,love or hate"
                    status={
                      checkedValues.temperament[0].pitta.includes(
                        'intense emotions of like or dislike,love or hate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'pitta',
                        'intense emotions of like or dislike,love or hate',
                      )
                    }
                  />
                  <Text style={styles.text3}>intense emotions of like or dislike,love or hate</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="comfortable and patient"
                    status={
                      checkedValues.temperament[0].kapha.includes(
                        'comfortable and patient',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'kapha',
                        'comfortable and patient',
                      )
                    }
                  />
                  <Text style={styles.text3}>comfortable and patient</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="laid back"
                    status={
                      checkedValues.temperament[0].kapha.includes('laid back')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('temperament', 'kapha', 'laid back')
                    }
                  />
                  <Text style={styles.text3}>laid back</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="show to change"
                    status={
                      checkedValues.temperament[0].kapha.includes(
                        'show to change',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'kapha',
                        'show to change',
                      )
                    }
                  />
                  <Text style={styles.text3}>show to change</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="do not get angry,have calm endurence"
                    status={
                      checkedValues.temperament[0].kapha.includes(
                        'do not get angry,have calm endurence',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'temperament',
                        'kapha',
                        'do not get angry,have calm endurence',
                      )
                    }
                  />
                  <Text style={styles.text3}>do not get angry,have calm endurence</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* mental_makeup */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('mental_makeup')}>
            <Text style={styles.text}>Mental Makeup</Text>
            <Text style={styles.text}>
              {!collapsedSections.mental_makeup ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.mental_makeup && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="restless and easily distracted"
                    status={
                      checkedValues.mental_makeup[0].vatta.includes(
                        'restless and easily distracted',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'vatta',
                        'restless and easily distracted',
                      )
                    }
                  />
                  <Text style={styles.text3}>restless and easily distracted</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="curious mind"
                    status={
                      checkedValues.mental_makeup[0].vatta.includes(
                        'curious mind',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'vatta',
                        'curious mind',
                      )
                    }
                  />
                  <Text style={styles.text3}>curious mind</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="passionate and generative"
                    status={
                      checkedValues.mental_makeup[0].pitta.includes(
                        'passionate and generative',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'pitta',
                        'passionate and generative',
                      )
                    }
                  />
                  <Text style={styles.text3}>passionate and generative</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="assertive mind"
                    status={
                      checkedValues.mental_makeup[0].pitta.includes(
                        'assertive mind',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'pitta',
                        'assertive mind',
                      )
                    }
                  />
                  <Text style={styles.text3}>assertive mind</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="calm and stable"
                    status={
                      checkedValues.mental_makeup[0].kapha.includes(
                        'calm and stable',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'kapha',
                        'calm and stable',
                      )
                    }
                  />
                  <Text style={styles.text3}>calm and stable</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="logical mind"
                    status={
                      checkedValues.mental_makeup[0].kapha.includes(
                        'logical mind',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'mental_makeup',
                        'kapha',
                        'logical mind',
                      )
                    }
                  />
                  <Text style={styles.text3}>logical mind</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* working_style */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('working_style')}>
            <Text style={styles.text}>Working Style</Text>
            <Text style={styles.text}>
              {!collapsedSections.working_style ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.working_style && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="fast work"
                    status={
                      checkedValues.working_style[0].vatta.includes('fast work')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'vatta',
                        'fast work',
                      )
                    }
                  />
                  <Text style={styles.text3}>fast work</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="starts impulsively, but do not necessarily complete"
                    status={
                      checkedValues.working_style[0].vatta.includes(
                        'starts impulsively, but do not necessarily complete',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'vatta',
                        'starts impulsively, but do not necessarily complete',
                      )
                    }
                  />
                  <Text style={styles.text3}>
                    starts impulsively, but do not necessarily complet e
                  </Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="Determined worker"
                    status={
                      checkedValues.working_style[0].pitta.includes(
                        'Determined worker',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'pitta',
                        'Determined worker',
                      )
                    }
                  />
                  <Text style={styles.text3}> Determined Worker</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="highly task and goal oriented"
                    status={
                      checkedValues.working_style[0].pitta.includes(
                        'highly task and goal oriented',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'pitta',
                        'highly task and goal oriented',
                      )
                    }
                  />
                  <Text style={styles.text3}>highly task and goal oriented</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="methodical worker"
                    status={
                      checkedValues.working_style[0].kapha.includes(
                        'methodical worker',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'kapha',
                        'methodical worker',
                      )
                    }
                  />
                  <Text style={styles.text3}>methodical worker</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="slow to start,but always see a task to completion"
                    status={
                      checkedValues.working_style[0].kapha.includes(
                        'slow to start,but always see a task to completion',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'working_style',
                        'kapha',
                        'slow to start,but always see a task to completion',
                      )
                    }
                  />
                  <Text style={styles.text3}>slow to start,but always see a task to completion</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* voice_and_speech */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('voice_and_speech')}>
            <Text style={styles.text}>Voice and Speech</Text>
            <Text style={styles.text}>
              {!collapsedSections.voice_and_speech ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.voice_and_speech && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="weak, hoarse or shrill voice"
                    status={
                      checkedValues.voice_and_speech[0].vatta.includes(
                        'weak, hoarse or shrill voice',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'voice_and_speech',
                        'vatta',
                        'weak, hoarse or shrill voice',
                      )
                    }
                  />
                  <Text style={styles.text3}>weak, hoarse or shrill voice</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="talk rapidly rather than clearly"
                    status={
                      checkedValues.voice_and_speech[0].vatta.includes(
                        'talk rapidly rather than clearly',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'voice_and_speech',
                        'vatta',
                        'talk rapidly rather than clearly',
                      )
                    }
                  />
                  <Text style={styles.text3}>talk rapidly rather than clearly</Text>
                </View>
                <Divider />
                <View style={styles.body}>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="commanding and sharp voice"
                      status={
                        checkedValues.voice_and_speech[0].pitta.includes(
                          'commanding and sharp voice',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'pitta',
                          'commanding and sharp voice',
                        )
                      }
                    />
                    <Text style={styles.text3}>commanding and sharp voice</Text>
                  </View>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="persuasive and motivating"
                      status={
                        checkedValues.voice_and_speech[0].pitta.includes(
                          'persuasive and motivating',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'pitta',
                          'persuasive and motivating',
                        )
                      }
                    />
                    <Text style={styles.text3}>persuasive and motivating</Text>
                  </View>
                </View>
                <Divider />
                <View style={styles.body}>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="gentle and pleasing voice"
                      status={
                        checkedValues.voice_and_speech[0].kapha.includes(
                          'gentle and pleasing voice',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'kapha',
                          'gentle and pleasing voice',
                        )
                      }
                    />
                    <Text style={styles.text3}>gentle and pleasing voice</Text>
                  </View>
                  <View style={styles.checkboxDiv}>
                    <Checkbox
                      value="talk less keep secrets within"
                      status={
                        checkedValues.voice_and_speech[0].kapha.includes(
                          'talk less keep secrets within',
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() =>
                        handleCheckboxToggle(
                          'voice_and_speech',
                          'kapha',
                          'talk less keep secrets within',
                        )
                      }
                    />
                    <Text style={styles.text3}>talk less keep secrets within</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        {/* excretions */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('excretions')}>
            <Text style={styles.text}>Excretions</Text>
            <Text style={styles.text}>
              {!collapsedSections.excretions ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.excretions && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="frequently constipated hard and gaseous stools"
                    status={
                      checkedValues.excretions[0].vatta.includes(
                        'frequently constipated hard and gaseous stools',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'vatta',
                        'frequently constipated hard and gaseous stools',
                      )
                    }
                  />
                  <Text style={styles.text3}>frequently constipated hard and gaseous stools</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="less sweating and urination"
                    status={
                      checkedValues.excretions[0].vatta.includes(
                        'less sweating and urination',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'vatta',
                        'less sweating and urination',
                      )
                    }
                  />
                  <Text style={styles.text3}>less sweating and urination</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="regular ,soft and loose often burning stools"
                    status={
                      checkedValues.excretions[0].pitta.includes(
                        'regular ,soft and loose often burning stools',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'pitta',
                        'regular ,soft and loose often burning stools',
                      )
                    }
                  />
                  <Text style={styles.text3}>regular ,soft and loose often buring stools</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="profuse sweating and urination,strong body odour"
                    status={
                      checkedValues.excretions[0].pitta.includes(
                        'profuse sweating and urination,strong body odour',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'pitta',
                        'profuse sweating and urination,strong body odour',
                      )
                    }
                  />
                  <Text style={styles.text3}>profuse sweating and urination,strong body odour</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="regular ,thick and oily stools"
                    status={
                      checkedValues.excretions[0].kapha.includes(
                        'regular ,thick and oily stools',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'kapha',
                        'regular ,thick and oily stools',
                      )
                    }
                  />
                  <Text style={styles.text3}>regular ,thick and oily stools</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="moderate sweating and urination"
                    status={
                      checkedValues.excretions[0].kapha.includes(
                        'moderate sweating and urination',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'excretions',
                        'kapha',
                        'moderate sweating and urination',
                      )
                    }
                  />
                  <Text style={styles.text3}>moderate sweating and urination</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* thirst */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('thirst')}>
            <Text style={styles.text}>Thirst</Text>
            <Text style={styles.text}>
              {!collapsedSections.thirst ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.thirst && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="variables"
                    status={
                      checkedValues.thirst[0].vatta.includes('variables')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('thirst', 'vatta', 'variables')
                    }
                  />
                  <Text style={styles.text3}>variables</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="excessive"
                    status={
                      checkedValues.thirst[0].pitta.includes('excessive')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('thirst', 'pitta', 'excessive')
                    }
                  />
                  <Text style={styles.text3}>excessive</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="scanty"
                    status={
                      checkedValues.thirst[0].kapha.includes('scanty')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('thirst', 'kapha', 'scanty')
                    }
                  />
                  <Text style={styles.text3}>scanty</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* relationships  */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('relationships')}>
            <Text style={styles.text}>Relationships</Text>
            <Text style={styles.text}>
              {!collapsedSections.relationships ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.relationships && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="forgive and forget easily"
                    status={
                      checkedValues.relationships[0].vatta.includes(
                        'forgive and forget easily',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'vatta',
                        'forgive and forget easily',
                      )
                    }
                  />
                  <Text style={styles.text3}>forgive and forget easily</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="frequently in and out of love"
                    status={
                      checkedValues.relationships[0].vatta.includes(
                        'frequently in and out of love',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'vatta',
                        'frequently in and out of love',
                      )
                    }
                  />
                  <Text style={styles.text3}>frequently in and out of love</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="hold grudges for long"
                    status={
                      checkedValues.relationships[0].pitta.includes(
                        'hold grudges for long',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'pitta',
                        'hold grudges for long',
                      )
                    }
                  />
                  <Text style={styles.text3}>hold grudges for long</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="enter into intense relationship"
                    status={
                      checkedValues.relationships[0].pitta.includes(
                        'enter into intense relationship',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'pitta',
                        'enter into intense relationship',
                      )
                    }
                  />
                  <Text style={styles.text3}>enter into intense relationship</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="forgive,but never forget"
                    status={
                      checkedValues.relationships[0].kapha.includes(
                        'forgive,but never forget',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'kapha',
                        'forgive,but never forget',
                      )
                    }
                  />
                  <Text style={styles.text3}>forgive,but never forget</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="deeply attached in love and grounded in family tip"
                    status={
                      checkedValues.relationships[0].kapha.includes(
                        'deeply attached in love and grounded in family tip',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'relationships',
                        'kapha',
                        'deeply attached in love and grounded in family tip',
                      )
                    }
                  />
                  <Text style={styles.text3}>
                    deeply attached in love and grounded in family tip
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* weather_preferences */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('weather_preferences')}>
            <Text style={styles.text}>Weather Preferences</Text>
            <Text style={styles.text}>
              {!collapsedSections.weather_preferences ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.weather_preferences && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="sunny, warm and rainy climate"
                    status={
                      checkedValues.weather_preferences[0].vatta.includes(
                        'sunny, warm and rainy climate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'weather_preferences',
                        'vatta',
                        'sunny, warm and rainy climate',
                      )
                    }
                  />
                  <Text style={styles.text3}>sunny, warm and rainy climate</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="cool, pleasant climate"
                    status={
                      checkedValues.weather_preferences[0].pitta.includes(
                        'cool, pleasant climate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'weather_preferences',
                        'pitta',
                        'cool, pleasant climate',
                      )
                    }
                  />
                  <Text style={styles.text3}>cool, pleasant climate</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="comfortable anywhere except in humid climate"
                    status={
                      checkedValues.weather_preferences[0].kapha.includes(
                        'comfortable anywhere except in humid climate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'weather_preferences',
                        'kapha',
                        'comfortable anywhere except in humid climate',
                      )
                    }
                  />
                  <Text style={styles.text3}>comfortable anywhere except in humid climate</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* money_matters */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('money_matters')}>
            <Text style={styles.text}>Money Matters</Text>
            <Text style={styles.text}>
              {!collapsedSections.money_matters ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.money_matters && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="spend easily,don't care to earn or save much"
                    status={
                      checkedValues.money_matters[0].vatta.includes(
                        `spend easily,don't care to earn or save much`,
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'money_matters',
                        'vatta',
                        `spend easily,don't care to earn or save much`,
                      )
                    }
                  />
                  <Text style={styles.text3}>spend easily,don't care to earn or save much</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="plan well before spending"
                    status={
                      checkedValues.money_matters[0].pitta.includes(
                        'plan well before spending',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'money_matters',
                        'pitta',
                        'plan well before spending',
                      )
                    }
                  />
                  <Text style={styles.text3}>plan well before spending</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="do not spend easily ,like to accumulate"
                    status={
                      checkedValues.money_matters[0].kapha.includes(
                        'do not spend easily ,like to accumulate',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'money_matters',
                        'kapha',
                        'do not spend easily ,like to accumulate',
                      )
                    }
                  />
                  <Text style={styles.text3}>do not spend easily ,like to accumulate</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* memory */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('memory')}>
            <Text style={styles.text}>Memory</Text>
            <Text style={styles.text}>
              {!collapsedSections.memory ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.memory && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="quick grasp hut poor retention"
                    status={
                      checkedValues.memory[0].vatta.includes(
                        'quick grasp hut poor retention',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'memory',
                        'vatta',
                        'quick grasp hut poor retention',
                      )
                    }
                  />
                  <Text style={styles.text3}>quick grasp but poor retention</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="quick grasp and strong retention"
                    status={
                      checkedValues.memory[0].pitta.includes(
                        'quick grasp and strong retention',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'memory',
                        'pitta',
                        'quick grasp and strong retention',
                      )
                    }
                  />
                  <Text style={styles.text3}>quick grasp and strong retention</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="slow grap but strong retention"
                    status={
                      checkedValues.memory[0].kapha.includes(
                        'slow grap but strong retention',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'memory',
                        'kapha',
                        'slow grap but strong retention',
                      )
                    }
                  />
                  <Text style={styles.text3}>slow grap but strong retention</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* dreams */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('dreams')}>
            <Text style={styles.text}>Dreams</Text>
            <Text style={styles.text}>
              {!collapsedSections.dreams ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.dreams && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="anxious and many"
                    status={
                      checkedValues.dreams[0].vatta.includes('anxious and many')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'vatta',
                        'anxious and many',
                      )
                    }
                  />
                  <Text style={styles.text3}>anxious and many</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dreams relate to flying jumping climbing,runing an"
                    status={
                      checkedValues.dreams[0].vatta.includes(
                        'dreams relate to flying jumping climbing,runing an',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'vatta',
                        'dreams relate to flying jumping climbing,runing an',
                      )
                    }
                  />
                  <Text style={styles.text3}>
                    dreams relate to flying jumping climbing,runing an
                  </Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="moderate in number"
                    status={
                      checkedValues.dreams[0].pitta.includes(
                        'moderate in number',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'pitta',
                        'moderate in number',
                      )
                    }
                  />
                  <Text style={styles.text3}>moderate in number</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dreams relate to anger, conflict"
                    status={
                      checkedValues.dreams[0].pitta.includes(
                        'dreams relate to anger, conflict',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'pitta',
                        'dreams relate to anger, conflict',
                      )
                    }
                  />
                  <Text style={styles.text3}>dreams relate to anger, conflict</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="fewer in number"
                    status={
                      checkedValues.dreams[0].kapha.includes('fewer in number')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('dreams', 'kapha', 'fewer in number')
                    }
                  />
                  <Text style={styles.text3}>fewer in number</Text>
                </View>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="dreams relate to romance,water pathos or empathy"
                    status={
                      checkedValues.dreams[0].kapha.includes(
                        'dreams relate to romance,water pathos or empathy',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'dreams',
                        'kapha',
                        'dreams relate to romance,water pathos or empathy',
                      )
                    }
                  />
                  <Text style={styles.text3}>dreams relate to romance,water pathos or empathy</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* sleep */}
        <View style={styles.containerDiv}>
          <TouchableOpacity
            style={styles.title}
            onPress={() => toggleSection('sleep')}>
            <Text style={styles.text}>Sleep</Text>
            <Text style={styles.text}>
              {!collapsedSections.sleep ? icon_up : icon_down}
            </Text>
          </TouchableOpacity>

          {!collapsedSections.sleep && (
            <>
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="less and disturbed"
                    status={
                      checkedValues.sleep[0].vatta.includes(
                        'less and disturbed',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'sleep',
                        'vatta',
                        'less and disturbed',
                      )
                    }
                  />
                  <Text style={styles.text3}>less and disturbed</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="less but sound"
                    status={
                      checkedValues.sleep[0].pitta.includes('less but sound')
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle('sleep', 'pitta', 'less but sound')
                    }
                  />
                  <Text style={styles.text3}>less but sound</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.body}>
                <View style={styles.checkboxDiv}>
                  <Checkbox
                    value="deep and prolonged"
                    status={
                      checkedValues.sleep[0].kapha.includes(
                        'deep and prolonged',
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() =>
                      handleCheckboxToggle(
                        'sleep',
                        'kapha',
                        'deep and prolonged',
                      )
                    }
                  />
                  <Text style={styles.text3}>deep and prolonged</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* show result ..... */}
      {DisplayDoshaCounts()}
      {/* show result end ..... */}

      <Divider />
      <View style={styles.divbutton}>
        <Button
          title="Submit"
          color="#841584"
          style={styles.button}
          onPress={() => submitTreatmenthandler()}
        />
        <Button
          title="Next / Skip"
          color="#841584"
          style={styles.button}
          onPress={() => navigation.navigate('AshtvidhPariksha')}
        />
      </View>
    </>
  );
};

export default Prakruti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  containerDiv: {
    borderColor: '#c4c4c4',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    backgroundColor: '#80aaff',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  text: { textAlign: 'left', color: '#ffffff', fontSize: 18 },
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
  divbutton: {
    marginVertical: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
    minWidth: 100,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  inputDiv: {
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text2: {
    fontSize: 18,
    color: 'black',
  },
  body2: {
    padding: 10,
  },
  countText: {
    textTransform: 'uppercase',
  },
  text3: {
    flexWrap: "wrap",
    width: '80%'
  }
});
