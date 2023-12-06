import Link from 'next/link';
import { UsingNoStore } from "@/components/using-nostore"
import { WithOutNoStore } from '@/components/without-nostore';
import { UsingNoStoreWithClent } from '@/components/using-nostore-with-client';

interface Post {
  id: number;
  title: number;
  body: string,
  userId: number,
  tags: string[],
  reactions: number
}

interface ReturnData {
  posts: Post[]
  total: number;
  skip: number;
  limit: number;
}

// static 
async function getFetchData(): Promise<ReturnData> {
  let getData = await fetch('https://dummyjson.com/posts?limit=10')
  return getData.json()
}


async function getRandomNumberWithNoStore(): Promise<{ random: number }> {
  let getRandomData = await fetch('http://localhost:3000/api/random')
  return getRandomData.json()
}

async function getRandomNumber(): Promise<{ random: number }> {

  let getRandomData = await fetch('http://localhost:3000/api/random')

  return getRandomData.json()
}

export default async function Home() {
  // noStore();

  let { posts } = await getFetchData();

  let { random } = await getRandomNumberWithNoStore();

  let getRandom = await getRandomNumber()

  return (
    <main className="flex flex-col items-center justify-between">

      <div className="my-12 mb-8">
        <button className=" text-md md:text-6xl text-center"> No Store. </button>
      </div>

      <h2 className='mb-5 text-5xl'> using NoStore</h2>

      <UsingNoStore />

      <h2 className=' my-8 text-5xl'> using NoStore with client component</h2>

      <UsingNoStoreWithClent />

      <h2 className='mt-8 text-5xl'> without  NoStore</h2>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-2 lg:gap-8">

        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-300 p-4 lg:p-8">
          <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">{random}</div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-300 p-4 md:p-8">
          <div className="text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl">{getRandom.random}</div>
        </div>

      </div>

      <h2 className='mt-24 mb-10 text-5xl'>All Posts</h2>
      <div className="block w-10/12 sm:w-8/12 md:w-7/12  lg:w-6/12 mx-auto">
        {
          posts.map((post: Post) => {
            let getKey = post.userId * post.id
            return (
              <div key={getKey} className="my-14 p-8 md:p-16 bg-white rounded-lg dark:bg-gray-800">
                <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{post.title}</h2>
                <p className="mb-3 text-gray-500 dark:text-gray-400"> {post.body} </p>
                <Link href="/" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                  Learn more
                  <svg className=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                </Link>
              </div>
            )
          })
        }
      </div>

    </main>
  )

}
