import Link from 'next/link';

const NavPersonal = (props) => (
  <div className="wrapper">
    {/* links here? */}
      <span style={props.currentUser.style}>
        Hello, {props.currentUser.name}
      </span>
    <style jsx>{`
      .wrapper {
        padding: 1em;
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