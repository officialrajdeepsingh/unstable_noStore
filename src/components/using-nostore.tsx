import { unstable_noStore as noStore } from 'next/cache';

async function getRandomNumberWithNoStore(): Promise<{ random: number }> {
    let getRandomData = await fetch('http://localhost:3000/api/random')
    return getRandomData.json()
}

async function getRandomNumber(): Promise<{ random: number }> {

    let getRandomData = await fetch('http://localhost:3000/api/random', { cache: 'no-store' })

    return getRandomData.json()
}

export async function UsingNoStore() {

   noStore();

   let { random } = await getRandomNumberWithNoStore();

   let getRandom = await getRandomNumber();

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