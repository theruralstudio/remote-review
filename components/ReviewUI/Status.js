import Link from 'next/link';

const Chat = () => (
  <div>
    <p>Your userkey is {router.query.userkey}</p>
    <p>Your access code is {router.query.accesscode}</p>
  </div>
);

export default Chat;

