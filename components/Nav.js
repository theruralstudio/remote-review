import Link from 'next/link';

const Nav = (props) => (
  <div className="wrapper">
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/archive">
      <a>Archive</a>
    </Link>
    <Link href="/chat">
      <a>Chat</a>
    </Link>
    <Link href="/stream">
      <a>Stream</a>
    </Link>
    <Link href="/register">
      <a>Register</a>
    </Link>
    <span>{props.numUsers} logged in</span>
    <span style={props.currentUser.style}>Hello, {props.currentUser.name}</span>
    <style jsx>{`
    `}</style>
  </div>
);

export default Nav;