function h(tag,props,children){
    return {
        tag,
        props,
        children
    }
}

function createApp(rootComponent){
  return {
      mount(selector){
        const container = document.querySelector(selector);
        let isMounted = false;
        let oldValue = null;
        watchEffect(function(){
          if(!isMounted){
            oldValue =  rootComponent.render()
            mount(oldValue,container)
            isMounted = true
          }else{
            let newValue = rootComponent.render() 
            patch(oldValue,newValue);
            oldValue = newValue;
          }
        })
      }

  }
}
function mount(vnode,container){
  const el = vnode.el = document.createElement(vnode.tag)
  if(vnode.props){
    for(let key in vnode.props){
      const value = vnode.props[key];
    if(key.startsWith('on')){
      el.addEventListener(key.slice(2).toLocaleLowerCase(),value)
    }else{
      el.setAttribute(key,value)
    }
    }
  }
  if(vnode.children){
    if(typeof vnode.children == "string"){
      el.textContent = vnode.children
    }else{
      vnode.children.forEach(item => {
        mount(item,el)
      });
    }
  }
  container.appendChild(el);
}
function patch(n1,n2){
  //n1.old n2.new
  if(n1.tag!==n2.tag){
    const parentEl = n1.el.parentElement;
    parentEl.removeChild(n1.el)
    mount(n2,parentEl)
  }else{
    const el = n2.el = n1.el;
    //处理props
    const newProps = n2.props || {};
    const oldProps = n1.props || {};
    // 添加新的props
    for(let key in newProps){
      const value = newProps[key];
      if(key.startsWith("on")){
        el.addEventListener(key.slice(2),value)
      }else{
        el.setAttribute(key,value)
      }
    };
    // 删除旧的props
    for(let key in oldProps){
      const value = oldProps[key]
      if(key.startsWith("on")){
        el.removeEventListener(key.slice(2),value)
      }
      if(!(key in newProps)){
        el.removeAttribute(key)
      }
    };
    // 处理children
    const oldChildren  = n1.children || [];
    const newChidlren = n2.children || []
    if(typeof newChidlren == "string"){
      el.textContent = newChidlren
    }else{
      if(typeof oldChildren  =="string"){
        el.innerHTML = "";
        newChidlren.forEach(item => {
          mount(item,el)
        });
      }else{
      //  进行patch操作
      const commonLength = Math.min(oldChildren.length, newChidlren.length);
       for (let i = 0; i < commonLength; i++) {
        patch(oldChildren[i], newChidlren[i]);
       }
       if (newChidlren.length > oldChildren.length) {
        newChidlren.slice(oldChildren.length).forEach(item => {
          mount(item, el);
        })
      }
       if(oldChildren.length>newChidlren.length){
        oldChildren.slice(newChidlren.length).forEach(item => {
          el.removeChild(item.el);
        })
       }
      } 
    }
  }
}