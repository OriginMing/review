/* 可选类型可以看做是 类型 和 undefined 的联合类型： */
function print(mess?:string){
    console.log(mess);
};
print(undefined)