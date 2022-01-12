import React, { PureComponent } from 'react';
import store from '../store/index'
import {addAction } from "../store/actionCreate";

class home extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            counter:store.getState().counter
        }
    }
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({
                counter:store.getState().counter
            })
        })
    }
    componentWillUnmount(){
        this.unsubscribe()
    }
    render() {
        return (
            <div>
            <hr/>
        <h1>Home</h1>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.decrement()}>+1</button>
        <button onClick={e => this.subNumber(5)}>+5</button>
      </div>
        );
    }
    decrement(){
        store.dispatch(addAction(1));
    }
    subNumber(num) {
        store.dispatch(addAction(num));
      }
}



export default home;