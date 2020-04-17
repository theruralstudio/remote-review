import Link from 'next/link';

const NavPersonal = (props) => (
  <div className="wrapper">
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/archive">
      <a>Archive</a>
    </Link>
    <span style={props.currentUser.style}>Hello, {props.currentUser.name}</span>
    <style jsx>{`
      .wrapper {

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

export default NavPersonal;