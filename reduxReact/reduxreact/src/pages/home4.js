import React, { PureComponent } from "react";
import {connect} from "react-redux";
import { 
    testSaga
} from "../store/actionCreate";

class about2 extends PureComponent{
    componentDidMount(){
        this.props.testSaga()
       }
    render(){
        return  (
            <div>
                {this.props.banner.map(item=>{
                    return <img key={item.encodeId} src={item.imageUrl} alt="" />
                })}
                
            </div>
          )
      
    }
}
const mapStateToProps = state => {
    return {
        counter:state.counter,
        banner:state.banner
    }
}
const mapDispatchToProps = dispatch =>{
    return {
      testSaga(){
            dispatch(testSaga)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(about2)
//