import { PureComponent } from "react";

 function withAuth(wrappedComponent){
    const NewComponent = (props)=>{
       const {isLogin}  = props;
       if(isLogin){
           return <wrappedComponent {...props}/>
       }else{
           return <LoginPage></LoginPage>
       }
    }
    NewComponent.displayName = "Auth"
    return NewComponent
 }

 
class LoginPage extends PureComponent {
    render() {
      return <h2>LoginPage</h2>
    }
  }

  class CartPage extends PureComponent {
    render() {
      return <h2>CartPage</h2>
    }
  }
  
  const AuthCartPage = withAuth(CartPage);

  export default AuthCartPage
  