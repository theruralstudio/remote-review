export default class History extends React.Component {
  componentDidUpdate() {
    // get the messagelist container and set the scrollTop to the height of the container
    const objDiv = document.getElementById("messageList");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  render() {
    return (
      <History id="messageList">
        {this.props.messages.map((item, i) => Sorter(item))}
      </History>
    );
  }
}

const Sorter = item => {
  switch (item.type) {
    case "system":
      return (
        <system key={item.time}>
          <meta>{item.time, "HH:mm"}</meta>
          {item.msg}
          {item.sender && ` (${item.sender})`}
        </system>
      );
      break;
    case "me":
      return <MyMessage key={item.time}>{item.msg}</MyMessage>;
      break;
    case "partner":
      return (
        <Partner key={item.time}>
          <Meta>{item.sender}</Meta>
          {item.msg}
        </Partner>
      );
      break;

    default:
      break;
  }
};
