"use client"

//import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
//import styles from "./page.module.css";
//import styles from "./page.module.css";
//import asd from "./resources.arsc";
//import fs from 'fs';
//const fs = require('fs');
//import { promises as fs } from 'fs';

function Home() {

  //const [hexContent, setHexContent] = useState('');
  //const [hexContent, setHexContent] = useState<string[][]>([]);
  const [originalArray, setOriginalArray] = useState<string[]>([]);
  const [toShow, setToShow] = useState<string[]>([]);
  //let toDisplay = ''

  // const [originalArray, setOriginalArray] = useState([
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

        const raw: string[] = Array.from(uint8Array, e => e.toString(16).padStart(2, '0') )

        // const raw: string[] = [
        //   '02', '00', '0c', '00', '5c', '93', 'fa', '00', '04', '00', '00', '00', '01', '00', '1c', '00',
        //   '84', '64', 'a8', '00', 'f6', '52', '02', '00', '1b', '05', '00', '00', '00', '01', '00', '00',
        //   '60', '60', '09', '00', 'cc', '12', 'a8', '00', '00', '00', '00', '00', '48', '00', '00', '00',
        //   '90', '00', '00', '00', '98', '00', '00', '00', 'b6', '00', '00', '00', 'cb', '00', '00', '00',
        //   'f0', '00', '00', '00', '00', '01', '00', '00', '17', '01', '00', '00', '48', '01', '00', '00',
        // ]

        const raw2: string[] = [...raw]

        setOriginalArray(raw);

        for (let i = 16; i < raw2.length; i += 16) {
          //raw[i] = modificationFn(arr[i], i, arr);
          raw2[i] = `g${raw2[i]}`
        }

        console.log("RAW 2", raw2)

        console.log("RAW 3", raw2.join(' ').split('g'))

        setToShow(raw2.join(' ').split('\g'));
        
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

  const padStart = Math.ceil(originalArray.length / 16).toString().length

  console.log("hexContent", originalArray)

  console.log("toDisplay", toShow)

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {originalArray && (
        <div>
          <h3>Hexadecimal Content:</h3>
          <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 'large', background: 'lavender', width: 'fit-content' }}>

            {
              /* hexContent.join(' ') */
              //hexContent.join("\n")
              //toShow.join("\n")
              //toShow.join(" ")
              toShow.map((item, index) => {
                //return `${`${(++index)}`.padStart(newPadStart, '0')}. ${item}`; // Adds 1 to index for 1-based numbering
                return `${`${(index+1)}`.padStart(padStart, '0')}: ${item}`; // Adds 1 to index for 1-based numbering
                //return `${item}`; // Adds 1 to index for 1-based numbering
              }).join("\n")
            }

          </div>
        </div>
      )}
    </div>
  );

}

export default Home;