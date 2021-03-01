export const imagerror = {
  // 指令对象  会在当前的dom元素插入到对应的节点之后执行
  inserted(dom, options) {
    // dom 是当前指令作用的dom对象
    // options 指令中的变量的解释，其中有一个属性叫做value
    // dom 此时会认为是图片
    // 当图片有地址，但是地址没有加载成功时，会报错，触发图片的onerror事件
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
