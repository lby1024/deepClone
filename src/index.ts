
function cloneFn(fn: Function) {
    if(fn.prototype) {
        return function() {return fn.call(this, ...arguments)}
    }else {
        return (...args) => fn(...args)
    }
}

export const deepClone = (data: any, map=new Map()) => {
    const isObj = data instanceof Object
    if(!isObj) return data
    if(map.get(data)) return map.get(data)

    let res = {}
    if(data instanceof Function) res = cloneFn(data)
    if(data instanceof Array) res = []
    if(data instanceof Date) res = new Date(data.getTime())
    if(data instanceof RegExp) res = new RegExp(data.source, data.flags)
    
    map.set(data, res)
    for(let key in data) {
        if(data.hasOwnProperty(key)) res[key]=deepClone(data[key], map)
    }

    return res
}