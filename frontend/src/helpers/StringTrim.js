
export const stringTrim =(string, n)=>{
    if(string.length<= n)
        return string
    var temp = string.substr(0, n)

    var lastSpace = temp.lastIndexOf(' ')
    if(lastSpace>0)
        temp = temp.substr(0, lastSpace)
    if(temp)
        temp += "..."
    return temp
}