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
  //const [originalArray2, setOriginalArray2] = useState<string[]>([]);
  //let originalArray = []
  const [toShow, setToShow] = useState<string[][]>([]);

  const [done, setDone] = useState<string[][]>([]);

  const arrHex = useRef<string[][]>([['']])

  const arrInd = useRef<string[][]>([['']])

  const [ indices, setIndices ] = useState<string[][]>([]); // ←←← DON'T USE IT!!

  const [ indicesTest, setIndicesTest ] = useState<string[]>([]);

  //const [ currentIndex, setCurrentIndex ] = useState(0)

  const currentIndex = useRef(0)

  console.log("currentIndex.current", currentIndex.current)
  //console.log()

  // useEffect(() => {
  //   console.log("scroll curr + thumb", currentIndex) // TRACKING
  // }, [currentIndex])

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

        //console.log("a ver len este", Math.floor(uint8Array.length / 16))

        //let pad = Array.from({ length: uint8Array.length }, (_, index) => index * 16)

        //let pad = indices[indices.length - 1].toString().length
        //let pad = indices[indices.length - 1].toString().length

        //let len = Math.ceil(uint8Array.length / 16)
        //console.log("len len", len)

        //let indices = Array.from({ length: len  }, (_, index) => (index * 16).toString().padStart(8, '0'))

        //setIndices(Array.from({ length: len  }, (_, index) => (index * 16).toString().padStart(8, '0')))

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
        //setToShow(chunkedArray)
        arrHex.current = chunkedArray
        arrInd.current = arrIndices

        if (hexDivRef.current && indDivRef.current) { // FIRST UPDATE
          //hexDivRef.current.textContent = `${qq > 0 ? toShowRef.current[qq-1].join(' ') : ''} ${qq > 4105 ? '' : toShowRef.current[qq].join(' ')} ${qq > 4104 ? '' : toShowRef.current[qq+1].join(' ')} ` // NEW! work at start
          // { toShowRef.current[0] && toShowRef.current[0].join(' ')+" " }
          
          // paddingBottom = `${qq < 4104 ? (4105-(qq+1)) * 4000 : 0}px` // NEW! work at start
          
          // paddingBottom: `${toShowRef.current[0] ? (toShowRef.current.length-2) * 4000 : 0}px`,
          // { indicesTest[1] && indicesTest[1].join(' ')+" " }
          //indicesDivRef.current.textContent = `${indicesRef.current[0].join(' ')} ${indicesRef[1].join(' ')} `
          indDivRef.current.textContent = `${arrInd.current[0].join(' ')} ${arrInd.current[1].join(' ')} `
          indDivRef.current.style.width = `${8}ch`

          hexDivRef.current.textContent = `${arrHex.current[0].join(' ')} ${arrHex.current[1].join(' ')} ` // NEW! work at start
          hexDivRef.current.style.paddingBottom = `${(4105-1) * 4000}px`
          indDivRef.current.style.paddingBottom = `${(4105-1) * 4000}px`

          //divRef.current.style.paddingTop

          //width: `${padStart}ch`
          

        }
        

        //setIndicesTest(arrIndices)
        //setOriginalArray2(['done'])

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
      //console.log("position sY", window.scrollY-32) // curr pos
      //console.log("position iH", window.innerHeight) // thumb dimen
      //console.log("total", (window.scrollY + window.innerHeight) -32)
      //console.log("window", window)

      // console.log("max", 4000 - this.innerHeight) // OK
      // console.log("percent", (this.scrollY-32) / (4000 - this.innerHeight)) // OK
      // console.log("abs thumb", (this.innerHeight) * ((this.scrollY-32) / (4000 - this.innerHeight)))
      // console.log("abs scroll", (window.scrollY-32) + ((this.innerHeight) * ((this.scrollY-32) / (4000 - this.innerHeight))))

      console.log("scroll curr", this.scrollY-32)
      console.log("thumb height", this.innerHeight)
      console.log("scroll curr + thumb height", (this.scrollY-32)+this.innerHeight)
      console.log("scroll curr + thumb height / 4000", ((this.scrollY-32)+this.innerHeight)/4000)
      //console.log("scroll curr + thumb", (this.scrollY-32) + this.innerHeight)
      //console.log("scroll curr + thumb", (this.scrollY-32) + this.innerHeight)
      //console.log("scroll curr + thumb", Math.floor(((this.scrollY-32) + this.innerHeight) / 4000)) // TRACKING
      //console.log("ESTE A VER", ((this.scrollY) + (this.innerHeight-32)) / 4000)
      const qq = Math.floor(((this.scrollY-32) + (this.innerHeight)) / 4000)
      //console.log("scroll curr + thumb", qq) // TRACKING

      //console.log("NNN", toShowRef.current[4105])
      //setCurrentIndex(qq)
      currentIndex.current = qq ?? 0
      console.log("qq", qq) // TRACKING
      if (hexDivRef.current &&  indDivRef.current) { // ON SCROLL
        //divRef.current.style.paddingTop = `${qq === 0 ? 0 : ((qq-1) * 4000)}px`
        
        ////divRef.current.style.paddingBottom = `${(4106-(qq+2)) * 4000}px` // OLD! work at start
        ////divRef.current.style.paddingBottom = `${(4105-(qq+1)) * 4000}px` // NEW! work at start

        indDivRef.current.style.paddingTop = `${qq > 1 ? ((qq-1) * 4000) : 0 }px` // OLD! work at start
        indDivRef.current.style.paddingBottom = `${qq < 4104 ? (4105-(qq+1)) * 4000 : 0}px` // NEW! work at start

        hexDivRef.current.style.paddingTop = `${qq > 1 ? ((qq-1) * 4000) : 0 }px` // OLD! work at start
        hexDivRef.current.style.paddingBottom = `${qq < 4104 ? (4105-(qq+1)) * 4000 : 0}px` // NEW! work at start
        //console.log("AAAAAAAA", (qq-1) * 4000)
        //console.log("BBBBBBBB", (4106-(qq+2)) * 4000)
        //divRef.current.textContent = toShow[qq].join(' ')+" "
        //divRef.current.textContent = toShowRef.current[qq-1].join(' ')+" "
        //divRef.current.textContent = toShowRef.current[qq-1].join(' ')+" " + toShowRef.current[qq].join(' ')+" " + toShowRef.current[qq+1].join(' ')+" "
        //divRef.current.textContent = `${qq === 0 ? '' : toShowRef.current[qq-1].join(' ')} ${toShowRef.current[qq].join(' ')} ${toShowRef.current[qq+1].join(' ')} ` // OLD! work at start

        indDivRef.current.textContent = `${qq > 0 ? arrInd.current[qq-1].join(' ') : ''} ${qq > 4105 ? '' : arrInd.current[qq].join(' ')} ${qq > 4104 ? '' : arrInd.current[qq+1].join(' ')} ` // NEW! work at start
        hexDivRef.current.textContent = `${qq > 0 ? arrHex.current[qq-1].join(' ') : ''} ${qq > 4105 ? '' : arrHex.current[qq].join(' ')} ${qq > 4104 ? '' : arrHex.current[qq+1].join(' ')} ` // NEW! work at start
          
        //console.log("textContent", divRef.current.textContent)
        //console.log("111", toShow[qq])
        //console.log("222", toShowRef.current[qq])
        
      }
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

  const hexDivRef = useRef(null)
  const indDivRef = useRef(null)

  console.log("A VER ESTE", hexDivRef.current)
  //console.log(divRef.current)
  console.dir(hexDivRef.current)

  console.log("toSHow lllength", toShow.length)
  console.log("indicesTest lllength", indicesTest.length)
  console.log("indices lllength 2 ", indicesTest.length * 4000)

  //if (indicesTest[0] !== undefined) console.log("indices[0] :::", indicesTest[0])
  
  if (arrHex.current[1]) console.log("WWW")

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <input type="file" onChange={handleFileChange} style={{ background: 'red', height: '32px' }} />
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div ref={indDivRef} style={{
          background: 'lightyellow', lineHeight: '16px',
          fontFamily: 'monospace', fontSize: '16px',
          padding: `0 1ch`,
          boxSizing: 'content-box',
        }} />
        
        <div ref={hexDivRef} style={{
          background: 'lavender', lineHeight: '16px',
          fontFamily: 'monospace', fontSize: '16px',
          padding: `0 1ch`,
          boxSizing: 'content-box',
          width: '47ch', }} />
      </div>
    </div>
  );

}

export default Home;