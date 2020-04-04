import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Nav = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/entry">
      <a style={linkStyle}>Entry</a>
    </Link>
    <Link href="/archive">
      <a style={linkStyle}>Archive</a>
    </Link>
  </div>
);

export default Nav;