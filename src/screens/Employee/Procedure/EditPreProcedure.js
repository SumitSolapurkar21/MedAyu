import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import api from '../../../../api.json';
import axios from 'axios';
// import DateTimePicker from 'react-native-ui-datepicker';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../../components/Context/Context';

const EditPreprocedure = ({route}) => {
  const navigation = useNavigation();
  const {patientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const {preprocedure_id} = route.params;
  const [panchakarmaprocedurearray, setPanchakarmaprocedurearray] = useState(
    [],
  );

  // patientPreprocedurePrescriptionDataRes handler ....
  useEffect(() => {
    const patientPreprocedurePrescriptionDataRes = async () => {
      try {
        await axios
          .post(`${api.baseurl}/GeneratePreprocedurenotes`, {
            hospital_id: hospital_id,
            patient_id: patient_id,
            reception_id: reception_id,
            preprocedure_id: preprocedure_id,
          })
          .then(res => {
            //   setTemp(res.data);
            const {panchakarmaprocedurearray} = res.data;
            setPanchakarmaprocedurearray(panchakarmaprocedurearray);
          });
      } catch (error) {
        console.error(error);
      }
    };
    patientPreprocedurePrescriptionDataRes();
  }, [hospital_id, patient_id, reception_id]);

  //   post procedure form
  const _form = () => {
    return (
      <>
        {panchakarmaprocedurearray?.map((res, index) => {
          return (
            <View style={styles.containerHead} key={res.prescription_id}>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Name </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedurename}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].procedurename = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Amount : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedureamount}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].procedureamount = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Time : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.proceduretime}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].proceduretime = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Kit : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.procedurekit
                    ?.map(drug => `${drug.drugname}`)
                    .join(', ')}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Pre Instruction : </Text>
                <TextInput
                  mode="flat"
                  //    multiline
                  style={[styles.input2]}
                  value={res.procedureinstruction}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].procedureinstruction = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Days : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.proceduredays}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].proceduredays = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.label}>From Date : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.proceduredate}
                  editable={false}
                  right={
                    <TextInput.Icon
                      icon="calendar"
                      //   onPress={() => calenderHandler(index)}
                    />
                  }
                />
              </View>
              <View style={[styles.cardContent, {display: 'none'}]}>
                <Text style={styles.label}>Post Instruction : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.postinstruction}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].postinstruction = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
              <View style={[styles.cardContent, {display: 'none'}]}>
                <Text style={styles.label}>Advice : </Text>
                <TextInput
                  mode="flat"
                  style={[styles.input2]}
                  value={res.advice}
                  onChangeText={text => {
                    const updatedTemp = [...panchakarmaprocedurearray];
                    updatedTemp[index].advice = text;
                    setPanchakarmaprocedurearray(updatedTemp);
                  }}
                  editable={true}
                />
              </View>
            </View>
          );
        })}
      </>
    );
  };

  // submit handler .....
  const _updatePostProcedureData = async () => {
    await axios
      .post(`${api.baseurl}/UpdatePostProcedureData`, {
        preprocedure_id: preprocedure_id,
        hospital_id: hospital_id,
        patient_id: patient_id,
        reception_id: reception_id,
        panchakarmaprocedurearray: panchakarmaprocedurearray,
      })
      .then(res => {
        const {status} = res.data;
        if (status === true) {
          navigation.navigate('Preprecedureprescription', {
            _preprocedurevalue: 'Schedule Procedure',
          });
        }
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView>{_form()}</ScrollView>
      <Button
        style={styles.btn}
        mode="contained"
        onPress={() => _updatePostProcedureData()}>
        Update
      </Button>
    </View>
  );
};

export default EditPreprocedure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerHead: {
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 6,
  },
  cardContent: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '30%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    flexWrap: 'wrap',
    width: 100,
  },
  input2: {
    height: 35,
    width: 210,
    maxWidth: 220,
  },
  datePickerContainer: {
    alignItems: 'center',
    flex: 1,
    top: 100,
    zIndex: 10,
  },
  datePicker: {
    width: 300,
    height: 330,
    backgroundColor: '#d1e8ff',
    padding: 10,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: '#e6e8eb',
    shadowOpacity: 0.2,
    shadowOffset: {width: 10, height: 10},
  },
});
