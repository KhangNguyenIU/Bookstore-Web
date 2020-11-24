
export const stringTrim =(string)=>{
    if(string.length<= 250)
        return string
    var temp = string.substr(0, 250)

    var lastSpace = temp.lastIndexOf(' ')
    if(lastSpace>0)
        temp = temp.substr(0, lastSpace)
    if(temp)
        temp += "..."
    return temp
}