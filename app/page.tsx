"use client"

//import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
//import styles from "./page.module.css";

function Home() {

  const arrHex = useRef<string[][]>([['']])
  const arrInd = useRef<string[][]>([['']])

  //const [ indices, setIndices ] = useState<string[][]>([]); // ←←← DON'T USE IT!!

  //const [ indicesTest, setIndicesTest ] = useState<string[]>([]);

  //const currentIndex = useRef(0)

  //console.log("currentIndex.current", currentIndex.current)

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

  //console.log("last indice", indices[indices.length -1])

  let padStart// = indices && indices[indices.length - 1].toString().length

  //if (indices[indices.length - 1]) padStart = indices[indices.length - 1].toString().length
  //if (indices[indices.length - 1]) padStart = indices[indices.length - 1].toString().length + 1

  console.log("padStart", padStart)

  //console.log("indicesTest", indicesTest)
  //console.log("indicesTest length", indicesTest.length)
  //console.log("indicesTest last", indicesTest[0])

  useEffect(() => {
    window.addEventListener('scroll', function(){

      console.log("scroll curr", this.scrollY-32)
      console.log("thumb height", this.innerHeight)
      console.log("scroll curr + thumb height", (this.scrollY-32)+this.innerHeight)
      console.log("scroll curr + thumb height / 4000", ((this.scrollY-32)+this.innerHeight)/4000)
      const qq = Math.floor(((this.scrollY-32) + (this.innerHeight)) / 4000)
      //console.log("scroll curr + thumb", qq) // TRACKING

      //setCurrentIndex(qq)
      //currentIndex.current = qq ?? 0
      console.log("qq", qq) // TRACKING
      if (hexDivRef.current &&  indDivRef.current) { // ON SCROLL
        //divRef.current.style.paddingTop = `${qq === 0 ? 0 : ((qq-1) * 4000)}px`
        
        ////divRef.current.style.paddingBottom = `${(4106-(qq+2)) * 4000}px` // OLD! work at start
        ////divRef.current.style.paddingBottom = `${(4105-(qq+1)) * 4000}px` // NEW! work at start

        indDivRef.current.style.paddingTop = `${qq > 1 ? ((qq-1) * 4000) : 0 }px` // OLD! work at start
        indDivRef.current.style.paddingBottom = `${qq < 4104 ? (4105-(qq+1)) * 4000 : 0}px` // NEW! work at start

        hexDivRef.current.style.paddingTop = `${qq > 1 ? ((qq-1) * 4000) : 0 }px` // OLD! work at start
        hexDivRef.current.style.paddingBottom = `${qq < 4104 ? (4105-(qq+1)) * 4000 : 0}px` // NEW! work at start

        indDivRef.current.textContent = `${qq > 0 ? arrInd.current[qq-1].join(' ') : ''} ${qq > 4105 ? '' : arrInd.current[qq].join(' ')} ${qq > 4104 ? '' : arrInd.current[qq+1].join(' ')} ` // NEW! work at start
        hexDivRef.current.textContent = `${qq > 0 ? arrHex.current[qq-1].join(' ') : ''} ${qq > 4105 ? '' : arrHex.current[qq].join(' ')} ${qq > 4104 ? '' : arrHex.current[qq+1].join(' ')} ` // NEW! work at start
        
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

  //console.log("indicesTest lllength", indicesTest.length)
  //console.log("indices lllength 2 ", indicesTest.length * 4000)

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