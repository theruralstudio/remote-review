import Link from 'next/link'
// import { useRouter } from 'next/router'

export default function NavPublic({view, setView}) {
  return (
    <div className="absolute top-0 right-0">
      <div className="flex m-4">
        <div className={`p-4 ${view == 'stream' ? 'border-black border-2' : ''}`}>
          {/* <Link href={{ query: {...router.query, view: 'stream'}}}> */}
            <a onClick={() => setView('stream')}>Stream</a>
          {/* </Link> */}
        </div>
        <div className={`p-4 ${view == 'table' ? 'border-black border-2' : ''}`}>
          {/* <Link href={{ query: {...router.query, view: 'table'}}}> */}
            <a onClick={() => setView('table')}>Table</a>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}
