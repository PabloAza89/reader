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

  const [originalArray, setOriginalArray] = useState<string[]>([]);
  const [originalArray2, setOriginalArray2] = useState<string[]>([]);
  //let originalArray = []
  const [toShow, setToShow] = useState<string[][]>([]);

  const [ indices, setIndices ] = useState<string[]>([]);

  const [ indicesTest, setIndicesTest ] = useState<string[]>([]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        //const hexString = arrayBufferToHex(arrayBuffer);
        const uint8Array = new Uint8Array(arrayBuffer);

        //console.log("ARRAY BUFFER", uint8Array)

        //let qq = new DataView(arrayBuffer)

        //console.log("NEW TEST")

        //const raw: string[] = Array.from(uint8Array, e => e.toString(16).padStart(2, '0') )
        //setOriginalArray(Array.from(uint8Array, e => e.toString(16).padStart(2, '0')))

        console.log("a ver len este", Math.floor(uint8Array.length / 16))

        //let pad = Array.from({ length: uint8Array.length }, (_, index) => index * 16)

        //let pad = indices[indices.length - 1].toString().length
        //let pad = indices[indices.length - 1].toString().length

        let len = Math.ceil(uint8Array.length / 16)
        console.log("len len", len)

        let indices = Array.from({ length: len  }, (_, index) => (index * 16).toString().padStart(8, '0'))

        setIndices(Array.from({ length: len  }, (_, index) => (index * 16).toString().padStart(8, '0')))

        const arr = Array.from(uint8Array, e => e.toString(16).padStart(2, '0'))
        console.log("a verrrr", arr.length)
        const chunkedArray = [];
        const arrIndices = []
        for (let i = 0; i < arr.length; i += 4000) {
          chunkedArray.push(arr.slice(i, i + 4000));
          //Array.from({ length: 250  }, (_, index) => (i + (index * 16)).toString().padStart(8, '0'))
          arrIndices.push(Array.from({ length: 250  }, (_, index) => (i + (index * 16)).toString().padStart(8, '0')))
        }
        console.log("chunked lenght", chunkedArray.length)
        setToShow(chunkedArray)
        setIndicesTest(arrIndices)
        setOriginalArray2(['done'])

        // const raw: string[] = [
        //   '02', '00', '0c', '00', '5c', '93', 'fa', '00', '04', '00', '00', '00', '01', '00', '1c', '00',
        //   '84', '64', 'a8', '00', 'f6', '52', '02', '00', '1b', '05', '00', '00', '00', '01', '00', '00',
        //   '60', '60', '09', '00', 'cc', '12', 'a8', '00', '00', '00', '00', '00', '48', '00', '00', '00',
        //   '90', '00', '00', '00', '98', '00', '00', '00', 'b6', '00', '00', '00', 'cb', '00', '00', '00',
        //   'f0', '00', '00', '00', '00', '01', '00', '00', '17', '01', '00', '00', '48', '01', '00', '00',
        // ]

        //const raw: string[] = ['02','00','0c','00','5c','93','fa','00','04','00','00','00','01','00','1c','00']
        //const raw: string[] = ['02','00','0c','00','5c','93','fa','00','04','00','00','00','01','00','1c','00','02','00','0c','00','5c','93','fa','00','04','00','00','00','01','00','1c','00']
        //const raw: string[] = ['0 0']
        //setToShow(raw)

        //const raw2: string[] = [...raw]

        //setOriginalArray(raw);

        // for (let i = 16; i < raw2.length; i += 16) {
        //   //raw[i] = modificationFn(arr[i], i, arr);
        //   raw2[i] = `g${raw2[i]}`
        // }

        //console.log("RAW", raw)
        //console.log("RAW 2", raw2)

        //console.log("RAW 3", raw2.join(' ').split('g'))

        //setToShow(raw2.join(' ').split('\g'));
        
      };
      reader.readAsArrayBuffer(file);
    }
  };

  console.log("last indice", indices[indices.length -1])

  // let padStart = indices && indices[indices.length - 1].toString().length

  let padStart// = indices && indices[indices.length - 1].toString().length

  //if (indices[indices.length - 1]) padStart = indices[indices.length - 1].toString().length
  if (indices[indices.length - 1]) padStart = indices[indices.length - 1].toString().length + 1

  console.log("padStart", padStart)

  // console.log("last indice wich", indices[indices.length -1])
  // console.log("last indice length", indices.length)

  console.log("indicesTest", indicesTest)
  console.log("indicesTest length", indicesTest.length)
  console.log("indicesTest last", indicesTest[0])
  //console.log("indicesTest last", indicesTest[indicesTest.length -1])

  useEffect(() => {
    const updateScrollPosition = () => {
      //setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };

    // let qq = document.getElementById('aaa')
    // //console.log("QQ", qq)
    // //console.log(qq)
    // console.dir(qq)

    // if (qq !== null) {
    //   qq.addEventListener('scroll', function(){
    //     console.log("QQ offsetHeight", qq.offsetHeight)
    //     //console.log("QQ position iH", window.innerHeight)
    //     //console.log("QQ position", window)
    //   }, { passive: true });
    // }
    

    //window.addEventListener('scroll', updateScrollPosition, { passive: true });
    window.addEventListener('scroll', function(){
      console.log("position sY", window.scrollY-32) // curr pos
      console.log("position iH", window.innerHeight) // thumb dimen
      //console.log("total", (window.scrollY + window.innerHeight) -32)
      console.log("window", window)

      console.log("max", 4000 - this.innerHeight) // OK
      console.log("percent", (this.scrollY-32) / (4000 - this.innerHeight)) // OK
      console.log("abs thumb", (this.innerHeight) * ((this.scrollY-32) / (4000 - this.innerHeight)))
      console.log("abs scroll", (window.scrollY-32) + ((this.innerHeight) * ((this.scrollY-32) / (4000 - this.innerHeight))))
    }, { passive: true });

    // document.addEventListener('scroll', function(){
    //   //console.log("document", this)
    //   console.dir(this)
    //   //console.log("position iH", window.innerHeight)
    //   //console.log("position", window)
    // }, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, []);

  return (
    <div id={'aaa'}style={{ display: 'flex', flexDirection: 'row'}}>
        <div  style={{ background: 'lightyellow', marginTop: '32px', width: `${padStart}ch`, lineHeight: '16px', fontFamily: 'monospace', fontSize: '16px', }} >
          {
            //indices.join(' ')
            //indicesTest[0] && indicesTest[0].join(' ')+" "
            indicesTest[0] && indicesTest[indicesTest.length -1].join(' ')+" "
          }
        </div>
        <div>
          <input type="file" onChange={handleFileChange} style={{ background: 'red', height: '32px' }} />
          <div style={{ /* whiteSpace: 'pre-wrap', */ fontFamily: 'monospace', /* fontSize: 'large', */ background: 'lavender',
            /* width: 'fit-content', */ lineHeight: '16px', width: '48ch',
            fontSize: '16px'
            /* , minWidth: 'max-content' */ }}>

            {


              //originalArray.map(e => `${e} `)
              //originalArray.join(' ')
              //toShow[0] && toShow[0].join(' ')+" "
              toShow[0] && toShow[toShow.length -1].join(' ')+" "
              //toShow[4105] && toShow[4105].join(' ')+" "
              //toShow && toShow.join(' ')
              //originalArray.map(e => e).join(' ')

            }

            {/* { toShow[1] && toShow[1].join(' ') } */}

            

          </div>
        </div>

      
    </div>
  );

}

export default Home;