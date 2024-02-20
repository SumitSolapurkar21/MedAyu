import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import api from '../../../api.json';
import UserContext from '../../components/Context/Context';
import {Text} from 'react-native-paper';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const EpatientTreatmentPrescription = () => {
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const [prescriptionArray, setPrescriptionArray] = useState(null);
  useEffect(() => {
    _treatmentprescriptionhandler();
  }, [hospital_id, patient_id, reception_id]);

  const _treatmentprescriptionhandler = async () => {
    try {
      await axios
        .post(`${api.baseurl}/GetMobileTreatmentPrescription`, {
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
        })
        .then(res => {
          const {status, message} = res.data;
          if (status === true) {
            const _data = res.data.data.map(
              ({
                dateadd,
                timeadd,
                prescriptionno,
                _id,
                hosp_logo,
                medayulabel,
              }) => ({
                dateadd,
                timeadd,
                prescriptionno,
                _id,
                hosp_logo,
                medayulabel,
              }),
            );
            setPrescriptionArray(_data);
          } else {
            console.error(`Error : ${message}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  let ___data = prescriptionArray;

  // handlePdfIconClick function ....
  const handlePdfIconClick = async prescription_id => {
    try {
      const patientTreatmentPrescriptionDataRes = await axios.post(
        `${api.baseurl}/GenerateMobileTreatmentPrescription`,
        {
          prescription_id: prescription_id,
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
          uhid: scannedPatientsData?.uhid,
        },
      );

      const {medicineprescriptionarray, complaintarray, ..._prescriptiondata} =
        patientTreatmentPrescriptionDataRes.data;
      console.log('_prescriptiondata : ', _prescriptiondata);
      const _complainttableRows = complaintarray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.symptoms}</td>
                       <td>${res.duration}</td>
                       <td>${res.time}</td>
                       <td>${res.frequency}</td>
                     </tr>
                   `;
        })
        .join('');
      const tableRows = medicineprescriptionarray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.brandname}(${res.drugname})</td>
                       <td>${res.dose}</td>
                       <td>${res.dosage || '-'}</td>
                       <td>${res.route}</td>
                       <td>${res.duration}</td>
                     </tr>
                   `;
        })
        .join('');
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
      
                .head-content2-part2 p {
                     text-align: right;
                }
      
                table {
                     width: 94%;
                     margin-left: 20px;
                     margin-right: 20px;
                     margin-bottom: 2%;
      
                }
      
                /* thead {
                     background-color: green;
                } */
      
                table tr th {
                     padding: 6px;
                     border: 1px solid black
                }
      
                table tr td {
                     padding: 6px;
                     border: 1px solid black;
                     text-align: center;
                }
      
                .main-part1,
                .main-part2,
                .main2 {
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
      
                .main2,
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
      
                .main-part3-p p {
                     text-align: left;
                }
      
                .main4 p {
                     text-align: right;
                     margin-left: 20px;
                     margin-right: 20px;
                }
      
                .head-content3 {
                     padding: 10px;
                     border: 1px solid black;
                     border-radius: 6px;
                     margin-left: 20px;
                     margin-right: 20px;
                }
      
                .head-content2-part1 h3 {
                     color: black;
                     text-align: center;
                }
      
                .head-content3-part1,
                .head-content3-part2,
                .head-content3-part3 {
                     display: flex;
                     justify-content: space-between;
                     
                }
      
                .head-content3-part1 h3,
                .head-content3-part2 h3,
                .head-content3-part3 h3 {
                     width: 33%;
                     font-size: 16px;
                }
      
                .head-content h1,
                p {
                     text-align: center;
                }
                .main5{
                     display: flex;
                     justify-content: space-between;
                     margin-left: 20px;
                     margin-right: 20px;
                     border-top: 2px solid green;
                }
                span{
                     color: black;
                }
           </style>
      </head>
      z
      <body style="border: 1px solid;">
           <div class="head">
                <div>
                     <img src=${
                       _prescriptiondata?.hosp_logo
                     } style="width: 14vw;" />
                </div>
                <div class="head-content">
                     <h1>SAMADHAN HOSPITAL</h1>
                     <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
                     <p>50, GANESH NAGAR, NAGPUR.440024</p>
                </div>
                <div class="head-content"></div>
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                          padding: 8px;">REG. NO : </h3>
                </div>
      
           </div>
           <div class="head-content3">
                <div class="head-content3-part1">
                     <h3 style="margin: 0;
                          padding: 8px;">UHID NO : <span>${
                            _prescriptiondata?.uhid
                          }</span> </h3>
                     <h3 style="margin: 0;
                          padding: 8px;">OP/IP NO : <span>${
                            _prescriptiondata?.ipno || _prescriptiondata?.opno
                          }</span> </h3>
                     <h3 style="margin: 0;
                          padding: 8px;">DATE : <span>${
                            _prescriptiondata?.registerdate
                          }</span> </h3>
                </div>
                <div class="head-content3-part2">
                     <h3 style="margin: 0;
                          padding: 8px;">NAME : <span>${
                            _prescriptiondata?.firstname
                          }</span> </h3>
                     <h3 style="margin: 0;
                          padding: 8px;">AGE : <span>${
                            _prescriptiondata?.patientage
                          }</span></h3>
                     <h3 style="margin: 0;
                          padding: 8px;">GENDER : <span>${
                            _prescriptiondata?.patientgender
                          }</span> </h3>
                </div>
                <div class="head-content3-part3">
                     <h3 style="margin: 0;
                          padding: 8px; width: 106%;">CONSULTANT NAME : <span>${
                            _prescriptiondata?.consultantname
                          }</span> </h3>
                     
                     <h3 style="margin: 0;width: 50%;
                          padding: 8px;">TIME : <span>${
                            _prescriptiondata?.time
                          }</span></h3>
                </div>
                <div class="head-content3-part3">
                     <h3 style="margin: 0;
                          padding: 8px; width: 106%;">TREATING DOCTOR NAME : <span>${
                            //    _prescriptiondata?.treating_doctor ||
                            _prescriptiondata?.consultantname
                          }</span> </h3>
                     
                </div>
      
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                          padding: 30px 20px;text-align: left;">PRESENTING COMPLAINTS</h3>
                </div>
      
           </div>
      
           <div class="main-part12">
                <table style="border-collapse: collapse;">
                     <thead>
                          <th>COMPLAINTS</th>
                          <th>DURATION</th>
                          <th>TIME</th>
                          <th>FREQUENCY</th>
                     </thead>
                     <tbody>
                         ${_complainttableRows}
                     </tbody>
                </table>
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                          padding: 30px 20px;text-align: left;">R<sub>x</sub></h3>
                </div>
      
           </div>
           <div class="main-part12">
                <table style="border-collapse: collapse;">
                     <thead>
                          <th>MEDICINE NAME</th>
                          <th>DOSE</th>
                          <th>DOSAGE</th>
                          <th>ROUTE</th>
                          <th>DURATION</th>
                     </thead>
                     <tbody>
                     ${tableRows}
                     </tbody>
                </table>
           </div>
      
           <br /><br />
           <div class="main4">
                <div style="width: 100%;">
                <p><b>${_prescriptiondata?.consultantname || '-----'}</b></p>
                    <p>${_prescriptiondata?.designation || '-----'} </p>
                     <p>REG. NO. 2008/10/3546 </p>
                </div>
           </div>
           <div class="main5">
                <p>+91-7774017732</p>
                <p>www.medayu.in </p>
                <p>medayuhealthcare@gmail.com </p>
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

  //handler share pdf ......
  const sharePdfhandler = async prescription_id => {
    try {
      const patientTreatmentPrescriptionDataRes = await axios.post(
        `${api.baseurl}/GenerateMobileTreatmentPrescription`,
        {
          prescription_id: prescription_id,
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
          uhid: scannedPatientsData?.uhid,
        },
      );

      const {medicineprescriptionarray, complaintarray, ..._prescriptiondata} =
        patientTreatmentPrescriptionDataRes.data;
      console.log('_prescriptiondata : ', _prescriptiondata);
      const _complainttableRows = complaintarray
        ?.map((res, i) => {
          return `
                       <tr key=${i}>
                         <td>${res.symptoms}</td>
                         <td>${res.duration}</td>
                         <td>${res.time}</td>
                         <td>${res.frequency}</td>
                       </tr>
                     `;
        })
        .join('');
      const tableRows = medicineprescriptionarray
        ?.map((res, i) => {
          return `
                       <tr key=${i}>
                         <td>${res.brandname}(${res.drugname})</td>
                         <td>${res.dose}</td>
                         <td>${res.dosage || '-'}</td>
                         <td>${res.route}</td>
                         <td>${res.duration}</td>
                       </tr>
                     `;
        })
        .join('');
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
        
                  .head-content2-part2 p {
                       text-align: right;
                  }
        
                  table {
                       width: 94%;
                       margin-left: 20px;
                       margin-right: 20px;
                       margin-bottom: 2%;
        
                  }
        
                  /* thead {
                       background-color: green;
                  } */
        
                  table tr th {
                       padding: 6px;
                       border: 1px solid black
                  }
        
                  table tr td {
                       padding: 6px;
                       border: 1px solid black;
                       text-align: center;
                  }
        
                  .main-part1,
                  .main-part2,
                  .main2 {
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
        
                  .main2,
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
        
                  .main-part3-p p {
                       text-align: left;
                  }
        
                  .main4 p {
                       text-align: right;
                       margin-left: 20px;
                       margin-right: 20px;
                  }
        
                  .head-content3 {
                       padding: 10px;
                       border: 1px solid black;
                       border-radius: 6px;
                       margin-left: 20px;
                       margin-right: 20px;
                  }
        
                  .head-content2-part1 h3 {
                       color: black;
                       text-align: center;
                  }
        
                  .head-content3-part1,
                  .head-content3-part2,
                  .head-content3-part3 {
                       display: flex;
                       justify-content: space-between;
                       
                  }
        
                  .head-content3-part1 h3,
                  .head-content3-part2 h3,
                  .head-content3-part3 h3 {
                       width: 33%;
                       font-size: 16px;
                  }
        
                  .head-content h1,
                  p {
                       text-align: center;
                  }
                  .main5{
                       display: flex;
                       justify-content: space-between;
                       margin-left: 20px;
                       margin-right: 20px;
                       border-top: 2px solid green;
                  }
                  span{
                       color: black;
                  }
             </style>
        </head>
        z
        <body style="border: 1px solid;">
             <div class="head">
                  <div>
                       <img src=${
                         _prescriptiondata?.hosp_logo
                       } style="width: 14vw;" />
                  </div>
                  <div class="head-content">
                       <h1>SAMADHAN HOSPITAL</h1>
                       <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
                       <p>50, GANESH NAGAR, NAGPUR.440024</p>
                  </div>
                  <div class="head-content"></div>
             </div>
             <div class="head-content2">
                  <div class="head-content2-part1">
                       <h3 style="margin: 0;
                            padding: 8px;">REG. NO : </h3>
                  </div>
        
             </div>
             <div class="head-content3">
                  <div class="head-content3-part1">
                       <h3 style="margin: 0;
                            padding: 8px;">UHID NO : <span>${
                              _prescriptiondata?.uhid
                            }</span> </h3>
                       <h3 style="margin: 0;
                            padding: 8px;">OP/IP NO : <span>${
                              _prescriptiondata?.ipno || _prescriptiondata?.opno
                            }</span> </h3>
                       <h3 style="margin: 0;
                            padding: 8px;">DATE : <span>${
                              _prescriptiondata?.registerdate
                            }</span> </h3>
                  </div>
                  <div class="head-content3-part2">
                       <h3 style="margin: 0;
                            padding: 8px;">NAME : <span>${
                              _prescriptiondata?.firstname
                            }</span> </h3>
                       <h3 style="margin: 0;
                            padding: 8px;">AGE : <span>${
                              _prescriptiondata?.patientage
                            }</span></h3>
                       <h3 style="margin: 0;
                            padding: 8px;">GENDER : <span>${
                              _prescriptiondata?.patientgender
                            }</span> </h3>
                  </div>
                  <div class="head-content3-part3">
                       <h3 style="margin: 0;
                            padding: 8px; width: 106%;">CONSULTANT NAME : <span>${
                              _prescriptiondata?.consultantname
                            }</span> </h3>
                       
                       <h3 style="margin: 0;width: 50%;
                            padding: 8px;">TIME : <span>${
                              _prescriptiondata?.time
                            }</span></h3>
                  </div>
                  <div class="head-content3-part3">
                       <h3 style="margin: 0;
                            padding: 8px; width: 106%;">TREATING DOCTOR NAME : <span>${
                              // _prescriptiondata?.treating_doctor || '-'
                              _prescriptiondata?.consultantname
                            }</span> </h3>
                       
                  </div>
        
             </div>
             <div class="head-content2">
                  <div class="head-content2-part1">
                       <h3 style="margin: 0;
                            padding: 30px 20px;text-align: left;">PRESENTING COMPLAINTS</h3>
                  </div>
        
             </div>
        
             <div class="main-part12">
                  <table style="border-collapse: collapse;">
                       <thead>
                            <th>COMPLAINTS</th>
                            <th>DURATION</th>
                            <th>TIME</th>
                            <th>FREQUENCY</th>
                       </thead>
                       <tbody>
                           ${_complainttableRows}
                       </tbody>
                  </table>
             </div>
             <div class="head-content2">
                  <div class="head-content2-part1">
                       <h3 style="margin: 0;
                            padding: 30px 20px;text-align: left;">R<sub>x</sub></h3>
                  </div>
        
             </div>
             <div class="main-part12">
                  <table style="border-collapse: collapse;">
                       <thead>
                            <th>MEDICINE NAME</th>
                            <th>DOSE</th>
                            <th>DOSAGE</th>
                            <th>ROUTE</th>
                            <th>DURATION</th>
                       </thead>
                       <tbody>
                       ${tableRows}
                       </tbody>
                  </table>
             </div>
        
             <br /><br />
             <div class="main4">
                  <div style="width: 100%;">
                  <p><b>${_prescriptiondata?.consultantname || '-----'}</b></p>
                      <p>${_prescriptiondata?.designation || '-----'} </p>
                       <p>REG. NO. 2008/10/3546 </p>
                  </div>
             </div>
             <div class="main5">
                  <p>+91-7774017732</p>
                  <p>www.medayu.in </p>
                  <p>medayuhealthcare@gmail.com </p>
             </div>
        </body>
        
        </html> `;

      const {fs} = RNFetchBlob;
      const path = fs.dirs.DocumentDir + '/Prescription.pdf';
      const options = {
        html: html,
        fileName: 'Prescription',
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
    <View style={styles.container}>
      {/* Patient Detail... */}
      <View style={styles.card}>
        <View style={styles.main}>
          <View style={styles.pDetail}>
            <Text style={styles.pData}>{scannedPatientsData?.firstname}</Text>
          </View>

          <View style={styles.pDetail}>
            <Text
              style={[
                styles.pData,
                {fontWeight: 'normal', textAlign: 'right'},
              ]}>
              <FontAwesome6 name="phone" color="#1669f0" size={11} />
              &nbsp;
              {scannedPatientsData?.mobilenumber}
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
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Treatment Prescription</Text>
      </View>
      <ScrollView vertical style={styles.treatmentpresciptionDiv}>
        {___data?.map((res, i) => {
          return (
            <View style={[styles.card, {marginVertical: 6}]} key={res._id}>
              <View>
                <Text
                  style={[
                    styles.pData,
                    {fontSize: 16, padding: 8, color: '#1669f0'},
                  ]}>
                  Prescription
                </Text>
              </View>
              <View style={styles.cardBody}>
                <View>
                  <Text style={styles.pData}>
                    Prescription No : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.prescriptionno}</Text>
                  </Text>
                  <Text style={styles.pData}>
                    Date : &nbsp; <Text>{res.dateadd}</Text>
                  </Text>
                  <Text style={styles.pData}>
                    Time : &nbsp; <Text>{res.timeadd}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.cardFooter2}>
                <View style={styles.grpShare}>
                  <TouchableOpacity
                    onPress={() => {
                      handlePdfIconClick(res._id);
                    }}>
                    <FontAwesome6 name="file-pdf" color="#1669f0" size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      sharePdfhandler(res._id);
                    }}>
                    <FontAwesome6 name="share" color="#1669f0" size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity>
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
    </View>
  );
};

export default EpatientTreatmentPrescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 10,
  },
  headerTxt: {
    fontWeight: 'bold',
    marginHorizontal: 8,
    fontSize: 16,
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

  pLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#02fa23',
  },
  pData: {
    fontSize: 14,
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
  treatmentpresciptionDiv: {
    maxHeight: 500,
  },
  pDetail: {
    padding: 12,
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center',
  },
  cardFooter2: {
    padding: 8,
    alignSelf: 'flex-end',
  },
  pData1: {
    fontWeight: '600',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //     padding: 8,
    marginHorizontal: 8,
  },
  grpShare: {
    flexDirection: 'row',
    gap: 14,
  },
});
