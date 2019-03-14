import React, {Component} from 'react';
class header1 extends Component {
  render() {
    return (
      <nav className='navbar'>
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="totalUsers">current active users: {this.props.counter}</span>
      </nav>
    )
  } 
};
     export default header1