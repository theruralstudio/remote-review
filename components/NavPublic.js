import Link from 'next/link';

const Nav = (props) => (
  <div className="wrapper">
    <Link href={{ query: {view: 'register'}}}>
      <a>Register</a>
    </Link>
    <Link href={{ query: {view: 'chat'}}}>
      <a>Chat</a>
    </Link>
    <Link href={{ query: {view: 'stream'}}}>
      <a>Stream</a>
    </Link>
    <Link href={{ query: {view: 'table'}}}>
      <a>Table</a>
    </Link>
    <style jsx>{`
      .wrapper {
        display: flex;
        justify-content: space-between;
      }
      a {
        color: blue;
        text-decoration: underline;
        font-weight: bold;
        padding: 1em;
      }
    `}</style>
  </div>
);

export default Nav;