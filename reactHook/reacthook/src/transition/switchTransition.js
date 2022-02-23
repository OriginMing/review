import React, { PureComponent } from 'react';

import "./SwitchTransition.css";
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export default class SwitchTransitionDemo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      <div>
        <SwitchTransition mode="in-out">
          <CSSTransition key={isOn ? "on": "off"}
                         classNames="btn"
                         timeout={3000}
                         >
            <button onClick={e => this.setState({isOn: !isOn})}>
              {isOn ? "on": "off"}
            </button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }
  // state = {show: true};
  // onToggle = () =>  this.setState({show: !this.state.show});
  // render() {
  //   const {show} = this.state;
  //   return (
  //     <div>
  //       <div className={'square-wrapper'}>
  //         <CSSTransition
  //           in={show}
  //           timeout={500}
  //           classNames={'fade'}
  //         >
  //       <button onClick={this.onToggle}>toggle</button>
  //         </CSSTransition>
  //       </div>
  //     </div>
  //   );
  // }

}
