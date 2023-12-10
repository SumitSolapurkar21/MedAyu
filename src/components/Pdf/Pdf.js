import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const Pdf = () => {
  const [pdfPath, setPdfPath] = useState('');
  const generatePDF = async () => {
    const {fs} = RNFetchBlob;
    const path = fs.dirs.DocumentDir + '/bill.pdf';
    console.log(path);
    const options = {
      html: html,
      fileName: 'bill',
      directory: '',
    };

    const pdf = await RNHTMLtoPDF.convert(options);

    setPdfPath(pdf.filePath);
  };
  useEffect(() => {
    generatePDF();
  }, []);
  const sharePdf = async () => {
    if (pdfPath) {
      const shareOptions = {
        title: 'Share file',
        failOnCancel: false,
        url: `file://${pdfPath}`,
      };

      try {
        await Share.open(shareOptions);
      } catch (error) {
        console.log('Error sharing PDF:', error.message);
      }
    }
  };
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
  
       .head-content2 {
            display: flex;
            justify-content: space-between;
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
  </style>
  </head>
  
  <body style="border: 1px solid;">
  <div class="head">
       <div>
            <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 10vw;" />
       </div>
       <div class="head-content">
            <h1>Sumit Soalpurkar</h1>
            <p>50 Gobibar Chowk Nagpur 440018</p>
            <p>Phone no . 9811179160 - Email : sumitqwert21@gmail.com</p>
            <p>GSTIN : 6765765HGDHGSYUTUY654 - STATE : 27-MAHARASHTRA</p>
       </div>
  </div>
  <div class="head-content2">
       <div class="head-content2-part1">
            <div style="background-color: green;">
                 <h3 style="color: white;    margin: 0;
                 padding: 8px;">Bill To</h3>
            </div>
            <div style="line-height: 0.5;">
                 <h3>Sumit Soalpurkar</h3>
                 <p>Phone no . 9811179160 - Email : sumitqwert21@gmail.com</p>
                 <p>STATE : 27-MAHARASHTRA</p>
            </div>
       </div>
       <div class="head-content2-part2">
            <p>Sumit Soalpurkar</p>
            <p>50 Gobibar Chowk Nagpur 440018</p>
            <p>Phone no . 9811179160 - Email : sumitqwert21@gmail.com</p>
            <p>GSTIN : 6765765HGDHGSYUTUY654 - STATE : 27-MAHARASHTRA</p>
       </div>
  </div>
  <table style="border-collapse: collapse;">
       <thead style="background-color: green ;">
            <th>#</th>
            <th>Particulars</th>
            <th>Type of services</th>
            <th>Amount</th>
       </thead>
  </table>
  
  </body>
  </html>
  `;
  const exportPdf = async () => {
    await RNPrint.print({
      html,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={sharePdf}>
        <FontAwesome6 name="file-pdf" color="#1669f0" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Pdf;

const styles = StyleSheet.create({});
