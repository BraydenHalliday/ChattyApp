import React, {Component} from 'react';
class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyUp={this.props.newUser} placeholder= {this.props.curerentUser} />
        <input className="chatbar-message"  onKeyUp={this.props.newMessage} placeholder="Type a message and hit ENTER" />
      </footer>
   ) 
  } 
};
export default ChatBar
