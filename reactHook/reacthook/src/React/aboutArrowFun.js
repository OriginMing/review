import { PureComponent } from "react";

export default class App extends PureComponent{
    state = {
        counter:0
    }
    increment(){
        console.log(this);
        this.setState({
            counter:this.state.counter+1
        })
    }
    render(){
        return (<>
        <h2>{this.state.counter}</h2>
        <button onClick={()=>this.increment()}>+1箭头函数</button>
        <button onClick={this.increment.bind(this)}>+1非箭头函数</button>
        </>)
    }
}