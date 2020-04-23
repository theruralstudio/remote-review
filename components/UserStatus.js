import Link from 'next/link'
import { useRouter } from 'next/router'

export default function UserStatus({numUsers, currentUser, setView}) {
  const router = useRouter()

  return (
    <div className="absolute bottom-0 left-0">
      <div className="bg-white rounded-full m-4 p-2">
        <a onClick={() => setView('register')}>Register</a>
      </div>
      <span className="bg-white rounded-full m-4 p-2" style={currentUser.style}>
        Hello, {currentUser.name}
      </span>
      <div className="bg-white rounded-full m-4 p-2">{numUsers} are here</div>
    </div>
  )
}