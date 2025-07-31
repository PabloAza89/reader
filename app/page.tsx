"use client"

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
//import styles from "./page.module.css";
import styles from "./page.module.css";
//import asd from "./resources.arsc";
//import fs from 'fs';
//const fs = require('fs');
import { promises as fs } from 'fs';

function Home() {

  //const [hexContent, setHexContent] = useState('');
  const [hexContent, setHexContent] = useState<string[][]>([]);

  // const [hexContent, setHexContent] = useState([
  //   ['02', '00', '0c', '00', '5c', '93', 'fa', '00', '04', '00', '00', '00', '01', '00', '1c', '00'],
  //   ['84', '64', 'a8', '00', 'f6', '52', '02', '00', '1b', '05', '00', '00', '00', '01', '00', '00'],
  //   ['60', '60', '09', '00', 'cc', '12', 'a8', '00', '00', '00', '00', '00', '48', '00', '00', '00'],
  //   ['90', '00', '00', '00', '98', '00', '00', '00', 'b6', '00', '00', '00', 'cb', '00', '00', '00'],
  //   ['f0', '00', '00', '00', '00', '01', '00', '00', '17', '01', '00', '00', '48', '01', '00', '00'],
  // ]);
  //const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        //const hexString = arrayBufferToHex(arrayBuffer);
        const uint8Array = new Uint8Array(arrayBuffer);

        //console.log("LENGTH A VER", Math.ceil(uint8Array.length / 16))
        //console.log("LENGTH A VER", Math.ceil(uint8Array.length / 16))
        Math.ceil(uint8Array.length / 16)
        //console.log("LENGTH A VER", uint8Array.length)
        //const hexString = [];
        const total = Math.ceil(uint8Array.length / 16)
        //const total2 = total.toString().length
        const hexString: string[][] = Array.from({ length: total }, () => []);

        //for (let i = 0; i < uint8Array.length; i + 8) {
          //for (let i = 0; i < uint8Array.length; i++) {

          // for (let i = 0; i < uint8Array.length; i++) {
          //   const target = i / 16;
          //   const target2 = i % 16;
          //   if (target2 === 0) hexString[Math.floor(target)] = [uint8Array[i].toString(16).padStart(2, '0')]
          //   else hexString[Math.floor(target)].push(uint8Array[i].toString(16).padStart(2, '0'))

          // }
          //const target = i / 16;
          for (let i = 0; i < uint8Array.length; i++) {
            //const target = i / 16;
            // const target2 = i % 16;
            const target = i / 16;
            // if (target2 === 0) hexString[Math.floor(target)] = [uint8Array[i].toString(16).padStart(2, '0')]
            // else hexString[Math.floor(target)].push(uint8Array[i].toString(16).padStart(2, '0'))
            //hexString[Math.floor(target)][] = uint8Array[i].toString(16).padStart(2, '0')
            //hexString[Math.floor(target)].push(uint8Array[i].toString(16).padStart(2, '0'))
            hexString[Math.floor(target)].push(uint8Array[i].toString(16).padStart(2, '0'))
          }

        setHexContent(hexString);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const RES_NULL_TYPE                     = '0000'; // already little-endian
  const RES_STRING_POOL_TYPE              = '0100'; // 
  const RES_TABLE_TYPE                    = '0200';
  const RES_XML_TYPE                      = '0300';

    // Chunk types in RES_XML_TYPE
  const RES_XML_FIRST_CHUNK_TYPE          = '0001';
  const RES_XML_START_NAMESPACE_TYPE      = '0001';
  const RES_XML_END_NAMESPACE_TYPE        = '0101';
  const RES_XML_START_ELEMENT_TYPE        = '0201';
  const RES_XML_END_ELEMENT_TYPE          = '0301';
  const RES_XML_CDATA_TYPE                = '0401';
  const RES_XML_LAST_CHUNK_TYPE           = '7f01';
    // This contains a uint32_t array mapping strings in the string
    // pool back to resource identifiers.  It is optional.
  const RES_XML_RESOURCE_MAP_TYPE         = '8001';

    // Chunk types in RES_TABLE_TYPE
  const RES_TABLE_PACKAGE_TYPE            = '0002';
  const RES_TABLE_TYPE_TYPE               = '0102';
  const RES_TABLE_TYPE_SPEC_TYPE          = '0202';
  const RES_TABLE_LIBRARY_TYPE            = '0302';
  const RES_TABLE_OVERLAYABLE_TYPE        = '0402';
  const RES_TABLE_OVERLAYABLE_POLICY_TYPE = '0502';
  const RES_TABLE_STAGED_ALIAS_TYPE       = '0602';

  //console.log("33", hexContent)
  //console.log("33", hexContent)

  //console.log("33 LENGTH", hexContent.length)
  //console.log("33 LENGTH", hexContent.length.toString().length)

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

  //const qq = hexContent.map((e: [], i) =>  <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{e.join(' ')}</div>)
  //const qq = hexContent.map((e: [], i) =>  <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{e.join(' ')}</div>)

  // const canvas = document.getElementById('myCanvas');
  // let ctx;
  // if (canvas !== null) ctx = canvas.getContext('2d');
  // //const ctx = canvas.getContext('2d');

  // const cellWidth = 50;
  // const cellHeight = 50;

  // for (let row = 0; row < hexContent.length; row++) {
  //   for (let col = 0; col < hexContent[row].length; col++) {
  //       const value = hexContent[row][col];
  //       const x = col * cellWidth;
  //       const y = row * cellHeight;

  //       // Customize drawing based on the cell's value
  //       if (value === 1) {
  //           ctx.fillStyle = 'blue';
  //       } else {
  //           ctx.fillStyle = 'lightgray';
  //       }

  //       ctx.fillRect(x, y, cellWidth, cellHeight);
  //       ctx.strokeStyle = 'black'; // Optional: Add a border
  //       ctx.strokeRect(x, y, cellWidth, cellHeight);
  //       //ctx.fillText('My text', x, y);
  //   }
  // }

  const padStart = hexContent.length.toString().length

  return (
    <div>
      <input type="file" /* ref={fileInputRef} */ onChange={handleFileChange} />
      {hexContent && (
        <div>
          <h3>Hexadecimal Content:</h3>
          <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 'large', background: 'lavender', width: 'fit-content' }}>

            {/* {
              hexContent.map((e: string[], i) => {
                return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }} key={i}>{e.join(' ')}</div>
              })
            } */}

            {/* <canvas id="myCanvas" width="400" height="400"></canvas> */}
            {/* <div style={{width: '100%', border: '1px solid black', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }} >
              {hexContent.map((row: [], rowIndex) => ( // Skip the header row
                row.toString()
              ))}
            </div> */}

            {
              /* hexContent[Symbol.iterator]() */
              //hexContent.join(' ')
              //hexContent.join("\n")
              /* hexContent.map((iA: [], idx) => iA.join(`${idx} `)).join(`\n`) */
              //hexContent.map((iA: [], idx) => { return iA.join(` `) } ).join(`\n`)
              //hexContent.map((iA: [], idx) => { return `${idx} ${iA}` } ).join(`\n`)
              hexContent.map((item: [], index) => {
                return `${`${(++index)}`.padStart(padStart, '0')}. ${item.join(' ')}`; // Adds 1 to index for 1-based numbering
              }).join("\n")
            }


          </div>
        </div>
      )}
    </div>
  );

}

export default Home;
//export default React.memo(Home);