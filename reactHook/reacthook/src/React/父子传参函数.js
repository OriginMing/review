import React, { Component } from 'react';


class CounterButton extends Component {
  render() {
    const {onClick} = this.props;
    console.log(onClick);
    return <button onClick={e=>{onClick(e,5)}}>+1子组件</button>
  }
}


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+</button>
        <CounterButton onClick={(e,...rest) => this.increment(e,rest)} name="why"/>
      </div>
    )
  }

  increment(e,rest) {
      console.log(rest);
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
