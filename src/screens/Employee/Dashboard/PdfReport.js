import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import axios from 'axios';
import api from '../../../../api.json';

export const GeneratePdf = async data => {
  let appoint_id = data?.appoint_id;
  let depart_id = data?.depart_id;
  let doctor_id = data?.doctor_id;
  let mobilenumber = data?.mobilenumber;
  let uhid = data?.patientuniqueno;
  let patient_id = data?._id;
  let role = data?.role;
  let hospital_id = data?.hospital_id;
  let reception_id = data?.reception_id;

  // handlePdfIconClick function ....
  try {
    const patientTreatmentPrescriptionDataRes = await axios.post(
      `${api.baseurl}/GenerateOpdAssessmentReports`,
      {
        appoint_id: appoint_id,
        depart_id: depart_id,
        doctor_id: doctor_id,
        mobilenumber: mobilenumber,
        uhid: uhid,
        patient_id: patient_id,
        role: role,
        hospital_id: hospital_id,
        reception_id: reception_id,
      },
    );

    const data = patientTreatmentPrescriptionDataRes.data.data[0];

    const _complainttableRows = `
    <div class="head-content2">
                       <div class="head-content2-part1">
                            <h3 style="margin: 0;padding: 16px 20px;text-align: left;">COMPLAINTS</h3>
                       </div>

                  </div>

                  <div class="main-part12">
                       <table style="border-collapse: collapse;">
                            <thead>
                                 <th>SYMPTOMS</th>
                                 <th>DURATION</th>
                                 <th>TIME</th>
                                 <th>FREQUENCY</th>
                            </thead>
                            <tbody>
                               ${data?.opdcomplaintArray?.map((res, i) => {
                                 return `
                                        <tr key=${i}>
                                        <td>${res.symptoms}</td>
                                        <td>${res.duration}</td>
                                        <td>${res.frequency}</td>
                                        <td>${res.time}</td>
                                        </tr>`;
                               })}
                            </tbody>
                       </table>
                  </div>`;

    const pastHistoryData = `
                  <div class="head-content2">
                                     <div class="head-content2-part1">
                                          <h3 style="margin: 0;
                                               padding: 16px 20px;text-align: left;">PAST</h3>
                                     </div>
              
                                </div>
              
                                <div class="main-part12">
                                     <table style="border-collapse: collapse;">
                                          <thead>
                                               <th>ILLNESS</th>
                                               <th>DAYS</th>
                                               <th>MONTH</th>
                                               <th>YEAR</th>
                                               <th>STATUS</th>
                                               <th>DATE</th>
                                          </thead>
                                          <tbody>
                                             ${data?.opdpasthistoryarray?.map(
                                               (res, i) => {
                                                 return `
                                                      <tr key=${i}>
                                                      <td>${res.illnessname}</td>
                                                      <td>${res.days}</td>
                                                      <td>${res.months}</td>
                                                      <td>${res.years}</td>
                                                      <td>${res.treatment_status}</td>
                                                      <td>${res.dateValues}</td>
                                                      </tr>`;
                                               },
                                             )}
                                          </tbody>
                                     </table>
                                </div>`;

    const familyHistoryData = `
                  <div class="head-content2">
                                     <div class="head-content2-part1">
                                          <h3 style="margin: 0;
                                               padding: 16px 20px;text-align: left;">FAMILY</h3>
                                     </div>
              
                                </div>
              
                                <div class="main-part12">
                                     <table style="border-collapse: collapse;">
                                          <thead>
                                               <th>ILLNESS</th>
                                               <th>DAYS</th>
                                               <th>MONTH</th>
                                               <th>YEAR</th>
                                               <th>RELATION</th>
                                               <th>FROM DATE</th>
                                          </thead>
                                          <tbody>
                                             ${data?.opdfamilyhistoryarray?.map(
                                               (res, i) => {
                                                 return `
                                                      <tr key=${i}>
                                                      <td>${res.illnessname}</td>
                                                      <td>${res.days}</td>
                                                      <td>${res.months}</td>
                                                      <td>${res.years}</td>
                                                      <td>${res.treatment_status}</td>
                                                      <td>${res.dateValues}</td>
                                                      </tr>`;
                                               },
                                             )}
                                          </tbody>
                                     </table>
                                </div>`;

    const medicineHistoryData = `
                                <div class="head-content2">
                                                   <div class="head-content2-part1">
                                                        <h3 style="margin: 0;
                                                             padding: 16px 20px;text-align: left;">MEDICINE</h3>
                                                   </div>
                            
                                              </div>
                            
                                              <div class="main-part12">
                                                   <table style="border-collapse: collapse;">
                                                        <thead>
                                                             <th>DRUG NAME</th>
                                                             <th>DRUG CODE</th>
                                                             <th>DOSE</th>
                                                             <th>ROUTE</th>
                                                             <th>SCHEDULE</th>
                                                             <th>DURATION</th>
                                                             <th>DAYS</th>
                                                             <th>MONTH</th>
                                                             <th>YEAR</th>
                                                             <th>FROM DATE</th>
                                                        </thead>
                                                        <tbody>
                                                           ${data?.opdmedicinehistoryarray?.map(
                                                             (res, i) => {
                                                               return `
                                                                    <tr key=${i}>
                                                                      <td>${res.drugname}</td>
                                                                      <td>${res.drugcode}</td>
                                                                      <td>${res.dose}</td>
                                                                      <td>${res.route}</td>
                                                                      <td>${res.schedule}</td>
                                                                      <td>${res.duration}</td>
                                                                      <td>${res.days}</td>
                                                                      <td>${res.months}</td>
                                                                      <td>${res.years}</td>
                                                                      <td>${res.dateValues}</td>
                                                                    </tr>`;
                                                             },
                                                           )}
                                                        </tbody>
                                                   </table>
                                              </div>`;
    const personalHistoryData = `
                                <div class="head-content2">
                                                   <div class="head-content2-part1">
                                                        <h3 style="margin: 0;
                                                             padding: 16px 20px;text-align: left;">PERSONAL</h3>
                                                   </div>
                            
                                              </div>
                            
                                              <div class="main-part12">
                                                   <table style="border-collapse: collapse;">
                                                        <thead>
                                                             <th>TEA</th>
                                                             <th>COFFEE</th>
                                                             <th>TOBACCO</th>
                                                             <th>SMOKING</th>
                                                             <th>ALCOHOL</th>
                                                             <th>DRUGS</th>
                                                             <th>EXERCISE</th>
                                                             <th>SOFT DRINK</th>
                                                             <th>SALTY FOOD</th>
                                                        </thead>
                                                        <tbody>
                                                           ${data?.opdpersonalhistoryarray?.map(
                                                             (res, i) => {
                                                               return `
                                                                    <tr key=${i}>
                                                                      <td>${res.Tea}</td>
                                                                      <td>${res.Coffee}</td>
                                                                      <td>${res.Tobacco}</td>
                                                                      <td>${res.Smoking}</td>
                                                                      <td>${res.Alcohol}</td>
                                                                      <td>${res.Drugs}</td>
                                                                      <td>${res.Exercise}</td>
                                                                      <td>${res.SoftDrink}</td>
                                                                      <td>${res.Saltyfood}</td>
                                                                      
                                                                    </tr>`;
                                                             },
                                                           )}
                                                        </tbody>
                                                   </table>
                                              </div>`;
    const obstetricsHistoryData = `
                                              <div class="head-content2">
                                                                 <div class="head-content2-part1">
                                                                      <h3 style="margin: 0;
                                                                           padding: 16px 20px;text-align: left;">OBSTETRIC</h3>
                                                                 </div>
                                          
                                                            </div>
                                          
                                                            <div class="main-part12">
                                                                 <table style="border-collapse: collapse;">
                                                                      <thead>
                                                                           <th>G  P  L  A  D</th>
                                                                           <th>PREGNANT</th>
                                                                           <th>BREAST FEEDING</th>
                                                                           <th>PLANNING OF CONCEIVE</th>
                                                                           <th>CONTRACEPTION</th>
                                                                           <th>PILLS</th>
                                                                           <th>INJECTION</th>
                                                                           <th>OTHER</th>
                                                                      </thead>
                                                                      <tbody>
                                                                         ${data?.opdobstetricshistoryarray?.map(
                                                                           (
                                                                             res,
                                                                             i,
                                                                           ) => {
                                                                             return `
                                                                                  <tr key=${i}>
                                                                                    <td>G${
                                                                                      res.g
                                                                                    }P${
                                                                               res.p
                                                                             }L${
                                                                               res.l
                                                                             }A${
                                                                               res.a
                                                                             }D${
                                                                               res.d
                                                                             }</td>
                                                                                    <td>${
                                                                                      res.pregnant
                                                                                    }</td>
                                                                                    <td>${
                                                                                      res.breastFeeding
                                                                                    }</td>
                                                                                    <td>${
                                                                                      res.conception
                                                                                    }</td>
                                                                                    <td>${
                                                                                      res.contraception
                                                                                    }</td>
                                                                                    <td>${
                                                                                      res.pillsChecked ===
                                                                                      true
                                                                                        ? 'yes'
                                                                                        : 'no'
                                                                                    }</td>
                                                                                    <td>${
                                                                                      res.injuctionChecked ===
                                                                                      true
                                                                                        ? 'yes'
                                                                                        : 'no'
                                                                                    }</td>
                                                                                    <td>${
                                                                                      res.otherChecked ===
                                                                                      true
                                                                                        ? 'yes'
                                                                                        : 'no'
                                                                                    }</td>
                                                                                  </tr>`;
                                                                           },
                                                                         )}
                                                                      </tbody>
                                                                 </table>
                                                            </div>`;
    const menstrualHistoryData = `
                                        <div class="head-content2">
                                                            <div class="head-content2-part1">
                                                                 <h3 style="margin: 0;
                                                                      padding: 16px 20px;text-align: left;">MENSTRUAL</h3>
                                                            </div>
                                        
                                                       </div>
                                        
                                                       <div class="main-part12">
                                                            <table style="border-collapse: collapse;">
                                                                 <thead>
                                                                      <th>MENARCH AGE</th>
                                                                      <th>PERIOD</th>
                                                                      <th>QUALITY OF BLOOD FLOW</th>
                                                                      <th>PAIN DURING CYCLE</th>
                                                                      <th>MENOPAUSE</th>
                                                                      <th>LMP</th>
                                                                      <th>DURATION</th>
                                                                    
                                                                 </thead>
                                                                 <tbody>
                                                                      ${data?.opdmenstrualhistoryarray?.map(
                                                                        (
                                                                          res,
                                                                          i,
                                                                        ) => {
                                                                          return `
                                                                                <tr key=${i}>
                                                                                     <td>${res.menarche_age}</td>
                                                                                     <td>${res.periods}</td>
                                                                                     <td>${res.qualityofbloodflow}</td>
                                                                                     <td>${res.painduringcycle}</td>
                                                                                     <td>${res.menopause}</td>
                                                                                     <td>${res.lmp}</td>
                                                                                     <td>${res.durations}</td>
                                                                                </tr>`;
                                                                        },
                                                                      )}
                                                                 </tbody>
                                                            </table>
                                                       </div>`;

    const vitalHistoryData = `
                         <div class="head-content2">
                                             <div class="head-content2-part1">
                                                  <h3 style="margin: 0;
                                                       padding: 16px 20px;text-align: left;">VITALS</h3>
                                             </div>
                         
                                        </div>
                         
                                        <div class="main-part12">
                                             <table style="border-collapse: collapse;">
                                                  <thead>
                                                       <th>TEMP</th>
                                                       <th>PULSE</th>
                                                       <th>SPO2</th>
                                                       <th>BP</th>
                                                       <th>RR</th>
                                                       <th>GC</th>
                                                  </thead>
                                                  <tbody>
                                                       ${data?.opdvitalshistoryarray?.map(
                                                         (res, i) => {
                                                           return `
                                                                 <tr key=${i}>
                                                                 <td>${res.p_temp} F</td>
                                                                 <td>${res.p_pulse} /min</td>
                                                                 <td>${res.p_spo2} /%</td>
                                                                 <td>${res.p_systolicbp} / ${res.p_diastolicbp} /mmHg</td>
                                                                 <td>${res.p_rsprate}</td>
                                                                 <td>${res.gcss_status}(E${res.eyeopening}V${res.verbalResponse}M${res.motorResponse}</td>
                                                                 </tr>`;
                                                         },
                                                       )}
                                                  </tbody>
                                             </table>
                                        </div>`;
    const generalexaminationHistoryData = `
                                        <div class="head-content2">
                                                            <div class="head-content2-part1">
                                                                 <h3 style="margin: 0;
                                                                      padding: 16px 20px;text-align: left;">GENERAL EXAMINATION</h3>
                                                            </div>
                                        
                                                       </div>
                                        
                                                       <div class="main-part12">
                                                            <table style="border-collapse: collapse;">
                                                                 <thead>
                                                                      <th>PALLOR</th>
                                                                      <th>CYANOSIS</th>
                                                                      <th>LCTERUS</th>
                                                                      <th>LN</th>
                                                                      <th>ODEMA</th>
                                                                 </thead>
                                                                 <tbody>
                                                                      ${data?.opdgeneralexaminationhistoryarray?.map(
                                                                        (
                                                                          res,
                                                                          i,
                                                                        ) => {
                                                                          return `
                                                                                <tr key=${i}>
                                                                                     <td>${res.pallor}</td>
                                                                                     <td>${res.cyanosis}</td>
                                                                                     <td>${res.icterus}</td>
                                                                                     <td>${res.ln}</td>
                                                                                     <td>${res.odema}</td>
                                                                                </tr>`;
                                                                        },
                                                                      )}
                                                                 </tbody>
                                                            </table>
                                                       </div>`;
    const diagnosisHistoryData = `
                                        <div class="head-content2">
                                                            <div class="head-content2-part1">
                                                                 <h3 style="margin: 0;
                                                                      padding: 16px 20px;text-align: left;">DIAGNOSIS</h3>
                                                            </div>
                                        
                                                       </div>
                                        
                                                       <div class="main-part12">
                                                            <table style="border-collapse: collapse;">
                                                                 <thead>
                                                                      <th>ICD CODE</th>
                                                                      <th>DIAGNOSIS</th>
                                                                      <th>DIAGNOSIS TYPE</th>
                                                                      <th>DATE / TIME </th>
                                                                 </thead>
                                                                 <tbody>
                                                                      ${data?.opddiagnosishistoryarray?.map(
                                                                        (
                                                                          res,
                                                                          i,
                                                                        ) => {
                                                                          return `
                                                                                <tr key=${i}>
                                                                                     <td>${res.icdcode}</td>
                                                                                     <td>${res.illnessname}</td>
                                                                                     <td>${res.diagnosis_type}</td>
                                                                                     <td>${res.adddate} / ${res.addtime}</td>
                                                                                </tr>`;
                                                                        },
                                                                      )}
                                                                 </tbody>
                                                            </table>
                                                       </div>`;
    const planofcareHistoryData = `
                                                       <div class="head-content2">
                                                                           <div class="head-content2-part1">
                                                                                <h3 style="margin: 0;
                                                                                     padding: 16px 20px;text-align: left;display: flex;flex-wrap : wrap;text-transform: capitalize;">PLAN OF CARE : ${
                                                                                       data
                                                                                         ?.opdplanofcarehistoryarray
                                                                                         ?.length >
                                                                                       0
                                                                                         ? Object.keys(
                                                                                             data
                                                                                               .opdplanofcarehistoryarray[0],
                                                                                           ).join(
                                                                                             ' , ',
                                                                                           )
                                                                                         : ''
                                                                                     }</h3>
                                                                           </div>
                                                       
                                                                      </div>`;
    const treatmentHistoryData = `
                                   <div class="head-content2">
                                                       <div class="head-content2-part1">
                                                            <h3 style="margin: 0;
                                                                 padding: 16px 20px;text-align: left;">TREATMENT</h3>
                                                       </div>
                                   
                                                  </div>
                                   
                                                  <div class="main-part12">
                                                       <table style="border-collapse: collapse;">
                                                            <thead>
                                                            <th>DRUG CODE</th>
                                                            <th>DRUG NAME</th>
                                                            <th>BRAND NAME</th>
                                                            <th>DOSE</th>
                                                            <th>ROUTE</th>
                                                            <th>AUNPAN</th>
                                                            <th>SCHEDULE</th>
                                                            <th>DATE</th>
                                                            </thead>
                                                            <tbody>
                                                                 ${data?.opdtreatmenthistoryarray?.map(
                                                                   (res, i) => {
                                                                     return `
                                                                           <tr key=${i}>
                                                                           <td>${res.drugcode}</td>
                                                                           <td>${res.drugname}</td>
                                                                           <td>${res.brandname}</td>
                                                                           <td>${res.dose}</td>
                                                                           <td>${res.route}</td>
                                                                           <td>${res.anupan}</td>
                                                                           <td>${res.schedule}</td>
                                                                           <td>${res.dateValues}</td>
                                                                         
                                                                           </tr>`;
                                                                   },
                                                                 )}
                                                            </tbody>
                                                       </table>
                                                  </div>`;
    const procedureHistoryData = `
                                                  <div class="head-content2">
                                                                      <div class="head-content2-part1">
                                                                           <h3 style="margin: 0;
                                                                                padding: 16px 20px;text-align: left;">PROCEDURE</h3>
                                                                      </div>
                                                  
                                                                 </div>
                                                  
                                                                 <div class="main-part12">
                                                                      <table style="border-collapse: collapse;">
                                                                           <thead>
                                                                           <th>NAME</th>
                                                                           <th>TIME</th>
                                                                           <th>KIT</th>
                                                                           <th>PROCEDURE TYPE</th>
                                                                           <th>DAYS</th>
                                                                           </thead>
                                                                           <tbody>
                                                                                ${data?.opdprocedurehistoryarray?.map(
                                                                                  (
                                                                                    res,
                                                                                    i,
                                                                                  ) => {
                                                                                    return `
                                                                                          <tr key=${i}>
                                                                                          <td>${res.procedurename}</td>
                                                                                          <td>${res.proceduretime}</td>
                                                                                          <td>${res.procedurekit}</td>
                                                                                          <td>${res.proceduretype}</td>
                                                                                          <td>${res.proceduredays}</td>
                                                                                        
                                                                                          </tr>`;
                                                                                  },
                                                                                )}
                                                                           </tbody>
                                                                      </table>
                                                                 </div>`;
    const adviceHistoryData = `
                                                                 <div class="head-content2">
                                                                                     <div class="head-content2-part1">
                                                                                          <h3 style="margin: 0;
                                                                                               padding: 16px 20px;text-align: left;">ADVICE :  ${data?.opdadvicehistoryarray?.map(
                                                                                                 (
                                                                                                   res,
                                                                                                   i,
                                                                                                 ) => {
                                                                                                   return `
                                                                                                            <tr key=${i}>
                                                                                                            <td>${res.opdtemplate_text}</td>
                                                                                                            
                                                                                                          
                                                                                                            </tr>`;
                                                                                                 },
                                                                                               )} </h3>
                                                                                     </div>
                                                                 
                                                                                </div>
                                                                 
                                                                               `;

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

<body style="border: 1px solid;">
     <div class="head">
          <div>
               <img src=${data?.hosp_logo} style="width: 14vw;" />
          </div>
          <div class="head-content">
               <h1>${data?.hosp_name}</h1>
               <p>( OPERATED BY MedAyu HEALTHCARE LLP )</p>
               <p>${data?.hosp_address}</p>
          </div>
          <div class="head-content"></div>
     </div>
    
<div class="head-content3">
<div class="head-content3-part1">
<h3 style="margin: 0;
padding: 8px;">UHID NO : <span>${data?.patientuniqueno}</span> </h3>
<h3 style="margin: 0;
padding: 8px;">OP NO : <span>${data?.AppArray[0].appoint_id}</span> </h3>
<h3 style="margin: 0;
padding: 8px;">DATE : <span>${data?.registerdate}</span> </h3>
</div>
<div class="head-content3-part2">
<h3 style="margin: 0;
padding: 8px;">NAME : <span>${data?.firstname}</span> </h3>
<h3 style="margin: 0;
padding: 8px;">AGE : <span>${data?.patientage}</span></h3>
<h3 style="margin: 0;
padding: 8px;">GENDER : <span>${data?.patientgender}</span> </h3>
</div>
<div class="head-content3-part3">
<h3 style="margin: 0;
padding: 8px; width: 106%;">CONSULTANT NAME : <span>${
      data?.AppArray[0].name
    }</span> </h3>

<h3 style="margin: 0;width: 50%;
padding: 8px;">TIME : <span>${data?.AppArray[0].slot_id}</span></h3>
</div>


</div>

${data?.opdcomplaintArray?.length > 0 ? _complainttableRows : ''}
${data?.opddiagnosishistoryarray?.length > 0 ? diagnosisHistoryData : ''}
${data?.opdtreatmenthistoryarray?.length > 0 ? treatmentHistoryData : ''}
${data?.opdvitalshistoryarray?.length > 0 ? vitalHistoryData : ''}
${data?.opdpasthistoryarray?.length > 0 ? pastHistoryData : ''}
${data?.opdfamilyhistoryarray?.length > 0 ? familyHistoryData : ''}
${data?.opdmedicinehistoryarray?.length > 0 ? medicineHistoryData : ''}
${data?.opdpersonalhistoryarray?.length > 0 ? personalHistoryData : ''}
${data?.opdobstetricshistoryarray?.length > 0 ? obstetricsHistoryData : ''}
${data?.opdmenstrualhistoryarray?.length > 0 ? menstrualHistoryData : ''}
${
  data?.opdgeneralexaminationhistoryarray?.length > 0
    ? generalexaminationHistoryData
    : ''
}
${data?.opdplanofcarehistoryarray?.length > 0 ? planofcareHistoryData : ''}
${data?.opdprocedurehistoryarray?.length > 0 ? procedureHistoryData : ''}
${data?.opdadvicehistoryarray?.length > 0 ? adviceHistoryData : ''}

<br />
<div class="main4">
<div style="width: 100%;">
<p><b>${data?.consultantname || '----------'}</b></p>
<p>${data?.designation || '----------'} </p>
<p>REG. NO. 2008/10/3546 </p>
</div>
</div>
<div class="main5">
<p>${data?.hosp_mobile}</p>
<p>www.medayu.in </p>
<p>${data?.hosp_email}</p>
</div>
</body>

</html>`;
    await RNPrint.print({
      html,
    });
  } catch (error) {
    console.error(error);
  }
};
