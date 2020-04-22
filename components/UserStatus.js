export default function UserStatus({numUsers, currentUser}) {
  return (
    <div className="absolute bottom-0 left-0">
      <span className="bg-white rounded-full m-4 p-2" style={currentUser.style}>
        Hello, {currentUser.name}
      </span>
      <div className="bg-white rounded-full m-4 p-2">{numUsers} are here</div>
    </div>
  )
}