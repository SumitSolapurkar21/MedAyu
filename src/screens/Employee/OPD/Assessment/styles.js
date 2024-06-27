import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     title: {
          textAlign: 'center',
     },
     formGroup: {
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginBottom: 6,
          padding: 12,
          gap: 10,
     },
     tableWrapper3TXT: {
          fontWeight: '600',
          color: 'black',
          fontSize: 18,
     },
     categorySelection: {
          marginHorizontal: 16,
     },
     grpData: {
          flexDirection: 'column',
          gap: 10,
          marginTop: 20,
          height: 420,
     },
     selectedView: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 10,
     },
     input: {
          width: 200,
     },
     innerView: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
     },

     btn: {
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'center',
     },
     label: {
          fontWeight: '600',
          fontSize: 18,
          flexWrap: 'wrap',
          width: 150,
     },
     head: { height: 40, backgroundColor: '#80aaff' },
     text: { textAlign: 'center', color: 'black', padding: 2 },
     row: { height: 'auto' },
     tableInput: {
          height: 40,
          marginHorizontal: 6,
          marginVertical: 6,
     },

     dropdown: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1.5,
          borderRadius: 4,
          paddingHorizontal: 6,
          marginHorizontal: 6,
     },
     placeholderStyle: {
          fontSize: 16,
     },
     selectedTextStyle: {
          fontSize: 16,
     },
     iconStyle: {
          width: 20,
          height: 20,
     },
     inputSearchStyle: {
          height: 40,
          fontSize: 16,
     },
     segmentBtn: {
          marginHorizontal: 14,
          marginTop: '5%',
     },
     card: {
          marginTop: 10,
          marginHorizontal: 14,
          marginBottom: 10,
          width: 330,
          padding: 10,
     },
     cardBody: {
          // flexDirection: 'column',
          // justifyContent: 'flex-start',
     },
     cardtext: {
          fontWeight: '600',
          color: 'black',
          textTransform: 'uppercase',
          width: 100,
     },
     cardtext2: {
          fontWeight: '600',
          flexWrap: 'wrap',
          // width: 100,
     },
     cardBodyHead: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
     },
     grpDiv: {
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     centeredView: {
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          marginTop: 22,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
     },
     modalView: {
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 0,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: {
               width: 0,
               height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
     },
     button: {
          borderRadius: 5,
          padding: 10,
          elevation: 2,
          marginVertical: 6,
     },
     buttonOpen: {
          backgroundColor: '#F194FF',
     },
     buttonClose: {
          backgroundColor: '#2196F3',
     },
     textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
     },
     modalText: {
          marginBottom: 15,
          textAlign: 'center',
     },
});
