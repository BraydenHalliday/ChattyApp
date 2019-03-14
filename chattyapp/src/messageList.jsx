import React, {Component} from 'react';
export class MessageList extends Component { 
  render() {
    const messagesL = this.props.messages.map((message) => {
      if(message.type === 'incomingMessage') {
        return (  
          <main className='messages'>
            <div className="message" key={message.id}>
              <span className="message-username">{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          </main>
        ) 
      } else {
        return ( 
          <main className='messages'>
            <div className="notification">
              <span className="notification-content">{message.username}</span>
            </div>
          </main>
        )
      }
    }) 
    return( 
      <div>{messagesL}</div>
    )    
  } 
};
   export default MessageList