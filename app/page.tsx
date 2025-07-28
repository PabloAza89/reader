"use client"

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
//import styles from "./page.module.css";
import styles from "./page.module.css";
//import asd from "./resources.arsc";
//import fs from 'fs';
//const fs = require('fs');
import { promises as fs } from 'fs';

export default function Home() {

  //const [hexContent, setHexContent] = useState('');
  const [hexContent, setHexContent] = useState([]);
  //const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        //const hexString = arrayBufferToHex(arrayBuffer);

         const uint8Array = new Uint8Array(arrayBuffer);
        const hexString = [];
        //for (let i = 0; i < uint8Array.length; i + 8) {
          //for (let i = 0; i < uint8Array.length; i++) {
          for (let i = 0; i < uint8Array.length; i++) {
            //const byte = uint8Array[i];
            //hexString += byte.toString(16).padStart(2, '0');
            //let innerArr = []
            //innerArr.push(uint8Array[i].toString(16).padStart(2, '0'))
            //hexString[Math.floor(i / 16)] = uint8Array[i].toString(16).padStart(2, '0')
            //hexString[Math.floor(i / 4)] = uint8Array[i].toString(16).padStart(2, '0')
            //hexString[0] = uint8Array[i].toString(16).padStart(2, '0')
            //hexString[Math.floor(i / 16)] = uint8Array[i].toString(16).padStart(2, '0')
            //hexString[Math.floor(i / 16)][i] = uint8Array[i].toString(16).padStart(2, '0')
            //hexString[Math.floor(i / 16)].push(uint8Array[i].toString(16).padStart(2, '0'))
            const target = i / 16;
            const target2 = i % 16;
            if (target2 === 0) hexString[Math.floor(target)] = [uint8Array[i].toString(16).padStart(2, '0')]
            else hexString[Math.floor(target)].push(uint8Array[i].toString(16).padStart(2, '0'))


            //console.log("33", uint8Array[i])
            //console.log("33", uint8Array[i].toString(16).padStart(2, '0'))
            //console.log("33", Math.floor(i / 16))
            ///hexString.push(uint8Array[j].toString(16).padStart(2, '0'))
          }
        //}
        //return hexString;


        setHexContent(hexString);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  //console.log("33", hexContent)
  console.log("33", hexContent)

  // const arrayBufferToHex = (arrayBuffer) => {
  //   const uint8Array = new Uint8Array(arrayBuffer);
  //   const hexString = [];
  //   for (let i = 0; i < uint8Array.length; i++) {
  //     //const byte = uint8Array[i];
  //     //hexString += byte.toString(16).padStart(2, '0');
  //     hexString.push(uint8Array[i].toString(16).padStart(2, '0'))
  //   }
  //   return hexString;
  // };

  return (
    <div>
      <input type="file" /* ref={fileInputRef} */ onChange={handleFileChange} />
      {hexContent && (
        <div>
          <h3>Hexadecimal Content:</h3>
          <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {/* {hexContent.map(e => e)} */}
            {/* {hexContent.join(' ')} */}
            {/* {hexContent.toString()} */}
            {/* {hexContent.join(' ')} */}
          </div>
        </div>
      )}
    </div>
  );

}
