import React,{PureComponent} from 'react'

import { StoreContext } from './context'
//import store from '../store'

function connect(mapStateToProps,mapDispatchToProps){
  return function enhanceHOC(WrappedComponent){
      class EnhanceComponent extends PureComponent {
          constructor(props,context){
            super(props,context);
            this.state = {
                storeState:mapStateToProps(context.getState())
            }
            console.log(context);
          } 
          componentDidMount() {
            this.unsubscribe = this.context.subscribe(() => {
              this.setState({
                storeState: mapStateToProps(this.context.getState())
              })
            })
          }
          componentWillUnmount() {
            this.unsubscribe();
          }
          render() {
              return (
                <WrappedComponent {...this.props} 
                {...mapStateToProps(this.context.getState())}
                {...mapDispatchToProps(this.context.dispatch)}
                >
                </WrappedComponent>
              );
          }
      }
      EnhanceComponent.contextType  = StoreContext;
      return EnhanceComponent
  }
}
export default connect



