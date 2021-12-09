//形如（template,data）=>string;
function render(template,data){
    let reg = /\${(\w*)}/
    let res = reg.exec(template)
    if(res){
        template = template.replace(res[0],data[res[1]])
      return   render(template,data)
    }else{
        console.log(template);
        return template
    }
}
let tmp = "${name}haha${age}"
let da = {name:"xxx",age:18}
let renderResult =  render(tmp,da);
console.log(renderResult);