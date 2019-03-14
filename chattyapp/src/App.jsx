import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import ChatBar from './ChatBar.jsx';
import Footer1 from './foot1.jsx';
import '../styles/application.scss';

//import ReactDOM from 'react-dom';

// main class
class App extends Component {
  constructor(props) {
    super(props);
    this.newMessage = this.newMessage.bind(this)
    this.newUser = this.newUser.bind(this)
    this.state = {
      user: 'Anon',
      messages: [],
      notifications: [],
      counter:'1'
    };
  }
  componentDidMount() {
    var socket = new WebSocket('ws://localhost:3001', console.log('Connected to server'));
    this.setState({socket: socket})
    console.log('componentDidMount <App />');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch(data.type) {
      case 'incomingMessage':
        const message = this.state.messages.concat(JSON.parse(event.data))
        this.setState({messages: message})
        break;
      case 'incomingNotification':
        const obj = JSON.parse(event.data)
        obj.username = `${obj.oldUserName} changed their name to ${obj.newUserName}`
        const notification = this.state.messages.concat(obj)
        this.setState({messages: notification})
        break;
      case 'counterUpdate':
        const count = JSON.parse(event.data)
        this.setState({counter: count.counter})
        break;
      default:
         throw new Error("Unknown event type " + data.type);
      }
    }
  }
  newMessage(evt) {
    if (evt.keyCode === 13) {
      let theMessage = {type: "postMessage", username: this.state.user, content: evt.target.value};
      this.state.socket.send(JSON.stringify(theMessage));
      evt.target.value = ''
    }
  };
  newUser(evt) {
    let oldUserName = this.state.user
    if (evt.keyCode === 13 && evt.target.value) {
     let newUserName = evt.target.value;
     let theNotification = {type: "postNotification", oldUserName: oldUserName, newUserName : newUserName};
     this.state.socket.send(JSON.stringify(theNotification));
     this.setState({user: newUserName})
    }
  };
  render() {
   return (
     <div>
      <Footer1 counter={this.state.counter}/>
      <MessageList messages={this.state.messages} notifications={this.state.notifications}/>
      <ChatBar  curerentUser={this.state.user} newMessage={this.newMessage} newUser={this.newUser}/>
    </div>
   )
  }
};
 export default App;
