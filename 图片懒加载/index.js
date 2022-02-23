;(function(win,doc){
  let data =  JSON.parse(doc.getElementById('data').innerHTML) // 将图片数据转化出来
  console.log(data); 
  let imgTep =  doc.getElementById('template').innerHTML // li 的模板
  let ul =  document.getElementById('imglist')
  let init = function(data){
    //  将模板中的{{name}}{{src}} 替换为真正的数据
      let list =''
     data.forEach(ele => {
         list += imgTep.replace(/{{(.*?)}}/g , function(node,key){
             return{
                 img:ele.img,
                 name:ele.name
             }[key]
         })
     });
     return list
  }
  ul.innerHTML = init(data)
  
})(window,document)
//可视区域的高度 + 滚动条的高度 >= 图片的高度  图片就需要显示了

document.documentElement.clientHeight  // 可视区域的高度 
//document.documentElement.scrollTop  || document.body.scrollTop  // 滚动条的高度
 document.getElementById("id").offsetTop  // 图片的高度  


 let imgs = document.getElementsByClassName('img_list')
 let obverser = new IntersectionObserver((entries,options)=>{
    entries.forEach(entr => {
        let img =  entr.target
        if(entr.intersectionRatio > 0){
            //进入可见区域 加载图片
            img.src=img.getAttribute('data-src')
        }
     });
 })
 for (let i = 0; i < imgs.length; i++) {
    obverser.observe(imgs[i])
 }