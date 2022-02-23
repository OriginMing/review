// mark and sweep
function test(){
    var a = 1;//进入环境
}
test()//执行完离开环境
// 排除 闭包中的AO 以及全局 变量
//销毁带有离开环境的标记的值
