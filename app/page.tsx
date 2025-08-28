"use client"

//import Image from "next/image";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import css from "./page.module.css";

function Home() {

  const arrHex = useRef<unknown[][]>([])
  const arrInd = useRef<unknown[][]>([])
  let l = 0 // length
  //const l = useRef<number>(0) // length

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const uint8Array = new Uint8Array(arrayBuffer);

        const arr = Array.from(uint8Array, e => e.toString(16).padStart(2, '0'))
        //console.log("a verrrr", arr.length)
        //console.log("a verrrr 222", arr.length)

        // const padSSS = (Math.floor(arr.length / 4000) * 4000) + 3984
        // const padSSS = ((Math.floor(arr.length / 4000) * 4000) + 3984)
        // const padSSSSS = ((Math.floor(arr.length / 4000) * 4000) + 3984).toString().length

        const padStart = ((Math.floor(arr.length / 4000) * 4000) + 3984).toString().length

        //console.log("A1", padSSS)
        //console.log("A2", padSSSSS)

        // const chunkHexArr = [];
        // const chunkIndArr = []
        // for (let i = 0; i < arr.length; i += 4000) {
        //   chunkHexArr.push(arr.slice(i, i + 4000));
        //   chunkIndArr.push(Array.from({ length: 250  }, (_, index) => (i + (index * 16)).toString().padStart(padStart, '0')))
        // }

        // //console.log("222 length", chunkIndArr.length) // 4106
        // //console.log("222 length - 1", chunkIndArr[chunkIndArr.length-1][249]) // 16.423.984 last

        // arrHex.current = chunkHexArr
        // arrInd.current = chunkIndArr

        //const chunkHexArr = [];
        //const chunkIndArr = []
        for (let i = 0; i < arr.length; i += 4000) {
          arrHex.current.push(arr.slice(i, i + 4000));
          arrInd.current.push(Array.from({ length: 250 }, (_, index) => (i + (index * 16)).toString().padStart(padStart, '0')))
        }

        //l.current = arrInd.current.length
        l = arrInd.current.length

        //console.log("111 length", arrHex.current.length)
        //console.log("222 length", arrInd.current.length)
        //console.log("222 length", chunkIndArr.length) // 4106
        //console.log("222 length - 1", chunkIndArr[chunkIndArr.length-1][249]) // 16.423.984 last

        //arrHex.current = chunkHexArr
        //arrInd.current = chunkIndArr

        console.log("XXX length", arrInd.current.length)

        if (hexDivRef.current && indDivRef.current) { // FIRST UPDATE
          const target = (arrInd.current.length - 2) * 4000
          indDivRef.current.textContent = `${arrInd.current[0].join(' ')} ${arrInd.current[1].join(' ')} `
          indDivRef.current.style.width = `${padStart}ch`

          hexDivRef.current.textContent = `${arrHex.current[0].join(' ')} ${arrHex.current[1].join(' ')} ` // NEW! work at start
          hexDivRef.current.style.paddingBottom = `${target}px`
          indDivRef.current.style.paddingBottom = `${target}px`
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  //const l = arrInd.current.length

  useEffect(() => {
    function updateScrollPosition(this: Window) {
      //console.log("EVENT EVENT", this)
      //console.log("scroll curr", this.scrollY-32)
      //console.log("thumb height", this.innerHeight)
      //console.log("scroll curr + thumb height", (this.scrollY-32)+this.innerHeight)
      //console.log("scroll curr + thumb height / 4000", ((this.scrollY-32)+this.innerHeight)/4000)
      const c = Math.floor((this.scrollY - 32 + this.innerHeight) / 4000) // currentBlock
      

      //console.log("LLL", l)

      console.log("c", c) // TRACKING
      if (hexDivRef.current &&  indDivRef.current) { // ON SCROLL
        // indDivRef.current.style.paddingTop = `${c > 1 ? ((c-1) * 4000) : 0 }px` // OLD! work at start
        // hexDivRef.current.style.paddingTop = `${c > 1 ? ((c-1) * 4000) : 0 }px` // OLD! work at start
        if (c > 1) { const target = (c-1) * 4000; indDivRef.current.style.paddingTop = `${target}px`; hexDivRef.current.style.paddingTop = `${target}px` }
        else { indDivRef.current.style.paddingTop = `0px`; hexDivRef.current.style.paddingTop = `0px` }

        //indDivRef.current.style.paddingBottom = `${c < 4104 ? (4105-(c+1)) * 4000 : 0}px` // NEW! work at start
        //hexDivRef.current.style.paddingBottom = `${c < 4104 ? (4105-(c+1)) * 4000 : 0}px` // NEW! work at start

        if (c < l - 2) { const target = ((l-1)-(c+1)) * 4000; indDivRef.current.style.paddingBottom = `${target}px`; hexDivRef.current.style.paddingBottom = `${target}px` }
        else { indDivRef.current.style.paddingBottom = `0px`; hexDivRef.current.style.paddingBottom = `0px` }

        // indDivRef.current.textContent = `${c > 0 ? arrInd.current[c-1].join(' ') : ''} ${c > 4105 ? '' : arrInd.current[c].join(' ')} ${c > 4104 ? '' : arrInd.current[c+1].join(' ')} ` // NEW! work at start
        // hexDivRef.current.textContent = `${c > 0 ? arrHex.current[c-1].join(' ') : ''} ${c > 4105 ? '' : arrHex.current[c].join(' ')} ${c > 4104 ? '' : arrHex.current[c+1].join(' ')} ` // NEW! work at start

        // indDivRef.current.textContent = `${c > 0 ? arrInd.current[c-1].join(' ') : ''} ${c > 4105 ? '' : arrInd.current[c].join(' ')} ${c > 4104 ? '' : arrInd.current[c+1].join(' ')} ` // NEW! work at start
        // hexDivRef.current.textContent = `${c > 0 ? arrHex.current[c-1].join(' ') : ''} ${c > 4105 ? '' : arrHex.current[c].join(' ')} ${c > 4104 ? '' : arrHex.current[c+1].join(' ')} ` // NEW! work at start

        let resInd = '';
        let resHex = '';

        if (c > 0) { resInd += `${arrInd.current[c-1].join(' ')} `; resHex += `${arrHex.current[c-1].join(' ')} ` }
        if (c < l) { resInd += `${arrInd.current[c].join(' ')} `; resHex += `${arrHex.current[c].join(' ')} ` }
        if (c < l - 1) { resInd += `${arrInd.current[c+1].join(' ')} `; resHex += `${arrHex.current[c+1].join(' ')} ` }

        indDivRef.current.textContent = resInd
        hexDivRef.current.textContent = resHex

      }

      // console.log("c", c) // TRACKING
      // if (hexDivRef.current &&  indDivRef.current) { // ON SCROLL
      //   indDivRef.current.style.paddingTop = `${c > 1 ? ((c-1) * 4000) : 0 }px` // OLD! work at start
      //   hexDivRef.current.style.paddingTop = `${c > 1 ? ((c-1) * 4000) : 0 }px` // OLD! work at start

      //   indDivRef.current.style.paddingBottom = `${c < 4104 ? (4105-(c+1)) * 4000 : 0}px` // NEW! work at start
      //   hexDivRef.current.style.paddingBottom = `${c < 4104 ? (4105-(c+1)) * 4000 : 0}px` // NEW! work at start

      //   indDivRef.current.textContent = `${c > 0 ? arrInd.current[c-1].join(' ') : ''} ${c > 4105 ? '' : arrInd.current[c].join(' ')} ${c > 4104 ? '' : arrInd.current[c+1].join(' ')} ` // NEW! work at start
      //   hexDivRef.current.textContent = `${c > 0 ? arrHex.current[c-1].join(' ') : ''} ${c > 4105 ? '' : arrHex.current[c].join(' ')} ${c > 4104 ? '' : arrHex.current[c+1].join(' ')} ` // NEW! work at start
      // }
    }

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  const hexDivRef = useRef<HTMLDivElement>(null)
  const indDivRef = useRef<HTMLDivElement>(null)

  //console.log("A VER ESTE", hexDivRef.current)
  //console.dir(hexDivRef.current)

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