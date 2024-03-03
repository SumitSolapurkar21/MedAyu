import React, {useContext, useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import axios from 'axios';
import api from '../../../../api.json';
import UserContext from '../../../components/Context/Context';
import {useNavigation} from '@react-navigation/native';
import {SegmentedButtons, DefaultTheme} from 'react-native-paper';

const Preprecedureprescription = ({route}) => {
  const {patientsData, scannedPatientsData} = useContext(UserContext);
  const {hospital_id, patient_id, reception_id} = patientsData;
  const [procedureHistory, setProcedureHistory] = useState([]);
  const navigation = useNavigation();
  const [value, setValue] = useState('Schedule');
  const {
    _preprocedurevalue,
    procedureType,
    servicecategory_id,
    servicetype_id,
    categoryname,
  } = route.params;

  console.log(procedureType);
  //get patient treatment history ......
  useEffect(() => {
    _fetchprocedurehistory();
  }, [hospital_id, patient_id, reception_id, value]);

  const _fetchprocedurehistory = async () => {
    try {
      let servicestatus;
      if (procedureType === 'Pre') {
        servicestatus = 'PRESCRIPTION';
      } else {
        if (value === 'Schedule') {
          servicestatus = 'PRESCRIPTIONPENDING';
        } else {
          servicestatus = 'PRESCRIPTIONDONE';
        }
      }
      const res = await axios.post(`${api.baseurl}/GetPreprocedureHistory`, {
        hospital_id: hospital_id,
        patient_id: patient_id,
        reception_id: reception_id,
        procedurestatus: false,
        api_type: servicestatus,
        servicetype_id: servicetype_id,
        servicecategory_id: servicecategory_id,
      });

      const {status, message, data} = res.data;
      console.log('res.data : ', res.data.data);
      if (status === true) {
        setProcedureHistory(data);
      } else {
        setProcedureHistory([]);
        console.error(`${message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //get patient treatment history api end ......

  //generate pdf ....
  // handlePdfIconClick function ....
  const handlePdfIconClick = async preprocedure_id => {
    try {
      const generatePreprocedurenotes = await axios.post(
        `${api.baseurl}/GeneratePreprocedurenotes`,
        {
          preprocedure_id: preprocedure_id,
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
          // servicetype_id: servicetype_id,
          // servicecategory_id: servicecategory_id,
        },
      );
      const {
        panchakarmaprocedurearray,
        complaintArray,
        medicineprescriptionarray,
        ..._prescriptiondata
      } = generatePreprocedurenotes.data;

      const _complainttableRows = panchakarmaprocedurearray
        ?.map((res, i) => {
          return `<div class="head-content2-part1" key=${i}>
                    <h3 style="margin: 0;
                   padding: 2px 20px;text-align: left;">Procedure Name : ${res?.procedurename}  </h3>
                   <h3 style="margin: 0;
                   padding: 2px 20px;text-align: left;">Procedure Notes : ${res?.procedureinstruction}  </h3>
                  </div><br/>
                    
                   `;
        })
        .join('');
      const _complainttableRows2 = complaintArray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.symptoms}</td>
                       <td>${res.duration}</td>
                       <td>${res.frequency}</td>
                     </tr>
                   `;
        })
        .join('');

      const _complainttableRows3 = medicineprescriptionarray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.drugname}</td>
                       <td>${res.dose}</td>
                       <td>${res.route}</td>
                       <td>${res.schedule}</td>
                       <td>${res.duration}</td>
                     </tr>
                   `;
        })
        .join('');

      const _complainttableRows4 = panchakarmaprocedurearray
        ?.map((res, i) => {
          return `
          <div key=${i} style="line-height: 10px">
          <div class="head-content2">
          <div class="head-content2-part1">
                <h3 style="margin: 0;
                        padding: 10px 20px;text-align: left;">Procedure Name : ${res.postinstruction}   </h3>
          </div>
    
          </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 10px 20px;text-align: left;">Post Procedure Instruction : ${res.postinstruction}   </h3>
              </div>
    
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 10px 20px;text-align: left;">Follow Up Advice : ${res.advice}  </h3>
              </div>
    
         </div></div><br>
                   `;
        })
        .join('');

      const _complainttableRows5 = panchakarmaprocedurearray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.procedurename}</td>
                       <td>${res.proceduredays}</td>
                       <td>${res.procedureinstruction}</td>
                     </tr>
                   `;
        })
        .join('');

      let html;
      let html2;
      let html3;
      let combinedHtml;

      if (procedureType !== 'Pre') {
        html = `
          <!DOCTYPE html>
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
                   border-bottom: 2px solid blue;
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
                   color: green;
              }
              td.vLabel{
                font-weight: bold;
              }
              body{
                border: 1px solid black;
                height : calc(100vh - 20px);
              }
         </style>
    </head>
    
    <body>
         <div class="head">
              <div>
              <img src=${_prescriptiondata?.hosp_logo} style="width: 14vw;" />
              </div>
              <div class="head-content">
                   <h1>SAMADHAN HOSPITAL</h1>
                   <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
                   <p>50, GANESH NAGAR, NAGPUE.440024</p>
                   <p>Registration No :  542</p>
              </div>
              <div class="head-content"></div>
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                        padding: 8px;">PROCEDURE NOTE </h3>
              </div>
    
         </div>
         <div class="head-content3">
         <div class="head-content3-part1">
         <h3 style="margin: 0;
              padding: 8px;">UHID : <span>${
                _prescriptiondata?.uhid
              }</span> </h3>
         <h3 style="margin: 0;
              padding: 8px;">OP/IP : <span>${
                _prescriptiondata?.ip_no || _prescriptiondata?.op_no
              }</span> </h3>
         <h3 style="margin: 0;
              padding: 8px;">DATE/TIME : <span>${
                _prescriptiondata?.app_date
              } / ${_prescriptiondata?.app_time}</span> </h3>
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
              padding: 8px; width: 106%;">DOCTOR NAME : <span>${
                _prescriptiondata?.doctor_name
              }</span> </h3>
         
         <h3 style="margin: 0;width: 50%;
              padding: 8px;">CONSULTANT NAME : <span>${
                _prescriptiondata?.consultant_name
              }</span></h3>
    </div>
    
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 30px 20px;text-align: left;">Diagnosis : ${
                              _prescriptiondata?.diagnosisname
                            }  </h3>
              </div>
    
         </div>
        
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 2px 20px;text-align: left;">VITALS</h3>
              </div>
    
         </div>
    
         <div class="main-part12">
              <table style="border-collapse: collapse;">
                  
                   <tbody>
                        <tr>
                             <td class="vLabel">GC</td>
                             <td>E : ${_prescriptiondata?.eyeopening} / V :  ${
          _prescriptiondata?.verbalResponse
        } / M : ${_prescriptiondata?.motorResponse}</td>
                             <td class="vLabel">TEMP</td>
                              <td>${_prescriptiondata?.p_temp}</td>
                             <td class="vLabel">PULSE</td>
                              <td>${_prescriptiondata?.p_pulse}</td>
                        </tr>
                        <tr>
                             <td class="vLabel">BP</td>
                             <td>${_prescriptiondata?.p_systolicbp} / ${
          _prescriptiondata?.p_diastolicbp
        }</td>
                             <td class="vLabel">RR</td>
                              <td>${_prescriptiondata?.p_rsprate}</td>
                             <td class="vLabel">SPO2</td>
                              <td>${_prescriptiondata?.p_spo2}</td>
                        </tr>
                   </tbody>
              </table>
         </div>
         <div class="head-content2" style="margin-top: 60px;">
         ${_complainttableRows}
    
          </div>
          <div class="head-content4">
                   <p style="padding: 10px 20px;text-align: left;">PROCEDURE DONE BY : </p>
    
         </div>
         <div class="head-content5" style="margin-top: 5%;display: flex;justify-content: space-between;margin-bottom: 10px;">
              <div class="head-content5-part1" style="padding: 2px 20px;">
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.consultant_name
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.designation
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">REG. NO. ${
                     _prescriptiondata.reg_no
                   }</p>
              </div>
              <div class="head-content5-part2" style="padding: 2px 20px;">
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.rmo_name
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.rmo_designation
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">REG NO.${
                     _prescriptiondata.reg_no
                   }</p>
              </div>
    
         </div>
        
         
    </body>
    
    </html>`;
        html2 = `
    <!DOCTYPE html>
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
                   border-bottom: 2px solid blue;
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
                 
              }
              span{
                   color: green;
              }
              body{
                border: 1px solid black;
                height : calc(100vh - 20px);
              }
         </style>
    </head>
    
    <body>
    <div style="page-break-before: always;"></div>
         <div class="head">
              <div>
              <img src=${_prescriptiondata?.hosp_logo} style="width: 14vw;" />
              </div>
              <div class="head-content">
                   <h1>SAMADHAN HOSPITAL</h1>
                   <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
                   <p>50, GANESH NAGAR, NAGPUE.440024</p>
                   <p>Registration No :  542</p>
              </div>
              <div class="head-content"></div>
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                        padding: 8px;">POST PROCEDURE NOTE </h3>
              </div>
    
         </div>
         <div class="head-content3">
         <div class="head-content3-part1">
         <h3 style="margin: 0;
              padding: 8px;">UHID : <span>${
                _prescriptiondata?.uhid
              }</span> </h3>
         <h3 style="margin: 0;
              padding: 8px;">OP/IP : <span>${
                _prescriptiondata?.ip_no || _prescriptiondata?.op_no
              }</span> </h3>
         <h3 style="margin: 0;
              padding: 8px;">DATE/TIME : <span>${
                _prescriptiondata?.app_date
              } / ${_prescriptiondata?.app_time}</span> </h3>
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
              padding: 8px; width: 106%;">DOCTOR NAME : <span>${
                _prescriptiondata?.doctor_name
              }</span> </h3>
         
         <h3 style="margin: 0;width: 50%;
              padding: 8px;">CONSULTANT NAME : <span>${
                _prescriptiondata?.consultant_name
              }</span></h3>
    </div>
    
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
              <h3 style="margin: 0;
              padding: 30px 20px;text-align: left;">Diagnosis : ${
                _prescriptiondata?.diagnosisname
              }  </h3>
              </div>
    
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 2px 20px;text-align: left;">COMPLAINTS</h3>
              </div>
    
         </div>
    
         <div class="main-part12">
              <table style="border-collapse: collapse;">
                   <thead>
                        <th>COMPLAINTS</th>
                        <th>DURATION</th>
                        <th>FREQUENCY</th>
                   </thead>
                   <tbody>
                   ${_complainttableRows2}
                   </tbody>
              </table>
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 2px 20px;text-align: left;">VITALS</h3>
              </div>
    
         </div>
    
         <div class="main-part12">
              <table style="border-collapse: collapse;">
                  
              <tbody>
              <tr>
                   <td class="vLabel">GC</td>
                   <td>E : ${_prescriptiondata?.eyeopening} / V :  ${
          _prescriptiondata?.verbalResponse
        } / M : ${_prescriptiondata?.motorResponse}</td>
                   <td class="vLabel">TEMP</td>
                    <td>${_prescriptiondata?.p_temp}</td>
                   <td class="vLabel">PULSE</td>
                    <td>${_prescriptiondata?.p_pulse}</td>
              </tr>
              <tr>
                   <td class="vLabel">BP</td>
                   <td>${_prescriptiondata?.p_systolicbp} / ${
          _prescriptiondata?.p_diastolicbp
        }</td>
                   <td class="vLabel">RR</td>
                    <td>${_prescriptiondata?.p_rsprate}</td>
                   <td class="vLabel">SPO2</td>
                    <td>${_prescriptiondata?.p_spo2}</td>
              </tr>
         </tbody>
              </table>
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 2px 20px;text-align: left;">Investigation: </h3>
              </div>
    
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 20px 20px;text-align: left;">POST PROCEDURE INVESTIGATION    </h3>
              </div>
    
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 20px 20px;text-align: left;">R<sub>x</sub></h3>
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
                       ${_complainttableRows3}
                       
                   </tbody>
              </table>
         </div>
    
         <br />
         <div>
              ${_complainttableRows4}
         </div>
         <div class="head-content5" style="margin-top: 5%;display: flex;justify-content: space-between;margin-bottom: 10px;">
              <div class="head-content5-part1" style="padding: 2px 20px;">
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.consultant_name
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.designation
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">REG. NO. ${
                     _prescriptiondata.reg_no
                   }</p>
              </div>
              <div class="head-content5-part2" style="padding: 2px 20px;">
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.rmo_name
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">${
                     _prescriptiondata.rmo_designation
                   }</p>
                   <p style="text-align: left;margin: 0;padding: 4px;">REG NO.${
                     _prescriptiondata.reg_no
                   }</p>
              </div>
    
         </div>
         <div class="main5">
         <p>+91-7774017732</p>
         <p>www.medayu.in </p>
         <p>medayuhealthcare@gmail.com </p>
         
    </body>
    
    </html>
    `;
        combinedHtml = `${html}${html2}`;
      } else {
        html3 = `
  <!DOCTYPE html>
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
           border-bottom: 2px solid blue;
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
        
      }
      span{
           color: green;
      }
      body{
        border: 1px solid black;
        height : calc(100vh - 20px);
      }
  </style>
  </head>
  
  <body>
  <div style="page-break-before: always;"></div>
  <div class="head">
      <div>
      <img src=${_prescriptiondata?.hosp_logo} style="width: 14vw;" />
      </div>
      <div class="head-content">
           <h1>SAMADHAN HOSPITAL</h1>
           <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
           <p>50, GANESH NAGAR, NAGPUE.440024</p>
           <p>Registration No :  542</p>
      </div>
      <div class="head-content"></div>
  </div>
  <div class="head-content2">
      <div class="head-content2-part1">
           <h3 style="margin: 0;
                padding: 8px;">DOCTOR NOTES </h3>
      </div>
  
  </div>
  <div class="head-content3">
  <div class="head-content3-part1">
  <h3 style="margin: 0;
      padding: 8px;">UHID : <span>${_prescriptiondata?.uhid}</span> </h3>
  <h3 style="margin: 0;
      padding: 8px;">OP/IP : <span>${
        _prescriptiondata?.ip_no || _prescriptiondata?.op_no
      }</span> </h3>
  <h3 style="margin: 0;
      padding: 8px;">DATE/TIME : <span>${_prescriptiondata?.app_date} / ${
          _prescriptiondata?.app_time
        }</span> </h3>
  </div>
  <div class="head-content3-part2">
  <h3 style="margin: 0;
      padding: 8px;">NAME : <span>${_prescriptiondata?.firstname}</span> </h3>
  <h3 style="margin: 0;
      padding: 8px;">AGE : <span>${_prescriptiondata?.patientage}</span></h3>
  <h3 style="margin: 0;
      padding: 8px;">GENDER : <span>${
        _prescriptiondata?.patientgender
      }</span> </h3>
  </div>
  <div class="head-content3-part3">
  <h3 style="margin: 0;
      padding: 8px; width: 106%;">DOCTOR NAME : <span>${
        _prescriptiondata?.doctor_name
      }</span> </h3>
  
  <h3 style="margin: 0;width: 50%;
      padding: 8px;">CONSULTANT NAME : <span>${
        _prescriptiondata?.consultant_name
      }</span></h3>
  </div>
  
  </div>
  <div class="head-content2">
      <div class="head-content2-part1">
      <h3 style="margin: 0;
      padding: 30px 20px;text-align: left;">Diagnosis : ${
        _prescriptiondata?.diagnosisname
      }  </h3>
      </div>
  
  </div>
  <div class="head-content2">
      <div class="head-content2-part1">
           <h3 style="margin: 0;
                    padding: 2px 20px;text-align: left;">COMPLAINTS</h3>
      </div>
  
  </div>
  
  <div class="main-part12">
      <table style="border-collapse: collapse;">
           <thead>
                <th>COMPLAINTS</th>
                <th>DURATION</th>
                <th>FREQUENCY</th>
           </thead>
           <tbody>
           ${_complainttableRows2}
           </tbody>
      </table>
  </div>
  <div class="head-content2">
      <div class="head-content2-part1">
           <h3 style="margin: 0;
                    padding: 2px 20px;text-align: left;">VITALS</h3>
      </div>
  
  </div>
  
  <div class="main-part12">
      <table style="border-collapse: collapse;">
          
      <tbody>
      <tr>
           <td class="vLabel">GC</td>
           <td>E : ${_prescriptiondata?.eyeopening} / V :  ${
          _prescriptiondata?.verbalResponse
        } / M : ${_prescriptiondata?.motorResponse}</td>
           <td class="vLabel">TEMP</td>
            <td>${_prescriptiondata?.p_temp}</td>
           <td class="vLabel">PULSE</td>
            <td>${_prescriptiondata?.p_pulse}</td>
      </tr>
      <tr>
           <td class="vLabel">BP</td>
           <td>${_prescriptiondata?.p_systolicbp} / ${
          _prescriptiondata?.p_diastolicbp
        }</td>
           <td class="vLabel">RR</td>
            <td>${_prescriptiondata?.p_rsprate}</td>
           <td class="vLabel">SPO2</td>
            <td>${_prescriptiondata?.p_spo2}</td>
      </tr>
  </tbody>
      </table>
  </div>
  <div class="head-content2">
    <div class="head-content2-part1">
        <h3 style="margin: 0;
                  padding: 2px 20px;text-align: left;">PROCEDURES</h3>
    </div>

  </div>
  <div class="main-part12">
  <table style="border-collapse: collapse;">
       <thead>
            <th>PROCEDURE NAME</th>
            <th>DURATION</th>
            <th>INSTRUCTION</th>
       </thead>
       <tbody>
       ${_complainttableRows5}
       </tbody>
  </table>
</div>
  <div class="head-content2">
      <div class="head-content2-part1">
           <h3 style="margin: 0;
                    padding: 2px 20px;text-align: left;">Investigation: </h3>
      </div>
  
  </div>
  <div class="head-content2">
      <div class="head-content2-part1">
           <h3 style="margin: 0;
                    padding: 20px 20px;text-align: left;">CBC, KFT, LFT </h3>
      </div>
  
  </div>
  <div class="head-content2">
      <div class="head-content2-part1">
           <h3 style="margin: 0;
                    padding: 20px 20px;text-align: left;">R<sub>x</sub></h3>
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
               ${_complainttableRows3}
               
           </tbody>
      </table>
  </div>
  
  <br />
  
  <div class="head-content5" style="margin-top: 5%;display: flex;justify-content: space-between;margin-bottom: 10px;">
      <div class="head-content5-part1" style="padding: 2px 20px;">
           <p style="text-align: left;margin: 0;padding: 4px;">${
             _prescriptiondata.consultant_name
           }</p>
           <p style="text-align: left;margin: 0;padding: 4px;">${
             _prescriptiondata.designation
           }</p>
           <p style="text-align: left;margin: 0;padding: 4px;">REG. NO. ${
             _prescriptiondata.reg_no
           }</p>
      </div>
      <div class="head-content5-part2" style="padding: 2px 20px;">
           <p style="text-align: left;margin: 0;padding: 4px;">${
             _prescriptiondata.rmo_name
           }</p>
           <p style="text-align: left;margin: 0;padding: 4px;">${
             _prescriptiondata.rmo_designation
           }</p>
           <p style="text-align: left;margin: 0;padding: 4px;">REG NO.${
             _prescriptiondata.reg_no
           }</p>
      </div>
  
  </div>
  <br><br>
  <div class="main5">
    <p>+91-7774017732</p>
    <p>www.medayu.in </p>
    <p>medayuhealthcare@gmail.com </p>
  </div>
  
  </body>
  
  </html>
  `;
        combinedHtml = `${html3}`;
      }

      await RNPrint.print({
        html: combinedHtml,
      });
    } catch (error) {
      console.error(error);
    }
  };

  //handler share pdf ......
  const sharePdfhandler = async preprocedure_id => {
    try {
      const generatePreprocedurenotes = await axios.post(
        `${api.baseurl}/GeneratePreprocedurenotes`,
        {
          preprocedure_id: preprocedure_id,
          hospital_id: hospital_id,
          patient_id: patient_id,
          reception_id: reception_id,
        },
      );
      const {
        panchakarmaprocedurearray,
        complaintArray,
        medicineprescriptionarray,
        ..._prescriptiondata
      } = generatePreprocedurenotes.data;

      const _complainttableRows = panchakarmaprocedurearray
        ?.map((res, i) => {
          return `<div class="head-content2-part1" key=${i}>
                    <h3 style="margin: 0;
                   padding: 2px 20px;text-align: left;">Procedure Name : ${res?.procedurename}  </h3>
                   <h3 style="margin: 0;
                   padding: 2px 20px;text-align: left;">Procedure Notes : ${res?.procedureinstruction}  </h3>
                  </div><br/>
                    
                   `;
        })
        .join('');
      const _complainttableRows2 = complaintArray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.symptoms}</td>
                       <td>${res.duration}</td>
                       <td>${res.frequency}</td>
                     </tr>
                   `;
        })
        .join('');

      const _complainttableRows3 = medicineprescriptionarray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.drugname}</td>
                       <td>${res.dose}</td>
                       <td>${res.route}</td>
                       <td>${res.schedule}</td>
                       <td>${res.duration}</td>
                     </tr>
                   `;
        })
        .join('');

      const _complainttableRows4 = panchakarmaprocedurearray
        ?.map((res, i) => {
          return `
          <div key=${i} style="line-height: 10px">
          <div class="head-content2">
          <div class="head-content2-part1">
                <h3 style="margin: 0;
                        padding: 10px 20px;text-align: left;">Procedure Name : ${res.postinstruction}   </h3>
          </div>
    
          </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 10px 20px;text-align: left;">Post Procedure Instruction : ${res.postinstruction}   </h3>
              </div>
    
         </div>
         <div class="head-content2">
              <div class="head-content2-part1">
                   <h3 style="margin: 0;
                            padding: 10px 20px;text-align: left;">Follow Up Advice : ${res.advice}  </h3>
              </div>
    
         </div></div><br>
                   `;
        })
        .join('');

      const _complainttableRows5 = panchakarmaprocedurearray
        ?.map((res, i) => {
          return `
                     <tr key=${i}>
                       <td>${res.procedurename}</td>
                       <td>${res.proceduredays}</td>
                       <td>${res.procedureinstruction}</td>
                     </tr>
                   `;
        })
        .join('');

      let html;
      let html2;
      let html3;
      let combinedHtml;

      if (procedureType !== 'Pre') {
        html = `
            <!DOCTYPE html>
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
                     border-bottom: 2px solid blue;
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
                }
                span{
                     color: green;
                }
                td.vLabel{
                  font-weight: bold;
                }
                body{
                  border: 1px solid black;
                  height : calc(100vh - 20px);
                }
           </style>
      </head>
      
      <body>
           <div class="head">
                <div>
                <img src=${_prescriptiondata?.hosp_logo} style="width: 14vw;" />
                </div>
                <div class="head-content">
                     <h1>SAMADHAN HOSPITAL</h1>
                     <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
                     <p>50, GANESH NAGAR, NAGPUE.440024</p>
                     <p>Registration No :  542</p>
                </div>
                <div class="head-content"></div>
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                          padding: 8px;">PROCEDURE NOTE </h3>
                </div>
      
           </div>
           <div class="head-content3">
           <div class="head-content3-part1">
           <h3 style="margin: 0;
                padding: 8px;">UHID : <span>${
                  _prescriptiondata?.uhid
                }</span> </h3>
           <h3 style="margin: 0;
                padding: 8px;">OP/IP : <span>${
                  _prescriptiondata?.ip_no || _prescriptiondata?.op_no
                }</span> </h3>
           <h3 style="margin: 0;
                padding: 8px;">DATE/TIME : <span>${
                  _prescriptiondata?.app_date
                } / ${_prescriptiondata?.app_time}</span> </h3>
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
                padding: 8px; width: 106%;">DOCTOR NAME : <span>${
                  _prescriptiondata?.doctor_name
                }</span> </h3>
           
           <h3 style="margin: 0;width: 50%;
                padding: 8px;">CONSULTANT NAME : <span>${
                  _prescriptiondata?.consultant_name
                }</span></h3>
      </div>
      
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                              padding: 30px 20px;text-align: left;">Diagnosis : ${
                                _prescriptiondata?.diagnosisname
                              }  </h3>
                </div>
      
           </div>
          
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                              padding: 2px 20px;text-align: left;">VITALS</h3>
                </div>
      
           </div>
      
           <div class="main-part12">
                <table style="border-collapse: collapse;">
                    
                     <tbody>
                          <tr>
                               <td class="vLabel">GC</td>
                               <td>E : ${
                                 _prescriptiondata?.eyeopening
                               } / V :  ${
          _prescriptiondata?.verbalResponse
        } / M : ${_prescriptiondata?.motorResponse}</td>
                               <td class="vLabel">TEMP</td>
                                <td>${_prescriptiondata?.p_temp}</td>
                               <td class="vLabel">PULSE</td>
                                <td>${_prescriptiondata?.p_pulse}</td>
                          </tr>
                          <tr>
                               <td class="vLabel">BP</td>
                               <td>${_prescriptiondata?.p_systolicbp} / ${
          _prescriptiondata?.p_diastolicbp
        }</td>
                               <td class="vLabel">RR</td>
                                <td>${_prescriptiondata?.p_rsprate}</td>
                               <td class="vLabel">SPO2</td>
                                <td>${_prescriptiondata?.p_spo2}</td>
                          </tr>
                     </tbody>
                </table>
           </div>
           <div class="head-content2" style="margin-top: 60px;">
           ${_complainttableRows}
      
            </div>
            <div class="head-content4">
                     <p style="padding: 10px 20px;text-align: left;">PROCEDURE DONE BY : </p>
      
           </div>
           <div class="head-content5" style="margin-top: 5%;display: flex;justify-content: space-between;margin-bottom: 10px;">
                <div class="head-content5-part1" style="padding: 2px 20px;">
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.consultant_name
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.designation
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">REG. NO. ${
                       _prescriptiondata.reg_no
                     }</p>
                </div>
                <div class="head-content5-part2" style="padding: 2px 20px;">
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.rmo_name
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.rmo_designation
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">REG NO.${
                       _prescriptiondata.reg_no
                     }</p>
                </div>
      
           </div>
          
           
      </body>
      
      </html>`;
        html2 = `
      <!DOCTYPE html>
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
                     border-bottom: 2px solid blue;
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
                     
                }
                span{
                     color: green;
                }
                body{
                  border: 1px solid black;
                  height : calc(100vh - 20px);
                }
           </style>
      </head>
      
      <body>
      <div style="page-break-before: always;"></div>
           <div class="head">
                <div>
                <img src=${_prescriptiondata?.hosp_logo} style="width: 14vw;" />
                </div>
                <div class="head-content">
                     <h1>SAMADHAN HOSPITAL</h1>
                     <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
                     <p>50, GANESH NAGAR, NAGPUE.440024</p>
                     <p>Registration No :  542</p>
                </div>
                <div class="head-content"></div>
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                          padding: 8px;">POST PROCEDURE NOTE </h3>
                </div>
      
           </div>
           <div class="head-content3">
           <div class="head-content3-part1">
           <h3 style="margin: 0;
                padding: 8px;">UHID : <span>${
                  _prescriptiondata?.uhid
                }</span> </h3>
           <h3 style="margin: 0;
                padding: 8px;">OP/IP : <span>${
                  _prescriptiondata?.ip_no || _prescriptiondata?.op_no
                }</span> </h3>
           <h3 style="margin: 0;
                padding: 8px;">DATE/TIME : <span>${
                  _prescriptiondata?.app_date
                } / ${_prescriptiondata?.app_time}</span> </h3>
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
                padding: 8px; width: 106%;">DOCTOR NAME : <span>${
                  _prescriptiondata?.doctor_name
                }</span> </h3>
           
           <h3 style="margin: 0;width: 50%;
                padding: 8px;">CONSULTANT NAME : <span>${
                  _prescriptiondata?.consultant_name
                }</span></h3>
      </div>
      
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                <h3 style="margin: 0;
                padding: 30px 20px;text-align: left;">Diagnosis : ${
                  _prescriptiondata?.diagnosisname
                }  </h3>
                </div>
      
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                              padding: 2px 20px;text-align: left;">COMPLAINTS</h3>
                </div>
      
           </div>
      
           <div class="main-part12">
                <table style="border-collapse: collapse;">
                     <thead>
                          <th>COMPLAINTS</th>
                          <th>DURATION</th>
                          <th>FREQUENCY</th>
                     </thead>
                     <tbody>
                     ${_complainttableRows2}
                     </tbody>
                </table>
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                              padding: 2px 20px;text-align: left;">VITALS</h3>
                </div>
      
           </div>
      
           <div class="main-part12">
                <table style="border-collapse: collapse;">
                    
                <tbody>
                <tr>
                     <td class="vLabel">GC</td>
                     <td>E : ${_prescriptiondata?.eyeopening} / V :  ${
          _prescriptiondata?.verbalResponse
        } / M : ${_prescriptiondata?.motorResponse}</td>
                     <td class="vLabel">TEMP</td>
                      <td>${_prescriptiondata?.p_temp}</td>
                     <td class="vLabel">PULSE</td>
                      <td>${_prescriptiondata?.p_pulse}</td>
                </tr>
                <tr>
                     <td class="vLabel">BP</td>
                     <td>${_prescriptiondata?.p_systolicbp} / ${
          _prescriptiondata?.p_diastolicbp
        }</td>
                     <td class="vLabel">RR</td>
                      <td>${_prescriptiondata?.p_rsprate}</td>
                     <td class="vLabel">SPO2</td>
                      <td>${_prescriptiondata?.p_spo2}</td>
                </tr>
           </tbody>
                </table>
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                              padding: 2px 20px;text-align: left;">Investigation: </h3>
                </div>
      
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                              padding: 20px 20px;text-align: left;">POST PROCEDURE INVESTIGATION    </h3>
                </div>
      
           </div>
           <div class="head-content2">
                <div class="head-content2-part1">
                     <h3 style="margin: 0;
                              padding: 20px 20px;text-align: left;">R<sub>x</sub></h3>
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
                         ${_complainttableRows3}
                         
                     </tbody>
                </table>
           </div>
      
           <br />
           <div>
                ${_complainttableRows4}
           </div>
           <div class="head-content5" style="margin-top: 5%;display: flex;justify-content: space-between;margin-bottom: 10px;">
                <div class="head-content5-part1" style="padding: 2px 20px;">
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.consultant_name
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.designation
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">REG. NO. ${
                       _prescriptiondata.reg_no
                     }</p>
                </div>
                <div class="head-content5-part2" style="padding: 2px 20px;">
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.rmo_name
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">${
                       _prescriptiondata.rmo_designation
                     }</p>
                     <p style="text-align: left;margin: 0;padding: 4px;">REG NO.${
                       _prescriptiondata.reg_no
                     }</p>
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
        combinedHtml = `${html}${html2}`;
      } else {
        html3 = `
        <!DOCTYPE html>
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
                 border-bottom: 2px solid blue;
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
              
            }
            span{
                 color: green;
            }
            body{
              border: 1px solid black;
              height : calc(100vh - 20px);
            }
        </style>
        </head>
        
        <body>
        <div style="page-break-before: always;"></div>
        <div class="head">
            <div>
            <img src=${_prescriptiondata?.hosp_logo} style="width: 14vw;" />
            </div>
            <div class="head-content">
                 <h1>SAMADHAN HOSPITAL</h1>
                 <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
                 <p>50, GANESH NAGAR, NAGPUE.440024</p>
                 <p>Registration No :  542</p>
            </div>
            <div class="head-content"></div>
        </div>
        <div class="head-content2">
            <div class="head-content2-part1">
                 <h3 style="margin: 0;
                      padding: 8px;">DOCTOR NOTES </h3>
            </div>
        
        </div>
        <div class="head-content3">
        <div class="head-content3-part1">
        <h3 style="margin: 0;
            padding: 8px;">UHID : <span>${_prescriptiondata?.uhid}</span> </h3>
        <h3 style="margin: 0;
            padding: 8px;">OP/IP : <span>${
              _prescriptiondata?.ip_no || _prescriptiondata?.op_no
            }</span> </h3>
        <h3 style="margin: 0;
            padding: 8px;">DATE/TIME : <span>${_prescriptiondata?.app_date} / ${
          _prescriptiondata?.app_time
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
            padding: 8px; width: 106%;">DOCTOR NAME : <span>${
              _prescriptiondata?.doctor_name
            }</span> </h3>
        
        <h3 style="margin: 0;width: 50%;
            padding: 8px;">CONSULTANT NAME : <span>${
              _prescriptiondata?.consultant_name
            }</span></h3>
        </div>
        
        </div>
        <div class="head-content2">
            <div class="head-content2-part1">
            <h3 style="margin: 0;
            padding: 30px 20px;text-align: left;">Diagnosis : ${
              _prescriptiondata?.diagnosisname
            }  </h3>
            </div>
        
        </div>
        <div class="head-content2">
            <div class="head-content2-part1">
                 <h3 style="margin: 0;
                          padding: 2px 20px;text-align: left;">COMPLAINTS</h3>
            </div>
        
        </div>
        
        <div class="main-part12">
            <table style="border-collapse: collapse;">
                 <thead>
                      <th>COMPLAINTS</th>
                      <th>DURATION</th>
                      <th>FREQUENCY</th>
                 </thead>
                 <tbody>
                 ${_complainttableRows2}
                 </tbody>
            </table>
        </div>
        <div class="head-content2">
            <div class="head-content2-part1">
                 <h3 style="margin: 0;
                          padding: 2px 20px;text-align: left;">VITALS</h3>
            </div>
        
        </div>
        
        <div class="main-part12">
            <table style="border-collapse: collapse;">
                
            <tbody>
            <tr>
                 <td class="vLabel">GC</td>
                 <td>E : ${_prescriptiondata?.eyeopening} / V :  ${
          _prescriptiondata?.verbalResponse
        } / M : ${_prescriptiondata?.motorResponse}</td>
                 <td class="vLabel">TEMP</td>
                  <td>${_prescriptiondata?.p_temp}</td>
                 <td class="vLabel">PULSE</td>
                  <td>${_prescriptiondata?.p_pulse}</td>
            </tr>
            <tr>
                 <td class="vLabel">BP</td>
                 <td>${_prescriptiondata?.p_systolicbp} / ${
          _prescriptiondata?.p_diastolicbp
        }</td>
                 <td class="vLabel">RR</td>
                  <td>${_prescriptiondata?.p_rsprate}</td>
                 <td class="vLabel">SPO2</td>
                  <td>${_prescriptiondata?.p_spo2}</td>
            </tr>
        </tbody>
            </table>
        </div>
        <div class="head-content2">
          <div class="head-content2-part1">
              <h3 style="margin: 0;
                        padding: 2px 20px;text-align: left;">PROCEDURES</h3>
          </div>
      
        </div>
        <div class="main-part12">
        <table style="border-collapse: collapse;">
             <thead>
                  <th>PROCEDURE NAME</th>
                  <th>DURATION</th>
                  <th>INSTRUCTION</th>
             </thead>
             <tbody>
             ${_complainttableRows5}
             </tbody>
        </table>
      </div>
        <div class="head-content2">
            <div class="head-content2-part1">
                 <h3 style="margin: 0;
                          padding: 2px 20px;text-align: left;">Investigation: </h3>
            </div>
        
        </div>
        <div class="head-content2">
            <div class="head-content2-part1">
                 <h3 style="margin: 0;
                          padding: 20px 20px;text-align: left;">CBC, KFT, LFT </h3>
            </div>
        
        </div>
        <div class="head-content2">
            <div class="head-content2-part1">
                 <h3 style="margin: 0;
                          padding: 20px 20px;text-align: left;">R<sub>x</sub></h3>
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
                     ${_complainttableRows3}
                     
                 </tbody>
            </table>
        </div>
        
        <br />
        
        <div class="head-content5" style="margin-top: 5%;display: flex;justify-content: space-between;margin-bottom: 10px;">
            <div class="head-content5-part1" style="padding: 2px 20px;">
                 <p style="text-align: left;margin: 0;padding: 4px;">${
                   _prescriptiondata.consultant_name
                 }</p>
                 <p style="text-align: left;margin: 0;padding: 4px;">${
                   _prescriptiondata.designation
                 }</p>
                 <p style="text-align: left;margin: 0;padding: 4px;">REG. NO. ${
                   _prescriptiondata.reg_no
                 }</p>
            </div>
            <div class="head-content5-part2" style="padding: 2px 20px;">
                 <p style="text-align: left;margin: 0;padding: 4px;">${
                   _prescriptiondata.rmo_name
                 }</p>
                 <p style="text-align: left;margin: 0;padding: 4px;">${
                   _prescriptiondata.rmo_designation
                 }</p>
                 <p style="text-align: left;margin: 0;padding: 4px;">REG NO.${
                   _prescriptiondata.reg_no
                 }</p>
            </div>
        
        </div>
        <br><br>
        <div class="main5">
          <p>+91-7774017732</p>
          <p>www.medayu.in </p>
          <p>medayuhealthcare@gmail.com </p>
        </div>
        
        </body>
        
        </html>
        `;
        combinedHtml = `${html3}`;
      }
      const {fs} = RNFetchBlob;
      const path = fs.dirs.DocumentDir + '/Prescription.pdf';
      const options = {
        html: combinedHtml,
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

  const theme = {
    ...DefaultTheme,
    roundness: 0, // Set roundness to 0 to remove borderRadius
  };
  return (
    <View style={styles.container}>
      {_preprocedurevalue === 'Schedule Procedure' && (
        <SegmentedButtons
          style={styles.segmentBtn}
          theme={theme}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'Schedule',
              label: 'Schedule',
            },
            {
              value: 'Completed',
              label: 'Completed',
            },
          ]}
        />
      )}
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
        <Text style={styles.headerTxt}>Procedure Prescription</Text>
      </View>
      <ScrollView vertical style={styles.treatmentpresciptionDiv}>
        {procedureHistory?.map((res, i) => {
          return (
            <View
              style={[styles.card, {marginVertical: 6}]}
              key={res.preprocedure_id}>
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
                    Procedure Name : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.procedurename}</Text>
                  </Text>
                  <Text style={styles.pData}>
                    No. of Procedure : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.noofprocedure}</Text>
                  </Text>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      gap: 100,
                    }}> */}
                  <Text style={styles.pData}>
                    Date : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.dateadd}</Text>
                  </Text>
                  <Text style={styles.pData}>
                    Time : &nbsp;{' '}
                    <Text style={{color: 'green'}}>{res.timeadd}</Text>
                  </Text>
                  {/* </View> */}
                </View>
              </View>
              <View style={styles.cardFooter2}>
                <View style={styles.grpShare}>
                  {procedureType === 'Pre' ? (
                    <TouchableOpacity
                      style={{borderWidth: 1, padding: 4, borderRadius: 4}}
                      onPress={() =>
                        navigation.navigate('EditPreprocedure', {
                          preprocedure_id: res.preprocedure_id,
                        })
                      }>
                      <FontAwesome6 name="eye" color="#1669f0" size={18} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{borderWidth: 1, padding: 4, borderRadius: 4}}
                      onPress={() =>
                        navigation.navigate('Editprocedure', {
                          preprocedure_id: res.preprocedure_id,
                        })
                      }>
                      <FontAwesome6 name="eye" color="#1669f0" size={18} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{borderWidth: 1, padding: 4, borderRadius: 4}}
                    onPress={() => {
                      handlePdfIconClick(res.preprocedure_id);
                    }}>
                    <FontAwesome6 name="file-pdf" color="#1669f0" size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{borderWidth: 1, padding: 4, borderRadius: 4}}
                    onPress={() => {
                      sharePdfhandler(res.preprocedure_id);
                    }}>
                    <FontAwesome6 name="share" color="#1669f0" size={18} />
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

export default Preprecedureprescription;

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
    // marginBottom: 18,
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
  segmentBtn: {
    padding: 16,
  },
});
