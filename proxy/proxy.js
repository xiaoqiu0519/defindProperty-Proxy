const handerReactive = {
  get(target,props){
    const result = Reflect.get(target,props)
    console.log('拦截了属性获取数据',props,result)
    return result
  },
  set(target,props,value){
    const result = Reflect.set(target,props,value)
    console.log('拦截了属性设置数据',props,result)
    return result
  },
  deleteProperty(target,props){
    const result = Reflect.set(target,props)
    console.log('拦截了属性删除数据',props,result)
    return result
  }
}
function shallowReactive(target){
  if(typeof(target) === 'object'){
    return new Proxy(target,handerReactive)
  }
  return target
}
const user = shallowReactive({
  name:'taotao',
  dddd:{
    cars:['宝马','奔驰','玛莎拉蒂']
  }
})
// console.log(user.dddd)
// user.dddd.cars = '小球'

function reactive(target){
  if(typeof(target) === 'object'){
    if(Array.isArray(target)){
      target.forEach((item,index)=>{
        target[index] = reactive(item)
      })
    }else{
      Object.keys(target).forEach((key)=>{
        target[key] = reactive(target[key])
      })
    }
    return new Proxy(target,handerReactive)
  }
  return target
}
const user1 = reactive({
  name:'taotao',
  dddd:{
    cars:['宝马','奔驰','玛莎拉蒂']
  },
  ffff:[
    {
      cars:['hhh']
    }
  ]
})
// user1

