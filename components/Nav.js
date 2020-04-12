import Link from 'next/link';

const Nav = () => (
  <div className="wrapper">
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/entry">
      <a>Entry</a>
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
    <style jsx>{`
      .wrapper {
        border-bottom: 1px solid black;
      }
      a {
        color: black;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        padding: 1em;
      }
    `}</style>
  </div>
);

export default Nav;