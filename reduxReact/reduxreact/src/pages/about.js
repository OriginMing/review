import React, { PureComponent } from 'react';
import store from '../store/index'
import { subAction } from "../store/actionCreate";


class about extends PureComponent {
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
        <h1>About</h1>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.decrement()}>-1</button>
        <button onClick={e => this.subNumber(5)}>-5</button>
      </div>
        );
    }
    decrement(){
        store.dispatch(subAction(1));
    }
    subNumber(num) {
        store.dispatch(subAction(num));
      }
}



export default about;