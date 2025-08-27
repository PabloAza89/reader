"use client"

//import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
//import styles from "./page.module.css";

function Home() {

  const arrHex = useRef<string[][]>([['']])
  const arrInd = useRef<string[][]>([['']])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);

        const arr = Array.from(uint8Array, e => e.toString(16).padStart(2, '0'))
        console.log("a verrrr", arr.length)
        const chunkedArray = [];
        const arrIndices = []
        for (let i = 0; i < arr.length; i += 4000) {
          chunkedArray.push(arr.slice(i, i + 4000));
          arrIndices.push(Array.from({ length: 250  }, (_, index) => (i + (index * 16)).toString().padStart(8, '0')))
        }

        arrHex.current = chunkedArray
        arrInd.current = arrIndices

        if (hexDivRef.current && indDivRef.current) { // FIRST UPDATE

          indDivRef.current.textContent = `${arrInd.current[0].join(' ')} ${arrInd.current[1].join(' ')} `
          indDivRef.current.style.width = `${8}ch`

          hexDivRef.current.textContent = `${arrHex.current[0].join(' ')} ${arrHex.current[1].join(' ')} ` // NEW! work at start
          hexDivRef.current.style.paddingBottom = `${(4105-1) * 4000}px`
          indDivRef.current.style.paddingBottom = `${(4105-1) * 4000}px`
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  let padStart// = indices && indices[indices.length - 1].toString().length

  console.log("padStart", padStart)

  useEffect(() => {
    function updateScrollPosition(this: Window) {
      console.log("EVENT EVENT", this)
      console.log("scroll curr", this.scrollY-32)
      console.log("thumb height", this.innerHeight)
      console.log("scroll curr + thumb height", (this.scrollY-32)+this.innerHeight)
      console.log("scroll curr + thumb height / 4000", ((this.scrollY-32)+this.innerHeight)/4000)
      const qq = Math.floor(((this.scrollY-32) + (this.innerHeight)) / 4000)

      console.log("qq", qq) // TRACKING
      if (hexDivRef.current &&  indDivRef.current) { // ON SCROLL
        indDivRef.current.style.paddingTop = `${qq > 1 ? ((qq-1) * 4000) : 0 }px` // OLD! work at start
        indDivRef.current.style.paddingBottom = `${qq < 4104 ? (4105-(qq+1)) * 4000 : 0}px` // NEW! work at start

        hexDivRef.current.style.paddingTop = `${qq > 1 ? ((qq-1) * 4000) : 0 }px` // OLD! work at start
        hexDivRef.current.style.paddingBottom = `${qq < 4104 ? (4105-(qq+1)) * 4000 : 0}px` // NEW! work at start

        indDivRef.current.textContent = `${qq > 0 ? arrInd.current[qq-1].join(' ') : ''} ${qq > 4105 ? '' : arrInd.current[qq].join(' ')} ${qq > 4104 ? '' : arrInd.current[qq+1].join(' ')} ` // NEW! work at start
        hexDivRef.current.textContent = `${qq > 0 ? arrHex.current[qq-1].join(' ') : ''} ${qq > 4105 ? '' : arrHex.current[qq].join(' ')} ${qq > 4104 ? '' : arrHex.current[qq+1].join(' ')} ` // NEW! work at start
      }
    }

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollPosition);;
  }, []);

  const hexDivRef = useRef(null)
  const indDivRef = useRef(null)

  console.log("A VER ESTE", hexDivRef.current)
  console.dir(hexDivRef.current)

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