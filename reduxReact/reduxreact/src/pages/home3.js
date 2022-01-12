import React, { PureComponent } from "react";
import {connect} from "react-redux";
import { 
    sendBannerRequest
} from "../store/actionCreate";

class about2 extends PureComponent{
    componentDidMount(){
     this.props.sendRequest()
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
        sendRequest(){
            dispatch(sendBannerRequest)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(about2)
//