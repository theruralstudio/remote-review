import Link from 'next/link'
// import { useRouter } from 'next/router'

export default function NavPublic({setView}) {
  return (
    <div className="absolute top-0 right-0">
      <div className="bg-white rounded-full flex m-4">
        <div className='p-4'>
          {/* <Link href={{ query: {...router.query, view: 'stream'}}}> */}
            <a onClick={() => setView('stream')}>Stream</a>
          {/* </Link> */}
        </div>
        <div className='p-4'>
          {/* <Link href={{ query: {...router.query, view: 'table'}}}> */}
            <a onClick={() => setView('table')}>Table</a>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}
