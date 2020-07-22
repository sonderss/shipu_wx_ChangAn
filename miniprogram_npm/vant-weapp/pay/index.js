// miniprogram_npm/vant-weapp/pay/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 这里是一个自定义方法
    evnetBack:function(n){
      this.triggerEvent('showPayImage', true) 
    }
  }
})
