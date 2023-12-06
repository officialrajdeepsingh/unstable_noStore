'use client'

import { unstable_noStore as noStore } from 'next/cache';
import { use, useEffect } from 'react';

export  function UsingNoStoreWithClent() {

   noStore();

   useEffect(()=>{
    console.log("call use Effect")
   },[])
    

  const { random } =  use<{ random: number }>(fetch('http://localhost:3000/api/random').then(data=>data.json()))
  const getRandom =  use<{ random: number }>(fetch('http://localhost:3000/api/random',{ cache: 'no-store' }).then(data=>data.json()))


    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:gap-8">

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 lg:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">{random}</div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 md:p-8">
                <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">{getRandom.random}</div>
            </div>
        </div>

    )
}