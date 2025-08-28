"use client"

//import Image from "next/image";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import css from "./page.module.css";

function Home() {

  const arrHex = useRef<unknown[][]>([])
  const arrInd = useRef<unknown[][]>([])
  let l = 0 // length

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

        l = arrInd.current.length

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

  useEffect(() => {
    function updateScrollPosition(this: Window) {
      const c = Math.floor((this.scrollY - 32 + this.innerHeight) / 4000) // currentBlock

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