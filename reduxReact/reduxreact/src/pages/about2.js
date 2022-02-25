import connect from "../utils/connect";
import { 
    decAction,
    subAction
  } from "../store/actionCreate";
function about2(props){
    return (
        <div>
          <hr />
          <h1>About</h1>
          <h2>当前计数: {props.counter}</h2>
          <button onClick={e => {props.decrement();console.log(props.counter)}}>-1</button>
          <button onClick={e => props.subNumber(5)}>-5</button>
        </div>
      )
}
const mapStateToProps = state => {
    return {
        counter:state.counter
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        decrement:function(){
            dispatch(decAction());
        },
        subNumber: function(num) {
            dispatch(subAction(num))
          }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(about2)