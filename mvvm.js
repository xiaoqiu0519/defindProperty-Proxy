const regValue = /\{\{(.+?)\}\}/
class MVVM{
  constructor(el,data){
    this._el = document.querySelector(el)
    this._data = data
    this.data = {}
    this.domPoll = {}
    this.init()
  }
  init(){
    this.bindInput()
    this.initdata()
    this.getchildNode(this._el)
    // console.log(this.domPoll)
  }
  initdata(){
    var _this = this
    for (const key in this._data) {
      Object.defineProperty(this.data,key,{
        set(newValue){
          // console.log('设置'+key)
          _this._data[key] = newValue
          _this.domPoll[key].innerText = newValue
        },
        get(){
          // console.log('获取'+key)
          return _this._data[key]
        }
      })
    }
  }
  bindInput(){
    let inputArr = this._el.querySelectorAll('input')
    inputArr.forEach((input)=>{
      let Vmodel = input.getAttribute('v-model')
      if(Vmodel){
        input.addEventListener('keyup',this.handInput.bind(this,Vmodel,input))
      }
    })
  }
  handInput(key,input){
    this.data[key] = input.value
  }
  getchildNode(el){
    el.childNodes && el.childNodes.forEach((child)=>{
      if(child.nodeType ===3){
        if(child.nodeValue.trim().length){
          let _vaiod = regValue.test(child.nodeValue)
          if(_vaiod){
            let ddd = child.nodeValue.match(regValue)[1].trim()
            this.domPoll[ddd] = child.parentNode
          }
        }
      }
      child.childNodes && this.getchildNode(child)
    })
  }
}