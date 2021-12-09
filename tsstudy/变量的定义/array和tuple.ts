const info:(string|number)[] = ["string",123,"xxx"]
info[1] //类型不确定
const info2:[string,number] = ["xxx",123];
info2[1]  //类型可以圈定