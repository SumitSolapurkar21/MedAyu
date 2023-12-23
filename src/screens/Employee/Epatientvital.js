import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Epatientvital = () => {
  const navigation = useNavigation();
  const [p_temp, setP_Text] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView vertical>
        <View style={styles.tableWrapper}>
          <View style={styles.grpInput}>
            <Text style={styles.label}>TEMP</Text>
            <TextInput
              value={p_temp}
              style={styles.input}
              onChangeText={text => setP_Text(text)}
              right={<TextInput.Affix text="°F" />}
            />
          </View>
          <View style={styles.grpInput}>
            <Text style={styles.label}>PULSE</Text>
            <TextInput
              value={p_temp}
              style={styles.input}
              onChangeText={text => setP_Text(text)}
              right={<TextInput.Affix text="  /min" />}
            />
          </View>
          <View style={styles.grpInput}>
            <Text style={styles.label}>SPO2</Text>
            <TextInput
              value={p_temp}
              style={styles.input}
              onChangeText={text => setP_Text(text)}
              right={<TextInput.Affix text="  %" />}
            />
          </View>
          <View style={styles.grpInput}>
            <Text style={styles.label}>SYSTOLIC BP</Text>
            <TextInput
              value={p_temp}
              style={styles.input}
              onChangeText={text => setP_Text(text)}
              right={<TextInput.Affix text="  mmHg" />}
            />
          </View>
          <View style={styles.grpInput}>
            <Text style={styles.label}>DIASTOLIC BP</Text>
            <TextInput
              value={p_temp}
              style={styles.input}
              onChangeText={text => setP_Text(text)}
              right={<TextInput.Affix text="  mmHg" />}
            />
          </View>
          <View style={styles.grpInput}>
            <Text style={styles.label}>RESP. Rate</Text>
            <TextInput
              value={p_temp}
              style={styles.input}
              onChangeText={text => setP_Text(text)}
              right={<TextInput.Affix text="  /min" />}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={styles.btn}
        onPressIn={() => navigation.navigate('Eipdoptions')}>
        Update Vitals
      </Button>
    </SafeAreaView>
  );
};

export default Epatientvital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tableWrapper: {
    marginHorizontal: 16,
  },
  grpInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '600',
    marginHorizontal: 10,
  },
  input: {
    //     backgroundColor: 'transpareSafeAreaView
    width: 200,
  },
  btn: {
    width: 180,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
