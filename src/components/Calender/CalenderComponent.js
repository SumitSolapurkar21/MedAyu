import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Avatar, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Agenda} from 'react-native-calendars';

const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
const CalenderComponent = () => {
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

  //
  const [items, setItems] = useState({});

  //
  const loadItems = day => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = item => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.replace('EpatientDetails');
          }}
        />
        <Appbar.Content title="Appointment Calender" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>CalenderComponent</Text>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={'2017-05-16'}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default CalenderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
