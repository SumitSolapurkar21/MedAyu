import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import successIcon from '../../images/success.gif';
import {useNavigation} from '@react-navigation/native';

const MsgPopup = ({msgPopup, setMsgPopup, backdropOpacity}) => {
  const navigation = useNavigation();
  return (
    <>
      {msgPopup && (
        <>
          <View style={styles.modal}>
            <View style={styles.modalBody}>
              <Image
                source={successIcon}
                alt="successIcon"
                style={styles.img}
              />
              <Text style={styles.modalText}>
                Patient Registered Successfully
              </Text>
              <TouchableOpacity style={styles.modalBtn}>
                <Text
                  style={styles.modalBtnText}
                  onPress={() => {
                    setMsgPopup(false);
                    navigation.navigate('Home');
                  }}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {msgPopup && (
        <View
          style={[
            styles.backdrop,
            {backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`, zIndex: 1},
          ]}
        />
      )}
    </>
  );
};

export default MsgPopup;

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
  modal: {
    //     flex: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 75,
    right: 75,
    top: 200,
  },
  modalBody: {
    backgroundColor: '#ffffff',
    width: 220,
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#127359',
  },
  modalBtn: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 6,
    marginVertical: 10,
    width: 60,
  },
  modalBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
