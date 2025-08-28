"use client"

//import Image from "next/image";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import css from "./page.module.css";
const workerScriptPath = '/worker.js';

function Home() {

  const arrHex = useRef<unknown[][]>([])
  const arrInd = useRef<unknown[][]>([])
  const length = useRef<number>(0)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer);

        const arr = Array.from(uint8Array, e => e.toString(16).padStart(2, '0'))

        const padStart = ((Math.floor(arr.length / 4000) * 4000) + 3984).toString().length

        for (let i = 0; i < arr.length; i += 4000) {
          arrHex.current.push(arr.slice(i, i + 4000));
          arrInd.current.push(Array.from({ length: 250 }, (_, index) => (i + (index * 16)).toString().padStart(padStart, '0')))
        }

        length.current = arrInd.current.length

        if (hexDivRef.current && indDivRef.current) { // FIRST UPDATE
          const target = (arrInd.current.length - 2) * 4000
          
          indDivRef.current.style.width = `${padStart}ch`
          indDivRef.current.textContent = `${arrInd.current[0].join(' ')} ${arrInd.current[1].join(' ')} `
          hexDivRef.current.textContent = `${arrHex.current[0].join(' ')} ${arrHex.current[1].join(' ')} `
          indDivRef.current.style.paddingBottom = `${target}px`
          hexDivRef.current.style.paddingBottom = `${target}px`
          
        }

        
        // setTimeout(() => {
        //   readData()
        // }, 0)

        readData()

      };

      // reader.onloadend = (e) => {
      //   //await readData()
      // }

      reader.readAsArrayBuffer(file);
      
    }
  };

  useEffect(() => {
    function updateScrollPosition(this: Window) {
      const c = Math.floor((this.scrollY - 32 + this.innerHeight) / 4000) // currentBlock
      const l = length.current

      if (hexDivRef.current &&  indDivRef.current) { // ON SCROLL
        if (c > 1) { const target = (c-1) * 4000; indDivRef.current.style.paddingTop = `${target}px`; hexDivRef.current.style.paddingTop = `${target}px` }
        else { indDivRef.current.style.paddingTop = `0px`; hexDivRef.current.style.paddingTop = `0px` }

        if (c < l - 2) { const target = ((l-1)-(c+1)) * 4000; indDivRef.current.style.paddingBottom = `${target}px`; hexDivRef.current.style.paddingBottom = `${target}px` }
        else { indDivRef.current.style.paddingBottom = `0px`; hexDivRef.current.style.paddingBottom = `0px` }

        let resInd = '';
        let resHex = '';

        if (c > 0) { resInd += `${arrInd.current[c-1].join(' ')} `; resHex += `${arrHex.current[c-1].join(' ')} ` }
        if (c < l) { resInd += `${arrInd.current[c].join(' ')} `; resHex += `${arrHex.current[c].join(' ')} ` }
        if (c < l - 1) { resInd += `${arrInd.current[c+1].join(' ')} `; resHex += `${arrHex.current[c+1].join(' ')} ` }

        indDivRef.current.textContent = resInd
        hexDivRef.current.textContent = resHex
        
      }
    }

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  const hexDivRef = useRef<HTMLDivElement>(null)
  const indDivRef = useRef<HTMLDivElement>(null)

  // BEGIN READ ASSOCIATED DATA //

  //const data = useRef<unknown[]>([""])

  // const readData = async () => {
  //   //console.log("AAA", arrHex.current.flat().length)
  //   console.log("INITIALIZED")



  //   //const data = []
    
  
  //   let i = 0

  //   const toHex = (fir, sec) => {
  //     return parseInt(arrHex.current.flat().slice(i+fir,i+sec).reverse().join(''), 16)
  //   }

  //   const common = (type) => {
  //     //console.log('type: ', type) // name
  //     //console.log('chunkSize: ', toHex(2,4)) // chunkSize // 12
  //     //console.log('nextChunk: ', toHex(4,8)) // nextChunk
  //     //setDataToShow(curr => [...curr, `type: ${type}`, `chunkSize: ${toHex(2,4)}`, `nextChunk: ${toHex(4,8)}`])
  //     data.current.push([`type: ${type}, chunkSize: ${toHex(2,4)}, nextChunk: ${toHex(4,8)}`])
  //   }

  //   const obj: unknown = { // already little-endian
  //     '0000': 'RES_NULL_TYPE',
  //     '0100': () => {
  //       common('ResStringPool_header')
  //       const totalStrings: number = toHex(8,12)
  //       const totalStyles: number = toHex(12,16)

  //       console.log("ENTER ResStringPool_header 1")
        
  //       //console.log('total Strings: ', totalStrings)
  //       //console.log('total Styles: ', totalStyles)
  //       //console.log('UTF-8 ?: ', toHex(16,20))
  //       //console.log('string start: ', toHex(20,24))
  //       //console.log('style start: ', toHex(24,28))

  //       //data.current[data.current.length -1].push([` total Strings: ${totalStrings}, total Styles: ${totalStyles}, UTF-8 ?: ${toHex(16,20)}, string start: ${toHex(20,24)}, style start: ${toHex(24,28)} \n`])

  //       const stringIndices = []

  //       //const sSI = i+28 // startStringIndices
  //       i = i+28 // update index

  //       console.log("stop 1 i", i)

  //       const stopIndexStrings = (totalStrings * 4) + i
  //       while (i < stopIndexStrings) {
  //         stringIndices.push(toHex(0,4))
  //         i+=4
  //         console.log("stop 2 inside while")
  //       }

  //       console.log("stop 2 outside while")
  //       //console.log('stringIndices: ', stringIndices)
  //       //const styleIndices = []
  //       const styleIndices = Array.from({ length: 100 }, (_, index) => index + 1)

  //       // const stopIndexStyles = (totalStyles * 4) + i
  //       // while (i < stopIndexStyles) {
  //       //   styleIndices.push(toHex(0,4))
  //       //   i+=4
  //       // }
  //       //console.log('styleIndices: ', styleIndices)

  //       data.current[data.current.length -1].push([` stringIndices: ${stringIndices}, styleIndices: ${styleIndices} \n`])

  //       //return i + 28
  //       //setDataToShow(data)
  //       //console.log("FINAL", data)
  //       console.log("ENTER ResStringPool_header 2")
  //       return 43
  //     },
  //     '0200': () => {
  //       common('ResTable_header')
  //       //console.log('total ResTable_packages: ', toHex(8,12)) // total ResTable_packages
  //       //data.push([`total ResTable_packages: ${toHex(8,12)}`])
  //       console.log("ENTER ResTable_header")
  //       data.current[data.current.length -1].push([` total ResTable_packages: ${toHex(8,12)} \n`])
  //       return 12
  //     },
  //     '0300': 'RES_XML_TYPE',
  //     '0001': 'RES_XML_FIRST_CHUNK_TYPE',
  //     //'0001': 'RES_XML_START_NAMESPACE_TYPE',
  //     '0101': 'RES_XML_END_NAMESPACE_TYPE',
  //     '0201': 'RES_XML_START_ELEMENT_TYPE',
  //     '0301': 'RES_XML_END_ELEMENT_TYPE',
  //     '0401': 'RES_XML_CDATA_TYPE',
  //     '7f01': 'RES_XML_LAST_CHUNK_TYPE',
  //     '8001': 'RES_XML_RESOURCE_MAP_TYPE',
  //     '0002': 'RES_TABLE_PACKAGE_TYPE',
  //     '0102': 'RES_TABLE_TYPE_TYPE',
  //     '0202': 'RES_TABLE_TYPE_SPEC_TYPE',
  //     '0302': 'RES_TABLE_LIBRARY_TYPE',
  //     '0402': 'RES_TABLE_OVERLAYABLE_TYPE',
  //     '0502': 'RES_TABLE_OVERLAYABLE_POLICY_TYPE',
  //     '0602': 'RES_TABLE_STAGED_ALIAS_TYPE',
  //   }




  //   while (obj[arrHex.current.flat().slice(i,i+2).join('')] !== undefined && i !== 43434343) {
  //     console.log("Iteration number: " + i);
  //     //originalArray.slice(0,2).join('')

  //     let target = arrHex.current.flat().slice(i,i+2).join('') // target
      
  //     // console.log('name: ', t.n)
  //     // //console.log(i, byte length: originalArray.slice(i+2,i+4).reverse().join('') )
  //     // //console.log(i, 'byte length', parseInt(originalArray.slice(i+2,i+4).reverse().join(''), 16) )
  //     // //console.log('byte length', parseInt(originalArray.slice(i+2,i+4).reverse().join(''), 16))
  //     // console.log('chunkSize:', parseInt(originalArray.slice(i+t.cS[0],i+t.cS[1]).reverse().join(''), 16))
  //     // console.log('nextChunk:', parseInt(originalArray.slice(i+t.nC[0],i+t.nC[1]).reverse().join(''), 16))
  //     // console.log('ResTable_packages total:', parseInt(originalArray.slice(i+t.tP[0],i+t.tP[1]).reverse().join(''), 16))
  //     //i = parseInt(originalArray.slice(i+2,i+4).reverse().join(''), 16)
  //     //console.log("I BEFORE", i)
  //     i = obj[target]()
  //     //console.log("TARGET", typeof target)
  //     //console.log("I AFTER", i)
  //     //i = 43
  //     //if (i === 43) setDataToShow(data)
  //     if (i === 43) {
  //       i = 43434343
  //       console.log("ENTER ResStringPool_header 3")
  //     }
  //   }

  // }

  
  
  // END READ ASSOCIATED DATA //

  const workerRef = useRef<Worker>(null);

  const readData = () => {
    console.log("INITIALIZED")

    if (window.Worker) {
      // Create a new web worker
      workerRef.current = new Worker(workerScriptPath);
      //workerRef.current = new Worker(new URL('/worker.js', import.meta.url));
      //const newWorker = new Worker(new URL('/workers/fibonacciWorker.js', import.meta.url));

      // Listen for messages from the worker
      workerRef.current.onmessage = (event) => {
        //setResult(event.data);
        //setIsCalculating(false);
        console.log('Result received from worker:', event.data);
      };

      // Handle errors from the worker
      workerRef.current.onerror = (error) => {
        console.error('Worker error:', error);
        //setResult('Error during calculation.');
        //setIsCalculating(false);
      };
    } else {
      console.error('Web Workers are not supported in this browser.');
    }

    // Cleanup function: this runs when the component unmounts.
    // It's crucial to terminate the worker to free up resources.
    // return () => {
    //   if (workerRef.current) {
    //     workerRef.current.terminate();
    //     workerRef.current = null;
    //   }
    // };

    if (workerRef.current !== null) workerRef.current.postMessage(10000000000);
  }
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <input type="file" onChange={handleFileChange} style={{ background: 'red', height: '32px' }} />
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div ref={indDivRef} className={css.common} style={{ background: 'lightyellow' }} />
        <div ref={hexDivRef} className={css.common} style={{ background: 'lavender', width: '47ch' }} />
      </div>
    </div>
  );
}

export default Home;
