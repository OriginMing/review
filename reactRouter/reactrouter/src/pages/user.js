import React, { useState } from 'react'
import {Redirect} from "react-router-dom"
 function User() {
    const [isLogin,changeLogin] = useState(0);
    return isLogin?(<div><h2>wangming</h2></div>):<Redirect to="/login"></Redirect>     

}
export default User
