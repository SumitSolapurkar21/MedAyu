import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import api from '../../../../api.json';
import {useNavigation} from '@react-navigation/native';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import UserContext from '../../../components/Context/Context';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {BackHandler} from 'react-native';

const BillHistory = ({route}) => {
  const {
    scannedPatientsData,
    userData,
    updateBillRes,

    setBillHistoryArray,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const {uhid, patient_id} = scannedPatientsData;
  const {_id, hospital_id} = userData;
  const [billPatientHistory, setBillPatientHistory] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const {pat_id} = route.params;

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
  //   refresh control .....
  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await patientBillHistory();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // patientBillHistory api....
  useEffect(() => {
    if (patient_id) patientBillHistory();
  }, [patient_id]);

  // patientBillHistory api........
  const patientBillHistory = async () => {
    setLoading(true);
    try {
      await axios
        .post(`${api.baseurl}/GetMobileBillHistory`, {
          uhid: uhid,
          patient_id: patient_id,
          reception_id: _id,
          hospital_id: hospital_id,
          historytype: 'Personal',
        })
        .then(res => {
          setBillPatientHistory(res.data);
          res.data.status === true ? setLoading(false) : null;
          return res.data;
        });
    } catch (error) {
      console.error('Error :', error);
    }
  };

  let historyArray = billPatientHistory?.HistoryArray;

  const handlePdfIconClick = async (patientId, hospitalId, billId) => {
    try {
      const patientBillDataRes = await axios.post(
        `${api.baseurl}/GenerateBillPdf`,
        {
          bill_id: billId,
          hospital_id: hospitalId,
          patient_id: patientId,
        },
      );

      const data = patientBillDataRes.data;
      const tableRows = data?.OutBillArrayss?.map((res, i) => {
        return `
          <tr key=${i}>
            <td>${i + 1}</td>
            <td>${res.billname}</td>
            <td>${res.outbillingtype}</td>
            <td>${res.amount}</td>
          </tr>
        `;
      }).join('');
      const html = `
  <html>
  <head>
  <meta name="viewport"
       content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  <style>
       .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 12px;
            border-bottom: 1px solid;
       }
  
       .head-content {
            line-height: 0.5;
       }
  
       .head-content p,
       h1 {
            text-align: right;
       }
       .head-content p{
        word-break: break-all;
       }
       .head-content2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
       }
  
       .head-content2-part1 {
            border-right: 1px solid;
            width: 50%;
       }
       .head-content2-part2 p{
            text-align: right;
       }
       table {
            width: 100%;
       }
  
       thead {
            background-color: green;
       }
  
       table tr th {
            padding: 6px;
            color: white;
            border: 1px solid black
       }
       table tr td {
        padding: 6px;
        border: 1px solid black;
        text-align:"center"
       }
       
       .head-content2-part3 p{
        word-break: break-all;
       }
       .main-part1,
          .main-part2 {
               width: 50%;
          }
          .main,
          .main3 {
               display: flex;
          }

          .main2,
          .main-part3,
          .main-part4,
          .main-part5 {
               border: 1px solid black
          }

          .main2 p {
            text-align: center;
               margin-top: 0;
               margin-bottom: 0;
               padding: 6px;
          }
          .main-part3 p {
               text-align: center;
               margin-top: 0;
               margin-bottom: 0;
               padding: 6px;
          }

          .main2 p:nth-child(odd) {
               background-color: green;
               color: white;
               font-weight: 600;
          }
          .main-part3 p:nth-child(odd) {
               background-color: green;
               color: white;
               font-weight: 600;
          }
          .main-part3-p p{
               text-align: left;
          }
          .main-part3, .main-part4 , .main-part5{
            width:100%;
          }
          .main4{
            display: flex;
            align-items: center;
       }
       .main4 div p{
        text-align: center;
               margin-top: 0;
               margin-bottom: 0;
       }
  </style>
  </head>
  
  <body style="border: 1px solid;">
  <div class="head">
       <div>
            <img src='${data.hosp_logo}' style="width: 15vw;" />
       </div>
       <div class="head-content">
            <h1>${data.hosp_name}</h1>
            <p>${data.hosp_address}</p>
            <p>Phone no . ${data.hosp_mobile} - Email : ${data.hosp_email}</p>
            <p>GSTIN : ${data.hosp_gst} - STATE : ${data.hosp_state}</p>
       </div>
  </div>
  <div class="head-content2">
       <div class="head-content2-part1">
            <div style="background-color: green;">
                 <h3 style="color: white;    margin: 0;
                 padding: 8px;">Bill To</h3>
            </div>
            <div class="head-content2-part3" style="padding: 0 10px;line-height: 1">
                 <h3>${data.patientname}</h3>
                 <p>Phone no . ${data.mobilenumber} - Email : sumitqwert21@gmail.com</p>
                 <p>STATE : ${data.patientstate}</p>
            </div>
       </div>
       <div class="head-content2-part2" style="padding: 0 10px;">
            <p>Place of Supply : ${data.patientstate}</p>
            <p>Invoice No : ${data.invoiceno}</p>
            <p>Date : ${data.invoicedate}</p>
       </div>
  </div>
  <table style="border-collapse: collapse;">
       <thead style="background-color: green ;">
            <th>#</th>
            <th>Particulars</th>
            <th>Type of services</th>
            <th>Amount</th>
       </thead>
       <tbody>
       ${tableRows}
      </tbody>
  </table>
  <div class="main">
          <div class="main-part1">
               <table style="border-collapse: collapse;">
                    <thead>
                         <th>Tax Type</th>
                         <th>Taxable Abount</th>
                         <th>Rate</th>
                         <th>Tax Amount</th>
                    </thead>
                    <tbody>
                         <tr>
                              <td>SGST</td>
                              <td>0</td>
                              <td>0</td>
                              <td>0</td>
                         </tr>
                         <tr>
                              <td>CGST</td>
                              <td>0</td>
                              <td>0</td>
                              <td>0</td>
                         </tr>
                    </tbody>
               </table>
          </div>
          <div class="main-part2">
               <table style="border-collapse: collapse;">

                    <thead>
                         <th colspan="2">Amount</th>
                    </thead>
                    <tbody>
                         
                         <tr>
                              <td>Total</td>
                              <td>${data.totalamount}</td>
                         </tr>
                         <tr>
                              <td>Received</td>
                              <td>${data.receiveamount}</td>
                         </tr>
                         
                         <tr>
                              <td>Previous Balance</td>
                              <td>${data.previous_balance}</td>
                         </tr>

                         <tr>
                              <td>Total Balance</td>
                              <td>${data.totalbalance}</td>
                         </tr>
                        
                    </tbody>
               </table>
          </div>
          </div>
          <div class="main2">
          <p>Invoice Amount In Words</p>
          <p>${data.words} </p>
          <p>Payment Mode</p>
          <p>Cash</p>
     </div>
     <div class="main3">
     <div class="main-part3">
          <p>Terms and Conditions</p>
          <p>Thanks for doing business with us !</p>
          <p>Bank Details</p>
          <div class="main-part3-p">
               <p style="background-color: transparent;color: black;font-weight: normal;">BankName : STATE BANK OF INDIA</p>
               <p>BANK ACC NO : 99898765456</p>
               <p style="background-color: transparent;color: black;font-weight: normal;">BANK IFSC CODE : SBIN0011154</p>
               <p>ACC HOLDER'S NAME : </p>
          </div>
     </div>
     <div class="main-part4">
     <div style="align-self:center;">
     <img src="${data.bill_qr}" alt="qr code" style="width: 15vw;" />
     <p>Scan and Pay</p>
     </div>
     </div>
     <div class="main-part5" style="line-height: 6;">
          <p>For , </p>
          <p>Authorized Signatory</p>
     </div>
</div>
<div class="main4">
          <div style="width: 100%;"><p>${data.patientname}</p></div>
          <div style="width: 100%;"><p>Acknowledgemant</p><p style="color:green">${data.hosp_name}</p><p style="margin-top: 16%;">Receiver's seal and sign</p></div>
          <div style="width: 100%;">
          <p>Invoice No : ${data.invoiceno}</p>
          <p>Invoice Date : ${data.invoicedate}</p>
               <p>Invoice Amount : ${data.OutBillArrayss[0].amount} </p>
          </div>
     </div>
  </body>
  </html>
                        `;
      await RNPrint.print({
        html,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sharePdfhandler = async (patientId, hospitalId, billId) => {
    try {
      const patientBillDataRes = await axios.post(
        `${api.baseurl}/GenerateBillPdf`,
        {
          bill_id: billId,
          hospital_id: hospitalId,
          patient_id: patientId,
        },
      );

      const data = patientBillDataRes.data;
      const tableRows = data?.OutBillArrayss?.map((res, i) => {
        return `
          <tr key=${i}>
            <td>${i + 1}</td>
            <td>${res.billname}</td>
            <td>${res.outbillingtype}</td>
            <td>${res.amount}</td>
          </tr>
        `;
      }).join('');

      const html = `
  <html>
  <head>
  <meta name="viewport"
       content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  <style>
       .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 12px;
            border-bottom: 1px solid;
       }
  
       .head-content {
            line-height: 0.5;
       }
  
       .head-content p,
       h1 {
            text-align: right;
       }
       .head-content p{
        word-break: break-all;
       }
       .head-content2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
       }
  
       .head-content2-part1 {
            border-right: 1px solid;
            width: 50%;
       }
       .head-content2-part2 p{
            text-align: right;
       }
       table {
            width: 100%;
       }
  
       thead {
            background-color: green;
       }
  
       table tr th {
            padding: 6px;
            color: white;
            border: 1px solid black
       }
       table tr td {
        padding: 6px;
        border: 1px solid black;
        text-align:"center"
       }
       
       .head-content2-part3 p{
        word-break: break-all;
       }
       .main-part1,
          .main-part2 {
               width: 50%;
          }
          .main,
          .main3 {
               display: flex;
          }

          .main2,
          .main-part3,
          .main-part4,
          .main-part5 {
               border: 1px solid black
          }

          .main2 p {
            text-align: center;
               margin-top: 0;
               margin-bottom: 0;
               padding: 6px;
          }
          .main-part3 p {
               text-align: center;
               margin-top: 0;
               margin-bottom: 0;
               padding: 6px;
          }

          .main2 p:nth-child(odd) {
               background-color: green;
               color: white;
               font-weight: 600;
          }
          .main-part3 p:nth-child(odd) {
               background-color: green;
               color: white;
               font-weight: 600;
          }
          .main-part3-p p{
               text-align: left;
          }
          .main-part3, .main-part4 , .main-part5{
            width:100%;
          }
          .main4{
            display: flex;
            align-items: center;
       }
       .main4 div p{
        text-align: center;
               margin-top: 0;
               margin-bottom: 0;
       }
  </style>
  </head>
  
  <body style="border: 1px solid;">
  <div class="head">
       <div>
            <img src='${data.hosp_logo}' style="width: 15vw;" />
       </div>
       <div class="head-content">
            <h1>${data.hosp_name}</h1>
            <p>${data.hosp_address}</p>
            <p>Phone no . ${data.hosp_mobile} - Email : ${data.hosp_email}</p>
            <p>GSTIN : ${data.hosp_gst} - STATE : ${data.hosp_state}</p>
       </div>
  </div>
  <div class="head-content2">
       <div class="head-content2-part1">
            <div style="background-color: green;">
                 <h3 style="color: white;    margin: 0;
                 padding: 8px;">Bill To</h3>
            </div>
            <div class="head-content2-part3" style="padding: 0 10px;line-height: 1">
                 <h3>${data.patientname}</h3>
                 <p>Phone no . ${data.mobilenumber} - Email : sumitqwert21@gmail.com</p>
                 <p>STATE : ${data.patientstate}</p>
            </div>
       </div>
       <div class="head-content2-part2" style="padding: 0 10px;">
            <p>Place of Supply : ${data.patientstate}</p>
            <p>Invoice No : ${data.invoiceno}</p>
            <p>Date : ${data.invoicedate}</p>
       </div>
  </div>
  <table style="border-collapse: collapse;">
       <thead style="background-color: green ;">
            <th>#</th>
            <th>Particulars</th>
            <th>Type of services</th>
            <th>Amount</th>
       </thead>
       <tbody>
       ${tableRows}
      </tbody>
  </table>
  <div class="main">
          <div class="main-part1">
               <table style="border-collapse: collapse;">
                    <thead>
                         <th>Tax Type</th>
                         <th>Taxable Abount</th>
                         <th>Rate</th>
                         <th>Tax Amount</th>
                    </thead>
                    <tbody>
                         <tr>
                              <td>SGST</td>
                              <td>0</td>
                              <td>0</td>
                              <td>0</td>
                         </tr>
                         <tr>
                              <td>CGST</td>
                              <td>0</td>
                              <td>0</td>
                              <td>0</td>
                         </tr>
                    </tbody>
               </table>
          </div>
          <div class="main-part2">
               <table style="border-collapse: collapse;">

                    <thead>
                         <th colspan="2">Amount</th>
                    </thead>
                    <tbody>
                         
                         <tr>
                              <td>Total</td>
                              <td>${data.totalamount}</td>
                         </tr>
                         <tr>
                              <td>Received</td>
                              <td>${data.receiveamount}</td>
                         </tr>
                         
                         <tr>
                              <td>Previous Balance</td>
                              <td>${data.previous_balance}</td>
                         </tr>

                         <tr>
                              <td>Total Balance</td>
                              <td>${data.totalbalance}</td>
                         </tr>
                        
                    </tbody>
               </table>
          </div>
          </div>
          <div class="main2">
          <p>Invoice Amount In Words</p>
          <p>${data.words} </p>
          <p>Payment Mode</p>
          <p>Cash</p>
     </div>
     <div class="main3">
     <div class="main-part3">
          <p>Terms and Conditions</p>
          <p>Thanks for doing business with us !</p>
          <p>Bank Details</p>
          <div class="main-part3-p">
               <p style="background-color: transparent;color: black;font-weight: normal;">BankName : STATE BANK OF INDIA</p>
               <p>BANK ACC NO : 99898765456</p>
               <p style="background-color: transparent;color: black;font-weight: normal;">BANK IFSC CODE : SBIN0011154</p>
               <p>ACC HOLDER'S NAME : </p>
          </div>
     </div>
     <div class="main-part4">
     <div style="align-self:center;">
     <img src="${data.bill_qr}" alt="qr code" style="width: 15vw;" />
     <p>Scan and Pay</p>
     </div>
     </div>
     <div class="main-part5" style="line-height: 6;">
          <p>For , </p>
          <p>Authorized Signatory</p>
     </div>
</div>
<div class="main4">
          <div style="width: 100%;"><p>${data.patientname}</p></div>
          <div style="width: 100%;"><p>Acknowledgemant</p><p style="color:green">${data.hosp_name}</p><p style="margin-top: 16%;">Receiver's seal and sign</p></div>
          <div style="width: 100%;">
          <p>Invoice No : ${data.invoiceno}</p>
          <p>Invoice Date : ${data.invoicedate}</p>
               <p>Invoice Amount : ${data.OutBillArrayss[0].amount} </p>
          </div>
     </div>
  </body>
  </html>
                        `;

      const {fs} = RNFetchBlob;
      const path = fs.dirs.DocumentDir + '/bill.pdf';
      const options = {
        html: html,
        fileName: 'bill',
        directory: '',
      };

      const pdf = await RNHTMLtoPDF.convert(options);

      // setPdfPath(pdf.filePath);
      const sharePdf = async () => {
        if (pdf.filePath) {
          const shareOptions = {
            title: 'Share file',
            failOnCancel: false,
            url: `file://${pdf.filePath}`,
          };

          try {
            await Share.open(shareOptions);
          } catch (error) {
            console.error('Error sharing PDF:', error.message);
          }
        }
      };
      sharePdf();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={70}
            style={styles.activityIndicator}
          />
        </View>
      )}
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          {/* Patient Detail... */}
          <View style={styles.card}>
            <View style={styles.main}>
              <View style={styles.pDetail}>
                <Text style={styles.pData}>
                  {billPatientHistory?.fullname}{' '}
                </Text>
                <Text style={[styles.pData, {fontWeight: 'normal'}]}>
                  <FontAwesome6 name="phone" color="#1669f0" size={11} />
                  &nbsp;
                  {billPatientHistory?.mobilenumber}{' '}
                </Text>
              </View>
              <View style={styles.pDetail}>
                <Text style={[styles.pLabel, {color: '#04c227'}]}>
                  <FontAwesome6
                    name="arrow-trend-down"
                    color="#04c227"
                    size={14}
                  />
                  &nbsp;Receivable &nbsp;&nbsp;
                  <FontAwesome6
                    name="indian-rupee-sign"
                    color="#04c227"
                    size={12}
                  />
                  &nbsp;{billPatientHistory?.totalreceived} &nbsp;&nbsp;
                </Text>
                <Text style={[styles.pLabel, {color: 'red'}]}>
                  <FontAwesome6 name="arrow-trend-down" color="red" size={14} />
                  &nbsp;Balance &nbsp;&nbsp;
                  <FontAwesome6
                    name="indian-rupee-sign"
                    color="red"
                    size={12}
                  />
                  &nbsp;{billPatientHistory?.totalbalance} &nbsp;&nbsp;
                </Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.cardGrpBtn}
                onPress={() =>
                  ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
                }>
                <FontAwesome6 name="bell" color="#1669f0" size={16} />
                <Text style={styles.cardGrpTxt}>Send Reminder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardGrpBtn}
                onPress={() =>
                  ToastAndroid.show(`Comming Soon`, ToastAndroid.SHORT)
                }>
                <FontAwesome6 name="list-alt" color="#1669f0" size={16} />
                <Text style={styles.cardGrpTxt}>Send Statement</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Search Patient Data.... */}
          <View style={styles.card}>
            <View
              style={[
                styles.ttAmtTxt,
                {
                  borderColor: 'orange',
                  borderWidth: 2,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                  //     width: 70,
                },
              ]}>
              <TextInput
                style={{padding: 6}}
                placeholder="Search"
                autoComplete="off"
              />
            </View>
          </View>
          {/* Patient Bills... */}
          <ScrollView
            vertical
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
            {historyArray?.length > 0 &&
              historyArray?.map((res, i) => {
                return (
                  <View
                    style={[styles.card, {marginVertical: 6}]}
                    key={res.bill_id}>
                    <View style={styles.cardBody}>
                      <View>
                        <Text style={[styles.pData, {fontSize: 16}]}>Sale</Text>
                      </View>
                      <View>
                        <Text style={styles.pData}>
                          Invoice No : &nbsp; <Text>{res.invoiceno}</Text>
                        </Text>
                        <Text style={styles.pData}>
                          Date : &nbsp; <Text>{res.mobilepaymentdate}</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cardFooter2}>
                      <View>
                        <Text style={[styles.pData1, {color: '#04c227'}]}>
                          Total
                        </Text>
                        <Text style={styles.pData}>
                          <FontAwesome6 name="indian-rupee-sign" size={12} />
                          &nbsp;{res.totalamount}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.pData1, {color: 'red'}]}>
                          Balance
                        </Text>
                        <Text style={styles.pData}>
                          <FontAwesome6 name="indian-rupee-sign" size={12} />
                          &nbsp;{res.totalbalance}
                        </Text>
                      </View>
                      <View style={styles.grpShare}>
                        <TouchableOpacity
                          onPress={() => {
                            handlePdfIconClick(
                              patient_id,
                              hospital_id,
                              res.bill_id,
                            );
                          }}>
                          <FontAwesome6
                            name="file-pdf"
                            color="#1669f0"
                            size={18}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            sharePdfhandler(
                              patient_id,
                              hospital_id,
                              res.bill_id,
                            )
                          }>
                          <FontAwesome6
                            name="share"
                            color="#1669f0"
                            size={18}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('BillEditItems'),
                              setBillHistoryArray(res.bill_id);
                          }}>
                          <FontAwesome6
                            name="pen-to-square"
                            color="#1669f0"
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </SafeAreaView>
        <View style={styles.homeDiv}>
          <TouchableOpacity
            style={styles.homeBnt}
            onPress={() => navigation.navigate('EpatientDetails')}>
            <FontAwesome name="home" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default BillHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3eeff',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  main: {
    borderBottomWidth: 1,
    borderBottomColor: '#edeef0',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pDetail: {
    padding: 8,
    //     flexDirection: 'row',
  },
  pLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#02fa23',
  },
  pData: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 12,
  },
  cardGrpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardGrpTxt: {
    color: '#1669f0',
  },
  grpShare: {
    flexDirection: 'row',
    gap: 14,
  },
  cardFooter2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  pData1: {
    fontWeight: '600',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  homeDiv: {
    backgroundColor: '#5c86fa',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 4,
    borderRadius: 8,
    width: 45,
    padding: 8,
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  homeBnt: {
    alignSelf: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Light black background
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
