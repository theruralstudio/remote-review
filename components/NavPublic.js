import Link from 'next/link';

const Nav = (props) => (
  <div className="wrapper">
    <Link href="/register">
      <a>Register</a>
    </Link>
    <Link href="/chat">
      <a>Chat</a>
    </Link>
    <Link href="/stream">
      <a>Stream</a>
    </Link>
    <Link href="/table">
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