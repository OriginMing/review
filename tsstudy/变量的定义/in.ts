type Fish = {swim:()=>void}
type Dog = {run:()=>void}
function move(animal:Fish|Dog){
   if('swim' in animal){
       animal.swim()
   }else{
       animal.run()
   }
}
