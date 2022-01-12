import React, { PureComponent } from "react";
import {connect} from "react-redux";
import axios from "axios"
import { 
    changeBannerAction
} from "../store/actionCreate";

class about2 extends PureComponent{
    componentDidMount(){
        axios({
           url:"http://123.207.32.32:9001/banner"
        }).then(res=>{
            this.props.changeBanner(res.data.banners);
            console.log(this.props.banner)
        })
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
       changeBanner(banners){
           dispatch(changeBannerAction(banners))
       }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(about2)
//