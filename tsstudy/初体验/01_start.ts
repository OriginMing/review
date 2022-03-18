var mess = 'hello ts';
function foo(payload:string){
   console.log(payload.length);
   
}
foo(mess)

function divide(param: unknown) {
   return param as number / 2;
 }
 
 let res = divide("sada")
 console.log(res)

 let add2 = (x: number, y: number): number => {
   return x + y
}
const add3:(x: number, y: number) => unknown = add2
console.log(add3);

export {}